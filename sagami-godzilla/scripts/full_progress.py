"""Report verified source duration separately from final encoding progress."""
from pathlib import Path
import json,time
R=Path(__file__).resolve().parents[1]
def report():
 story=json.loads((R/'production/full/storyboard.json').read_text());groups={}
 for kind in ['image','map']:
  scenes=[s for s in story['scenes'] if s['type']==kind];done=[]
  for s in scenes:
   base=R/f'out/full/{kind}-clips';p=base/(s['id']+'.ok.json');clip=base/(s['id']+'.mp4')
   if p.exists() and clip.exists():
    d=json.loads(p.read_text())
    if d['frames']==s['endFrame']-s['startFrame'] and d['bytes']==clip.stat().st_size:done.append(d)
  groups[kind]={'verified':len(done),'total':len(scenes),'frames':sum(d['frames'] for d in done)}
 frames=sum(d['frames'] for d in groups.values());final=R/'out/sagami-full-1080p30.validation.json'
 result={'updatedUnix':time.time(),'stage':'map clip rendering and quality review','groups':groups,'verifiedSourceFrames':frames,'totalFrames':story['frames'],'verifiedSourceSeconds':frames/30,'sourcePercent':round(frames/story['frames']*100,2),'finalVerified':final.exists(),'note':'Source coverage is distributed across the timeline, not a continuous playable final. Markers originate from full decode and SHA validation; this status reader checks size and frame count only.'}
 if frames==story['frames']:
  result['stage']='source renders complete; encoded-shot QA before assembly'
 qa=R/'out/full/encoded-qa.log'
 if qa.exists():result['encodedShotChecks']=sum(line.startswith('CHECKED ') for line in qa.read_text().splitlines())
 p=R/'out/full/assembly/progress.log'
 if p.exists():
  text=p.read_text();lines=[l for l in text.splitlines() if l.startswith('frame=')]
  if lines:
   f=int(lines[-1].split('=')[1]);result['assembly']={'encodedFrames':f,'totalFrames':story['frames'],'encodedSeconds':round(f/30,2),'percent':round(f/story['frames']*100,2)};result['stage']='full MP4 encoding; final validation pending'
 if result['finalVerified']:result['stage']='final MP4 decode validated; delivery verification tracked separately'
 return result
if __name__=='__main__':
 result=report();(R/'production/full/progress.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
