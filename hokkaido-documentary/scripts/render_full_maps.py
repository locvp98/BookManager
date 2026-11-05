"""Resumable full-map queue: three native SVG workers and one Chromium worker."""
from pathlib import Path
import json,sys,subprocess,hashlib,fcntl,concurrent.futures,time
root=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(root.parent/'.agents/skills/satellite-documentary/scripts'))
from video_check import validate,sha256,write_json
out=root/'out/full/map-clips';out.mkdir(parents=True,exist_ok=True)
lock=(out/'queue.lock').open('a');fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
scenes=[s for s in json.loads((root/'production/full/storyboard.json').read_text())['scenes'] if s['type']=='map']
browser={'map-001','map-002','map-010','map-020','map-027','map-028'}
source_files=sorted((root/'src').rglob('*'))+sorted((root/'public/maps').rglob('*'))+sorted((root/'public/full/maps').rglob('*'))+[root/'scripts/render_svg_scene.cjs',Path(__file__)]
h=hashlib.sha256()
for p in source_files:
 if p.is_file():h.update(str(p.relative_to(root)).encode());h.update(p.read_bytes())
source=h.hexdigest();reports={};failures={}
def render(s):
 sid=s['id'];n=s['endFrame']-s['startFrame'];fingerprint=hashlib.sha256((source+sid+str(n)).encode()).hexdigest();target=out/(sid+'.mp4');marker=out/(sid+'.ok.json')
 if target.exists() and marker.exists():
  d=json.loads(marker.read_text())
  if d.get('fingerprint')==fingerprint and d.get('sha256')==sha256(target):return d
 partial=out/(sid+'.partial.mp4');log=out/(sid+'.render.log')
 if sid in browser:
  props=out/(sid+'.props.json');props.write_text(json.dumps({'mapId':sid,'durationFrames':n}))
  cmd=['npx','--no-install','remotion','render','src/index.ts','FullMapProof',str(partial),f'--frames=0-{n-1}','--codec=h264','--pixel-format=yuv420p','--crf=16','--x264-preset=medium','--concurrency=1','--muted','--overwrite','--browser-executable=/usr/bin/chromium','--gl=swangle','--props='+str(props)]
 else:cmd=['node','--max-old-space-size=2048','scripts/render_svg_scene.cjs',sid]
 print('RENDER',sid,n,'frames','Chromium' if sid in browser else 'native SVG',flush=True)
 with log.open('w') as f:subprocess.run(cmd,cwd=root,stdout=f,stderr=subprocess.STDOUT,check=True)
 d=validate(partial,n,digest=True);partial.replace(target);d.update(id=sid,path=str(target),fingerprint=fingerprint,startFrame=s['startFrame'],endFrame=s['endFrame'],renderer='Chromium' if sid in browser else 'native SVG + validated premultiplied RGBA composition');write_json(marker,d)
 print('VERIFIED',sid,n,'frames',flush=True);return d
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as native,concurrent.futures.ThreadPoolExecutor(max_workers=1) as chrome:
 pending={}
 for s in scenes:pending[(chrome if s['id'] in browser else native).submit(render,s)]=s['id']
 while pending:
  ready,_=concurrent.futures.wait(pending,timeout=5,return_when=concurrent.futures.FIRST_COMPLETED)
  for f in ready:
   sid=pending.pop(f)
   try:reports[sid]=f.result()
   except Exception as e:failures[sid]=str(e);print('FAILED',sid,str(e),flush=True)
  write_json(out/'progress.json',{'stage':'rendering map scenes','verifiedScenes':len(reports),'totalMapScenes':len(scenes),'verifiedFrames':sum(d['frames'] for d in reports.values()),'verifiedSeconds':sum(d['frames'] for d in reports.values())/30,'failed':failures,'updatedUnix':time.time(),'sourceFingerprint':source})
print('MAP QUEUE FINISHED',len(reports),'of',len(scenes),'failed',failures,flush=True)
if failures:sys.exit(1)
