import React, {useLayoutEffect} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useLoader,useThree} from '@react-three/fiber';
import {TextureLoader,SRGBColorSpace,BackSide,AdditiveBlending} from 'three';
import {AbsoluteFill,Easing,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Grade} from './Grade';
const position=(lon:number,lat:number,r:number):[number,number,number]=>{const a=lon*Math.PI/180,b=lat*Math.PI/180;return [r*Math.cos(b)*Math.cos(a),r*Math.sin(b),-r*Math.cos(b)*Math.sin(a)];};
const Camera=({lon,lat,r}:{lon:number;lat:number;r:number})=>{const {camera}=useThree();useLayoutEffect(()=>{camera.position.set(...position(lon,lat,r));camera.lookAt(0,0,0);camera.updateProjectionMatrix();},[camera,lon,lat,r]);return null;};
const Planet=()=>{
 const texture=useLoader(TextureLoader,staticFile('earth-night.jpg'));texture.colorSpace=SRGBColorSpace;
 return <>
 <ambientLight intensity={.3}/><directionalLight position={[-3,5,4]} intensity={.7}/>
 <mesh><sphereGeometry args={[1,96,64]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
 <mesh scale={1.014}><sphereGeometry args={[1,96,64]}/><shaderMaterial side={BackSide} transparent blending={AdditiveBlending} depthWrite={false}
 vertexShader={'varying vec3 vNormal; varying vec3 vPosition; void main(){vNormal=normalize(normalMatrix*normal);vec4 p=modelViewMatrix*vec4(position,1.0);vPosition=p.xyz;gl_Position=projectionMatrix*p;}'}
 fragmentShader={'varying vec3 vNormal; varying vec3 vPosition; void main(){float rim=pow(1.0-abs(dot(normalize(vNormal),normalize(-vPosition))),3.0);gl_FragColor=vec4(0.12,0.43,0.8,rim*0.65);}'}/></mesh>
 </>;
};
export const Orbit=()=>{
 const f=useCurrentFrame();const {width,height,durationInFrames}=useVideoConfig();
 const ease={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const,easing:Easing.bezier(.33,0,.2,1)};
 return <AbsoluteFill style={{background:'#01040a'}}>
 <svg width={width} height={height} style={{position:'absolute'}}>{Array.from({length:160},(_,i)=><circle key={i} cx={(i*733.17)%width} cy={(i*379.43)%height} r={i%7===0?1.1:.55} fill="#d4e9ff" opacity={.13+(i%5)*.07}/>)}</svg>
 <ThreeCanvas width={width} height={height} camera={{fov:42,near:.01,far:100,position:position(-108,31,3.6)}} gl={{alpha:true,antialias:true}}>
 <Camera lon={interpolate(f,[0,durationInFrames-1],[-112,-101],ease)} lat={interpolate(f,[0,durationInFrames-1],[28,37],ease)} r={interpolate(f,[0,durationInFrames-1],[3.6,2.05],ease)}/>
 <Planet/></ThreeCanvas><Grade/>
 </AbsoluteFill>;
};
