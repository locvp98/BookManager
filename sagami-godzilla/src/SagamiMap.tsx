import React from 'react';
import {AbsoluteFill,CanvasImage,Easing,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import meta from '../public/maps/kanto-satellite.json';
const smooth=Easing.bezier(.32,0,.18,1);
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const world=(lon:number,lat:number)=>[(lon+180)/360*524288,(1-Math.asinh(Math.tan(lat*Math.PI/180))/Math.PI)/2*524288];
const font='"Noto Sans CJK JP",sans-serif';
export const SagamiMap=()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const t=frame/fps;
 const travel=interpolate(t,[1.5,7.8],[0,1],{...clamp,easing:smooth});
 const lon=139.45-.02*travel,lat=35.32+.06*travel,span=3.15-1.49*travel;
 const w=span/360*524288,scale=1920/w,c=world(lon,lat);
 const at=(x:number,y:number)=>{const p=world(x,y);return [960+(p[0]-c[0])*scale,540+(p[1]-c[1])*scale]};
 const fade=(a:number,b=a+.8)=>interpolate(t,[a,b],[0,1],clamp);
 const marker=(x:number,y:number,dx:number,dy:number,text:string,color:string,alpha:number,size=42)=>{
  const p=at(x,y);return <g opacity={alpha}><circle cx={p[0]} cy={p[1]} r={9} fill={color} stroke="#f4fcff" strokeWidth={2}/><path d={`M${p[0]},${p[1]} L${p[0]+dx*.65},${p[1]+dy} L${p[0]+dx},${p[1]+dy}`} fill="none" stroke={color} strokeWidth={2}/><text x={p[0]+dx+(dx<0?-12:12)} y={p[1]+dy+size*.34} textAnchor={dx<0?'end':'start'} fill="#f4f8f6" fontSize={size} fontWeight={700} stroke="#091725" strokeWidth={8} paintOrder="stroke" strokeLinejoin="round">{text}</text></g>;
 };
 const sagami=at(139.32,35.16),tokyo=at(139.83,35.43);
 const a=at(139.77,35.25),b=at(139.34,35.25);const arrow=fade(11.55,13.25);
 const points=[[139.63,35.32],[139.61,35.26],[139.62,35.20],[139.63,35.17],[139.65,35.14],[139.68,35.14],[139.70,35.16]];
 const p=points.map(([x,y])=>at(x,y));
 const distance=20000/(Math.cos(lat*Math.PI/180)*40075016.686)*524288*scale;
 return <AbsoluteFill style={{background:'#071827',overflow:'hidden'}}>
  <CanvasImage src={staticFile('maps/kanto-satellite.jpg')} premountFor={fps} style={{position:'absolute',left:960+(meta.tileOrigin[0]*256-c[0])*scale,top:540+(meta.tileOrigin[1]*256-c[1])*scale,width:meta.width*scale,height:meta.height*scale}}/>
  <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,fontFamily:font}}>
   <defs>
    <radialGradient id="bay"><stop stopColor="#ffc676" stopOpacity=".23"/><stop offset="1" stopColor="#ffc676" stopOpacity="0"/></radialGradient>
    <marker id="arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L8,4.5 L0,9" fill="none" stroke="#e2f6ff" strokeWidth="1.5"/></marker>
    <linearGradient id="foot" x2="0" y2="1"><stop stopColor="#071320" stopOpacity="0"/><stop offset="1" stopColor="#071320" stopOpacity=".8"/></linearGradient>
   </defs>
   <ellipse cx={sagami[0]} cy={sagami[1]} rx={.24/360*524288*scale} ry={.13/360*524288*scale/Math.cos(35.16*Math.PI/180)} fill="url(#bay)" opacity={fade(5.0,6.2)}/>
   <ellipse cx={tokyo[0]} cy={tokyo[1]} rx={.095/360*524288*scale} ry={.14/360*524288*scale/Math.cos(35.43*Math.PI/180)} fill="#75d0ed" fillOpacity={.15*fade(11.35,12.4)}/>
   <path d={`M${a[0]},${a[1]} Q${(a[0]+b[0])/2},${a[1]+100} ${b[0]},${b[1]}`} fill="none" stroke="#e2f6ff" strokeWidth="3" strokeDasharray="8 7" pathLength="1" opacity={arrow} markerEnd="url(#arrow)"/>
   {marker(139.70,35.68,-60,40,'東京','#eaf4f4',fade(.7,1.7),34)}
   {marker(139.32,35.16,-85,70,'相模湾','#ffc676',fade(5.05,6.0),56)}
   {marker(139.83,35.43,120,-25,'東京湾','#9ae2fb',fade(11.4,12.1),42)}
   {marker(139.35,35.46,-125,-60,'神奈川県','#d5e5cf',fade(14.65,15.5),40)}
   <path d={p.map((q,i)=>(i?'L':'M')+q.join(',')).join(' ')} fill="none" stroke="#ffc676" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1" strokeDashoffset={1-fade(17.7,19.0)} pathLength={1} opacity={fade(17.7,18.05)}/>
   {marker(139.65,35.21,115,70,'三浦半島','#ffc676',fade(18.0,19.0),40)}
   <rect x="0" y="940" width="1920" height="140" fill="url(#foot)"/>
   <g transform="translate(70 1005)" opacity=".85"><path d={`M0,-8 V0 H${distance} V-8`} fill="none" stroke="#e2edf2" strokeWidth="2"/><text y="30" fill="#e2edf2" fontSize="22">20 km</text></g>
   <text x="1848" y="1032" textAnchor="end" fontSize="16" fill="#d1e2ea">Sources: Esri, Maxar, Earthstar Geographics, GIS User Community</text>
  </svg>
 </AbsoluteFill>;
};
