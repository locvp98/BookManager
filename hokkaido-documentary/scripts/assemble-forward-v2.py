"""Replace only the affected 10-second chunk; preserve verified map chunks."""
from pathlib import Path
import sys,json,subprocess
sys.path.insert(0,'/workspace/BookManager/.agents/skills/satellite-documentary/scripts')
from video_check import validate,sha256,write_json

root=Path(__file__).resolve().parents[1]
cache=root/'out/render-cache/f5e2991ab65527791530'
revision=root/'out/forward-v2'
new=revision/'chunk-20-30.partial.mp4'
source_before=Path('/workspace/BookManager-video-delivery/hokkaido-documentary/src')
changed=[p.name for p in (root/'src').iterdir() if p.is_file() and p.read_text().strip()!=(source_before/p.name).read_text().strip()]
assert changed==['common.tsx'], changed
before=(source_before/'common.tsx').read_text().split('export const RuralScene=')[0]
after=(root/'src/common.tsx').read_text().split('export const RuralScene=')[0]
assert before==after, 'A shared map helper changed; cannot reuse map chunks'
reports=[];paths=[]
for i in range(4):
 if i==2:
  report=validate(new,300,digest=True)
  target=revision/'chunk-20-30.mp4';new.replace(target)
  report['path']=str(target)
 else:
  target=cache/f'chunk-{i:05d}.mp4'
  report=json.loads(target.with_suffix('.ok.json').read_text())
  assert report['sha256']==sha256(target),'Old checkpoint hash mismatch'
 reports.append(report);paths.append(target)
signature=lambda r:tuple(r.get(k) for k in ('codec','profile','pixelFormat','width','height','fps','timeBase'))
assert len({signature(r) for r in reports})==1,'Chunk encoding parameters differ'
concat=revision/'concat.txt'
concat.write_text(''.join(f"file '{p}'\n" for p in paths))
output=root/'out/hokkaido-preview-forward-v2-40s-1080p30.mp4'
subprocess.run(['ffmpeg','-v','error','-y','-f','concat','-safe','0','-i',str(concat),'-i',str(root/'out/hokkaido-preview-40s-1080p30.mp4'),'-map','0:v:0','-map','1:a:0','-c','copy','-movflags','+faststart',str(output)],check=True)
final=validate(output,1200,audio=True,digest=True)
write_json(revision/'validation-1080p.json',final)
write_json(revision/'revision.json',{'changedComponent':'RuralScene','motion':'constant gentle 3% forward push over 8 seconds, anchored toward road vanishing point; no shake, no oscillation, no abrupt changes','rerenderedAbsoluteFrames':[600,900],'reusedVerifiedChunks':[0,1,3],'chunks':reports,'video':final})
print('Full updated preview verified:',final['bytes'],final['sha256'])
