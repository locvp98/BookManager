"""Inspect encoded shots: decoded frame sequence statistics and current map contact sheets."""
from pathlib import Path
import json,subprocess,concurrent.futures
import numpy as np
from PIL import Image,ImageDraw
R=Path(__file__).resolve().parents[1];scenes=json.loads((R/'production/full/storyboard.json').read_text())['scenes'];out=R/'out/full/encoded-review';out.mkdir(exist_ok=True)
def check(s):
 p=R/f'out/full/{s["type"]}-clips/{s["id"]}.mp4';n=s['endFrame']-s['startFrame'];w,h=320,180
 raw=subprocess.check_output(['ffmpeg','-v','error','-threads','1','-i',str(p),'-vf',f'scale={w}:{h}','-f','rawvideo','-pix_fmt','rgb24','-threads','1','pipe:1'])
 a=np.frombuffer(raw,np.uint8).reshape(-1,h,w,3);assert len(a)==n
 dark=np.mean(a.astype(np.float32),axis=(1,2,3));delta=np.mean(np.abs(a[1:].astype(np.int16)-a[:-1].astype(np.int16)),axis=(1,2,3));flag=[]
 if dark.min()<1:flag.append('black-frame')
 if delta.max(initial=0)>12:flag.append('large-frame-change-needs-review')
 if s['type']=='map':
  strip=Image.new('RGB',(w*3,h+25),'#071a28');d=ImageDraw.Draw(strip)
  for j,f in enumerate([round((n-1)*q) for q in [.1,.5,.9]]):strip.paste(Image.fromarray(a[f]),(j*w,25))
  d.text((8,5),s['id'],fill='white');strip.save(out/(s['id']+'.jpg'),quality=92)
 r={'id':s['id'],'frames':n,'minMeanBrightness':float(dark.min()),'meanAdjacentDifference':float(delta.mean()),'maxAdjacentDifference':float(delta.max(initial=0)),'flags':flag}
 print('CHECKED',s['id'],'flags',flag,flush=True);return r
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:results=list(pool.map(check,scenes))
(out/'statistics.json').write_text(json.dumps(results,indent=2)+'\n')
ms=[s for s in scenes if s['type']=='map']
for first in range(0,len(ms),6):
 chunk=ms[first:first+6];sheet=Image.new('RGB',(960,len(chunk)*205),'#071a28')
 for j,s in enumerate(chunk):
  with Image.open(out/(s['id']+'.jpg')) as im:sheet.paste(im,(0,j*205))
 sheet.save(out/f'maps-{first//6+1:02}.jpg',quality=92)
print('CHECK COMPLETE',len(results),'flagged',[r['id'] for r in results if r['flags']],flush=True)
