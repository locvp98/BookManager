"""Join verified shots, add twelve-frame hold dissolves, and mux narration once."""
from pathlib import Path
import argparse,json,sys,subprocess,fcntl,concurrent.futures,time
root=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(root.parent/'.agents/skills/satellite-documentary/scripts'))
from video_check import validate,sha256,write_json
p=argparse.ArgumentParser();p.add_argument('--test-first',type=int);a=p.parse_args()
work=root/'out/full/assembly';work.mkdir(parents=True,exist_ok=True)
lock=(work/('test.lock' if a.test_first else 'full.lock')).open('a');fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
all_scenes=json.loads((root/'production/full/storyboard.json').read_text())['scenes']
scenes=all_scenes[:a.test_first] if a.test_first else all_scenes
total=sum(s['endFrame']-s['startFrame'] for s in scenes)
if not a.test_first:assert total==44273 and len(scenes)==154
clips=[];reports=[]
for s in scenes:
 folder=root/'out/full'/('image-clips' if s['type']=='image' else 'map-clips')
 clip=folder/(s['id']+'.mp4');marker=folder/(s['id']+'.ok.json')
 if not clip.exists() or not marker.exists():raise RuntimeError('Unverified or missing scene: '+s['id'])
 r=json.loads(marker.read_text());assert r['frames']==s['endFrame']-s['startFrame'];assert sha256(clip)==r['sha256'],s['id']+' hash mismatch'
 clips.append(clip);reports.append(r)
assert len({r['id'] for r in reports})==len(reports)
print('All source shots verified:',len(clips),'frames',total,flush=True)
last_dir=work/'last-frames';last_dir.mkdir(exist_ok=True)
def last_frame(i):
 clip,r=clips[i],reports[i];target=last_dir/(r['id']+'.png');marker=target.with_suffix('.json')
 if target.exists() and marker.exists() and json.loads(marker.read_text()).get('sourceSHA256')==r['sha256']:return target
 partial=target.with_name(target.stem+'.partial.png');seek=max(0,(r['frames']-1)/30-.0001)
 subprocess.run(['ffmpeg','-v','error','-y','-threads','1','-ss',f'{seek:.6f}','-i',str(clip),'-an','-frames:v','1','-fps_mode','passthrough',str(partial)],check=True)
 from PIL import Image
 with Image.open(partial) as im:assert im.size==(1920,1080)
 partial.replace(target);write_json(marker,{'sourceSHA256':r['sha256'],'sourceLastFrame':r['frames']-1});return target
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:holds=list(pool.map(last_frame,range(len(clips)-1)))
concat=work/('test-concat.txt' if a.test_first else 'concat.txt');concat.write_text(''.join("file '"+str(x).replace("'","'\\''")+"'\n" for x in clips))
filters=['[0:v]settb=1/30,setpts=N,format=yuv420p[v0]'];cmd=['ffmpeg','-hide_banner','-v','warning','-y','-threads','2','-f','concat','-safe','0','-i',str(concat)]
if a.test_first:
 next_input=1
else:
 cmd+=['-i',str(root/'public/narration.mp3')];next_input=2
for hold in holds:cmd+=['-threads','1','-i',str(hold)]
for i in range(1,len(clips)):
 start=scenes[i]['startFrame'];index=next_input+i-1
 filters.append(f'[{index}:v]loop=loop=11:size=1:start=0,settb=1/30,setpts=N+{start},format=rgba,fade=t=out:st={start/30:.9f}:d={12/30:.9f}:alpha=1[h{i}]')
 filters.append(f"[v{i-1}][h{i}]overlay=x=0:y=0:format=auto:eof_action=pass:repeatlast=0:enable='gte(t,{start/30:.9f})*lt(t,{(start+12)/30:.9f})'[v{i}]")
filter_file=work/('test.filter.txt' if a.test_first else 'full.filter.txt');filter_file.write_text(';\n'.join(filters))
output=root/'out'/('full-transition-test.mp4' if a.test_first else 'sagami-full-1080p30.mp4');partial=output.with_name(output.stem+'.partial.mp4')
progress=work/('test-progress.log' if a.test_first else 'progress.log')
cmd+=['-filter_complex_threads','1','-filter_complex_script',str(filter_file),'-map',f'[v{len(clips)-1}]']
cmd+=['-an'] if a.test_first else ['-map','1:a:0','-c:a','aac','-b:a','192k']
cmd+=['-c:v','libx264','-preset','fast','-crf','18','-threads','4','-pix_fmt','yuv420p','-color_range','tv','-r','30','-fps_mode','cfr','-movflags','+faststart','-stats_period','2','-progress',str(progress),str(partial)]
log=work/('test-encode.log' if a.test_first else 'encode.log');write_json(work/'assembly-plan.json',{'frames':total,'sourceScenes':[s['id'] for s in scenes],'dissolveFrames':12,'audio':'muted test' if a.test_first else 'original full narration encoded once','output':str(output),'stage':'encoding; not yet a verified final'})
with log.open('w') as stream:subprocess.run(cmd,stdout=stream,stderr=subprocess.STDOUT,check=True)
print('Encoded, starting full decode validation',flush=True)
report=validate(partial,total,audio=not a.test_first,digest=True);partial.replace(output);report['path']=str(output);report['sourceSceneCount']=len(scenes);report['dissolveFrames']=12
write_json(output.with_suffix('.validation.json'),report)
print('FINAL VERIFIED',output,report['bytes'],report['sha256'],flush=True)
