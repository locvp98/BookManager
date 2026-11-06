import React from 'react';
import {AbsoluteFill,interpolate,staticFile,useVideoConfig,useCurrentFrame} from 'remotion';
import {Audio} from '@remotion/media';
import {TransitionSeries,linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {CreatureScene,OceanScene,CinemaScene} from './PhotoScenes';
import {SagamiMap} from './SagamiMap';
export const Preview=()=>{
 const {fps}=useVideoConfig();
 return <AbsoluteFill style={{background:'#07121d'}}>
  <TransitionSeries>
   <TransitionSeries.Sequence name="Fictional creature emerging" durationInFrames={261} premountFor={fps}><CreatureScene/></TransitionSeries.Sequence>
   <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:12})}/>
   <TransitionSeries.Sequence name="The ordinary sea" durationInFrames={147} premountFor={fps}><OceanScene/></TransitionSeries.Sequence>
   <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:12})}/>
   <TransitionSeries.Sequence name="Cinema and imagination" durationInFrames={234} premountFor={fps}><CinemaScene/></TransitionSeries.Sequence>
   <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:12})}/>
   <TransitionSeries.Sequence name="Sagami and Tokyo bays" durationInFrames={594} premountFor={fps}><SagamiMap/></TransitionSeries.Sequence>
  </TransitionSeries>
  <Audio src={staticFile('narration.mp3')} trimAfter={40*fps} premountFor={fps} volume={(f)=>interpolate(f,[0,39.8*fps,40*fps],[1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}/>
 </AbsoluteFill>;
};
