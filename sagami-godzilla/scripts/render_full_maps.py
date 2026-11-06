"""Render reviewed map shots as independent QA clips; preserve valid per-scene checkpoints."""
from pathlib import Path
import json,sys,subprocess,hashlib,fcntl,concurrent.futures,time,re,functools,argparse,shutil,os
root=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(root.parent/'.agents/skills/satellite-documentary/scripts'))
from video_check import validate,sha256,write_json
out=root/'out/full/map-clips';out.mkdir(parents=True,exist_ok=True)
parser=argparse.ArgumentParser();group=parser.add_mutually_exclusive_group();group.add_argument('--native-only',action='store_true');group.add_argument('--browser-only',action='store_true');args=parser.parse_args();shard='native' if args.native_only else 'browser' if args.browser_only else 'all'
lock=(out/f'queue.{shard}.lock').open('a');fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
scenes=[s for s in json.loads((root/'production/full/storyboard.json').read_text())['scenes'] if s['type']=='map']
browser={'map-001','map-002','map-003','map-019','map-004','map-010','map-012','map-013','map-027','map-028','map-040'}
all_scenes=scenes;scenes=[s for s in scenes if (s['id'] not in browser if args.native_only else s['id'] in browser if args.browser_only else True)]
geo_data=json.loads((root/'public/full/maps/geodata.json').read_text());native_data=json.dumps({k:geo_data[k] for k in ['profiles','plateBoundaries']},sort_keys=True,separators=(',',':'))
snapshot_hash=hashlib.sha256(b''.join(p.read_bytes() for p in sorted((root/'out/native').rglob('*.js')))).hexdigest();snapshot=root/'out/full/native-snapshots'/snapshot_hash
if not args.browser_only and not snapshot.exists():shutil.copytree(root/'out/native',snapshot)
svg=(root/'src/full/MapSVG.tsx').read_text();case_starts=list(re.finditer(r'\n case (\d+):',svg));default=svg.index('\n default:');shared=svg[:svg.index(' switch(num)')]+svg[default:]
cases={int(m.group(1)):svg[m.start():case_starts[i+1].start() if i+1<len(case_starts) else default] for i,m in enumerate(case_starts)}
@functools.lru_cache(None)
def digest(p):return sha256(root/p)
def fingerprint(s):
 h=hashlib.sha256(json.dumps({'scene':s['id'],'start':s['startFrame'],'end':s['endFrame'],'fps':30,'width':1920,'height':1080,'crf':16,'preset':'medium','renderer':'browser' if s['id'] in browser else 'native SVG','version':2},sort_keys=True).encode())
 files=['package-lock.json','src/full/timeline.ts','src/full/cues.ts']
 if s['id'] not in browser:
  h.update(shared.encode());h.update(cases[int(s['id'][-3:])].encode());h.update(native_data.encode());files+=['src/full/views.ts','src/full/contours.ts','scripts/render_svg_scene.cjs',f'public/full/maps/backgrounds/{s["id"]}.jpg']
  if s['id'] in {'map-036','map-038'}:files+=['public/full/maps/godzilla-silhouette.png']
 else:
  files+=['src/full/FullMap.tsx','src/Root.tsx']
  if s['id']=='map-001':files+=['src/full/OpeningMap.tsx','public/maps/kanto-satellite.jpg','public/maps/kanto-satellite.json','public/full/maps/kanto-hd-satellite.jpg','public/full/maps/kanto-hd-satellite.json']
  else:
   files+=['src/full/Geographic3D.tsx','src/full/geodata.ts','public/full/maps/kanto-hd-satellite.jpg','public/full/maps/kanto-hd-satellite.json']
   if s['id'] in {'map-027','map-028'}:files+=['public/full/maps/oshima-gsi.jpg','public/full/maps/oshima-gsi.json']
   if s['id']=='map-004':files+=['public/full/maps/world-day.jpg','public/full/maps/globe-kanto-inset.jpg']
 for p in files:h.update(p.encode());h.update(digest(p).encode())
 return h.hexdigest()
reports={};failures={};fingerprints={s['id']:fingerprint(s) for s in scenes};write_json(out/f'{shard}-fingerprints.json',fingerprints)
def render(s):
 sid=s['id'];n=s['endFrame']-s['startFrame'];key=fingerprints[sid];target=out/(sid+'.mp4');marker=out/(sid+'.ok.json')
 if target.exists() and marker.exists():
  d=json.loads(marker.read_text())
  if d.get('fingerprint')==key and d.get('sha256')==sha256(target):print('CACHE VERIFIED',sid,flush=True);return d
 partial=out/(sid+'.partial.mp4');log=out/(sid+'.render.log')
 if sid in browser:
  props=out/(sid+'.props.json');props.write_text(json.dumps({'mapId':sid,'durationFrames':n}))
  cmd=['npx','--no-install','remotion','render','src/index.ts','FullMapProof',str(partial),f'--frames=0-{n-1}','--codec=h264','--pixel-format=yuv420p','--crf=16','--x264-preset=medium','--concurrency=1','--muted','--overwrite','--browser-executable=/usr/bin/chromium','--gl=swangle','--props='+str(props)]
 else:cmd=['node','--max-old-space-size=2048','scripts/render_svg_scene.cjs',sid]
 print('RENDER',sid,n,'frames','Chromium' if sid in browser else 'native SVG',flush=True)
 env=dict(os.environ)
 if sid not in browser:env['SAGAMI_NATIVE_MODULE']=str(snapshot/'full/MapSVG.js')
 with log.open('w') as f:subprocess.run(cmd,cwd=root,stdout=f,stderr=subprocess.STDOUT,check=True,env=env)
 d=validate(partial,n,digest=True);partial.replace(target);d.update(id=sid,path=str(target),fingerprint=key,startFrame=s['startFrame'],endFrame=s['endFrame'],renderer='Chromium' if sid in browser else 'native SVG');write_json(marker,d)
 print('VERIFIED',sid,n,'frames',flush=True);return d
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as native,concurrent.futures.ThreadPoolExecutor(max_workers=1) as chrome:
 pending={(chrome if s['id'] in browser else native).submit(render,s):s['id'] for s in scenes}
 while pending:
  ready,_=concurrent.futures.wait(pending,timeout=5,return_when=concurrent.futures.FIRST_COMPLETED)
  for f in ready:
   sid=pending.pop(f)
   try:reports[sid]=f.result()
   except Exception as e:failures[sid]=str(e);print('FAILED',sid,str(e),flush=True)
  write_json(out/f'{shard}-progress.json',{'stage':'individual map QA clips rendering; final film not assembled','verifiedScenes':len(reports),'totalMapScenes':len(scenes),'totalProjectMapScenes':len(all_scenes),'shard':shard,'verifiedFrames':sum(d['frames'] for d in reports.values()),'verifiedSeconds':sum(d['frames'] for d in reports.values())/30,'failed':failures,'updatedUnix':time.time(),'checkpointScope':'per-scene code and data; no blanket cache deletion'})
print('MAP QUEUE FINISHED',len(reports),'of',len(scenes),'failed',failures,flush=True)
if failures:sys.exit(1)
