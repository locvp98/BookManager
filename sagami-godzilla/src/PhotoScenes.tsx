import React from 'react';
import {AbsoluteFill,CanvasImage,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
type Props={asset:string;frames:number;focus:string};
export const Photo=({asset,frames,focus}:Props)=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill style={{overflow:'hidden',background:'#07121d'}}><CanvasImage src={staticFile(asset)} premountFor={fps} style={{width:'100%',height:'100%',objectFit:'cover',transformOrigin:focus,scale:interpolate(frame,[0,frames-1],[1,1.2],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}/></AbsoluteFill>;
};
export const CreatureScene=()=> <Photo asset="scenes/image-001.png" frames={261} focus="42% 48%"/>;
export const OceanScene=()=> <Photo asset="scenes/image-002.png" frames={147} focus="55% 48%"/>;
export const CinemaScene=()=> <Photo asset="scenes/image-003.png" frames={234} focus="50% 42%"/>;
