import React from 'react';
import {AbsoluteFill,Freeze,Sequence,useCurrentFrame,useVideoConfig,staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import {FlowerGarden} from './FlowerGarden';import {ClosedConservatory} from './ClosedConservatory';import {LandmarkMap} from './LandmarkMap';import {FamilyPark} from './FamilyPark';import {SeasideInn} from './SeasideInn';import {FamilyMemory} from './FamilyMemory';
const Hold=({children,duration,first=false}:{children:React.ReactNode;duration:number;first?:boolean})=>{const f=useCurrentFrame();return <AbsoluteFill style={{opacity:first?1:Math.min(1,f/12)}}>{f<duration?children:<Freeze frame={duration-1}>{children}</Freeze>}</AbsoluteFill>};
export const Preview=()=>{const {fps}=useVideoConfig();return <AbsoluteFill style={{backgroundColor:'#142820'}}>
 <Sequence name='Flower garden memory' from={0} durationInFrames={214} premountFor={fps}><Hold duration={202} first><FlowerGarden/></Hold></Sequence>
 <Sequence name='Closed conservatory' from={202} durationInFrames={202} premountFor={fps}><Hold duration={190}><ClosedConservatory/></Hold></Sequence>
 <Sequence name='Hiroshima and Miyajima locator' from={392} durationInFrames={249} premountFor={fps}><Hold duration={237}><LandmarkMap/></Hold></Sequence>
 <Sequence name='Family weekend amusement park' from={629} durationInFrames={142} premountFor={fps}><Hold duration={130}><FamilyPark/></Hold></Sequence>
 <Sequence name='Seaside inn memory' from={759} durationInFrames={171} premountFor={fps}><Hold duration={159}><SeasideInn/></Hold></Sequence>
 <Sequence name='Remembering a family holiday' from={918} durationInFrames={282} premountFor={fps}><Hold duration={282}><FamilyMemory/></Hold></Sequence>
 <Audio src={staticFile('narration.mp3')} premountFor={fps}/>
 </AbsoluteFill>};
