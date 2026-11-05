const fs=require('fs'),path=require('path'),React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const {Resvg}=require('@resvg/resvg-js');
const {spawn}=require('child_process');
const {once}=require('events');
const {MapSVG}=require('../out/native/full/MapSVG.js');
const root=path.resolve(__dirname,'..');
const scenes=JSON.parse(fs.readFileSync(path.join(root,'production/full/storyboard.json'))).scenes;
const threeD=new Set(['map-001','map-002','map-010','map-020','map-027','map-028']);
const textCache=new Map(),imageCache=new Map();
const font={loadSystemFonts:false,fontFiles:['/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc','/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc']};
function textToPaths(svg){return svg.replace(/<text\b([^>]*)>([\s\S]*?)<\/text>/g,(_,attributes,content)=>{
 const get=n=>attributes.match(new RegExp('(?:^|\\s)'+n+'="([^"]*)"'))?.[1];
 const x=Number(get('x')||0),y=Number(get('y')||0),opacity=get('opacity')||'1';
 const clean=attributes.replace(/\s(?:x|y|opacity)="[^"]*"/g,'');const key=clean+'>'+content;
 if(!textCache.has(key)){const converted=new Resvg(`<svg xmlns="http://www.w3.org/2000/svg" width="8000" height="700"><text x="2000" y="350" ${clean}>${content}</text></svg>`,{font}).toString();textCache.set(key,converted.replace(/^<svg[^>]*>/,'').replace(/<\/svg>\s*$/,''));}
 return `<g transform="translate(${x-2000} ${y-350})" opacity="${opacity}">${textCache.get(key)}</g>`;
 });}
const rasterCache=new Map(),rawBackgrounds=new Map();
function resolve(r){for(const href of r.imagesToResolve()){if(!imageCache.has(href)){const file=path.join(root,'public',href.replace('https://offline.local/',''));imageCache.set(href,fs.readFileSync(file));}r.resolveImage(href,imageCache.get(href));}return r;}
function cacheRasters(svg){return svg.replace(/<g data-raster-cache="[^"]*"[^>]*>[\s\S]*?<\/g>/g,group=>{if(!rasterCache.has(group)){const r=resolve(new Resvg(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><rect width="1920" height="1080" fill="#071a28"/>${group}</svg>`,{font:{loadSystemFonts:false}}));const href='https://cache.local/'+rasterCache.size+'.png';const rendered=r.render();imageCache.set(href,rendered.asPng());rawBackgrounds.set(href,Buffer.from(rendered.pixels));rasterCache.set(group,href);}return `<image href="${rasterCache.get(group)}" width="1920" height="1080"/>`;});}
function svgFor(scene,frame){return textToPaths(cacheRasters(renderToStaticMarkup(React.createElement(MapSVG,{id:scene.id,frame,duration:scene.endFrame-scene.startFrame,asset:n=>'https://offline.local/'+n}))));}
function draw(scene,frame){return resolve(new Resvg(svgFor(scene,frame),{font:{loadSystemFonts:false},imageRendering:0})).render();}
function pixelsForFrame(scene,frame){let svg=svgFor(scene,frame);const matches=[...svg.matchAll(/<image href="(https:\/\/cache.local\/[^"]+)" width="1920" height="1080"\/>/g)];if(matches.length!==1)return resolve(new Resvg(svg,{font:{loadSystemFonts:false},imageRendering:0})).render().pixels;
 const [node,href]=matches[0];svg=svg.replace(node,'').replace(/<rect width="1920" height="1080" fill="#071a28"(?:><\/rect>|\/>)/,'');
 // resvg exposes premultiplied RGBA. Composite explicitly over the cached opaque raster.
 const fg=resolve(new Resvg(svg,{font:{loadSystemFonts:false},imageRendering:0})).render().pixels,bg=rawBackgrounds.get(href),out=Buffer.from(bg);const fv=new Uint32Array(fg.buffer,fg.byteOffset,fg.length/4),ov=new Uint32Array(out.buffer,out.byteOffset,out.length/4);
 for(let i=0,j=0;i<fg.length;i+=4,j++){const a=fg[i+3];if(a===255){ov[j]=fv[j];}else if(a!==0){const remain=255-a;out[i]=Math.min(255,fg[i]+Math.round(bg[i]*remain/255));out[i+1]=Math.min(255,fg[i+1]+Math.round(bg[i+1]*remain/255));out[i+2]=Math.min(255,fg[i+2]+Math.round(bg[i+2]*remain/255));}}
 return out;
}
async function main(){
 const proof=process.argv.includes('--proof'),id=process.argv.find(s=>/^map-\d+$/.test(s));const list=scenes.filter(s=>s.type==='map'&&!threeD.has(s.id)&&(!id||s.id===id));
 if(proof){const dir=path.join(root,'out/full/map-proofs');fs.mkdirSync(dir,{recursive:true});for(const scene of list){const n=scene.endFrame-scene.startFrame;for(const fraction of [.1,.5,.9]){const f=Math.floor((n-1)*fraction);const target=path.join(dir,`${scene.id}-${fraction}.png`);if(!fs.existsSync(target))fs.writeFileSync(target,draw(scene,f).asPng());}console.log('PROOF',scene.id);}return;}
 if(!id||list.length!==1)throw Error('Specify one native map ID or --proof');
 const scene=list[0],n=scene.endFrame-scene.startFrame;const dir=path.join(root,'out/full/map-clips');fs.mkdirSync(dir,{recursive:true});const output=path.join(dir,id+'.partial.mp4');
 const log=fs.openSync(path.join(dir,id+'.encode.log'),'w');const ff=spawn('ffmpeg',['-v','error','-y','-f','rawvideo','-pixel_format','rgba','-video_size','1920x1080','-framerate','30','-i','pipe:0','-an','-c:v','libx264','-threads','1','-preset','medium','-crf','16','-pix_fmt','yuvj420p','-color_range','pc','-movflags','+faststart',output],{stdio:['pipe',log,log]});
 let error=null;ff.stdin.on('error',e=>error=e);const finish=once(ff,'close');
 for(let f=0;f<n;f++){if(error)throw error;const pixels=pixelsForFrame(scene,f);if(!ff.stdin.write(pixels))await once(ff.stdin,'drain');if(f%30===0)console.log('FRAME',id,f,n);}
 ff.stdin.end();const [code]=await finish;fs.closeSync(log);if(code!==0)throw Error('ffmpeg exited '+code);console.log('RENDERED',id,n,output);
}
module.exports={draw,pixelsForFrame,scenes,threeD};
if(require.main===module)main().catch(e=>{console.error(e);process.exit(1)});
