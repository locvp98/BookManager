import React from 'react';
import {AbsoluteFill, CanvasImage, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export type MapMode = 'east'|'west'|'gap'|'scan'|'ribbon'|'scale';
const world=32768;
export const point=(lon:number,lat:number):[number,number]=>[(lon+180)/360*world-4551,(1-Math.asinh(Math.tan(lat*Math.PI/180))/Math.PI)/2*world-10203];
const path=(coords:number[][])=>coords.map(([lon,lat],i)=>`${i?'L':'M'}${point(lon,lat).join(',')}`).join(' ');
// Editorial locator only: approximate western Great Plains, not a statistical boundary.
const belt=path([[-106,49],[-101.5,49],[-100,44],[-99.5,38],[-100,32],[-101,29],[-104,30],[-105.5,39]])+' Z';
const cities:[number,number][]=[[-74,40.71],[-87.63,41.88],[-77.04,38.9],[-71.06,42.36],[-84.39,33.75]];
const pacific:[number,number][]=[[-122.33,47.6],[-122.68,45.52],[-122.42,37.77],[-118.24,34.05],[-117.16,32.72]];
const smooth={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const,easing:Easing.bezier(.3,.05,.25,1)};

export const MapView=({lon,lat,span,children}:{lon:number;lat:number;span:number;children?:React.ReactNode})=>{
 const [cx,cy]=point(lon,lat);const scale=1920/span;
 return <AbsoluteFill style={{overflow:'hidden',background:'#020611'}}>
  <div style={{position:'absolute',width:6371,height:4514,transformOrigin:'0 0',transform:`translate(960px,540px) scale(${scale}) translate(${-cx}px,${-cy}px)`}}>
   <Img src={staticFile('v2/usa-night-6371.jpg')} width={6371} height={4514} style={{position:'absolute',width:6371,height:4514,maxWidth:'none',filter:'brightness(1.12) saturate(.82) contrast(1.04)'}}/>
   <svg width={6371} height={4514} style={{position:'absolute',overflow:'visible'}}>{children}</svg>
  </div>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 50%,transparent 45%,rgba(0,4,12,.48))',pointerEvents:'none'}}/>
 </AbsoluteFill>;
};

