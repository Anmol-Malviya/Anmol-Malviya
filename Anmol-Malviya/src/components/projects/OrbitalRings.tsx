"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface OrbitalRingsProps {
  scrollProgress: number; // 0 to 1
  opacity?: number;
}

export default function OrbitalRings({
  scrollProgress,
  opacity = 0.85,
}: OrbitalRingsProps) {
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);

  // Luminous warm champagne-white glowing rings
  const ringGlowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FFECC9"),
      transparent: true,
      opacity: Math.max(0, Math.min(1, opacity)),
      side: THREE.DoubleSide,
    });
  }, [opacity]);

  const outerRingMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FFF8EE"),
      transparent: true,
      opacity: Math.max(0, Math.min(1, opacity * 0.75)),
      side: THREE.DoubleSide,
    });
  }, [opacity]);

  useFrame((_, delta) => {
    const scrollAngle = scrollProgress * Math.PI * 4;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y = scrollAngle * 0.8;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -scrollAngle * 0.6;
    }
  });

  return (
    // Aligned around central pillar (shifted 10px down with pillar to Y = 0.34)
    <group position={[0, 0.34, 0]}>
      {/* Primary Luminous Orbital Ring (waist height through cards) - radius 4.4 */}
      <group ref={ring1Ref} position={[0, 0.15, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.38, 4.44, 128]} />
          <primitive object={ringGlowMaterial} attach="material" />
        </mesh>
      </group>

      {/* Secondary Outer Concentric Ring - radius 5.3 */}
      <group ref={ring2Ref} position={[0, -0.2, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[5.28, 5.32, 128]} />
          <primitive object={outerRingMaterial} attach="material" />
        </mesh>
      </group>
    </group>
  );
}
