"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Environment, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Artifact() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.12;
    }
    if (ring.current) ring.current.rotation.z -= delta * 0.16;
  });
  return <group ref={group}>
    <Float speed={1.15} rotationIntensity={0.18} floatIntensity={0.45}>
      <mesh>
        <icosahedronGeometry args={[1.18, 5]}/>
        <MeshDistortMaterial color="#b9d9ed" roughness={0.19} metalness={0.82} distort={0.24} speed={1.3}/>
      </mesh>
      <mesh scale={1.025}>
        <icosahedronGeometry args={[1.18, 4]}/>
        <meshBasicMaterial color="#4d9dc4" wireframe transparent opacity={0.3}/>
      </mesh>
    </Float>
    <mesh ref={ring} rotation={[1.1, 0.3, 0.2]}>
      <torusGeometry args={[1.72, 0.012, 16, 180]}/>
      <meshStandardMaterial color="#5a9fbe" emissive="#8bc7dc" emissiveIntensity={0.45} metalness={0.8}/>
    </mesh>
    <mesh rotation={[0.35, 0.8, 1.1]}>
      <torusGeometry args={[2.02, 0.006, 8, 180]}/>
      <meshBasicMaterial color="#8bb6cd" transparent opacity={0.7}/>
    </mesh>
    <mesh position={[1.55, 0.82, 0.1]}>
      <sphereGeometry args={[0.075, 24, 24]}/>
      <meshBasicMaterial color="#e2f5ff"/>
    </mesh>
  </group>;
}

export default function FounderScene() {
  return <Canvas camera={{ position: [0, 0, 5.8], fov: 38 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true }}>
    <ambientLight intensity={0.7}/>
    <pointLight position={[3, 3, 4]} intensity={18} color="#d4f2ff"/>
    <pointLight position={[-4, -2, 2]} intensity={10} color="#9cc8ed"/>
    <Artifact/>
    <Stars radius={70} depth={35} count={280} factor={1.4} saturation={0} fade speed={0.2}/>
    <Environment preset="city"/>
  </Canvas>;
}