"""Render only reviewed, unique illustration assets; cache by image+motion+frames."""
from pathlib import Path
import argparse,json,hashlib,subprocess,sys,time,fcntl,concurrent.futures
sys.path.insert(0,str(Path(__file__).resolve().parents[2]/'.agents/skills/satellite-documentary/scripts'))
from video_check import validate,sha256,write_json
root=Path(__file__).resolve().parents[1]
out=root/'out/full/image-clips';out.mkdir(parents=True,exist_ok=True)
args=argparse.ArgumentParser();args.add_argument('--watch',action='store_true');args.add_argument('--workers',type=int,default=2);a=args.parse_args()
lock=(out/'queue.lock').open('a');fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
scenes=[s for s in json.loads((root/'production/full/storyboard.json').read_text())['scenes'] if s['type']=='image']
def render(s):
 sid=s['id'];asset=root/s['asset'];n=s['endFrame']-s['startFrame']
 config={'assetHash':sha256(asset),'frames':n,'scale':[1,1.2],'focus':[.5,.5],'fps':30,'workingWidth':7680,'crf':16,'preset':'medium','version':2}
 fingerprint=hashlib.sha256(json.dumps(config,sort_keys=True).encode()).hexdigest()
 target=out/(sid+'.mp4');marker=out/(sid+'.ok.json')
 if target.exists() and marker.exists():
  old=json.loads(marker.read_text())
  if old.get('fingerprint')==fingerprint and old.get('sha256')==sha256(target):return old
 partial=out/(sid+'.partial.mp4')
 # Work at 4x output resolution: crop rounding is below 0.25 output pixels.
 vf=f"scale=7680:-2:flags=lanczos,crop=7680:4320,zoompan=z='1+0.20*on/{max(1,n-1)}':x='(iw-iw/zoom)*0.5':y='(ih-ih/zoom)*0.5':d={n}:s=1920x1080:fps=30,setsar=1"
 cmd=['ffmpeg','-hide_banner','-v','error','-y','-filter_threads','1','-i',str(asset),'-vf',vf,'-frames:v',str(n),'-an','-c:v','libx264','-threads','2','-preset','medium','-crf','16','-pix_fmt','yuvj420p','-color_range','pc','-movflags','+faststart',str(partial)]
 with (out/(sid+'.render.log')).open('w') as f:subprocess.run(cmd,stdout=f,stderr=subprocess.STDOUT,check=True)
 report=validate(partial,n,digest=True);partial.replace(target)
 report.update(id=sid,path=str(target),fingerprint=fingerprint,startFrame=s['startFrame'],endFrame=s['endFrame'],motion=config)
 write_json(marker,report);print('VERIFIED',sid,n,'frames',report['bytes'],'bytes',flush=True);return report
done={};failed={}
with concurrent.futures.ThreadPoolExecutor(max_workers=a.workers) as pool:
 pending={}
 while len(done)<len(scenes):
  for s in scenes:
   sid=s['id'];meta=root/f'production/full/assets/{sid}.json'
   if sid in done or sid in failed or sid in pending.values() or not meta.exists():continue
   if not json.loads(meta.read_text()).get('status','').startswith('reviewed: accepted'):continue
   pending[pool.submit(render,s)]=sid
  for f in list(pending):
   if not f.done():continue
   sid=pending.pop(f)
   try:done[sid]=f.result()
   except Exception as e:failed[sid]=str(e);print('FAILED',sid,str(e),flush=True)
  write_json(out/'progress.json',{'stage':'rendering reviewed image scenes; not a completed full movie','verifiedScenes':len(done),'totalIllustrationScenes':len(scenes),'verifiedFrames':sum(r['frames'] for r in done.values()),'verifiedSeconds':sum(r['frames'] for r in done.values())/30,'failed':failed,'updatedUnix':time.time()})
  if not pending and (not a.watch or failed):break
  time.sleep(5)
print('IMAGE QUEUE FINISHED',len(done),'of',len(scenes),'failed',failed,flush=True)
if failed:sys.exit(1)
