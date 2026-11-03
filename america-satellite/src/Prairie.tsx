import React from 'react';
import {AbsoluteFill,CanvasImage,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Grade} from './Grade';
export const Prairie=()=>{const f=useCurrentFrame();const {durationInFrames}=useVideoConfig();return <AbsoluteFill style={{background:'#0b1018',overflow:'hidden',opacity:interpolate(f,[0,12],[0,1],{extrapolateRight:'clamp'})}}>
 <CanvasImage src={staticFile('prairie.png')} style={{width:'100%',height:'100%',objectFit:'cover',scale:interpolate(f,[0,durationInFrames-1],[1.02,1.12]),translate:interpolate(f,[0,durationInFrames-1],['0px 12px','0px -10px']),filter:'saturate(.7) brightness(.78)'}}/><Grade/>
 </AbsoluteFill>;};
