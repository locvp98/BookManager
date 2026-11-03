import React from 'react';
import {AbsoluteFill,Audio,Sequence,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Orbit} from '../Orbit';
import {CoastComparison,DensityComparison} from './SharpMap';
import {CinematicInsert} from './CinematicInsert';
import {FullMap,FullRainComparison,FullStill} from './FullStoryScenes';

export const FullStory=()=>{
 const {fps,durationInFrames}=useVideoConfig();const frame=useCurrentFrame();
 return <AbsoluteFill style={{background:'#020610'}}>
  <Sequence name={'01 · Earth · first look'} from={0} durationInFrames={245} premountFor={fps}><Orbit/></Sequence>
  <Sequence name={'01 · Earth · first look · illustration'} from={245} durationInFrames={338} premountFor={fps}><FullStill asset={'earth-night.jpg'} variant={1}/></Sequence>
  <Sequence name={'02 · Coasts · night lights'} from={583} durationInFrames={277} premountFor={fps}><FullMap kind="coasts" variant={1}/></Sequence>
  <Sequence name={'02 · Coasts · night lights · illustration'} from={860} durationInFrames={383} premountFor={fps}><FullStill asset={'east-city'} variant={2}/></Sequence>
  <Sequence name={'03 · Compare · populated regions'} from={1243} durationInFrames={281} premountFor={fps}><DensityComparison/></Sequence>
  <Sequence name={'03 · Compare · populated regions · illustration'} from={1524} durationInFrames={389} premountFor={fps}><FullStill asset={'small-town'} variant={3}/></Sequence>
  <Sequence name={'04 · Continental overview'} from={1913} durationInFrames={241} premountFor={fps}><FullMap kind="overview" variant={1}/></Sequence>
  <Sequence name={'04 · Continental overview · illustration'} from={2154} durationInFrames={332} premountFor={fps}><FullStill asset={'prairie'} variant={4}/></Sequence>
  <Sequence name={'05 · States · Great Plains corridor'} from={2486} durationInFrames={300} premountFor={fps}><FullMap kind="overview"/></Sequence>
  <Sequence name={'05 · States · Great Plains corridor · illustration'} from={2786} durationInFrames={470} premountFor={fps}><FullStill asset={'dry-prairie'} variant={5}/></Sequence>
  <Sequence name={'06 · Map · region location'} from={3256} durationInFrames={300} premountFor={fps}><FullMap kind="states" variant={1}/></Sequence>
  <Sequence name={'06 · Map · region location · illustration'} from={3556} durationInFrames={415} premountFor={fps}><FullStill asset={'small-town'} variant={6}/></Sequence>
  <Sequence name={'07 · Prairie · open grassland'} from={3971} durationInFrames={690} premountFor={fps}><CinematicInsert asset="prairie.png" focus="26% 56%" startScale={1.2} endScale={1.07} drift={-9}/></Sequence>
  <Sequence name={'08 · Meridian · north to south'} from={4661} durationInFrames={244} premountFor={fps}><FullMap kind="meridian" variant={1}/></Sequence>
  <Sequence name={'08 · Meridian · north to south · illustration'} from={4905} durationInFrames={338} premountFor={fps}><FullStill asset={'dry-prairie'} variant={7}/></Sequence>
  <Sequence name={'09 · Rain · regional pattern'} from={5243} durationInFrames={284} premountFor={fps}><FullMap kind="rainfall"/></Sequence>
  <Sequence name={'09 · Rain · regional pattern · illustration'} from={5527} durationInFrames={391} premountFor={fps}><FullStill asset={'plains-storm'} variant={8}/></Sequence>
  <Sequence name={'10 · Compare · wetter and drier areas'} from={5918} durationInFrames={213} premountFor={fps}><FullRainComparison/></Sequence>
  <Sequence name={'10 · Compare · wetter and drier areas · illustration'} from={6131} durationInFrames={295} premountFor={fps}><FullStill asset={'irrigation'} variant={9}/></Sequence>
  <Sequence name={'11 · Rockies · rain shadow'} from={6426} durationInFrames={300} premountFor={fps}><FullMap kind="rainshadow" variant={1}/></Sequence>
  <Sequence name={'11 · Rockies · rain shadow · illustration'} from={6726} durationInFrames={665} premountFor={fps}><FullStill asset={'powell-survey'} variant={10}/></Sequence>
  <Sequence name={'12 · Gulf · moisture path'} from={7391} durationInFrames={276} premountFor={fps}><FullMap kind="rainshadow" variant={2}/></Sequence>
  <Sequence name={'12 · Gulf · moisture path · illustration'} from={7667} durationInFrames={382} premountFor={fps}><FullStill asset={'plains-storm'} variant={11}/></Sequence>
  <Sequence name={'13 · Grassland · water stress'} from={8049} durationInFrames={813} premountFor={fps}><FullStill asset="dry-prairie" variant={2}/></Sequence>
  <Sequence name={'14 · Powell · 1878 expedition'} from={8862} durationInFrames={665} premountFor={fps}><FullStill asset="powell-survey" variant={1}/></Sequence>
  <Sequence name={'15 · Plains · Indigenous communities'} from={9527} durationInFrames={832} premountFor={fps}><FullStill asset="lakota-community" variant={2}/></Sequence>
  <Sequence name={'16 · Bison · seasonal migration'} from={10359} durationInFrames={716} premountFor={fps}><FullStill asset="bison-migration" variant={3}/></Sequence>
  <Sequence name={'17 · Cattle · working ranch'} from={11075} durationInFrames={645} premountFor={fps}><FullStill asset="cattle-ranch" variant={0}/></Sequence>
  <Sequence name={'18 · Bison · former range'} from={11720} durationInFrames={300} premountFor={fps}><FullMap kind="explore" variant={1}/></Sequence>
  <Sequence name={'18 · Bison · former range · illustration'} from={12020} durationInFrames={521} premountFor={fps}><FullStill asset={'bison-migration'} variant={0}/></Sequence>
  <Sequence name={'19 · Map · South Dakota reservations'} from={12541} durationInFrames={300} premountFor={fps}><FullMap kind="states" variant={2}/></Sequence>
  <Sequence name={'19 · Map · South Dakota reservations · illustration'} from={12841} durationInFrames={489} premountFor={fps}><FullStill asset={'lakota-community'} variant={1}/></Sequence>
  <Sequence name={'20 · Homestead · western movement'} from={13330} durationInFrames={300} premountFor={fps}><FullMap kind="explore" variant={2}/></Sequence>
  <Sequence name={'20 · Homestead · western movement · illustration'} from={13630} durationInFrames={422} premountFor={fps}><FullStill asset={'dry-prairie'} variant={2}/></Sequence>
  <Sequence name={'21 · Sod · prairie home'} from={14052} durationInFrames={755} premountFor={fps}><FullStill asset="sod-homestead" variant={0}/></Sequence>
  <Sequence name={'22 · Drought · uncertain rainfall'} from={14807} durationInFrames={707} premountFor={fps}><FullStill asset="dry-prairie" variant={1}/></Sequence>
  <Sequence name={'23 · Rail · growing prairie towns'} from={15514} durationInFrames={585} premountFor={fps}><FullStill asset="small-town" variant={2}/></Sequence>
  <Sequence name={'24 · Settlement · new agricultural land'} from={16099} durationInFrames={300} premountFor={fps}><FullMap kind="explore" variant={3}/></Sequence>
  <Sequence name={'24 · Settlement · new agricultural land · illustration'} from={16399} durationInFrames={451} premountFor={fps}><FullStill asset={'sod-homestead'} variant={3}/></Sequence>
  <Sequence name={'25 · Rail · grain economy'} from={16850} durationInFrames={266} premountFor={fps}><FullMap kind="resources" variant={1}/></Sequence>
  <Sequence name={'25 · Rail · grain economy · illustration'} from={17116} durationInFrames={368} premountFor={fps}><FullStill asset={'mechanized-harvest'} variant={4}/></Sequence>
  <Sequence name={'26 · Dry years · failed crops'} from={17484} durationInFrames={840} premountFor={fps}><FullStill asset="dry-prairie" variant={2}/></Sequence>
  <Sequence name={'27 · Grass roots · fragile soil'} from={18324} durationInFrames={715} premountFor={fps}><FullStill asset="plains-storm" variant={3}/></Sequence>
  <Sequence name={'28 · Dust Bowl · Black Sunday'} from={19039} durationInFrames={784} premountFor={fps}><FullStill asset="dust-bowl" variant={3}/></Sequence>
  <Sequence name={'29 · Migration · Dust Bowl families'} from={19823} durationInFrames={300} premountFor={fps}><FullMap kind="coasts"/></Sequence>
  <Sequence name={'29 · Migration · Dust Bowl families · illustration'} from={20123} durationInFrames={415} premountFor={fps}><FullStill asset={'east-city'} variant={5}/></Sequence>
  <Sequence name={'30 · Population · fading rural lights'} from={20538} durationInFrames={300} premountFor={fps}><FullMap kind="future" variant={1}/></Sequence>
  <Sequence name={'30 · Population · fading rural lights · illustration'} from={20838} durationInFrames={659} premountFor={fps}><FullStill asset={'small-town'} variant={6}/></Sequence>
  <Sequence name={'31 · Fields · center pivot systems'} from={21497} durationInFrames={604} premountFor={fps}><CinematicInsert asset="irrigation.png" focus="50% 50%" startScale={1.03} endScale={1.15} drift={12}/></Sequence>
  <Sequence name={'32 · Irrigation · aerial circles'} from={22101} durationInFrames={651} premountFor={fps}><FullStill asset="mechanized-harvest" variant={8}/></Sequence>
  <Sequence name={'33 · Aquifer · underground water'} from={22752} durationInFrames={550} premountFor={fps}><FullStill asset="aquifer-cutaway" variant={4}/></Sequence>
  <Sequence name={'34 · Ogallala · well cross section'} from={23302} durationInFrames={578} premountFor={fps}><FullStill asset="irrigation" variant={1}/></Sequence>
  <Sequence name={'35 · Farming · modern crops'} from={23880} durationInFrames={675} premountFor={fps}><FullStill asset="mechanized-harvest" variant={2}/></Sequence>
  <Sequence name={'36 · Rain · underground recharge'} from={24555} durationInFrames={210} premountFor={fps}><FullRainComparison/></Sequence>
  <Sequence name={'36 · Rain · underground recharge · illustration'} from={24765} durationInFrames={262} premountFor={fps}><FullStill asset={'plains-storm'} variant={7}/></Sequence>
  <Sequence name={'37 · Water table · declining wells'} from={25027} durationInFrames={300} premountFor={fps}><FullMap kind="depletion" variant={1}/></Sequence>
  <Sequence name={'37 · Water table · declining wells · illustration'} from={25327} durationInFrames={468} premountFor={fps}><FullStill asset={'aquifer-cutaway'} variant={8}/></Sequence>
  <Sequence name={'38 · Wells · water access'} from={25795} durationInFrames={691} premountFor={fps}><FullStill asset="irrigation" variant={3}/></Sequence>
  <Sequence name={'39 · Corn · livestock feed'} from={26486} durationInFrames={884} premountFor={fps}><FullStill asset="mechanized-harvest" variant={2}/></Sequence>
  <Sequence name={'40 · Town · rural economy'} from={27370} durationInFrames={801} premountFor={fps}><FullStill asset="small-town" variant={3}/></Sequence>
  <Sequence name={'41 · Harvest · mechanized farming'} from={28171} durationInFrames={842} premountFor={fps}><FullStill asset="mechanized-harvest" variant={0}/></Sequence>
  <Sequence name={'42 · Migration · city comparison'} from={29013} durationInFrames={252} premountFor={fps}><CoastComparison/></Sequence>
  <Sequence name={'42 · Migration · city comparison · illustration'} from={29265} durationInFrames={347} premountFor={fps}><FullStill asset={'east-city'} variant={9}/></Sequence>
  <Sequence name={'43 · Farms · national food system'} from={29612} durationInFrames={268} premountFor={fps}><FullMap kind="explore" variant={4}/></Sequence>
  <Sequence name={'43 · Farms · national food system · illustration'} from={29880} durationInFrames={370} premountFor={fps}><FullStill asset={'mechanized-harvest'} variant={10}/></Sequence>
  <Sequence name={'44 · Mountains · continental climate'} from={30250} durationInFrames={300} premountFor={fps}><FullMap kind="rainshadow" variant={3}/></Sequence>
  <Sequence name={'44 · Mountains · continental climate · illustration'} from={30550} durationInFrames={422} premountFor={fps}><FullStill asset={'plains-storm'} variant={11}/></Sequence>
  <Sequence name={'45 · Weather · isolated roads'} from={30972} durationInFrames={850} premountFor={fps}><CinematicInsert asset="prairie.png" focus="26% 56%" startScale={1.2} endScale={1.07} drift={-9}/></Sequence>
  <Sequence name={'46 · Town · people who stay'} from={31822} durationInFrames={210} premountFor={fps}><FullMap kind="states" variant={3}/></Sequence>
  <Sequence name={'46 · Town · people who stay · illustration'} from={32032} durationInFrames={242} premountFor={fps}><FullStill asset={'small-town'} variant={0}/></Sequence>
  <Sequence name={'47 · Oil · Permian Basin'} from={32274} durationInFrames={214} premountFor={fps}><FullMap kind="resources" variant={2}/></Sequence>
  <Sequence name={'47 · Oil · Permian Basin · illustration'} from={32488} durationInFrames={296} premountFor={fps}><FullStill asset={'prairie'} variant={1}/></Sequence>
  <Sequence name={'48 · Oil · regional geography'} from={32784} durationInFrames={643} premountFor={fps}><FullStill asset="oil-fields" variant={3}/></Sequence>
  <Sequence name={'49 · Oil · price cycle'} from={33427} durationInFrames={257} premountFor={fps}><FullMap kind="resources" variant={3}/></Sequence>
  <Sequence name={'49 · Oil · price cycle · illustration'} from={33684} durationInFrames={355} premountFor={fps}><FullStill asset={'cattle-ranch'} variant={2}/></Sequence>
  <Sequence name={'50 · Boom · expanding settlements'} from={34039} durationInFrames={788} premountFor={fps}><FullStill asset="small-town" variant={1}/></Sequence>
  <Sequence name={'51 · Wind · open plains'} from={34827} durationInFrames={233} premountFor={fps}><FullMap kind="rainshadow"/></Sequence>
  <Sequence name={'51 · Wind · open plains · illustration'} from={35060} durationInFrames={322} premountFor={fps}><FullStill asset={'prairie'} variant={3}/></Sequence>
  <Sequence name={'52 · Energy · wind farm'} from={35382} durationInFrames={953} premountFor={fps}><CinematicInsert asset="windfarm.png" focus="50% 50%" startScale={1.03} endScale={1.15} drift={10}/></Sequence>
  <Sequence name={'53 · Rural · community spacing'} from={36335} durationInFrames={276} premountFor={fps}><FullMap kind="states" variant={4}/></Sequence>
  <Sequence name={'53 · Rural · community spacing · illustration'} from={36611} durationInFrames={382} premountFor={fps}><FullStill asset={'cattle-ranch'} variant={4}/></Sequence>
  <Sequence name={'54 · Bison · conservation'} from={36993} durationInFrames={664} premountFor={fps}><FullStill asset="bison-migration" variant={1}/></Sequence>
  <Sequence name={'55 · Irrigation · technological change'} from={37657} durationInFrames={721} premountFor={fps}><CinematicInsert asset="irrigation.png" focus="50% 50%" startScale={1.03} endScale={1.15} drift={12}/></Sequence>
  <Sequence name={'56 · Night · open interior'} from={38378} durationInFrames={300} premountFor={fps}><FullMap kind="future" variant={2}/></Sequence>
  <Sequence name={'56 · Night · open interior · illustration'} from={38678} durationInFrames={441} premountFor={fps}><FullStill asset={'dry-prairie'} variant={5}/></Sequence>
  <Sequence name={'57 · Dust Bowl · displaced families'} from={39119} durationInFrames={612} premountFor={fps}><FullStill asset="dust-bowl" variant={0}/></Sequence>
  <Sequence name={'58 · Future · land restoration'} from={39731} durationInFrames={300} premountFor={fps}><FullMap kind="future" variant={3}/></Sequence>
  <Sequence name={'58 · Future · land restoration · illustration'} from={40031} durationInFrames={629} premountFor={fps}><FullStill asset={'cattle-ranch'} variant={6}/></Sequence>
  <Sequence name={'59 · Bison · plains ecology'} from={40660} durationInFrames={607} premountFor={fps}><FullStill asset="bison-migration" variant={2}/></Sequence>
  <Sequence name={'60 · Earth · closing scale'} from={41267} durationInFrames={264} premountFor={fps}><FullMap kind="future"/></Sequence>
  <Sequence name={'60 · Earth · closing scale · illustration'} from={41531} durationInFrames={365} premountFor={fps}><FullStill asset={'prairie'} variant={7}/></Sequence>
  <Audio src={staticFile('v2/narration-full.mp3')}/>
  <AbsoluteFill style={{background:'#000',opacity:interpolate(frame,[0,12,durationInFrames-12,durationInFrames-1],[1,0,0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),pointerEvents:'none'}}/>
 </AbsoluteFill>;
};
