import React from 'react';
import {AbsoluteFill,CanvasImage,staticFile,useCurrentFrame,interpolate} from 'remotion';
export const PhotoScene=({asset,duration}:{asset:string;duration:number})=>{const f=useCurrentFrame();return <AbsoluteFill style={{overflow:'hidden',backgroundColor:'#17251e'}}><CanvasImage src={staticFile('scenes/'+asset+'.png')} style={{width:'100%',height:'100%',objectFit:'cover',scale:interpolate(f,[0,duration-1],[1,1.2],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}/></AbsoluteFill>};
