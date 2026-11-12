"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface TechUniverseCenter3DProps {
  activeCategoryIndex: number | null;
  hoveredIndex: number | null;
  onCenterClick?: () => void;
}

function TechCoreSphere({ activeCategoryIndex, hoveredIndex }: { activeCategoryIndex: number | null; hoveredIndex: number | null }) {
  const outerGlassRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const haloRing1Ref = useRef<THREE.Mesh>(null);
  const haloRing2Ref = useRef<THREE.Mesh>(null);
  const sparklesGroupRef = useRef<THREE.Group>(null);

  // Decal texture for central label: "</> \n MY TECH \n STACK"
  const labelTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, 1024, 1024);

    // Glowing warm radial center behind text
    const rad = ctx.createRadialGradient(512, 512, 0, 512, 512, 480);
    rad.addColorStop(0, "rgba(255, 245, 230, 0.45)");
    rad.addColorStop(0.6, "rgba(197, 155, 98, 0.2)");
    rad.addColorStop(1, "rgba(248, 243, 235, 0)");
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Code Icon "</>"
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 130px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("</>", 512, 380);

    // MY TECH STACK
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 90px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.letterSpacing = "6px";
    ctx.fillText("MY TECH", 512, 540);
    ctx.fillText("STACK", 512, 650);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  }, []);

  const materials = useMemo(() => {
    return {
      glass: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#FAF4EB"),
        transmission: 0.88,
        opacity: 1,
        transparent: true,
        roughness: 0.12,
        ior: 1.52,
        reflectivity: 0.7,
        metalness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      }),
      innerCore: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C59B62"),
        roughness: 0.35,
        metalness: 0.4,
        emissive: new THREE.Color("#C59B62"),
        emissiveIntensity: 0.45,
      }),
      champagneRing: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E8DEC8"),
        metalness: 0.85,
        roughness: 0.2,
        emissive: new THREE.Color("#C59B62"),
        emissiveIntensity: 0.25,
      }),
      goldenGlowRing: new THREE.MeshBasicMaterial({
        color: new THREE.Color("#FFDDA6"),
        wireframe: false,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (outerGlassRef.current) {
      outerGlassRef.current.rotation.y = t * 0.15;
    }
    if (haloRing1Ref.current) {
      haloRing1Ref.current.rotation.z = t * 0.2;
      haloRing1Ref.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
    if (haloRing2Ref.current) {
      haloRing2Ref.current.rotation.z = -t * 0.18;
      haloRing2Ref.current.rotation.y = Math.cos(t * 0.35) * 0.2;
    }
    if (sparklesGroupRef.current) {
      sparklesGroupRef.current.rotation.y = t * 0.3;
    }
  });

  const isHighlighted = activeCategoryIndex !== null || hoveredIndex !== null;

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Frosted Glass Sphere with Specular Refraction */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <group>
          <mesh ref={outerGlassRef} material={materials.glass} castShadow receiveShadow>
            <sphereGeometry args={[1.35, 64, 64]} />
          </mesh>

          {/* Central Label Decal Plane inside Sphere */}
          {labelTexture && (
            <mesh position={[0, 0, 0.75]}>
              <planeGeometry args={[1.5, 1.5]} />
              <meshBasicMaterial map={labelTexture} transparent depthWrite={false} />
            </mesh>
          )}

          {/* Inner Warm Glowing Core */}
          <mesh ref={innerCoreRef} material={materials.innerCore} scale={0.88}>
            <sphereGeometry args={[1.05, 32, 32]} />
          </mesh>
        </group>
      </Float>

      {/* Orbiting Thin Golden Rings around Sphere */}
      <mesh ref={haloRing1Ref} material={materials.champagneRing} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.85, 0.015, 16, 80]} />
      </mesh>

      <mesh ref={haloRing2Ref} material={materials.champagneRing} rotation={[-Math.PI / 5, Math.PI / 6, 0]}>
        <torusGeometry args={[2.05, 0.012, 16, 80]} />
      </mesh>

      {/* Little floating gold nodes */}
      <group ref={sparklesGroupRef}>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI) / 2;
          const radius = 2.15;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * radius, Math.sin(angle * 1.5) * 0.4, Math.sin(angle) * radius]}
              material={materials.goldenGlowRing}
            >
              <sphereGeometry args={[0.035, 16, 16]} />
            </mesh>
          );
        })}
      </group>

      {/* Dynamic Warm Illumination */}
      <pointLight
        position={[0, 0, 1.8]}
        intensity={isHighlighted ? 2.8 : 1.8}
        color="#FFF6E8"
        distance={6}
      />
      <pointLight
        position={[0, 0, -1.8]}
        intensity={1.0}
        color="#C59B62"
        distance={5}
      />
    </group>
  );
}

export default function TechUniverseCenter3D({
  activeCategoryIndex,
  hoveredIndex,
  onCenterClick,
}: TechUniverseCenter3DProps) {
  return (
    <div
      onClick={onCenterClick}
      className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] flex items-center justify-center cursor-pointer select-none"
    >
      {/* Outer ambient warm halo behind 3D core */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#C59B62]/30 via-[#FAF4EB]/60 to-[#FFFFFF]/80 blur-2xl pointer-events-none" />

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 4.4], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.8]}
        >
          <ambientLight intensity={1.2} color="#FFFFFF" />
          <directionalLight position={[4, 5, 4]} intensity={2.0} color="#FFFBF5" />
          <directionalLight position={[-4, -3, -2]} intensity={0.8} color="#C59B62" />
          <TechCoreSphere activeCategoryIndex={activeCategoryIndex} hoveredIndex={hoveredIndex} />
        </Canvas>
      </div>
    </div>
  );
}

