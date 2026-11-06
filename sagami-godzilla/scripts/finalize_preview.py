from pathlib import Path
import sys,subprocess,json
R=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(R.parent/'.agents/skills/satellite-documentary/scripts'))
from video_check import validate,write_json
master=R/'out/sagami-preview-40s-1080p30.mp4'
r=validate(master,1200,audio=True,digest=True);write_json(master.with_suffix('.validation.json'),r);print('1080p VERIFIED',r['bytes'],r['sha256'],flush=True)
small=R/'out/sagami-preview-40s-720p.mp4';partial=small.with_name(small.stem+'.partial.mp4')
subprocess.run(['ffmpeg','-hide_banner','-v','warning','-y','-i',str(master),'-vf','scale=1280:720:flags=lanczos','-c:v','libx264','-preset','medium','-crf','23','-threads','4','-c:a','aac','-b:a','128k','-movflags','+faststart',str(partial)],check=True)
r=validate(partial,1200,width=1280,height=720,audio=True,digest=True);partial.replace(small);r['path']=str(small);write_json(small.with_suffix('.validation.json'),r);print('720p VERIFIED',r['bytes'],r['sha256'],flush=True)
subprocess.run(['ffmpeg','-hide_banner','-v','error','-y','-i',str(master),'-vf',"select='eq(n,0)+eq(n,249)+eq(n,255)+eq(n,260)+eq(n,384)+eq(n,390)+eq(n,395)+eq(n,606)+eq(n,612)+eq(n,617)+eq(n,800)+eq(n,1000)+eq(n,1170)+eq(n,1199)',scale=480:270,tile=4x4:padding=4:margin=4",'-frames:v','1',str(R/'production/final-transition-review.jpg')],check=True)
print('PREVIEW FINALIZATION COMPLETE',flush=True)
