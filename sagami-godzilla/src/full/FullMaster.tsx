import React from 'react';
import {AbsoluteFill,Sequence,staticFile,useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {HoldingScene} from './HoldingScene';
export const FullMaster=()=>{const {fps}=useVideoConfig();return <AbsoluteFill style={{background:'#07121d'}}>
  <Sequence name="image-001" from={0} durationInFrames={261} premountFor={fps}><HoldingScene id="image-001" frames={249} asset="full/scenes/image-001.png" fadeIn={false}/></Sequence>
  <Sequence name="image-002" from={249} durationInFrames={147} premountFor={fps}><HoldingScene id="image-002" frames={135} asset="full/scenes/image-002.png" fadeIn={true}/></Sequence>
  <Sequence name="image-003" from={384} durationInFrames={234} premountFor={fps}><HoldingScene id="image-003" frames={222} asset="full/scenes/image-003.png" fadeIn={true}/></Sequence>
  <Sequence name="map-001" from={606} durationInFrames={881} premountFor={fps}><HoldingScene id="map-001" frames={869} fadeIn={true}/></Sequence>
  <Sequence name="image-004" from={1475} durationInFrames={230} premountFor={fps}><HoldingScene id="image-004" frames={218} asset="full/scenes/image-004.png" fadeIn={true}/></Sequence>
  <Sequence name="image-005" from={1693} durationInFrames={210} premountFor={fps}><HoldingScene id="image-005" frames={198} asset="full/scenes/image-005.png" fadeIn={true}/></Sequence>
  <Sequence name="image-006" from={1891} durationInFrames={202} premountFor={fps}><HoldingScene id="image-006" frames={190} asset="full/scenes/image-006.png" fadeIn={true}/></Sequence>
  <Sequence name="image-007" from={2081} durationInFrames={101} premountFor={fps}><HoldingScene id="image-007" frames={89} asset="full/scenes/image-007.png" fadeIn={true}/></Sequence>
  <Sequence name="image-008" from={2170} durationInFrames={157} premountFor={fps}><HoldingScene id="image-008" frames={145} asset="full/scenes/image-008.png" fadeIn={true}/></Sequence>
  <Sequence name="map-002" from={2315} durationInFrames={302} premountFor={fps}><HoldingScene id="map-002" frames={290} fadeIn={true}/></Sequence>
  <Sequence name="map-003" from={2605} durationInFrames={258} premountFor={fps}><HoldingScene id="map-003" frames={246} fadeIn={true}/></Sequence>
  <Sequence name="image-009" from={2851} durationInFrames={301} premountFor={fps}><HoldingScene id="image-009" frames={289} asset="full/scenes/image-009.png" fadeIn={true}/></Sequence>
  <Sequence name="image-010" from={3140} durationInFrames={279} premountFor={fps}><HoldingScene id="image-010" frames={267} asset="full/scenes/image-010.png" fadeIn={true}/></Sequence>
  <Sequence name="image-011" from={3407} durationInFrames={149} premountFor={fps}><HoldingScene id="image-011" frames={137} asset="full/scenes/image-011.png" fadeIn={true}/></Sequence>
  <Sequence name="image-012" from={3544} durationInFrames={277} premountFor={fps}><HoldingScene id="image-012" frames={265} asset="full/scenes/image-012.png" fadeIn={true}/></Sequence>
  <Sequence name="image-013" from={3809} durationInFrames={192} premountFor={fps}><HoldingScene id="image-013" frames={180} asset="full/scenes/image-013.png" fadeIn={true}/></Sequence>
  <Sequence name="image-014" from={3989} durationInFrames={186} premountFor={fps}><HoldingScene id="image-014" frames={174} asset="full/scenes/image-014.png" fadeIn={true}/></Sequence>
  <Sequence name="image-015" from={4163} durationInFrames={173} premountFor={fps}><HoldingScene id="image-015" frames={161} asset="full/scenes/image-015.png" fadeIn={true}/></Sequence>
  <Sequence name="map-004" from={4324} durationInFrames={657} premountFor={fps}><HoldingScene id="map-004" frames={645} fadeIn={true}/></Sequence>
  <Sequence name="map-005" from={4969} durationInFrames={240} premountFor={fps}><HoldingScene id="map-005" frames={228} fadeIn={true}/></Sequence>
  <Sequence name="map-006" from={5197} durationInFrames={341} premountFor={fps}><HoldingScene id="map-006" frames={329} fadeIn={true}/></Sequence>
  <Sequence name="image-016" from={5526} durationInFrames={291} premountFor={fps}><HoldingScene id="image-016" frames={279} asset="full/scenes/image-016.png" fadeIn={true}/></Sequence>
  <Sequence name="image-017" from={5805} durationInFrames={232} premountFor={fps}><HoldingScene id="image-017" frames={220} asset="full/scenes/image-017.png" fadeIn={true}/></Sequence>
  <Sequence name="map-007" from={6025} durationInFrames={167} premountFor={fps}><HoldingScene id="map-007" frames={155} fadeIn={true}/></Sequence>
  <Sequence name="image-018" from={6180} durationInFrames={134} premountFor={fps}><HoldingScene id="image-018" frames={122} asset="full/scenes/image-018.png" fadeIn={true}/></Sequence>
  <Sequence name="image-019" from={6302} durationInFrames={325} premountFor={fps}><HoldingScene id="image-019" frames={313} asset="full/scenes/image-019.png" fadeIn={true}/></Sequence>
  <Sequence name="map-008" from={6615} durationInFrames={259} premountFor={fps}><HoldingScene id="map-008" frames={247} fadeIn={true}/></Sequence>
  <Sequence name="map-009" from={6862} durationInFrames={1011} premountFor={fps}><HoldingScene id="map-009" frames={999} fadeIn={true}/></Sequence>
  <Sequence name="image-020" from={7861} durationInFrames={442} premountFor={fps}><HoldingScene id="image-020" frames={430} asset="full/scenes/image-020.png" fadeIn={true}/></Sequence>
  <Sequence name="map-010" from={8291} durationInFrames={354} premountFor={fps}><HoldingScene id="map-010" frames={342} fadeIn={true}/></Sequence>
  <Sequence name="image-021" from={8633} durationInFrames={171} premountFor={fps}><HoldingScene id="image-021" frames={159} asset="full/scenes/image-021.png" fadeIn={true}/></Sequence>
  <Sequence name="map-011" from={8792} durationInFrames={311} premountFor={fps}><HoldingScene id="map-011" frames={299} fadeIn={true}/></Sequence>
  <Sequence name="image-022" from={9091} durationInFrames={348} premountFor={fps}><HoldingScene id="image-022" frames={336} asset="full/scenes/image-022.png" fadeIn={true}/></Sequence>
  <Sequence name="image-023" from={9427} durationInFrames={270} premountFor={fps}><HoldingScene id="image-023" frames={258} asset="full/scenes/image-023.png" fadeIn={true}/></Sequence>
  <Sequence name="map-012" from={9685} durationInFrames={493} premountFor={fps}><HoldingScene id="map-012" frames={481} fadeIn={true}/></Sequence>
  <Sequence name="map-013" from={10166} durationInFrames={345} premountFor={fps}><HoldingScene id="map-013" frames={333} fadeIn={true}/></Sequence>
  <Sequence name="image-024" from={10499} durationInFrames={201} premountFor={fps}><HoldingScene id="image-024" frames={189} asset="full/scenes/image-024.png" fadeIn={true}/></Sequence>
  <Sequence name="map-014" from={10688} durationInFrames={252} premountFor={fps}><HoldingScene id="map-014" frames={240} fadeIn={true}/></Sequence>
  <Sequence name="map-015" from={10928} durationInFrames={551} premountFor={fps}><HoldingScene id="map-015" frames={539} fadeIn={true}/></Sequence>
  <Sequence name="image-025" from={11467} durationInFrames={177} premountFor={fps}><HoldingScene id="image-025" frames={165} asset="full/scenes/image-025.png" fadeIn={true}/></Sequence>
  <Sequence name="map-016" from={11632} durationInFrames={772} premountFor={fps}><HoldingScene id="map-016" frames={760} fadeIn={true}/></Sequence>
  <Sequence name="map-017" from={12392} durationInFrames={503} premountFor={fps}><HoldingScene id="map-017" frames={491} fadeIn={true}/></Sequence>
  <Sequence name="image-026" from={12883} durationInFrames={328} premountFor={fps}><HoldingScene id="image-026" frames={316} asset="full/scenes/image-026.png" fadeIn={true}/></Sequence>
  <Sequence name="image-027" from={13199} durationInFrames={139} premountFor={fps}><HoldingScene id="image-027" frames={127} asset="full/scenes/image-027.png" fadeIn={true}/></Sequence>
  <Sequence name="image-028" from={13326} durationInFrames={155} premountFor={fps}><HoldingScene id="image-028" frames={143} asset="full/scenes/image-028.png" fadeIn={true}/></Sequence>
  <Sequence name="map-018" from={13469} durationInFrames={119} premountFor={fps}><HoldingScene id="map-018" frames={107} fadeIn={true}/></Sequence>
  <Sequence name="image-029" from={13576} durationInFrames={283} premountFor={fps}><HoldingScene id="image-029" frames={271} asset="full/scenes/image-029.png" fadeIn={true}/></Sequence>
  <Sequence name="map-019" from={13847} durationInFrames={789} premountFor={fps}><HoldingScene id="map-019" frames={777} fadeIn={true}/></Sequence>
  <Sequence name="map-020" from={14624} durationInFrames={395} premountFor={fps}><HoldingScene id="map-020" frames={383} fadeIn={true}/></Sequence>
  <Sequence name="image-030" from={15007} durationInFrames={321} premountFor={fps}><HoldingScene id="image-030" frames={309} asset="full/scenes/image-030.png" fadeIn={true}/></Sequence>
  <Sequence name="image-031" from={15316} durationInFrames={245} premountFor={fps}><HoldingScene id="image-031" frames={233} asset="full/scenes/image-031.png" fadeIn={true}/></Sequence>
  <Sequence name="image-032" from={15549} durationInFrames={290} premountFor={fps}><HoldingScene id="image-032" frames={278} asset="full/scenes/image-032.png" fadeIn={true}/></Sequence>
  <Sequence name="image-033" from={15827} durationInFrames={218} premountFor={fps}><HoldingScene id="image-033" frames={206} asset="full/scenes/image-033.png" fadeIn={true}/></Sequence>
  <Sequence name="image-034" from={16033} durationInFrames={277} premountFor={fps}><HoldingScene id="image-034" frames={265} asset="full/scenes/image-034.png" fadeIn={true}/></Sequence>
  <Sequence name="map-021" from={16298} durationInFrames={649} premountFor={fps}><HoldingScene id="map-021" frames={637} fadeIn={true}/></Sequence>
  <Sequence name="image-035" from={16935} durationInFrames={284} premountFor={fps}><HoldingScene id="image-035" frames={272} asset="full/scenes/image-035.png" fadeIn={true}/></Sequence>
  <Sequence name="image-036" from={17207} durationInFrames={216} premountFor={fps}><HoldingScene id="image-036" frames={204} asset="full/scenes/image-036.png" fadeIn={true}/></Sequence>
  <Sequence name="map-022" from={17411} durationInFrames={654} premountFor={fps}><HoldingScene id="map-022" frames={642} fadeIn={true}/></Sequence>
  <Sequence name="map-023" from={18053} durationInFrames={695} premountFor={fps}><HoldingScene id="map-023" frames={683} fadeIn={true}/></Sequence>
  <Sequence name="image-037" from={18736} durationInFrames={208} premountFor={fps}><HoldingScene id="image-037" frames={196} asset="full/scenes/image-037.png" fadeIn={true}/></Sequence>
  <Sequence name="map-024" from={18932} durationInFrames={528} premountFor={fps}><HoldingScene id="map-024" frames={516} fadeIn={true}/></Sequence>
  <Sequence name="image-038" from={19448} durationInFrames={266} premountFor={fps}><HoldingScene id="image-038" frames={254} asset="full/scenes/image-038.png" fadeIn={true}/></Sequence>
  <Sequence name="image-039" from={19702} durationInFrames={159} premountFor={fps}><HoldingScene id="image-039" frames={147} asset="full/scenes/image-039.png" fadeIn={true}/></Sequence>
  <Sequence name="image-040" from={19849} durationInFrames={155} premountFor={fps}><HoldingScene id="image-040" frames={143} asset="full/scenes/image-040.png" fadeIn={true}/></Sequence>
  <Sequence name="image-041" from={19992} durationInFrames={87} premountFor={fps}><HoldingScene id="image-041" frames={75} asset="full/scenes/image-041.png" fadeIn={true}/></Sequence>
  <Sequence name="image-042" from={20067} durationInFrames={276} premountFor={fps}><HoldingScene id="image-042" frames={264} asset="full/scenes/image-042.png" fadeIn={true}/></Sequence>
  <Sequence name="map-025" from={20331} durationInFrames={471} premountFor={fps}><HoldingScene id="map-025" frames={459} fadeIn={true}/></Sequence>
  <Sequence name="image-043" from={20790} durationInFrames={221} premountFor={fps}><HoldingScene id="image-043" frames={209} asset="full/scenes/image-043.png" fadeIn={true}/></Sequence>
  <Sequence name="image-044" from={20999} durationInFrames={306} premountFor={fps}><HoldingScene id="image-044" frames={294} asset="full/scenes/image-044.png" fadeIn={true}/></Sequence>
  <Sequence name="image-045" from={21293} durationInFrames={212} premountFor={fps}><HoldingScene id="image-045" frames={200} asset="full/scenes/image-045.png" fadeIn={true}/></Sequence>
  <Sequence name="image-046" from={21493} durationInFrames={290} premountFor={fps}><HoldingScene id="image-046" frames={278} asset="full/scenes/image-046.png" fadeIn={true}/></Sequence>
  <Sequence name="image-047" from={21771} durationInFrames={190} premountFor={fps}><HoldingScene id="image-047" frames={178} asset="full/scenes/image-047.png" fadeIn={true}/></Sequence>
  <Sequence name="image-115" from={21949} durationInFrames={230} premountFor={fps}><HoldingScene id="image-115" frames={218} asset="full/scenes/image-115.png" fadeIn={true}/></Sequence>
  <Sequence name="map-027" from={22167} durationInFrames={820} premountFor={fps}><HoldingScene id="map-027" frames={808} fadeIn={true}/></Sequence>
  <Sequence name="image-048" from={22975} durationInFrames={296} premountFor={fps}><HoldingScene id="image-048" frames={284} asset="full/scenes/image-048.png" fadeIn={true}/></Sequence>
  <Sequence name="map-028" from={23259} durationInFrames={713} premountFor={fps}><HoldingScene id="map-028" frames={701} fadeIn={true}/></Sequence>
  <Sequence name="image-049" from={23960} durationInFrames={104} premountFor={fps}><HoldingScene id="image-049" frames={92} asset="full/scenes/image-049.png" fadeIn={true}/></Sequence>
  <Sequence name="image-050" from={24052} durationInFrames={264} premountFor={fps}><HoldingScene id="image-050" frames={252} asset="full/scenes/image-050.png" fadeIn={true}/></Sequence>
  <Sequence name="image-051" from={24304} durationInFrames={69} premountFor={fps}><HoldingScene id="image-051" frames={57} asset="full/scenes/image-051.png" fadeIn={true}/></Sequence>
  <Sequence name="image-052" from={24361} durationInFrames={286} premountFor={fps}><HoldingScene id="image-052" frames={274} asset="full/scenes/image-052.png" fadeIn={true}/></Sequence>
  <Sequence name="image-053" from={24635} durationInFrames={300} premountFor={fps}><HoldingScene id="image-053" frames={288} asset="full/scenes/image-053.png" fadeIn={true}/></Sequence>
  <Sequence name="image-054" from={24923} durationInFrames={224} premountFor={fps}><HoldingScene id="image-054" frames={212} asset="full/scenes/image-054.png" fadeIn={true}/></Sequence>
  <Sequence name="image-055" from={25135} durationInFrames={147} premountFor={fps}><HoldingScene id="image-055" frames={135} asset="full/scenes/image-055.png" fadeIn={true}/></Sequence>
  <Sequence name="map-029" from={25270} durationInFrames={1090} premountFor={fps}><HoldingScene id="map-029" frames={1078} fadeIn={true}/></Sequence>
  <Sequence name="image-056" from={26348} durationInFrames={228} premountFor={fps}><HoldingScene id="image-056" frames={216} asset="full/scenes/image-056.png" fadeIn={true}/></Sequence>
  <Sequence name="image-057" from={26564} durationInFrames={234} premountFor={fps}><HoldingScene id="image-057" frames={222} asset="full/scenes/image-057.png" fadeIn={true}/></Sequence>
  <Sequence name="image-058" from={26786} durationInFrames={262} premountFor={fps}><HoldingScene id="image-058" frames={250} asset="full/scenes/image-058.png" fadeIn={true}/></Sequence>
  <Sequence name="image-059" from={27036} durationInFrames={238} premountFor={fps}><HoldingScene id="image-059" frames={226} asset="full/scenes/image-059.png" fadeIn={true}/></Sequence>
  <Sequence name="image-060" from={27262} durationInFrames={226} premountFor={fps}><HoldingScene id="image-060" frames={214} asset="full/scenes/image-060.png" fadeIn={true}/></Sequence>
  <Sequence name="image-061" from={27476} durationInFrames={176} premountFor={fps}><HoldingScene id="image-061" frames={164} asset="full/scenes/image-061.png" fadeIn={true}/></Sequence>
  <Sequence name="image-062" from={27640} durationInFrames={195} premountFor={fps}><HoldingScene id="image-062" frames={183} asset="full/scenes/image-062.png" fadeIn={true}/></Sequence>
  <Sequence name="image-063" from={27823} durationInFrames={256} premountFor={fps}><HoldingScene id="image-063" frames={244} asset="full/scenes/image-063.png" fadeIn={true}/></Sequence>
  <Sequence name="image-064" from={28067} durationInFrames={249} premountFor={fps}><HoldingScene id="image-064" frames={237} asset="full/scenes/image-064.png" fadeIn={true}/></Sequence>
  <Sequence name="image-065" from={28304} durationInFrames={190} premountFor={fps}><HoldingScene id="image-065" frames={178} asset="full/scenes/image-065.png" fadeIn={true}/></Sequence>
  <Sequence name="map-030" from={28482} durationInFrames={809} premountFor={fps}><HoldingScene id="map-030" frames={797} fadeIn={true}/></Sequence>
  <Sequence name="image-066" from={29279} durationInFrames={203} premountFor={fps}><HoldingScene id="image-066" frames={191} asset="full/scenes/image-066.png" fadeIn={true}/></Sequence>
  <Sequence name="map-031" from={29470} durationInFrames={267} premountFor={fps}><HoldingScene id="map-031" frames={255} fadeIn={true}/></Sequence>
  <Sequence name="image-067" from={29725} durationInFrames={119} premountFor={fps}><HoldingScene id="image-067" frames={107} asset="full/scenes/image-067.png" fadeIn={true}/></Sequence>
  <Sequence name="image-068" from={29832} durationInFrames={132} premountFor={fps}><HoldingScene id="image-068" frames={120} asset="full/scenes/image-068.png" fadeIn={true}/></Sequence>
  <Sequence name="image-069" from={29952} durationInFrames={289} premountFor={fps}><HoldingScene id="image-069" frames={277} asset="full/scenes/image-069.png" fadeIn={true}/></Sequence>
  <Sequence name="image-070" from={30229} durationInFrames={214} premountFor={fps}><HoldingScene id="image-070" frames={202} asset="full/scenes/image-070.png" fadeIn={true}/></Sequence>
  <Sequence name="map-032" from={30431} durationInFrames={245} premountFor={fps}><HoldingScene id="map-032" frames={233} fadeIn={true}/></Sequence>
  <Sequence name="image-071" from={30664} durationInFrames={234} premountFor={fps}><HoldingScene id="image-071" frames={222} asset="full/scenes/image-071.png" fadeIn={true}/></Sequence>
  <Sequence name="image-072" from={30886} durationInFrames={162} premountFor={fps}><HoldingScene id="image-072" frames={150} asset="full/scenes/image-072.png" fadeIn={true}/></Sequence>
  <Sequence name="image-073" from={31036} durationInFrames={307} premountFor={fps}><HoldingScene id="image-073" frames={295} asset="full/scenes/image-073.png" fadeIn={true}/></Sequence>
  <Sequence name="map-033" from={31331} durationInFrames={227} premountFor={fps}><HoldingScene id="map-033" frames={215} fadeIn={true}/></Sequence>
  <Sequence name="image-074" from={31546} durationInFrames={288} premountFor={fps}><HoldingScene id="image-074" frames={276} asset="full/scenes/image-074.png" fadeIn={true}/></Sequence>
  <Sequence name="image-075" from={31822} durationInFrames={343} premountFor={fps}><HoldingScene id="image-075" frames={331} asset="full/scenes/image-075.png" fadeIn={true}/></Sequence>
  <Sequence name="image-076" from={32153} durationInFrames={302} premountFor={fps}><HoldingScene id="image-076" frames={290} asset="full/scenes/image-076.png" fadeIn={true}/></Sequence>
  <Sequence name="image-077" from={32443} durationInFrames={117} premountFor={fps}><HoldingScene id="image-077" frames={105} asset="full/scenes/image-077.png" fadeIn={true}/></Sequence>
  <Sequence name="image-078" from={32548} durationInFrames={183} premountFor={fps}><HoldingScene id="image-078" frames={171} asset="full/scenes/image-078.png" fadeIn={true}/></Sequence>
  <Sequence name="image-079" from={32719} durationInFrames={307} premountFor={fps}><HoldingScene id="image-079" frames={295} asset="full/scenes/image-079.png" fadeIn={true}/></Sequence>
  <Sequence name="image-116" from={33014} durationInFrames={276} premountFor={fps}><HoldingScene id="image-116" frames={264} asset="full/scenes/image-116.png" fadeIn={true}/></Sequence>
  <Sequence name="image-080" from={33278} durationInFrames={250} premountFor={fps}><HoldingScene id="image-080" frames={238} asset="full/scenes/image-080.png" fadeIn={true}/></Sequence>
  <Sequence name="image-081" from={33516} durationInFrames={303} premountFor={fps}><HoldingScene id="image-081" frames={291} asset="full/scenes/image-081.png" fadeIn={true}/></Sequence>
  <Sequence name="map-035" from={33807} durationInFrames={619} premountFor={fps}><HoldingScene id="map-035" frames={607} fadeIn={true}/></Sequence>
  <Sequence name="image-082" from={34414} durationInFrames={252} premountFor={fps}><HoldingScene id="image-082" frames={240} asset="full/scenes/image-082.png" fadeIn={true}/></Sequence>
  <Sequence name="image-083" from={34654} durationInFrames={217} premountFor={fps}><HoldingScene id="image-083" frames={205} asset="full/scenes/image-083.png" fadeIn={true}/></Sequence>
  <Sequence name="image-084" from={34859} durationInFrames={305} premountFor={fps}><HoldingScene id="image-084" frames={293} asset="full/scenes/image-084.png" fadeIn={true}/></Sequence>
  <Sequence name="image-085" from={35152} durationInFrames={194} premountFor={fps}><HoldingScene id="image-085" frames={182} asset="full/scenes/image-085.png" fadeIn={true}/></Sequence>
  <Sequence name="map-036" from={35334} durationInFrames={620} premountFor={fps}><HoldingScene id="map-036" frames={608} fadeIn={true}/></Sequence>
  <Sequence name="image-086" from={35942} durationInFrames={168} premountFor={fps}><HoldingScene id="image-086" frames={156} asset="full/scenes/image-086.png" fadeIn={true}/></Sequence>
  <Sequence name="map-037" from={36098} durationInFrames={379} premountFor={fps}><HoldingScene id="map-037" frames={367} fadeIn={true}/></Sequence>
  <Sequence name="image-087" from={36465} durationInFrames={310} premountFor={fps}><HoldingScene id="image-087" frames={298} asset="full/scenes/image-087.png" fadeIn={true}/></Sequence>
  <Sequence name="image-088" from={36763} durationInFrames={211} premountFor={fps}><HoldingScene id="image-088" frames={199} asset="full/scenes/image-088.png" fadeIn={true}/></Sequence>
  <Sequence name="image-089" from={36962} durationInFrames={253} premountFor={fps}><HoldingScene id="image-089" frames={241} asset="full/scenes/image-089.png" fadeIn={true}/></Sequence>
  <Sequence name="image-090" from={37203} durationInFrames={291} premountFor={fps}><HoldingScene id="image-090" frames={279} asset="full/scenes/image-090.png" fadeIn={true}/></Sequence>
  <Sequence name="image-091" from={37482} durationInFrames={352} premountFor={fps}><HoldingScene id="image-091" frames={340} asset="full/scenes/image-091.png" fadeIn={true}/></Sequence>
  <Sequence name="image-092" from={37822} durationInFrames={154} premountFor={fps}><HoldingScene id="image-092" frames={142} asset="full/scenes/image-092.png" fadeIn={true}/></Sequence>
  <Sequence name="map-038" from={37964} durationInFrames={574} premountFor={fps}><HoldingScene id="map-038" frames={562} fadeIn={true}/></Sequence>
  <Sequence name="image-093" from={38526} durationInFrames={257} premountFor={fps}><HoldingScene id="image-093" frames={245} asset="full/scenes/image-093.png" fadeIn={true}/></Sequence>
  <Sequence name="map-039" from={38771} durationInFrames={228} premountFor={fps}><HoldingScene id="map-039" frames={216} fadeIn={true}/></Sequence>
  <Sequence name="image-094" from={38987} durationInFrames={295} premountFor={fps}><HoldingScene id="image-094" frames={283} asset="full/scenes/image-094.png" fadeIn={true}/></Sequence>
  <Sequence name="image-095" from={39270} durationInFrames={345} premountFor={fps}><HoldingScene id="image-095" frames={333} asset="full/scenes/image-095.png" fadeIn={true}/></Sequence>
  <Sequence name="image-096" from={39603} durationInFrames={427} premountFor={fps}><HoldingScene id="image-096" frames={415} asset="full/scenes/image-096.png" fadeIn={true}/></Sequence>
  <Sequence name="image-097" from={40018} durationInFrames={65} premountFor={fps}><HoldingScene id="image-097" frames={53} asset="full/scenes/image-097.png" fadeIn={true}/></Sequence>
  <Sequence name="image-098" from={40071} durationInFrames={68} premountFor={fps}><HoldingScene id="image-098" frames={56} asset="full/scenes/image-098.png" fadeIn={true}/></Sequence>
  <Sequence name="image-099" from={40127} durationInFrames={299} premountFor={fps}><HoldingScene id="image-099" frames={287} asset="full/scenes/image-099.png" fadeIn={true}/></Sequence>
  <Sequence name="map-040" from={40414} durationInFrames={557} premountFor={fps}><HoldingScene id="map-040" frames={545} fadeIn={true}/></Sequence>
  <Sequence name="image-100" from={40959} durationInFrames={355} premountFor={fps}><HoldingScene id="image-100" frames={343} asset="full/scenes/image-100.png" fadeIn={true}/></Sequence>
  <Sequence name="image-101" from={41302} durationInFrames={304} premountFor={fps}><HoldingScene id="image-101" frames={292} asset="full/scenes/image-101.png" fadeIn={true}/></Sequence>
  <Sequence name="image-102" from={41594} durationInFrames={272} premountFor={fps}><HoldingScene id="image-102" frames={260} asset="full/scenes/image-102.png" fadeIn={true}/></Sequence>
  <Sequence name="image-103" from={41854} durationInFrames={218} premountFor={fps}><HoldingScene id="image-103" frames={206} asset="full/scenes/image-103.png" fadeIn={true}/></Sequence>
  <Sequence name="image-104" from={42060} durationInFrames={149} premountFor={fps}><HoldingScene id="image-104" frames={137} asset="full/scenes/image-104.png" fadeIn={true}/></Sequence>
  <Sequence name="image-105" from={42197} durationInFrames={400} premountFor={fps}><HoldingScene id="image-105" frames={388} asset="full/scenes/image-105.png" fadeIn={true}/></Sequence>
  <Sequence name="image-106" from={42585} durationInFrames={266} premountFor={fps}><HoldingScene id="image-106" frames={254} asset="full/scenes/image-106.png" fadeIn={true}/></Sequence>
  <Sequence name="image-107" from={42839} durationInFrames={156} premountFor={fps}><HoldingScene id="image-107" frames={144} asset="full/scenes/image-107.png" fadeIn={true}/></Sequence>
  <Sequence name="image-108" from={42983} durationInFrames={133} premountFor={fps}><HoldingScene id="image-108" frames={121} asset="full/scenes/image-108.png" fadeIn={true}/></Sequence>
  <Sequence name="image-109" from={43104} durationInFrames={184} premountFor={fps}><HoldingScene id="image-109" frames={172} asset="full/scenes/image-109.png" fadeIn={true}/></Sequence>
  <Sequence name="image-110" from={43276} durationInFrames={265} premountFor={fps}><HoldingScene id="image-110" frames={253} asset="full/scenes/image-110.png" fadeIn={true}/></Sequence>
  <Sequence name="image-111" from={43529} durationInFrames={221} premountFor={fps}><HoldingScene id="image-111" frames={209} asset="full/scenes/image-111.png" fadeIn={true}/></Sequence>
  <Sequence name="image-112" from={43738} durationInFrames={288} premountFor={fps}><HoldingScene id="image-112" frames={276} asset="full/scenes/image-112.png" fadeIn={true}/></Sequence>
  <Sequence name="image-113" from={44014} durationInFrames={161} premountFor={fps}><HoldingScene id="image-113" frames={149} asset="full/scenes/image-113.png" fadeIn={true}/></Sequence>
  <Sequence name="image-114" from={44163} durationInFrames={110} premountFor={fps}><HoldingScene id="image-114" frames={110} asset="full/scenes/image-114.png" fadeIn={true}/></Sequence>
 <Audio src={staticFile('narration.mp3')} premountFor={fps}/></AbsoluteFill>;};
