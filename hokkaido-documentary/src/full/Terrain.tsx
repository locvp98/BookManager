import React,{useMemo,useLayoutEffect} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useLoader,useThree} from '@react-three/fiber';
import {BufferGeometry,Float32BufferAttribute,TextureLoader,SRGBColorSpace,PerspectiveCamera,Vector3,DoubleSide} from 'three';
import {AbsoluteFill,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {terrainData} from './terrain-data';
import {FONT,GOLD,progress} from '../common';
const KM=111.195,C=Math.cos(43*Math.PI/180);
const elevation=(lon:number,lat:number)=>{const x=Math.max(0,Math.min(180,Math.round((lon-138)/9*180))),y=Math.max(0,Math.min(180,Math.round((46-lat)/6*180)));return terrainData.heightsMeters[y][x]/1000*10};
const xyz=(lon:number,lat:number):[number,number,number]=>[(lon-142.5)*KM*C,elevation(lon,lat),(43-lat)*KM];
const Camera=({position}:{position:[number,number,number]})=>{const {camera}=useThree();useLayoutEffect(()=>{camera.position.set(...position);camera.lookAt(0,0,0);camera.updateProjectionMatrix()},[camera,...position]);return null};
const Surface=({bands}:{bands:boolean})=>{const texture=useLoader(TextureLoader,staticFile('maps/hokkaido-day.jpg'));texture.colorSpace=SRGBColorSpace;
 const geometry=useMemo(()=>{const g=new BufferGeometry(),p:number[]=[],uv:number[]=[],idx:number[]=[],colors:number[]=[];const n=terrainData.width;
 for(let y=0;y<n;y++)for(let x=0;x<n;x++){const lon=138+x/(n-1)*9,lat=46-y/(n-1)*6,h=terrainData.heightsMeters[y][x];p.push(...xyz(lon,lat));uv.push(x/(n-1),1-y/(n-1));colors.push(...(h>1000?[.68,.49,.27]:h>200?[.38,.52,.35]:[.21,.43,.39]));if(y<n-1&&x<n-1){const i=y*n+x;idx.push(i,i+n,i+1,i+1,i+n,i+n+1)}}
 g.setAttribute('position',new Float32BufferAttribute(p,3));g.setAttribute('uv',new Float32BufferAttribute(uv,2));g.setAttribute('color',new Float32BufferAttribute(colors,3));g.setIndex(idx);g.computeVertexNormals();return g},[]);
 return <mesh geometry={geometry}><meshStandardMaterial map={bands?undefined:texture} vertexColors={bands} roughness={1} side={DoubleSide} transparent onBeforeCompile={shader=>{shader.vertexShader='varying vec2 edgeUv;\n'+shader.vertexShader.replace('#include <uv_vertex>','#include <uv_vertex>\nedgeUv=uv;');shader.fragmentShader='varying vec2 edgeUv;\n'+shader.fragmentShader.replace('#include <opaque_fragment>','diffuseColor.a *= smoothstep(0.0,0.04,min(min(edgeUv.x,1.0-edgeUv.x),min(edgeUv.y,1.0-edgeUv.y)));\n#include <opaque_fragment>');}}/></mesh>};
const peaks=[['大雪山系',142.85,43.66],['十勝岳',142.686,43.418],['日高山脈',142.8,42.8]] as const;
export const TerrainScene=({mode='peaks',durationFrames}:{mode?:'peaks'|'bands'|'area';durationFrames?:number})=>{const f=useCurrentFrame(),{width,height,durationInFrames,fps}=useVideoConfig();const p=progress(f,0,(durationFrames||durationInFrames)-1);const position:[number,number,number]=mode==='bands'?[550-100*p,380,550+70*p]:mode==='area'?[180+80*p,850-140*p,550]:[420-140*p,570-80*p,680];
 const camera=new PerspectiveCamera(42,width/height,.1,5000);camera.position.set(...position);camera.lookAt(0,0,0);camera.updateMatrixWorld();camera.updateProjectionMatrix();
 return <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 42%,#173c50,#04111e)',fontFamily:FONT}}>
 <ThreeCanvas width={width} height={height} camera={{fov:42,near:.1,far:5000,position}} gl={{alpha:true,antialias:true}}><Camera position={position}/><ambientLight intensity={1.25}/><directionalLight position={[-400,700,300]} intensity={1.7}/><Surface bands={mode==='bands'}/>{mode==='peaks'&&peaks.map(([name,lon,lat],i)=><mesh key={name} position={(()=>{const a=xyz(lon,lat);a[1]+=8;return a})()} scale={progress(f,(i+.5)*fps,(i+1.5)*fps)}><sphereGeometry args={[4,12,12]}/><meshBasicMaterial color={GOLD}/></mesh>)}</ThreeCanvas>
 <div style={{position:'absolute',left:120,top:100,color:GOLD,fontSize:38,fontWeight:700}}>{mode==='area'?'北海道　約83,000 km²':mode==='bands'?'山地と丘陵が広がる大地':'島を貫く山々'}</div>
 {mode==='peaks'&&peaks.map(([name,lon,lat],i)=>{const a=xyz(lon,lat);a[1]+=8;const v=new Vector3(...a).project(camera);const x=(v.x+1)*width/2,y=(1-v.y)*height/2,dx=[110,-220,100][i],dy=[-110,10,45][i],o=progress(f,(i+1)*fps,(i+2)*fps);return <React.Fragment key={name}><svg width={width} height={height} style={{position:'absolute',opacity:o}}><path d={`M${x},${y} L${x+dx*.65},${y+dy+15} L${x+dx},${y+dy+15}`} fill="none" stroke={GOLD} strokeWidth={1.5}/></svg><div style={{position:'absolute',left:x+dx,top:y+dy,fontSize:32,fontWeight:700,color:'#fff4d9',textShadow:'0 2px 7px #001',opacity:o}}>{name}</div></React.Fragment>})}
 <div style={{position:'absolute',left:120,bottom:80,color:'#c0d1d9',fontSize:22}}>標高データによる立体表示・高さ方向10倍強調</div>
 </AbsoluteFill>};
