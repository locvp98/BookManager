import React from 'react';import {Composition,Folder} from 'remotion';
import {Preview} from './Preview';import {FlowerGarden} from './FlowerGarden';import {ClosedConservatory} from './ClosedConservatory';import {LandmarkMap} from './LandmarkMap';import {FamilyPark} from './FamilyPark';import {SeasideInn} from './SeasideInn';import {FamilyMemory} from './FamilyMemory';
export const Root=()=> <><Composition id='HiroshimaPreview40' component={Preview} width={1920} height={1080} fps={30} durationInFrames={1200}/><Folder name='Scenes'>
<Composition id='FlowerGarden' component={FlowerGarden} width={1920} height={1080} fps={30} durationInFrames={202}/>
<Composition id='ClosedConservatory' component={ClosedConservatory} width={1920} height={1080} fps={30} durationInFrames={190}/>
<Composition id='LandmarkMap' component={LandmarkMap} width={1920} height={1080} fps={30} durationInFrames={237}/>
<Composition id='FamilyPark' component={FamilyPark} width={1920} height={1080} fps={30} durationInFrames={130}/>
<Composition id='SeasideInn' component={SeasideInn} width={1920} height={1080} fps={30} durationInFrames={159}/>
<Composition id='FamilyMemory' component={FamilyMemory} width={1920} height={1080} fps={30} durationInFrames={282}/>
</Folder></>;
