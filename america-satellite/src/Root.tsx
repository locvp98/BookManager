import React from 'react';
import {SatellitePreview} from './v2/SatellitePreview';
import {SharpMap,CoastComparison,DensityComparison} from './v2/SharpMap';
import {CinematicInsert} from './v2/CinematicInsert';
import {AbsoluteFill,Composition,Folder,Sequence,useVideoConfig,interpolate,useCurrentFrame,staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import {Orbit} from './Orbit';
import {NightMap} from './NightMap';
import {Prairie} from './Prairie';
import {VisualInsert} from './VisualInsert';
const Opening=()=>{
 const {fps}=useVideoConfig();const f=useCurrentFrame();
 return <AbsoluteFill style={{background:'#01040a'}}>
 <Sequence name="01 • Orbital approach" from={0} durationInFrames={134} premountFor={fps}><Orbit/></Sequence>
 <Sequence name="02 • Eastern light network" from={122} durationInFrames={79} premountFor={fps}><NightMap shot="east"/></Sequence>
 <Sequence name="03 • Inside the eastern metropolis" from={189} durationInFrames={89} premountFor={fps}><VisualInsert asset="east-city.png" focus="55% 50%" startScale={1.04} endScale={1.12} direction={1}/></Sequence>
 <Sequence name="04 • Pacific light river" from={266} durationInFrames={70} premountFor={fps}><NightMap shot="west"/></Sequence>
 <Sequence name="05 • Los Angeles after dark" from={324} durationInFrames={72} premountFor={fps}><VisualInsert asset="la-city.png" focus="65% 48%" startScale={1.12} endScale={1.04} direction={-1}/></Sequence>
 <Sequence name="06 • The gap between" from={384} durationInFrames={117} premountFor={fps}><NightMap shot="reveal"/></Sequence>
 <Sequence name="07 • Circles in the prairie" from={489} durationInFrames={106} premountFor={fps}><VisualInsert asset="irrigation.png" focus="50% 50%" startScale={1.05} endScale={1.16} direction={1}/></Sequence>
 <Sequence name="08 • Canada to Mexico" from={583} durationInFrames={156} premountFor={fps}><NightMap shot="scan"/></Sequence>
 <Sequence name="09 • The long empty highway" from={727} durationInFrames={111} premountFor={fps}><Prairie/></Sequence>
 <Sequence name="10 • Wind over the High Plains" from={826} durationInFrames={103} premountFor={fps}><VisualInsert asset="windfarm.png" focus="50% 55%" startScale={1.04} endScale={1.11} direction={-1}/></Sequence>
 <Sequence name="11 • Where the lights thin out" from={917} durationInFrames={100} premountFor={fps}><NightMap shot="reveal"/></Sequence>
 <Sequence name="12 • An isolated farmstead" from={1005} durationInFrames={101} premountFor={fps}><VisualInsert asset="prairie.png" focus="24% 54%" startScale={1.8} endScale={2.04} direction={1}/></Sequence>
 <Sequence name="13 • The enormous dark belt" from={1094} durationInFrames={106} premountFor={fps}><NightMap shot="scale"/></Sequence>
 <Audio name="Original Japanese narration — first 40 seconds" src={staticFile('narration-40s.m4a')} premountFor={fps}/>
 <AbsoluteFill style={{background:'black',opacity:interpolate(f,[0,12,1188,1199],[1,0,0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),pointerEvents:'none'}}/>
 </AbsoluteFill>;
};
export const RemotionRoot=()=> <>
 <Composition id="SatellitePreviewV2" component={SatellitePreview} durationInFrames={1200} fps={30} width={1920} height={1080}/>
 <Folder name="SatelliteV2-Scenes">
 <Composition id="V2-EasternLights" component={SharpMap} defaultProps={{mode:'east' as const}} durationInFrames={76} fps={30} width={1920} height={1080}/>
 <Composition id="V2-PacificCorridor" component={SharpMap} defaultProps={{mode:'west' as const}} durationInFrames={58} fps={30} width={1920} height={1080}/>
 <Composition id="V2-CoastComparison" component={CoastComparison} durationInFrames={110} fps={30} width={1920} height={1080}/>
 <Composition id="V2-CentralGap" component={SharpMap} defaultProps={{mode:'gap' as const}} durationInFrames={105} fps={30} width={1920} height={1080}/>
 <Composition id="V2-NorthSouthScan" component={SharpMap} defaultProps={{mode:'scan' as const}} durationInFrames={152} fps={30} width={1920} height={1080}/>
 <Composition id="V2-RibbonReveal" component={SharpMap} defaultProps={{mode:'ribbon' as const}} durationInFrames={97} fps={30} width={1920} height={1080}/>
 <Composition id="V2-DensityComparison" component={DensityComparison} durationInFrames={99} fps={30} width={1920} height={1080}/>
 <Composition id="V2-ScalePullback" component={SharpMap} defaultProps={{mode:'scale' as const}} durationInFrames={109} fps={30} width={1920} height={1080}/>
 <Composition id="V2-EasternCity" component={CinematicInsert} defaultProps={{asset:'east-city.png',focus:'60% 45%',startScale:1.03,endScale:1.13,drift:12}} durationInFrames={85} fps={30} width={1920} height={1080}/>
 <Composition id="V2-LosAngeles" component={CinematicInsert} defaultProps={{asset:'la-city.png',focus:'60% 50%',startScale:1.12,endScale:1.03,drift:-12}} durationInFrames={74} fps={30} width={1920} height={1080}/>
 <Composition id="V2-Prairie" component={CinematicInsert} defaultProps={{asset:'prairie.png',focus:'50% 58%',startScale:1.04,endScale:1.19,drift:8}} durationInFrames={109} fps={30} width={1920} height={1080}/>
 <Composition id="V2-Farmstead" component={CinematicInsert} defaultProps={{asset:'prairie.png',focus:'24% 54%',startScale:1.75,endScale:1.95,drift:-8}} durationInFrames={100} fps={30} width={1920} height={1080}/>
 </Folder>
 <Composition id="AmericaPreview40" component={Opening} durationInFrames={1200} fps={30} width={1920} height={1080}/>
 <Folder name="Scenes">
 <Composition id="OrbitalApproach" component={Orbit} durationInFrames={134} fps={30} width={1920} height={1080}/>
 <Composition id="EasternLights" component={NightMap} defaultProps={{shot:'east' as const}} durationInFrames={79} fps={30} width={1920} height={1080}/>
 <Composition id="EasternMetropolis" component={VisualInsert} defaultProps={{asset:'east-city.png',focus:'55% 50%',startScale:1.04,endScale:1.12,direction:1}} durationInFrames={89} fps={30} width={1920} height={1080}/>
 <Composition id="PacificLights" component={NightMap} defaultProps={{shot:'west' as const}} durationInFrames={70} fps={30} width={1920} height={1080}/>
 <Composition id="LosAngeles" component={VisualInsert} defaultProps={{asset:'la-city.png',focus:'65% 48%',startScale:1.12,endScale:1.04,direction:-1}} durationInFrames={72} fps={30} width={1920} height={1080}/>
 <Composition id="CentralGap" component={NightMap} defaultProps={{shot:'reveal' as const}} durationInFrames={117} fps={30} width={1920} height={1080}/>
 <Composition id="IrrigationCircles" component={VisualInsert} defaultProps={{asset:'irrigation.png',focus:'50% 50%',startScale:1.05,endScale:1.16,direction:1}} durationInFrames={106} fps={30} width={1920} height={1080}/>
 <Composition id="NorthSouthScan" component={NightMap} defaultProps={{shot:'scan' as const}} durationInFrames={156} fps={30} width={1920} height={1080}/>
 <Composition id="Prairie" component={Prairie} durationInFrames={111} fps={30} width={1920} height={1080}/>
 <Composition id="Windfarm" component={VisualInsert} defaultProps={{asset:'windfarm.png',focus:'50% 55%',startScale:1.04,endScale:1.11,direction:-1}} durationInFrames={103} fps={30} width={1920} height={1080}/>
 <Composition id="LightsThinOut" component={NightMap} defaultProps={{shot:'reveal' as const}} durationInFrames={100} fps={30} width={1920} height={1080}/>
 <Composition id="Farmstead" component={VisualInsert} defaultProps={{asset:'prairie.png',focus:'24% 54%',startScale:1.8,endScale:2.04,direction:1}} durationInFrames={101} fps={30} width={1920} height={1080}/>
 <Composition id="DarkBeltScale" component={NightMap} defaultProps={{shot:'scale' as const}} durationInFrames={106} fps={30} width={1920} height={1080}/>
 </Folder>
</>;
