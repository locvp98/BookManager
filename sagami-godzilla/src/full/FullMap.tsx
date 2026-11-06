import React from 'react';
import {staticFile,useCurrentFrame} from 'remotion';
import {MapSVG} from './MapSVG';
import {OpeningMap} from './OpeningMap';
import {Geographic3D,JapanGlobe} from './Geographic3D';
const browser=new Set(['map-002','map-010','map-012','map-013','map-027','map-028','map-040']);
export const FullMap=({mapId,durationFrames}:{mapId:string;durationFrames:number})=>{
 const f=useCurrentFrame();
 if(mapId==='map-001')return <OpeningMap/>;
 if(mapId==='map-004')return <JapanGlobe durationFrames={durationFrames}/>;
 if(browser.has(mapId))return <Geographic3D mapId={mapId} durationFrames={durationFrames}/>;
 return <MapSVG id={mapId} frame={f} duration={durationFrames} asset={staticFile}/>;
};
