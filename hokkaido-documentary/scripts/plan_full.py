from pathlib import Path
import json,math
root=Path(__file__).resolve().parents[1]
cues=json.loads((root/'production/cues.json').read_text())
scenes=[];assets=[];seen=[];image_count=0;map_count=0
for line in (root/'production/full/shots.txt').read_text().splitlines():
 if not line.strip():continue
 span,kind,design=line.split('|',2);ab=list(map(int,span.split('-')));a,b=ab[0],ab[-1]
 ids=list(range(a,b+1));seen+=ids
 if kind=='image':image_count+=1;sid=f'image-{image_count:03d}'
 else:map_count+=1;sid=f'map-{map_count:03d}'
 start=round(cues[a-1]['start']*30);end=round(cues[b]['start']*30) if b<len(cues) else math.ceil(1325.217959*30)
 scene={'id':sid,'type':kind,'srtCueIds':ids,'startFrame':start,'endFrame':end,'narration':' '.join(cues[i-1]['text'] for i in ids),'design':design,'status':'planned','reusedAsset':False}
 if kind=='image':
  prompt='Create ONE new full-bleed 16:9 cinematic documentary illustration. '+design+' Professional natural lighting and realistic scale. No text, no subtitles, no labels, no numbers, no watermark, no logos, no decorative corner frame. Do not make a collage or contact sheet. Detailed sharp scene suitable for a smooth 100% to 112% camera push. Synthetic illustration, not an archival photograph.'
  scene['asset']=f'public/full/scenes/{sid}.png';scene['motion']={'startScale':1,'endScale':1.12,'easing':'linear','shake':False};assets.append({'id':sid,'cueIds':ids,'prompt':prompt,'path':scene['asset'],'status':'pending'})
 else:scene['dataStatus']='sources and shot-specific geographic layers must be verified before construction'
 scenes.append(scene)
assert seen==list(range(1,244)), 'Missing or repeated cue assignment'
assert all(x['endFrame']==y['startFrame'] for x,y in zip(scenes,scenes[1:])), 'Coverage gap'
out=root/'production/full';(out/'assets').mkdir(exist_ok=True)
(out/'storyboard.json').write_text(json.dumps({'fps':30,'frames':39757,'illustrationScenes':image_count,'mapScenes':map_count,'scenes':scenes},ensure_ascii=False,indent=2))
(out/'image-prompts.json').write_text(json.dumps(assets,ensure_ascii=False,indent=2))
print(f'{len(scenes)} scenes: {image_count} new illustrations + {map_count} maps, complete 39757-frame coverage; assets pending, not generated yet.')
