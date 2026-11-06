import React from 'react';
import {AbsoluteFill,CanvasImage,staticFile,useCurrentFrame,useVideoConfig,interpolate} from 'remotion';
import regional from '../public/maps/hiroshima-regional.json';
import island from '../public/maps/miyajima-detail.json';
import dome from '../public/maps/dome-detail.json';
const FONT='"Noto Sans CJK JP",sans-serif';
const ease=(t:number)=>{const p=Math.max(0,Math.min(1,t));return p*p*(3-2*p)};
const world=(lon:number,lat:number,z:number)=>[(lon+180)/360*256*2**z,(1-Math.asinh(Math.tan(lat*Math.PI/180))/Math.PI)/2*256*2**z];
type Meta={zoom:number;tileOrigin:number[];width:number;height:number};
function Raster({meta,name,center,span,box,opacity=1}:{meta:Meta;name:string;center:[number,number];span:number;box:[number,number,number,number];opacity?:number}){
 const [x,y,w,h]=box,[cx,cy]=world(center[0],center[1],meta.zoom),s=w/(span/360*256*2**meta.zoom);
 return <div style={{position:'absolute',left:x,top:y,width:w,height:h,overflow:'hidden',opacity}}><CanvasImage src={staticFile('maps/'+name+'.jpg')} style={{position:'absolute',left:w/2-(cx-meta.tileOrigin[0]*256)*s,top:h/2-(cy-meta.tileOrigin[1]*256)*s,width:meta.width*s,height:meta.height*s,maxWidth:'none'}}/></div>;
}
export const LandmarkMap=()=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig();const p1=ease((frame/fps-.25)/.85),p2=ease((frame/fps-1.2)/.85),a=ease((frame/fps-1.5)/1.0),b=ease((frame/fps-2.5)/1.0);
 const point=(lo:number,la:number)=>{const c=world(132.39,34.345,regional.zoom),q=world(lo,la,regional.zoom),s=1920/(.38/360*256*2**regional.zoom);return [960+(q[0]-c[0])*s,540+(q[1]-c[1])*s]};
 const mi=point(132.3198,34.2959),do_=point(132.4536,34.3955);
 return <AbsoluteFill style={{backgroundColor:'#0e2027',fontFamily:FONT}}>
  <Raster meta={regional} name='hiroshima-regional' center={[132.39,34.345]} span={.38} box={[0,0,1920,1080]}/>
  <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(5,18,22,.12) 0%,transparent 68%,rgba(5,18,22,.9) 72%)'}}/>
  <svg width={1920} height={1080} style={{position:'absolute',inset:0}}>
   <defs><filter id='halo'><feGaussianBlur stdDeviation='4'/></filter></defs>
   <g opacity={p1}><circle cx={mi[0]} cy={mi[1]} r={26} fill='#f3be72' opacity={.25}/><circle cx={mi[0]} cy={mi[1]} r={8} fill='#ffd39b' stroke='white' strokeWidth={2}/><path d={`M${mi[0]},${mi[1]} L${mi[0]-100},${mi[1]-65} H${mi[0]-225}`} fill='none' stroke='#ffd39b' strokeWidth={2}/><text x={mi[0]-240} y={mi[1]-53} textAnchor='end' fill='white' fontSize={43} fontWeight={700} stroke='#18302a' strokeWidth={6} paintOrder='stroke'>宮島</text></g>
   <g opacity={p2}><circle cx={do_[0]} cy={do_[1]} r={25} fill='#d8f0e5' opacity={.25}/><circle cx={do_[0]} cy={do_[1]} r={8} fill='#e3f1e7' stroke='white' strokeWidth={2}/><path d={`M${do_[0]},${do_[1]} L${do_[0]-85},${do_[1]-65} H${do_[0]-275}`} fill='none' stroke='#e3f1e7' strokeWidth={2}/><text x={do_[0]-290} y={do_[1]-53} textAnchor='end' fill='white' fontSize={43} fontWeight={700} stroke='#18302a' strokeWidth={6} paintOrder='stroke'>原爆ドーム</text></g>
   <path d={`M${mi[0]+30},${mi[1]} Q1050,780 1400,325`} stroke='#e9bb7a' strokeWidth={2} strokeDasharray='5 8' opacity={a*.8} fill='none'/>
   <path d={`M${do_[0]+25},${do_[1]+15} Q1360,350 1400,700`} stroke='#d4e7dd' strokeWidth={2} strokeDasharray='5 8' opacity={b*.7} fill='none'/>
  </svg>
  <div style={{position:'absolute',left:75,top:65,color:'#fff0d9',fontSize:48,fontWeight:700,opacity:ease(frame/20),textShadow:'0 2px 6px #17332a'}}>広島</div>
  <div style={{position:'absolute',left:1410,top:145,color:'#f1c583',fontSize:34,fontWeight:700,opacity:a}}>宮島</div>
  <Raster meta={island} name='miyajima-detail' center={[132.3198,34.2959]} span={.009} box={[1410,205,430,275]} opacity={a}/>
  <div style={{position:'absolute',left:1410,top:570,color:'#e0eee4',fontSize:34,fontWeight:700,opacity:b}}>原爆ドーム</div>
  <Raster meta={dome} name='dome-detail' center={[132.4536,34.3955]} span={.007} box={[1410,630,430,275]} opacity={b}/>
  <div style={{position:'absolute',left:74,bottom:28,fontSize:17,color:'#e8eee7',textShadow:'0 1px 4px #071b22'}}>地図: 国土地理院 / 衛星画像: Esri, Maxarほか</div>
 </AbsoluteFill>;
};
