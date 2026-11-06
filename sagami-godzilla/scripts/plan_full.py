from pathlib import Path
import json,math,shutil
R=Path(__file__).resolve().parents[1]
if (R/'production/full/design-revisions.json').exists():
 raise SystemExit('Refusing to overwrite the revised, asset-reviewed storyboard. Edit the canonical storyboard explicitly; this script is initial planning only.')
cs=json.loads((R/'production/cues.json').read_text());by={c['id']:c for c in cs}
remove={22,73,89,109,128,139,149,177,220,236,254,265,271,335,347,359,370,428,447,451,457,481}
rows=[]
for line in (R/'production/full/shots.txt').read_text().splitlines():
 a=line.split('|');start=int(a[0]);typ=a[1]
 if start in remove:continue
 rows.append({'cueStart':start,'type':'image' if typ=='I' else 'map','design':a[2] if typ=='M' else None,'content':a[-1]})
scenes=[];counts={'image':0,'map':0};imgs=[]
base='Create one independently composed premium cinematic documentary still, full bleed widescreen 16:9, photorealistic detail and coherent physical forms, restrained natural color, balanced readable composition, plenty of edge margin for a smooth 100 to 120 percent forward camera move. No text, captions, labels, letters, title, watermark, logos, corner brackets, decorative frame, panels, collage or letterbox bars. This is an original illustrative reconstruction for a Japanese-language ocean documentary, not a copy of existing footage or a claim to historical photographic evidence. '
for i,row in enumerate(rows):
 typ=row['type'];counts[typ]+=1;sid=f"{typ}-{counts[typ]:03}"
 start=round(by[row['cueStart']]['start']*30)
 if i==0:start=0
 if i==1:start=249
 if i==2:start=384
 if i==3:start=606
 end=round(by[rows[i+1]['cueStart']]['start']*30) if i+1<len(rows) else math.ceil(1475.761633*30)
 if i==0:end=249
 if i==1:end=384
 if i==2:end=606
 cueEnd=rows[i+1]['cueStart']-1 if i+1<len(rows) else 501
 scene={'id':sid,**row,'startFrame':start,'endFrame':end,'srtCueIds':list(range(row['cueStart'],cueEnd+1)),'narration':'\n'.join(by[j]['text'] for j in range(row['cueStart'],cueEnd+1)),'newVisualInformation':row['content'],'status':'planned'}
 if typ=='image':
  scene.update(asset=f'public/full/scenes/{sid}.png',motion={'scaleStart':1,'scaleEnd':1.2,'curve':'linear','shake':False})
  prompt=base+row['content']+'. Respect the stated period and scientific context; no dramatic elements not specified.'
  item={'id':sid,'prompt':prompt,'content':row['content'],'status':'pending','startFrame':start,'endFrame':end}
  if counts[typ]<=3:
   shutil.copy2(R/f'public/scenes/{sid}.png',R/scene['asset']);item['status']='existing-current-film-preview-asset-once';scene['status']='asset-ready'
  imgs.append(item)
 else:
  scene['mapDesign']={'family':row['design'],'extent':'to be recorded with actual data','camera':'to be authored per scene','dataLayers':[],'explanationMechanism':row['content'],'similarSceneIds':[],'meaningfulDifferences':[]};scene['mapReview']={'status':'pending','proofFrames':[],'motionClip':None}
 scenes.append(scene)
assert all(a['endFrame']==b['startFrame'] for a,b in zip(scenes,scenes[1:]));assert scenes[-1]['endFrame']==44273
assert len(imgs)>=107
(R/'production/full/storyboard.json').write_text(json.dumps({'fps':30,'frames':44273,'duration':44273/30,'scenes':scenes},ensure_ascii=False,indent=2)+'\n')
(R/'production/full/image-prompts.json').write_text(json.dumps(imgs,ensure_ascii=False,indent=2)+'\n')
(R/'production/full/progress.json').write_text(json.dumps({'stage':'preproduction','plannedScenes':len(scenes),'plannedIllustrations':len(imgs),'plannedMaps':counts['map'],'currentFilmPreviewImages':3,'newFullImagesCreated':0,'mapsBuilt':0,'verifiedFullFrames':0,'totalFrames':44273,'finalVerified':False},indent=2)+'\n')
(R/'src/full/timeline.ts').write_text('export const timeline = '+json.dumps(scenes,ensure_ascii=False)+' as const;\n')
p=R/'production/editorial-notes.md';t=p.read_text().replace('Only first 40s requested and authorized for rendering at this stage.','Full production authorized after preview approval. Original narration remains master; suspected transcript/audio issues are being audited and will not be silently rewritten.');p.write_text(t)
print('FULL STORYBOARD',len(scenes),'scenes',counts,'frames44273',sum(s['endFrame']-s['startFrame'] for s in scenes))
