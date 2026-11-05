import React from 'react';
import {Composition,Folder} from 'remotion';
import {Preview} from './Preview';
import {GlobeScene} from './Globe';
import {RegionalScene,AreaScene,PopulationScene,NightHokkaidoScene,NightHonshuScene} from './GeographicScenes';
import {ComparisonScene} from './Comparison';
import {RuralScene} from './common';
import {TerrainScene} from './full/Terrain';
import {FullMaster} from './full/FullMaster';
import {FullMapShot} from './full/FullMap';
export const Root=()=> <>
 <Composition id="HokkaidoFull" component={FullMaster} durationInFrames={39757} fps={30} width={1920} height={1080}/>
 <Composition id="FullMapProof" component={FullMapShot} defaultProps={{mapId:"map-018",durationFrames:600}} durationInFrames={1800} fps={30} width={1920} height={1080}/>
 <Composition id="HokkaidoPreview40" component={Preview} durationInFrames={1200} fps={30} width={1920} height={1080}/>
 <Composition id="FullTerrainData" component={TerrainScene} durationInFrames={600} fps={30} width={1920} height={1080}/>
 <Folder name="HokkaidoScenes">
  <Composition id="HokkaidoGlobe" component={GlobeScene} durationInFrames={161} fps={30} width={1920} height={1080}/>
  <Composition id="HokkaidoLocator" component={RegionalScene} durationInFrames={194} fps={30} width={1920} height={1080}/>
  <Composition id="HokkaidoArea" component={AreaScene} durationInFrames={156} fps={30} width={1920} height={1080}/>
  <Composition id="HokkaidoComparison" component={ComparisonScene} durationInFrames={168} fps={30} width={1920} height={1080}/>
  <Composition id="HokkaidoRural" component={RuralScene} durationInFrames={240} fps={30} width={1920} height={1080}/>
  <Composition id="HokkaidoPopulation" component={PopulationScene} durationInFrames={144} fps={30} width={1920} height={1080}/>
  <Composition id="HokkaidoNight" component={NightHokkaidoScene} durationInFrames={133} fps={30} width={1920} height={1080}/>
  <Composition id="HonshuLights" component={NightHonshuScene} durationInFrames={88} fps={30} width={1920} height={1080}/>
 </Folder>
</>;

