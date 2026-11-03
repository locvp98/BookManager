import React from 'react';
import {AbsoluteFill,CanvasImage,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';

type InsertProps={asset:string;focus:string;startScale:number;endScale:number;drift:number};
export const CinematicInsert=({asset,focus,startScale,endScale,drift}:InsertProps)=>{
 const frame=useCurrentFrame();const {durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{background:'#020610',overflow:'hidden'}}>
  <CanvasImage src={staticFile(asset)} style={{width:'100%',height:'100%',objectFit:'cover',transformOrigin:focus,scale:interpolate(frame,[0,durationInFrames-1],[startScale,endScale]),translate:interpolate(frame,[0,durationInFrames-1],[`${-drift}px 8px`,`${drift}px -8px`]),filter:'saturate(.75) contrast(1.08) brightness(.9)'}}/>
  <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(2,7,16,.18),transparent 35%,rgba(2,7,16,.22)),radial-gradient(ellipse at 50% 45%,transparent 40%,rgba(0,5,12,.32))'}}/>
 </AbsoluteFill>;
};
