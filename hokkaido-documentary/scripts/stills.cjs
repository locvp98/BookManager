const {bundle}=require('@remotion/bundler');
const {openBrowser,selectComposition,renderStill}=require('@remotion/renderer');
const path=require('path');
const fs=require('fs');
(async()=>{
 const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts')});
 const browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/chromium',chromiumOptions:{gl:'swangle'}});
 const composition=await selectComposition({serveUrl,id:'HokkaidoPreview40',puppeteerInstance:browser});
 fs.mkdirSync('out/stills',{recursive:true});
 for(const frame of [80,280,420,570,740,930,1080,1180]){
  await renderStill({serveUrl,composition,puppeteerInstance:browser,frame,output:`out/stills/frame-${frame}.jpg`,imageFormat:'jpeg',jpegQuality:90});
  console.log('Still',frame);
 }
 await browser.close({silent:true});
})().catch(e=>{console.error(e);process.exit(1)});
