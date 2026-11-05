import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {islands} from './geo';
export const GOLD='#f4bd70', WHITE='#f5f3e9', AQUA='#73d1cb';
export const FONT='"Noto Sans CJK JP", sans-serif';
export const ease=Easing.bezier(.35,0,.25,1);
export const progress=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
const C=Math.cos(43*Math.PI/180);
export const path=(pts:number[][])=>pts.map(([x,y],i)=>`${i?'L':'M'}${(x*C).toFixed(5)},${(-y).toFixed(5)}`).join('')+'Z';
export const project=(lon:number,lat:number,cx:number,cy:number,s:number)=>[960+(lon-cx)*C*s,540-(lat-cy)*s];
export const paths=Object.fromEntries(Object.entries(islands).map(([k,p])=>[k,path(p)]));
export const Label:React.FC<{x:number;y:number;children:React.ReactNode;small?:boolean;opacity?:number;color?:string}> = ({x,y,children,small=false,opacity=1,color=WHITE})=><div style={{position:'absolute',zIndex:2,left:x,top:y,color,fontFamily:FONT,fontSize:small?28:42,fontWeight:700,letterSpacing:2,textShadow:'0 2px 10px #00101c',opacity,whiteSpace:'nowrap'}}>{children}</div>;
export const MapCanvas:React.FC<{cx:number;cy:number;s:number;night?:boolean;children?:React.ReactNode}> = ({cx,cy,s,night=false,children})=><svg width={1920} height={1080} style={{position:'absolute',inset:0,background:'#061825'}}>
 <g transform={`translate(960 540) scale(${s}) translate(${-cx*C} ${cy})`}>
  <image href={staticFile('maps/world-day.jpg')} x={-180*C} y={-90} width={360*C} height={180} preserveAspectRatio="none" opacity={night?.07:1}/>
  <image href={staticFile(`maps/japan-${night?'night':'day'}.jpg`)} x={126*C} y={-47} width={23*C} height={18} preserveAspectRatio="none"/>
  <image href={staticFile(`maps/hokkaido-${night?'night':'day'}.jpg`)} x={138*C} y={-46} width={9*C} height={6} preserveAspectRatio="none"/>
  {children}
 </g>
</svg>;
export const Outline:React.FC<{opacity?:number;fill?:string;reveal?:number;color?:string}> = ({opacity=1,fill='none',reveal=1,color=GOLD})=><path d={paths.hokkaido} fill={fill} fillOpacity={.26*opacity} stroke={color} strokeWidth={2.5} vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray={1} strokeDashoffset={1-reveal} opacity={opacity}/>;
export const Dissolve:React.FC<{children:React.ReactNode;frames?:number}>=({children,frames=12})=>{const f=useCurrentFrame();return <AbsoluteFill style={{opacity:progress(f,0,frames)}}>{children}</AbsoluteFill>};
export const RuralScene=()=>{const f=useCurrentFrame();const {durationInFrames}=useVideoConfig();return <AbsoluteFill style={{overflow:'hidden',background:'#18342d'}}><Img src={staticFile('scenes/hokkaido-rural.png')} style={{width:'100%',height:'100%',objectFit:'cover',transformOrigin:'73% 28%',scale:interpolate(f,[0,durationInFrames-1],[1,1.12],{easing:Easing.linear,extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}/></AbsoluteFill>};
