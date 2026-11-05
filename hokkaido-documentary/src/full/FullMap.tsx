import React from 'react';
import {staticFile,useCurrentFrame} from 'remotion';
import {MapSVG} from './MapSVG';
import {GlobeScene} from '../Globe';
import {TerrainScene} from './Terrain';
import {LatitudeGlobe} from './LatitudeGlobe';
export const browserMapIds=['map-001','map-002','map-010','map-020','map-027','map-028'];
export const FullMapShot=({mapId='map-018',durationFrames=600}:{mapId?:string;durationFrames?:number})=>{
 const frame=useCurrentFrame();
 if(mapId==='map-001')return <GlobeScene/>;
 if(mapId==='map-020')return <LatitudeGlobe durationFrames={durationFrames}/>;
 if(mapId==='map-010')return <TerrainScene mode="area" durationFrames={durationFrames}/>;
 if(mapId==='map-027')return <TerrainScene mode="peaks" durationFrames={durationFrames}/>;
 if(mapId==='map-028')return <TerrainScene mode="bands" durationFrames={durationFrames}/>;
 return <MapSVG id={mapId} frame={frame} duration={durationFrames} asset={staticFile}/>;
};
