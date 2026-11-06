"""Finish source-comparison QA and authorized GitHub delivery after validated assembly."""
from pathlib import Path
import json,time,subprocess,sys,shutil,urllib.request,hashlib
import numpy as np
R=Path(__file__).resolve().parents[1];repo=R.parent;W=R/'out/full';status=W/'delivery.json'
def record(stage,**extra):
 d={'stage':stage,'updatedUnix':time.time(),**extra};status.write_text(json.dumps(d,indent=2)+'\n');print(stage,flush=True)
def run(cmd,**kw):return subprocess.run(cmd,check=True,**kw)
try:
 record('waiting for full MP4 decode validation')
 report=R/'out/sagami-full-1080p30.validation.json'
 video=R/'out/sagami-full-1080p30.mp4'
 while not report.exists():
  state=W/'assembly/state.json'
  if state.exists():
   s=json.loads(state.read_text())['stage']
   if 'failed;' in s or 'retry blocked' in s:record('delivery blocked by assembly failure',reason=s);sys.exit(1)
  time.sleep(5)
 d=json.loads(report.read_text());assert d['frames']==44273 and video.stat().st_size==d['bytes']
 record('checking every scene midpoint and all dissolve boundaries')
 run([sys.executable,'scripts/check_assembled_samples.py'],cwd=R)
 qa=json.loads((W/'final-source-comparison.json').read_text());assert qa['passed'] and qa['sourceVideoSHA256']==d['sha256']
 def samples(p,t):
  b=subprocess.check_output(['ffmpeg','-v','error','-ss',str(t),'-i',str(p),'-t','1','-vn','-ar','16000','-ac','1','-f','f32le','pipe:1']);return np.frombuffer(b,np.float32)
 audio=[]
 for t in [2,150,500,900,1400,1470]:
  a=samples(R/'public/narration.mp3',t);b=samples(video,t);n=min(len(a),len(b));corr=float(np.corrcoef(a[:n],b[:n])[0,1]);audio.append({'timeSeconds':t,'correlation':corr});assert corr>.90,(t,corr)
 record('assembled frame comparisons and sampled audio alignment passed',sampleCount=len(qa['samples']))
 final=R/'full';final.mkdir(exist_ok=True);shutil.copy2(video,final/video.name);shutil.copy2(report,final/report.name);shutil.copy2(W/'final-source-comparison.json',R/'production/full/final-source-comparison.json')
 (R/'production/full/final-audio-check.json').write_text(json.dumps(audio,indent=2)+'\n')
 (R/'production/full/final-validation.json').write_text(json.dumps(d,indent=2)+'\n')
 (final/'README.md').write_text('''# Sagami Bay × Godzilla — full documentary\n\n- 1920×1080, 30 fps; 44,273 frames (24:35.767).\n- 116 distinct illustration shots and 38 separately designed geographic/explanatory scenes.\n- Original narration preserved and muxed once; no burned narration subtitles.\n- Illustrations move smoothly from100% to120%; twelve-frame hold dissolves.\n- Full decode, frame count, dimensions, frame rate, audio duration and SHA-256 checked.\n- Every scene midpoint and incoming transition frames0,6,11,13 compared with verified source clips. Sampled audio compared with the supplied narration.\n- Motion QA used native30fps decoded sequences, continuity analysis and sampled visual inspection. No interactive realtime playback tool was available; realtime viewing is not claimed.\n- Generated creature/history/underwater images are illustrative reconstructions, not film stills or historical photographic evidence.\n- Original narration contains repeated/broken phrases documented inproduction/editorial-notes.md; audio was not silently rewritten.\n\nMap provenance and review: ../production/full/map-diversity-review.json. Illustration provenance: ../production/full/assets/.\n''')
 with (final/video.name).open('rb') as stream:
  h=hashlib.file_digest(stream,'sha256').hexdigest();assert h==d['sha256']
 attrs=subprocess.check_output(['git','check-attr','filter','--','sagami-godzilla/full/'+video.name],cwd=repo,text=True);assert attrs.strip().endswith(': lfs')
 record('committing verified full video and QA reports')
 run(['git','add','sagami-godzilla'],cwd=repo);run(['git','commit','-m','Deliver validated full Sagami documentary at1080p30'],cwd=repo)
 run(['git','fetch','origin','work'],cwd=repo);run(['git','merge-base','--is-ancestor','origin/work','HEAD'],cwd=repo)
 record('uploading full MP4 to GitHub LFS')
 run(['git','push','origin','HEAD:work'],cwd=repo)
 commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=repo,text=True).strip();url=f'https://media.githubusercontent.com/media/locvp98/BookManager/{commit}/sagami-godzilla/full/{video.name}'
 request=urllib.request.Request(url,headers={'Range':'bytes=0-63'})
 with urllib.request.urlopen(request,timeout=90) as response:
  b=response.read(64);code=response.status;cr=response.headers.get('Content-Range','');assert code==206 and '/'+str(d['bytes']) in cr and b[4:8]==b'ftyp',(code,cr,b[:12])
 record('delivered; immutable download URL verified against actual MP4 bytes',url=url,commit=commit,bytes=d['bytes'],sha256=d['sha256'],httpStatus=code,contentRange=cr)
except Exception as error:
 record('delivery stopped by a failed check or upload',error=str(error))
 raise