export const SharpMap=({mode}:{mode:MapMode})=>{
 const f=useCurrentFrame();const {durationInFrames}=useVideoConfig();
 const t=interpolate(f,[0,durationInFrames-1],[0,1],smooth);
 const v:Record<MapMode,number[]>={east:[-87,38,3300,-79.5,39.3,2550],west:[-121.4,41,3100,-119,36.8,2350],gap:[-100,39,5850,-102,39,3800],scan:[-103.2,47,3100,-102,32.5,3100],ribbon:[-102,39.5,4550,-102,39.5,5100],scale:[-102,39,4100,-98,38.5,6500]};
 const a=v[mode];const lon=a[0]+(a[3]-a[0])*t,lat=a[1]+(a[4]-a[1])*t,span=a[2]+(a[5]-a[2])*t;
 const displayBelt=['gap','scan','ribbon','scale'].includes(mode);
 const scanLat=49-20*t; const [sx,sy]=point(-103,scanLat);
 const locators=mode==='east'?cities:mode==='west'?pacific:[];
 return <MapView lon={lon} lat={lat} span={span}>
  <defs>
   <linearGradient id={`belt-${mode}`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#8bc9e9" stopOpacity=".025"/><stop offset=".5" stopColor="#8bc9e9" stopOpacity=".16"/><stop offset="1" stopColor="#8bc9e9" stopOpacity=".02"/></linearGradient>
   <clipPath id={`reveal-${mode}`}><rect x={0} y={point(-103,50)[1]} width={6371} height={Math.max(0,point(-103,28)[1]-point(-103,50)[1])*interpolate(f,[0,durationInFrames*.8],[0,1],smooth)}/></clipPath>
  </defs>
  {locators.map(([lo,la],i)=>{const [x,y]=point(lo,la);const p=interpolate(f,[i*9,i*9+35],[0,1],smooth);return <g key={lo} opacity={p}><circle cx={x} cy={y} r={16+30*p} fill="none" stroke="#ffe3a2" strokeWidth={2.2} opacity={.6}/><circle cx={x} cy={y} r={5} fill="#fff5ce"/></g>;})}
  {mode==='west'&&<path d={path(pacific)} stroke="#ffde9a" strokeWidth={4} fill="none" pathLength={1} strokeDasharray="1" strokeDashoffset={1-interpolate(f,[10,durationInFrames*.85],[0,1],smooth)} opacity={.68}/>}
  {displayBelt&&<g opacity={interpolate(f,[5,35],[0,1],smooth)} clipPath={mode==='ribbon'?`url(#reveal-${mode})`:undefined}>
   <path d={belt} fill={`url(#belt-${mode})`} stroke="#a2d4e9" strokeWidth={3} strokeOpacity={.7} strokeDasharray="14 19"/>
   {mode==='gap'&&<>
    <path d={path([[-120,38],[-107,38]])} fill="none" stroke="#f4dba8" strokeWidth={3} pathLength={1} strokeDasharray="1" strokeDashoffset={1-t}/>
    <path d={path([[-83,38],[-99.5,38]])} fill="none" stroke="#f4dba8" strokeWidth={3} pathLength={1} strokeDasharray="1" strokeDashoffset={1-t}/>
    <circle cx={point(-103,38)[0]} cy={point(-103,38)[1]} r={60+25*t} fill="none" stroke="#c1e8f8" strokeWidth={2} opacity={.7}/>
   </>}
  </g>}
  {mode==='scan'&&<g><line x1={sx-300} x2={sx+300} y1={sy} y2={sy} stroke="#b7e7ff" strokeWidth={5}/><circle cx={sx} cy={sy} r={24} stroke="#d7f2ff" strokeWidth={3} fill="#87bddd" fillOpacity={.18}/><path d={path([[-103,49],[-103,scanLat]])} stroke="#8cc8e8" strokeWidth={3} strokeDasharray="10 15" fill="none"/></g>}
  {mode==='scale'&&<g opacity={.5*t}><path d={path([[-106.3,49.5],[-107.5,49.5],[-107.5,29],[-105.5,29]])} stroke="#afd6e6" strokeWidth={3} fill="none"/>{[31,35,39,43,47].map(la=><line key={la} x1={point(-107.5,la)[0]} x2={point(-107,la)[0]} y1={point(-107.5,la)[1]} y2={point(-107.5,la)[1]} stroke="#afd6e6" strokeWidth={3}/>)}</g>}
 </MapView>;
};

export const CoastComparison=()=>{
 const f=useCurrentFrame();const {durationInFrames}=useVideoConfig();const t=interpolate(f,[0,durationInFrames-1],[0,1],smooth);
 return <AbsoluteFill style={{background:'#030812'}}>
  <div style={{position:'absolute',left:0,top:0,width:640,height:1080,overflow:'hidden'}}><div style={{position:'absolute',left:-640,width:1920,height:1080}}><MapView lon={-119.5} lat={37.7} span={2900-150*t}/></div></div>
  <div style={{position:'absolute',left:640,top:0,width:640,height:1080,overflow:'hidden'}}><div style={{position:'absolute',left:-640,width:1920,height:1080}}><MapView lon={-102} lat={38.5} span={2900-150*t}/></div></div>
  <div style={{position:'absolute',left:1280,top:0,width:640,height:1080,overflow:'hidden'}}><div style={{position:'absolute',left:-640,width:1920,height:1080}}><MapView lon={-81} lat={38.5} span={2900-150*t}/></div></div>
  <div style={{position:'absolute',left:638,width:2,height:'100%',background:'linear-gradient(transparent,#b8d2e077,transparent)'}}/>
  <div style={{position:'absolute',left:1278,width:2,height:'100%',background:'linear-gradient(transparent,#b8d2e077,transparent)'}}/>
  <div style={{position:'absolute',top:interpolate(f,[0,durationInFrames],[0,1080]),height:2,width:'100%',background:'linear-gradient(90deg,#ffe6aa99,#9ddaff99,#ffe6aa99)',boxShadow:'0 0 20px #b6d9f866'}}/>
 </AbsoluteFill>;
};

export const DensityComparison=()=>{
 const f=useCurrentFrame();const {durationInFrames}=useVideoConfig();const p=interpolate(f,[0,durationInFrames-1],[0,1],smooth);
 return <AbsoluteFill style={{background:'#030713'}}>
  <MapView lon={-98} lat={39} span={6100}/>
  <AbsoluteFill style={{background:'rgba(0,4,12,.35)'}}/>
  <div style={{position:'absolute',left:80,top:120,width:840,height:840,border:'2px solid #c7dbeb66',borderRadius:420,overflow:'hidden',boxShadow:'0 24px 90px #0009'}}><div style={{position:'absolute',width:1920,height:1080,left:-540,top:-120}}><MapView lon={-80} lat={39} span={2050-120*p}/></div></div>
  <div style={{position:'absolute',right:80,top:120,width:840,height:840,border:'2px solid #c7dbeb66',borderRadius:420,overflow:'hidden',boxShadow:'0 24px 90px #0009'}}><div style={{position:'absolute',width:1920,height:1080,left:-540,top:-120}}><MapView lon={-102.5} lat={39} span={2050-120*p}/></div></div>
 </AbsoluteFill>;
};
