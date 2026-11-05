from pathlib import Path
import sys,subprocess,json,shutil
sys.path.insert(0,'/workspace/BookManager/.agents/skills/satellite-documentary/scripts')
from video_check import validate
root=Path(__file__).resolve().parents[1]
subprocess.run([sys.executable,'scripts/assemble-forward-v3.py'],cwd=root,check=True)
full=root/'out/hokkaido-preview-forward-v3-40s-1080p30.mp4'
small=root/'out/hokkaido-preview-forward-v3-40s-720p30.mp4'
clip=root/'out/hokkaido-camera-forward-112-7s.mp4'
subprocess.run(['ffmpeg','-v','error','-y','-i',str(full),'-vf','scale=1280:720:flags=lanczos','-c:v','libx264','-preset','medium','-crf','23','-c:a','copy','-movflags','+faststart',str(small)],check=True)
subprocess.run(['ffmpeg','-v','error','-y','-ss','21.5','-i',str(full),'-t','7','-vf','scale=1280:720:flags=lanczos','-c:v','libx264','-preset','medium','-crf','20','-c:a','aac','-b:a','192k','-movflags','+faststart',str(clip)],check=True)
reports=[json.loads((root/'out/forward-v3/validation-1080p.json').read_text()),validate(small,1200,width=1280,height=720,audio=True,digest=True),validate(clip,210,width=1280,height=720,audio=True,digest=True)]
dst=Path('/workspace/BookManager-video-delivery/hokkaido-documentary')
for source,name,report in zip([full,small,clip],['hokkaido-preview-40s-1080p30.mp4','hokkaido-preview-40s-720p30.mp4','hokkaido-camera-forward-7s.mp4'],reports):
 shutil.copy(source,dst/'preview'/name);report['path']='preview/'+name
shutil.copy(root/'src/common.tsx',dst/'src/common.tsx')
p=dst/'production/preview-validation.json';d=json.loads(p.read_text());d['exports']=reports;d['revision']='V3: user requested 100% to 112% forward push';d['visualReview']['motion']='Constant linear forward push from 1.00 to 1.12 over 240 frames (8s), approximately 1.5 percentage points per second; same anchor 73% 28%; no shake or direction change';p.write_text(json.dumps(d,ensure_ascii=False,indent=2))
p=dst/'production/storyboard.json';d=json.loads(p.read_text());next(s for s in d['scenes'] if s['id']=='Rural')['motion']='User-set 100% to 112% continuous forward push over 240 frames; linear; transform origin 73% 28%';p.write_text(json.dumps(d,ensure_ascii=False,indent=2))
p=dst/'production/brief.json';d=json.loads(p.read_text());d['illustrationMotion']='User-set linear forward camera push from 100% to 112% over 8 seconds, no shake';p.write_text(json.dumps(d,ensure_ascii=False,indent=2))
p=dst/'README.md';s=p.read_text().replace('Motion revision V2','Motion revision V3').replace('constant forward push (3% over 8 seconds)','constant forward push (100% to 112% over 8 seconds)');p.write_text(s)
for name in ['brief.json','storyboard.json','preview-validation.json']:
 shutil.copy(dst/'production'/name,root/'production'/name)
print('READY TO PUBLISH',[(r['path'],r['bytes'],r['sha256']) for r in reports],flush=True)
