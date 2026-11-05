import React,{useLayoutEffect} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useLoader,useThree} from '@react-three/fiber';
import {TextureLoader,SRGBColorSpace,BackSide,AdditiveBlending} from 'three';
import {AbsoluteFill,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {progress} from './common';
const point=(lon:number,lat:number,r:number):[number,number,number]=>{const a=lon*Math.PI/180,b=lat*Math.PI/180;return [r*Math.cos(b)*Math.cos(a),r*Math.sin(b),-r*Math.cos(b)*Math.sin(a)]};
const Camera=()=>{const f=useCurrentFrame();const p=progress(f,0,160);const {camera}=useThree();useLayoutEffect(()=>{camera.position.set(...point(129+7*p,29+6*p,3.6-.65*p));camera.lookAt(0,0,0);camera.updateProjectionMatrix()},[camera,p]);return null};
const Earth=()=>{const tex=useLoader(TextureLoader,staticFile('maps/world-day.jpg'));tex.colorSpace=SRGBColorSpace;return <>
 <ambientLight intensity={.65}/><directionalLight position={[2,4,-3]} intensity={1}/>
 <mesh><sphereGeometry args={[1,96,64]}/><meshBasicMaterial map={tex} toneMapped={false}/></mesh>
 <mesh scale={1.018}><sphereGeometry args={[1,96,64]}/><shaderMaterial side={BackSide} transparent depthWrite={false} blending={AdditiveBlending} vertexShader={'varying vec3 n; varying vec3 v; void main(){n=normalize(normalMatrix*normal);vec4 p=modelViewMatrix*vec4(position,1.0);v=p.xyz;gl_Position=projectionMatrix*p;}'} fragmentShader={'varying vec3 n; varying vec3 v; void main(){float rim=pow(1.0-abs(dot(normalize(n),normalize(-v))),3.0);gl_FragColor=vec4(.18,.49,.75,rim*.6);}'}/></mesh>
 <mesh position={point(142.5,43.3,1.008)}><sphereGeometry args={[.012,16,16]}/><meshBasicMaterial color="#ffcf83" toneMapped={false}/></mesh>
 </>};
export const GlobeScene=()=>{const {width,height}=useVideoConfig();return <AbsoluteFill style={{background:'radial-gradient(ellipse at 52% 49%,#0c2030 0%,#02070d 70%)'}}><ThreeCanvas width={width} height={height} camera={{fov:40,near:.01,far:100,position:point(129,29,3.6)}} gl={{alpha:true,antialias:true}}><Camera/><Earth/></ThreeCanvas></AbsoluteFill>};
