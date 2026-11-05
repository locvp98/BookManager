import React from 'react';
import {AbsoluteFill,Sequence,staticFile,useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {Dissolve,RuralScene} from './common';
import {GlobeScene} from './Globe';
import {RegionalScene,AreaScene,PopulationScene,NightHokkaidoScene,NightHonshuScene} from './GeographicScenes';
import {ComparisonScene} from './Comparison';
export const Preview=()=>{const {fps}=useVideoConfig();return <AbsoluteFill style={{background:'#06151f'}}>
 <Sequence name="01 • 東アジアから日本へ" from={0} durationInFrames={161} premountFor={fps}><GlobeScene/></Sequence>
 <Sequence name="02 • 本州の北、北海道" from={149} durationInFrames={194} premountFor={fps}><Dissolve><RegionalScene/></Dissolve></Sequence>
 <Sequence name="03 • 日本の国土の約5分の1" from={331} durationInFrames={156} premountFor={fps}><Dissolve><AreaScene/></Dissolve></Sequence>
 <Sequence name="04 • 九州と四国、同じ縮尺" from={475} durationInFrames={168} premountFor={fps}><Dissolve><ComparisonScene/></Dissolve></Sequence>
 <Sequence name="05 • 広い土地、まばらな暮らし" from={631} durationInFrames={240} premountFor={fps}><Dissolve><RuralScene/></Dissolve></Sequence>
 <Sequence name="06 • 人口は約4%" from={859} durationInFrames={144} premountFor={fps}><Dissolve><PopulationScene/></Dissolve></Sequence>
 <Sequence name="07 • 北海道の夜" from={991} durationInFrames={133} premountFor={fps}><Dissolve><NightHokkaidoScene/></Dissolve></Sequence>
 <Sequence name="08 • 本州の光の帯" from={1112} durationInFrames={88} premountFor={fps}><Dissolve><NightHonshuScene/></Dissolve></Sequence>
 <Audio name="Original Japanese narration — continuous first 40 seconds" src={staticFile('narration-preview.m4a')} premountFor={fps}/>
 </AbsoluteFill>};
