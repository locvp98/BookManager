"""Compare decoded interior frames and hold dissolves to their verified source clips."""
from pathlib import Path
import argparse,json,subprocess
import numpy as np
R=Path(__file__).resolve().parents[1];p=argparse.ArgumentParser();p.add_argument('--test',action='store_true');a=p.parse_args();story=json.loads((R/'production/full/storyboard.json').read_text())['scenes'];scenes=story[:5] if a.test else story;video=R/'out'/('full-transition-test.mp4' if a.test else 'sagami-full-1080p30.mp4');w,h=320,180

def frame(file,n):
 raw=subprocess.check_output(['ffmpeg','-v','error','-threads','1','-ss',f'{n/30:.9f}','-i',str(file),'-frames:v','1','-vf',f'scale={w}:{h}','-threads','1','-f','rawvideo','-pix_fmt','rgb24','pipe:1']);assert len(raw)==w*h*3,(file,n,len(raw));return np.frombuffer(raw,np.uint8).reshape(h,w,3).astype(float)
def clip(s):return R/f'out/full/{s["type"]}-clips/{s["id"]}.mp4'
results=[]
for i,s in enumerate(scenes):
 n=s['endFrame']-s['startFrame'];local=max(14,min(n-1,round(n*.5)));actual=frame(video,s['startFrame']+local);expected=frame(clip(s),local);mae=float(np.abs(actual-expected).mean());results.append({'id':s['id'],'kind':'interior','absoluteFrame':s['startFrame']+local,'meanRGBError':mae,'passed':mae<9})
 if i:
  previous=scenes[i-1];prior=frame(clip(previous),previous['endFrame']-previous['startFrame']-1)
  for k in [0,6,11,13]:
   incoming=frame(clip(s),k);alpha=max(0,1-k/12) if k<12 else 0;expected=prior*alpha+incoming*(1-alpha);actual=frame(video,s['startFrame']+k);mae=float(np.abs(actual-expected).mean());results.append({'id':s['id'],'kind':'dissolve','absoluteFrame':s['startFrame']+k,'meanRGBError':mae,'passed':mae<12})
 print('SAMPLED',s['id'],flush=True)
out=R/'out/full'/('mixed-transition-comparison.json' if a.test else 'final-source-comparison.json');out.write_text(json.dumps({'method':'RGB320x180 decoded comparison; every scene midpoint and incoming dissolve frames0,6,11,13; CRF and RGB blending tolerance explicit, no claim of realtime interactive viewing','sourceVideoSHA256':json.loads(video.with_suffix('.validation.json').read_text())['sha256'],'samples':results,'passed':all(r['passed'] for r in results)},indent=2)+'\n');print('SAMPLE CHECK',len(results),'passed',all(r['passed'] for r in results),flush=True)
if not all(r['passed'] for r in results):raise SystemExit(1)
