"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface CircularPedestalProps {
  yOffset?: number;
  scale?: number;
  opacity?: number;
}

export default function CircularPedestal({
  yOffset = -2.6,
  scale = 1,
  opacity = 1,
}: CircularPedestalProps) {
  // Warm-white materials matching reference stage
  const pedestalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FAF6EE"),
      roughness: 0.28,
      metalness: 0.1,
      transparent: true,
      opacity: opacity,
    });
  }, [opacity]);

  const ringGlowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FFE5C2"),
      transparent: true,
      opacity: 0.85 * opacity,
    });
  }, [opacity]);

  return (
    <group position={[0, yOffset, 0]} scale={[scale, scale, scale]}>
      {/* Soft Contact Floor Shadow */}
      <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 3.8, 64]} />
        <meshBasicMaterial
          color="#292821"
          transparent
          opacity={0.16 * opacity}
          depthWrite={false}
        />
      </mesh>

      {/* Main Circular Raised Stepped Dais/Pedestal */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow material={pedestalMaterial}>
        <cylinderGeometry args={[2.55, 2.7, 0.16, 64]} />
      </mesh>

      {/* Upper Tier Disc */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow material={pedestalMaterial}>
        <cylinderGeometry args={[2.35, 2.45, 0.08, 64]} />
      </mesh>

      {/* Inner Glowing Concentric Rim Light (matches reference glowing platform ring) */}
      <mesh position={[0, 0.195, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.28, 2.36, 64]} />
        <primitive object={ringGlowMaterial} attach="material" />
      </mesh>

      {/* Outer Thin Concentric Floor Ring */}
      <mesh position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.95, 3.02, 64]} />
        <meshBasicMaterial
          color="#E8E1D5"
          transparent
          opacity={0.7 * opacity}
          depthWrite={false}
        />
      </mesh>

      {/* Subtle Warm Halo Uplight */}
      <pointLight
        position={[0, 0.28, 0]}
        intensity={1.2 * opacity}
        distance={4.5}
        color="#FFE7C7"
      />
    </group>
  );
}

