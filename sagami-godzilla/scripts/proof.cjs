const {bundle}=require('@remotion/bundler');
const {selectComposition,renderStill}=require('@remotion/renderer');
const path=require('path');
(async()=>{
 const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts')});
 const opts={serveUrl,browserExecutable:'/usr/bin/chromium',chromiumOptions:{gl:'swangle'}};
 const composition=await selectComposition({...opts,id:'SagamiPreview40'});
 for(const frame of [90,315,480,670,800,1000,1170]){
  await renderStill({...opts,composition,frame,output:`out/proof-${frame}.png`});console.log('PROOF',frame);
 }
})().catch(e=>{console.error(e);process.exit(1)});
