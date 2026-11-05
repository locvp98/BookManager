import React from 'react';
import {AbsoluteFill,Freeze,Img,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {TransitionSeries,linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {fullTimeline} from './timeline';
import {FullMapShot} from './FullMap';
type Scene=(typeof fullTimeline.scenes)[number];
const Inner=({scene}:{scene:Scene})=>{const frame=useCurrentFrame(),n=scene.endFrame-scene.startFrame;if(scene.type==='map')return <FullMapShot mapId={scene.id} durationFrames={n}/>;return <AbsoluteFill style={{overflow:'hidden',background:'#061822'}}><Img src={staticFile(scene.asset!.replace(/^public\//,''))} style={{width:'100%',height:'100%',objectFit:'cover',scale:1+.12*Math.min(1,Math.max(0,frame/Math.max(1,n-1))),transformOrigin:'50% 50%'}}/></AbsoluteFill>};
const Shot=({scene}:{scene:Scene})=>{const f=useCurrentFrame(),n=scene.endFrame-scene.startFrame;return <Freeze frame={n-1} active={f>=n}><Inner scene={scene}/></Freeze>};
// The manifest deliberately controls the generated timeline as one source template.
export const FullMaster=()=>{const {fps}=useVideoConfig();return <AbsoluteFill style={{background:'#061822'}}><TransitionSeries>{fullTimeline.scenes.map((scene,i)=><React.Fragment key={scene.id}><TransitionSeries.Sequence name={scene.id+' • '+scene.narration.slice(0,40)} durationInFrames={scene.endFrame-scene.startFrame+(i<fullTimeline.scenes.length-1?8:0)} premountFor={fps}><Shot scene={scene}/></TransitionSeries.Sequence>{i<fullTimeline.scenes.length-1&&<TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:8})}/>}</React.Fragment>)}</TransitionSeries><Audio src={staticFile('narration.mp3')} premountFor={fps}/></AbsoluteFill>};
