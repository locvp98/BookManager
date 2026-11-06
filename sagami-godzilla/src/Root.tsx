import React from 'react';
import {Composition,Folder} from 'remotion';
import {Preview} from './Preview';
import {CreatureScene,OceanScene,CinemaScene} from './PhotoScenes';
import {SagamiMap} from './SagamiMap';
import {FullMap} from './full/FullMap';
import {FullMaster} from './full/FullMaster';
export const Root=()=> <>
 <Composition id="SagamiPreview40" component={Preview} durationInFrames={1200} fps={30} width={1920} height={1080}/>
 <Composition id="FullMapProof" component={FullMap} durationInFrames={2400} fps={30} width={1920} height={1080} defaultProps={{mapId:"map-002",durationFrames:600}}/>
 <Composition id="SagamiFull" component={FullMaster} durationInFrames={44273} fps={30} width={1920} height={1080}/>
 <Folder name="Scenes">
  <Composition id="Creature" component={CreatureScene} durationInFrames={261} fps={30} width={1920} height={1080}/>
  <Composition id="Ocean" component={OceanScene} durationInFrames={147} fps={30} width={1920} height={1080}/>
  <Composition id="Cinema" component={CinemaScene} durationInFrames={234} fps={30} width={1920} height={1080}/>
  <Composition id="SagamiMap" component={SagamiMap} durationInFrames={594} fps={30} width={1920} height={1080}/>
 </Folder>
</>;
