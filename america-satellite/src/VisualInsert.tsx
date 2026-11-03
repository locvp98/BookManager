import React from 'react';
import {AbsoluteFill,CanvasImage,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Grade} from './Grade';
type InsertProps={asset:string;focus:string;startScale:number;endScale:number;direction:number};
export const VisualInsert=({asset,focus,startScale,endScale,direction}:InsertProps)=>{
 const f=useCurrentFrame();const {durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{background:'#050a12',overflow:'hidden',opacity:interpolate(f,[0,12],[0,1],{extrapolateRight:'clamp'})}}>
  <CanvasImage src={staticFile(asset)} style={{width:'100%',height:'100%',objectFit:'cover',transformOrigin:focus,scale:interpolate(f,[0,durationInFrames-1],[startScale,endScale]),translate:interpolate(f,[0,durationInFrames-1],[`${-direction*12}px 5px`,`${direction*12}px -5px`]),filter:'saturate(.78) contrast(1.04) brightness(.94)'}}/>
  <Grade/>
 </AbsoluteFill>;
};
