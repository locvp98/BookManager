import React from 'react';
import {AbsoluteFill,useCurrentFrame,useVideoConfig} from 'remotion';
import {islands} from './geo';
import {FONT,GOLD,AQUA,WHITE,progress} from './common';
// Lambert azimuthal equal-area; all three islands share one km-to-pixel scale.
const laea=([lon,lat]:number[])=>{const r=Math.PI/180,l=(lon-140)*r,p=lat*r,p0=38*r,k=Math.sqrt(2/(1+Math.sin(p0)*Math.sin(p)+Math.cos(p0)*Math.cos(p)*Math.cos(l)));return [6371*k*Math.cos(p)*Math.sin(l),-6371*k*(Math.cos(p0)*Math.sin(p)-Math.sin(p0)*Math.cos(p)*Math.cos(l))]};
const shape=(pts:number[][])=>{const p=pts.map(laea),xs=p.map(v=>v[0]),ys=p.map(v=>v[1]),cx=(Math.min(...xs)+Math.max(...xs))/2,cy=(Math.min(...ys)+Math.max(...ys))/2;return p.map(([x,y],i)=>`${i?'L':'M'}${((x-cx)*1.28).toFixed(2)},${((y-cy)*1.28).toFixed(2)}`).join('')+'Z'};
export const ComparisonScene=()=>{const f=useCurrentFrame();const {fps}=useVideoConfig();const p=progress(f,0,1.2*fps);return <AbsoluteFill style={{background:'radial-gradient(ellipse at 48% 55%,#15343d,#06151f 78%)',fontFamily:FONT,color:WHITE}}>
 <div style={{position:'absolute',left:140,top:100,fontSize:30,letterSpacing:4,color:'#a7bec5'}}>同じ縮尺で比較</div>
 <svg width={1920} height={1080}>
 <defs><linearGradient id="goldFill" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#dab775"/><stop offset="1" stopColor="#806b3e"/></linearGradient><pattern id="lines" width={14} height={14} patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><line x1={0} y1={0} x2={0} y2={14} stroke={WHITE} strokeOpacity={.12} strokeWidth={1}/></pattern></defs>
 <line x1={940} y1={240} x2={940} y2={850} stroke="#c6d6d5" strokeOpacity={.16}/>
 <g transform={`translate(${550+40*(1-p)} 530)`} opacity={p}><path d={shape(islands.hokkaido)} fill="url(#goldFill)" stroke={GOLD} strokeWidth={3}/><path d={shape(islands.hokkaido)} fill="url(#lines)"/></g>
 <g transform={`translate(1230 ${590+22*(1-progress(f,.5*fps,1.6*fps))})`} opacity={progress(f,.5*fps,1.6*fps)}><path d={shape(islands.kyushu)} fill="#396f70" stroke={AQUA} strokeWidth={3}/></g>
 <g transform="translate(1570 430)" opacity={progress(f,1*fps,2*fps)}><path d={shape(islands.shikoku)} fill="#396f70" stroke={AQUA} strokeWidth={3}/></g>
 </svg>
 <div style={{position:'absolute',left:450,top:900,fontSize:48,color:GOLD,fontWeight:700,opacity:p}}>北海道</div>
 <div style={{position:'absolute',left:1180,top:900,fontSize:48,color:AQUA,fontWeight:700,opacity:progress(f,1*fps,2*fps)}}>九州 ＋ 四国</div>
 <div style={{position:'absolute',left:1460,top:570,fontSize:28,color:AQUA,opacity:progress(f,1*fps,2*fps)}}>四国</div>
 <div style={{position:'absolute',left:1200,top:792,fontSize:28,color:AQUA,opacity:progress(f,.5*fps,1.6*fps)}}>九州</div>
 </AbsoluteFill>};
