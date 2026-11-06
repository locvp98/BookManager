"""Gate assembly retry on complete mixed-format and full-timeline regression checks."""
from pathlib import Path
import json,time,subprocess,sys,fcntl
R=Path(__file__).resolve().parents[1];W=R/'out/full/assembly';lock=(W/'recovery.lock').open('a');fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
def state(stage,active=False,**extra):
 d={'stage':stage,'activeEncoding':active,'updatedUnix':time.time(),**extra};tmp=W/'state.tmp.json';tmp.write_text(json.dumps(d,indent=2)+'\n');tmp.replace(W/'state.json');print(stage,flush=True)
def fields(p):
 result={}
 if p.exists():
  for line in p.read_text().splitlines():
   if '=' in line:k,v=line.split('=',1);result[k]=v
 return result
state('repair regression checks running: full timeline decode and mixed-format transition encode')
while True:
 p=fields(W/'full-preflight-progress.log');t=R/'out/full-transition-test.validation.json';test=json.loads(t.read_text()) if t.exists() else {};log=(R/'out/full/assembly-test-mixed-formats.log').read_text()
 if 'Traceback' in log:state('mixed-format regression test failed; assembly retry blocked');sys.exit(1)
 if p.get('progress')=='end':
  if int(p.get('frame',0))!=44273 or int(p.get('drop_frames',0)) or int(p.get('dup_frames',0)):state('full-timeline regression check failed; assembly retry blocked',preflight=p);sys.exit(1)
  comparison=R/'out/full/mixed-transition-comparison.json';comparison=json.loads(comparison.read_text()) if comparison.exists() else {}
  if test.get('frames')==1693 and 'FINAL VERIFIED' in log and comparison.get('passed') and comparison.get('sourceVideoSHA256')==test.get('sha256'):break
 time.sleep(5)
evidence={'rootCause':'FFmpeg reinitialized the filter graph when concatenation changed decoded pixel format from yuvj420p to yuv420p; setpts=N restarted and CFR dropped603 frames.','repair':'Disable filter reinitialization for the fixed-size concat input, preserving a continuous frame counter.','reproduction':{'beforeFrames':1090,'expectedFrames':1693,'beforeDroppedFrames':603,'afterFrames':1693,'afterDroppedFrames':0},'fullPreflight':p,'mixedFormatTransitionValidation':test,'sourceSceneRendersReused':154,'transitionComparison':comparison,'transitionTimingRepair':'Overlay enable bounds include a quarter-frame margin so rounded repeating-decimal timestamps cannot omit the first dissolve frame.'}
(R/'production/full/assembly-recovery.json').write_text(json.dumps(evidence,indent=2)+'\n')
old=R/'out/sagami-full-1080p30.partial.mp4'
if old.exists():old.rename(R/f'out/sagami-full-1080p30.failed-{int(time.time())}.mp4')
p=W/'progress.log'
if p.exists():p.rename(W/f'failed-progress-{int(time.time())}.log')
state('full MP4 encoding retry after verified timestamp repair',True)
logfile=R/'out/full/assembly-full-retry.log'
with logfile.open('w') as log:
 proc=subprocess.Popen([sys.executable,'scripts/assemble_full.py'],cwd=R,stdout=log,stderr=subprocess.STDOUT)
 previous=''
 while proc.poll() is None:
  text=logfile.read_text()
  if 'Encoded, starting full decode validation' in text and previous!='decode':state('full MP4 encoded; full decode validation running');previous='decode'
  time.sleep(5)
 if proc.returncode:state('assembly retry or final validation failed; inspect retry log');sys.exit(proc.returncode)
state('full MP4 validated; joined-video quality review and delivery remain')
