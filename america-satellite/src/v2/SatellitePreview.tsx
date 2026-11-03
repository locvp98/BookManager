import React from 'react';
import {AbsoluteFill,interpolate,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {TransitionSeries,linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {Orbit} from '../Orbit';
import {CoastComparison,DensityComparison,SharpMap} from './SharpMap';
import {CinematicInsert} from './CinematicInsert';

// SRT is an editorial timing reference only. No text is rendered.
export const SatellitePreview=()=>{
 const {fps}=useVideoConfig();const f=useCurrentFrame();
 return <AbsoluteFill style={{background:'#020610'}}>
  <TransitionSeries>
   <TransitionSeries.Sequence name="01 · Earth at night" durationInFrames={Math.round(4.08*fps)} premountFor={fps}><Orbit/></TransitionSeries.Sequence>
   <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:8})}/>
   <TransitionSeries.Sequence name="02 · Eastern urban constellation" durationInFrames={Math.round(2.26*fps)+8} premountFor={fps}><SharpMap mode="east"/></TransitionSeries.Sequence>
   <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:8})}/>
   <TransitionSeries.Sequence name="03 · Inside the eastern city" durationInFrames={Math.round(2.58*fps)+8} premountFor={fps}><CinematicInsert asset="east-city.png" focus="60% 45%" startScale={1.03} endScale={1.13} drift={12}/></TransitionSeries.Sequence>
   <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:8})}/>
   <TransitionSeries.Sequence name="04 · Follow the Pacific light corridor" durationInFrames={Math.round(1.68*fps)+8} premountFor={fps}><SharpMap mode="west"/></TransitionSeries.Sequence>
   <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:8})}/>
   <TransitionSeries.Sequence name="05 · Los Angeles aerial illustration" durationInFrames={Math.round(2.2*fps)+8} premountFor={fps}><CinematicInsert asset="la-city.png" focus="60% 50%" startScale={1.12} endScale={1.03} drift={-12}/></TransitionSeries.Sequence>
   <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:8})}/>
   <TransitionSeries.Sequence name="06 · West / interior / east — equal scale" durationInFrames={Math.round(3.4*fps)+8} premountFor={fps}><CoastComparison/></TransitionSeries.Sequence>
   <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:8})}/>
   <TransitionSeries.Sequence name="07 · Locate the space between" durationInFrames={Math.round(3.24*fps)+8} premountFor={fps}><SharpMap mode="gap"/></TransitionSeries.Sequence>
   <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:8})}/>
   <TransitionSeries.Sequence name="08 · Follow the scan south from Canada" durationInFrames={Math.round(4.8*fps)+8} premountFor={fps}><SharpMap mode="scan"/></TransitionSeries.Sequence>
   <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:8})}/>
   <TransitionSeries.Sequence name="09 · Aerial prairie road illustration" durationInFrames={Math.round(3.36*fps)+8} premountFor={fps}><CinematicInsert asset="prairie.png" focus="50% 58%" startScale={1.04} endScale={1.19} drift={8}/></TransitionSeries.Sequence>
   <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:8})}/>
   <TransitionSeries.Sequence name="10 · Reveal the entire north–south ribbon" durationInFrames={Math.round(2.96*fps)+8} premountFor={fps}><SharpMap mode="ribbon"/></TransitionSeries.Sequence>
   <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:8})}/>
   <TransitionSeries.Sequence name="11 · Two equally scaled satellite magnifiers" durationInFrames={Math.round(3.04*fps)+8} premountFor={fps}><DensityComparison/></TransitionSeries.Sequence>
   <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:8})}/>
   <TransitionSeries.Sequence name="12 · Close in on an isolated farmstead" durationInFrames={Math.round(3.08*fps)+8} premountFor={fps}><CinematicInsert asset="prairie.png" focus="24% 54%" startScale={1.75} endScale={1.95} drift={-8}/></TransitionSeries.Sequence>
   <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:8})}/>
   <TransitionSeries.Sequence name="13 · Pull back and establish the scale" durationInFrames={Math.round(3.35*fps)+8} premountFor={fps}><SharpMap mode="scale"/></TransitionSeries.Sequence>
  </TransitionSeries>
  <Sequence name="Uploaded Japanese narration · first 40 seconds" durationInFrames={40*fps} premountFor={fps}><Audio src={staticFile('v2/narration-40s.m4a')} premountFor={fps}/></Sequence>
  <AbsoluteFill style={{background:'#000',opacity:interpolate(f,[0,10,1190,1199],[1,0,0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),pointerEvents:'none'}}/>
 </AbsoluteFill>;
};
