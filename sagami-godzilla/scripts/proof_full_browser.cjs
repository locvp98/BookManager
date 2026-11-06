const fs=require('fs'),path=require('path');
const {bundle}=require('@remotion/bundler');
const {selectComposition,renderStill}=require('@remotion/renderer');
(async()=>{
 const ids=new Set(['map-001','map-002','map-003','map-019','map-004','map-010','map-012','map-013','map-027','map-028','map-040']);
 const list=JSON.parse(fs.readFileSync('production/full/storyboard.json')).scenes.filter(s=>ids.has(s.id)&&(!process.argv[2]||s.id===process.argv[2]));
 const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts')});
 const common={serveUrl,browserExecutable:'/usr/bin/chromium',chromiumOptions:{gl:'swangle'}};
 fs.mkdirSync('out/full/map-proofs',{recursive:true});
 for(const s of list){const n=s.endFrame-s.startFrame;const inputProps={mapId:s.id,durationFrames:n};const composition=await selectComposition({...common,id:'FullMapProof',inputProps});
  for(const p of [.1,.5,.9]){const out=`out/full/map-proofs/${s.id}-${p}.png`;await renderStill({...common,composition,inputProps,frame:Math.floor((n-1)*p),output:out});}
  console.log('PROOF',s.id);
 }
})().catch(e=>{console.error(e);process.exit(1)});
