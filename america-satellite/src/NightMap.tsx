import React from 'react';
import {AbsoluteFill,CanvasImage,Easing,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Grade} from './Grade';
type MapProps={shot:'east'|'west'|'reveal'|'scan'|'scale'};
const x=(lon:number)=>(lon+130)/70*1920,y=(lat:number)=>(55-lat)/36*1080;
const band=[[-106,49],[-100,49],[-99.4,42],[-99.8,35],[-100.5,29],[-104.3,29],[-106,39]];
const bandPath=band.map(([lon,lat],i)=>`${i?'L':'M'}${x(lon)},${y(lat)}`).join(' ')+' Z';
export const NightMap=({shot}:MapProps)=>{
 const f=useCurrentFrame();const {durationInFrames}=useVideoConfig();
 const t=interpolate(f,[0,durationInFrames-1],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.3,0,.3,1)});
 const v={east:[-84,37,1.75,-81,39,1.5],west:[-119,35,1.85,-120,40,1.65],reveal:[-103,38,1.12,-102,39,1.48],scan:[-103,45,1.7,-102,32,1.7],scale:[-103,38,1.85,-101,39,1.13]}[shot];
 const lon=v[0]+(v[3]-v[0])*t,lat=v[1]+(v[4]-v[1])*t,s=v[2]+(v[5]-v[2])*t;
 const highlight=shot==='reveal'||shot==='scan'||shot==='scale';
 return <AbsoluteFill style={{background:'#020812',overflow:'hidden',opacity:interpolate(f,[0,12],[0,1],{extrapolateRight:'clamp'})}}>
 <div style={{position:'absolute',width:1920,height:1080,transformOrigin:'0 0',transform:`translate(960px,540px) scale(${s}) translate(${-x(lon)}px,${-y(lat)}px)`}}>
 <CanvasImage src={staticFile('america-night.png')} style={{position:'absolute',left:-50/70*1920+341/4096*(360/70*1920),top:-35/36*1080+284/2048*(180/36*1080),width:1252/4096*(360/70*1920),height:626/2048*(180/36*1080),maxWidth:'none',filter:'brightness(1.38) contrast(1.13) saturate(.82)'}}/>
 {highlight&&<svg width={1920} height={1080} style={{position:'absolute',overflow:'visible'}}>
 <defs><linearGradient id="bandFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#94c5df" stopOpacity=".1"/><stop offset="1" stopColor="#94c5df" stopOpacity=".025"/></linearGradient></defs>
 <path d={bandPath} fill="url(#bandFill)" stroke="#9cc3d5" strokeWidth={1.4/s} strokeOpacity={.65} strokeDasharray="5 9" opacity={interpolate(f,[0,25],[0,1],{extrapolateRight:'clamp'})}/>
 {shot==='scan'&&<path d={`M${x(-106)},${y(49-20*t)} L${x(-99.5)},${y(49-20*t)}`} fill="none" stroke="#c5dfeb" strokeWidth={2/s} opacity=".65"/>}
 </svg>}
 </div><Grade/></AbsoluteFill>;
};
