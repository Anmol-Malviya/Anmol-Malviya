"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface StudioCompositionProps {
  mouse: { x: number; y: number };
}

function FloatingArtifacts({ mouse }: StudioCompositionProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const miniSphereRef = useRef<THREE.Mesh>(null);

  // Materials with warm champagne & ivory tones
  const materials = useMemo(() => {
    return {
      champagneMetal: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C59B62"),
        metalness: 0.85,
        roughness: 0.22,
        envMapIntensity: 1.5,
      }),
      deepNavyCeramic: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#263A50"),
        metalness: 0.15,
        roughness: 0.25,
      }),
      ivoryPorcelain: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#F8F3EB"),
        metalness: 0.05,
        roughness: 0.18,
      }),
      softBeigeMatte: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E9DED0"),
        metalness: 0.1,
        roughness: 0.4,
      }),
      wireframeGold: new THREE.MeshBasicMaterial({
        color: new THREE.Color("#C59B62"),
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth subtle mouse parallax response
    const targetX = mouse.x * 0.45;
    const targetY = mouse.y * 0.35;
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetX, 3.5, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, -targetY, 3.5, delta);

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.25;
      ringRef.current.rotation.x += delta * 0.12;
    }
    if (octaRef.current) {
      octaRef.current.rotation.y += delta * 0.4;
      octaRef.current.rotation.x += delta * 0.2;
    }
    if (torusRef.current) {
      torusRef.current.rotation.y -= delta * 0.3;
    }
    if (miniSphereRef.current) {
      const t = state.clock.getElapsedTime();
      miniSphereRef.current.position.y = 1.1 + Math.sin(t * 1.8) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]}>
      {/* Central Architectural Pedestal */}
      <mesh position={[0, -1.05, 0]} material={materials.ivoryPorcelain} receiveShadow castShadow>
        <cylinderGeometry args={[1.5, 1.6, 0.28, 48]} />
      </mesh>
      
      {/* Tier 2 Step Pedestal */}
      <mesh position={[0, -0.85, 0]} material={materials.softBeigeMatte} receiveShadow castShadow>
        <cylinderGeometry args={[1.25, 1.32, 0.2, 48]} />
      </mesh>

      {/* Champagne Gold Ring Trim around Pedestal Base */}
      <mesh position={[0, -0.74, 0]} material={materials.champagneMetal}>
        <torusGeometry args={[1.26, 0.02, 16, 48]} />
      </mesh>

      {/* Architectural Cube Assembly (Builder Identity) */}
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
        <group position={[-0.45, -0.1, 0.2]}>
          <RoundedBox args={[0.9, 0.9, 0.9]} radius={0.06} smoothness={4} material={materials.ivoryPorcelain} castShadow receiveShadow />
          {/* Accent Gold Corner Wireframe */}
          <mesh position={[0, 0, 0]} material={materials.wireframeGold}>
            <boxGeometry args={[0.92, 0.92, 0.92]} />
          </mesh>
        </group>
      </Float>

      {/* Deep Navy Monolith (Architect & Systems) */}
      <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.35}>
        <group position={[0.55, 0.2, -0.2]}>
          <RoundedBox args={[0.75, 1.4, 0.75]} radius={0.08} smoothness={4} material={materials.deepNavyCeramic} castShadow receiveShadow />
          {/* Subtle champagne halo around the monolith */}
          <mesh position={[0, 0.75, 0]} material={materials.champagneMetal}>
            <torusGeometry args={[0.45, 0.015, 16, 32]} />
          </mesh>
        </group>
      </Float>

      {/* Floating Champagne Octahedron (AI & Innovation) */}
      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={octaRef} position={[-0.1, 0.95, 0.35]} material={materials.champagneMetal} castShadow>
          <octahedronGeometry args={[0.38, 0]} />
        </mesh>
      </Float>

      {/* Floating Orbital Golden Ring */}
      <mesh ref={ringRef} position={[0, 0.1, 0]} material={materials.champagneMetal}>
        <torusGeometry args={[1.45, 0.018, 16, 64]} />
      </mesh>

      {/* Second inclined delicate ring */}
      <mesh ref={torusRef} position={[0, 0.1, 0]} rotation={[Math.PI / 3.5, 0, 0]} material={materials.champagneMetal}>
        <torusGeometry args={[1.2, 0.012, 16, 64]} />
      </mesh>

      {/* Floating Mini Satellite Sphere */}
      <mesh ref={miniSphereRef} position={[1.1, 1.1, 0.4]} material={materials.ivoryPorcelain} castShadow>
        <sphereGeometry args={[0.16, 32, 32]} />
      </mesh>
    </group>
  );
}

export default function About3DScene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  const handlePointerLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] rounded-3xl bg-gradient-to-b from-[#F8F3EB] to-[#E9DED0]/60 border border-[#E9DED0] shadow-[0_20px_50px_rgba(38,58,80,0.06)] overflow-hidden flex items-center justify-center"
    >
      {/* Background Soft Lighting Gradients */}
      <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-[#C59B62]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-80 h-80 rounded-full bg-[#263A50]/8 blur-3xl pointer-events-none" />

      {/* Canvas 3D */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0.9, 4.3], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.8]}
        >
          {/* Refined Studio Warm Editorial Lighting */}
          <ambientLight intensity={1.1} color="#FFFFFF" />
          <directionalLight
            position={[4, 6, 4]}
            intensity={2.2}
            color="#FFFBF5"
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />
          <directionalLight position={[-4, 3, -3]} intensity={0.9} color="#E9DED0" />
          <pointLight position={[0, 1.2, 2.5]} intensity={1.4} color="#C59B62" distance={6} />
          <pointLight position={[-2, -1, 1]} intensity={0.7} color="#263A50" distance={5} />

          {/* Floating Artifacts */}
          <FloatingArtifacts mouse={mousePos} />

          {/* Ground Soft Contact Shadow */}
          <ContactShadows
            position={[0, -1.24, 0]}
            opacity={0.35}
            scale={5.5}
            blur={2.4}
            far={3.5}
            color="#263A50"
          />
        </Canvas>
      </div>

      {/* Minimal Editorial Badge Over 3D Frame */}
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none z-10 px-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF]/85 backdrop-blur-md border border-[#E9DED0] text-[11px] font-mono tracking-wider text-[#263A50] shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C59B62] animate-pulse" />
          <span>ARCHITECTURAL CORE • 3D SPATIAL</span>
        </div>
        <span className="text-[10px] font-mono text-[#263A50]/60 hidden sm:inline">
          INTERACTIVE PARALLAX
        </span>
      </div>
    </div>
  );
}

