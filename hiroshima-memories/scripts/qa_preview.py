from pathlib import Path
import json,subprocess,sys
import numpy as np
from PIL import Image,ImageDraw
R=Path(__file__).resolve().parents[1];sys.path.insert(0,str(R.parent/'.agents/skills/satellite-documentary/scripts'));sys.dont_write_bytecode=True
from video_check import validate,write_json
video=R/'out/hiroshima-preview-40s-1080p30.mp4';report=validate(video,1200,audio=True,digest=True);write_json(R/'production/preview-validation.json',report);print('1080P FULL DECODE VERIFIED',report['sha256'],flush=True)
w,h=480,270;raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(video),'-vf',f'scale={w}:{h}','-threads','2','-f','rawvideo','-pix_fmt','rgb24','pipe:1']);a=np.frombuffer(raw,np.uint8).reshape(-1,h,w,3);assert len(a)==1200
brightness=a.mean(axis=(1,2,3));delta=np.mean(np.abs(a[1:].astype(np.int16)-a[:-1].astype(np.int16)),axis=(1,2,3));assert float(brightness.min())>1
boundaries=[202,392,629,759,918];evidence=[];sheet=Image.new('RGB',(5*w,len(boundaries)*(h+25)),'#101e20');draw=ImageDraw.Draw(sheet)
for row,n in enumerate(boundaries):
 for col,k in enumerate([-1,0,6,12,24]):
  frame=n+k;sheet.paste(Image.fromarray(a[frame]),(col*w,row*(h+25)));draw.text((col*w+5,row*(h+25)+h+4),f'frame{frame} / {frame/30:.3f}s',fill='white')
 evidence.append({'boundaryFrame':n,'maxAdjacentDifferenceAroundBoundary':float(delta[n-2:n+25].max()),'reviewFrames':[n+k for k in [-1,0,6,12,24]]})
sheet.resize((1600,round(sheet.height*1600/sheet.width))).save(R/'production/encoded-transitions.jpg',quality=92)
write_json(R/'production/encoded-motion-check.json',{'framesDecoded':len(a),'fps':30,'minimumMeanBrightness':float(brightness.min()),'maximumAdjacentDifference':float(delta.max()),'meanAdjacentDifference':float(delta.mean()),'transitions':evidence,'method':'native30fps decoded frame sequence statistics plus visual contact strips of actual encoded transitions; realtime interactive playback not claimed'})
print('MOTION AND TRANSITION EVIDENCE READY',flush=True)
