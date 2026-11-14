"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface StudioCompositionProps {
  mouse: { x: number; y: number };
}

// Interactive 3D Holographic Identity Plaque with Custom Canvas Texture
function IdentityPlaque() {
  const meshRef = useRef<THREE.Mesh>(null);

  const plaqueTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 512);
    bgGrad.addColorStop(0, "#263A50");
    bgGrad.addColorStop(1, "#182433");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 512);

    // Subtle inner border
    ctx.strokeStyle = "rgba(197, 155, 98, 0.4)";
    ctx.lineWidth = 12;
    ctx.strokeRect(24, 24, 976, 464);

    // Accent gold corner marks
    ctx.fillStyle = "#C59B62";
    ctx.fillRect(20, 20, 40, 10);
    ctx.fillRect(20, 20, 10, 40);
    ctx.fillRect(964, 20, 40, 10);
    ctx.fillRect(994, 20, 10, 40);
    ctx.fillRect(20, 482, 40, 10);
    ctx.fillRect(20, 452, 10, 40);
    ctx.fillRect(964, 482, 40, 10);
    ctx.fillRect(994, 452, 10, 40);

    // Top Category label
    ctx.font = "bold 32px 'Courier New', monospace";
    ctx.fillStyle = "#C59B62";
    ctx.textAlign = "center";
    ctx.letterSpacing = "6px";
    ctx.fillText("01 / IDENTITY & PHILOSOPHY", 512, 110);

    // Main Dossier Name
    ctx.font = "bold 56px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.letterSpacing = "4px";
    ctx.fillText("ANMOL MALVIYA", 512, 210);

    // Divider line
    ctx.strokeStyle = "rgba(197, 155, 98, 0.5)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(312, 250);
    ctx.lineTo(712, 250);
    ctx.stroke();

    // Secondary Dossier Title
    ctx.font = "30px 'Courier New', monospace";
    ctx.fillStyle = "#F8F3EB";
    ctx.letterSpacing = "8px";
    ctx.fillText("THE BUILDER'S DOSSIER", 512, 305);

    // Tagline / Motto
    ctx.font = "italic 36px 'Georgia', serif";
    ctx.fillStyle = "#E9DED0";
    ctx.letterSpacing = "1px";
    ctx.fillText("Curious mind, builder at heart.", 512, 395);

    // Status pill
    ctx.font = "bold 22px 'Courier New', monospace";
    ctx.fillStyle = "#C59B62";
    ctx.fillText("● SYSTEM ARCHITECT • AV TECHNOLOGIES", 512, 445);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(Date.now() * 0.0008) * 0.08;
    }
  });

  if (!plaqueTexture) return null;

  return (
    <group position={[0, 0.28, 0.45]}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.85, 0.06]} />
        <meshStandardMaterial
          map={plaqueTexture}
          roughness={0.25}
          metalness={0.2}
          emissive={new THREE.Color("#263A50")}
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Plaque back gold frame */}
      <mesh position={[0, 0, -0.035]}>
        <boxGeometry args={[1.74, 0.89, 0.02]} />
        <meshStandardMaterial color="#C59B62" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function FloatingArtifacts({ mouse }: StudioCompositionProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const outerGyroRef = useRef<THREE.Group>(null);
  const miniSphereRef = useRef<THREE.Mesh>(null);

  // Materials with warm champagne & ivory tones
  const materials = useMemo(() => {
    return {
      champagneMetal: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C59B62"),
        metalness: 0.88,
        roughness: 0.2,
        envMapIntensity: 1.6,
      }),
      deepNavyCeramic: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#263A50"),
        metalness: 0.2,
        roughness: 0.22,
      }),
      ivoryPorcelain: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#F8F3EB"),
        metalness: 0.08,
        roughness: 0.15,
      }),
      softBeigeMatte: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#E9DED0"),
        metalness: 0.1,
        roughness: 0.38,
      }),
      wireframeGold: new THREE.MeshBasicMaterial({
        color: new THREE.Color("#C59B62"),
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      }),
      glowOrb: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#FFF2DC"),
        emissive: new THREE.Color("#C59B62"),
        emissiveIntensity: 0.8,
        roughness: 0.1,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth responsive mouse parallax tilt
    const targetX = mouse.x * 0.5;
    const targetY = mouse.y * 0.38;
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetX, 3.5, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, -targetY, 3.5, delta);

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.22;
      ringRef.current.rotation.x += delta * 0.12;
    }
    if (octaRef.current) {
      octaRef.current.rotation.y += delta * 0.45;
      octaRef.current.rotation.x += delta * 0.25;
    }
    if (torusRef.current) {
      torusRef.current.rotation.y -= delta * 0.28;
    }
    if (outerGyroRef.current) {
      outerGyroRef.current.rotation.y += delta * 0.15;
    }
    if (miniSphereRef.current) {
      const t = state.clock.getElapsedTime();
      miniSphereRef.current.position.y = 1.15 + Math.sin(t * 1.8) * 0.14;
      miniSphereRef.current.position.x = 1.05 + Math.cos(t * 1.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]}>
      {/* Central Architectural Pedestal */}
      <mesh position={[0, -1.05, 0]} material={materials.ivoryPorcelain} receiveShadow castShadow>
        <cylinderGeometry args={[1.5, 1.62, 0.28, 52]} />
      </mesh>
      
      {/* Tier 2 Step Pedestal */}
      <mesh position={[0, -0.85, 0]} material={materials.softBeigeMatte} receiveShadow castShadow>
        <cylinderGeometry args={[1.25, 1.34, 0.2, 52]} />
      </mesh>

      {/* Champagne Gold Ring Trim around Pedestal Base */}
      <mesh position={[0, -0.74, 0]} material={materials.champagneMetal}>
        <torusGeometry args={[1.26, 0.024, 16, 52]} />
      </mesh>

      {/* Centerpiece 3D Holographic Identity Plaque */}
      <IdentityPlaque />

      {/* Architectural Builder Pillar (Back Left) */}
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
        <group position={[-0.85, 0.25, -0.4]}>
          <RoundedBox args={[0.7, 1.35, 0.7]} radius={0.06} smoothness={4} material={materials.ivoryPorcelain} castShadow receiveShadow />
          {/* Accent Gold Corner Wireframe */}
          <mesh position={[0, 0, 0]} material={materials.wireframeGold}>
            <boxGeometry args={[0.72, 1.37, 0.72]} />
          </mesh>
          {/* Top Gold Cap */}
          <mesh position={[0, 0.7, 0]} material={materials.champagneMetal}>
            <cylinderGeometry args={[0.22, 0.22, 0.05, 24]} />
          </mesh>
        </group>
      </Float>

      {/* Deep Navy Monolith (Architect & Systems - Back Right) */}
      <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.35}>
        <group position={[0.85, 0.35, -0.45]}>
          <RoundedBox args={[0.72, 1.55, 0.72]} radius={0.08} smoothness={4} material={materials.deepNavyCeramic} castShadow receiveShadow />
          {/* Subtle champagne halo around the monolith */}
          <mesh position={[0, 0.82, 0]} material={materials.champagneMetal}>
            <torusGeometry args={[0.42, 0.016, 16, 32]} />
          </mesh>
        </group>
      </Float>

      {/* Floating Champagne Octahedron (AI & Innovation) */}
      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={octaRef} position={[-0.1, 1.25, 0.2]} material={materials.champagneMetal} castShadow>
          <octahedronGeometry args={[0.34, 0]} />
        </mesh>
      </Float>

      {/* Floating Orbital Gyroscope Rings */}
      <group ref={outerGyroRef}>
        <mesh ref={ringRef} position={[0, 0.15, 0]} material={materials.champagneMetal}>
          <torusGeometry args={[1.55, 0.018, 16, 72]} />
        </mesh>
        <mesh ref={torusRef} position={[0, 0.15, 0]} rotation={[Math.PI / 3.2, 0, 0]} material={materials.champagneMetal}>
          <torusGeometry args={[1.32, 0.014, 16, 72]} />
        </mesh>
      </group>

      {/* Floating Mini Glowing Satellite Sphere */}
      <mesh ref={miniSphereRef} position={[1.05, 1.15, 0.4]} material={materials.glowOrb} castShadow>
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
      className="relative w-full h-[500px] sm:h-[580px] lg:h-[650px] rounded-3xl bg-gradient-to-b from-[#F8F3EB] to-[#E9DED0]/60 border border-[#E9DED0] shadow-[0_20px_50px_rgba(38,58,80,0.06)] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
    >
      {/* Background Soft Lighting Gradients */}
      <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-[#C59B62]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-80 h-80 rounded-full bg-[#263A50]/8 blur-3xl pointer-events-none" />

      {/* Canvas 3D */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0.95, 4.4], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.8]}
        >
          {/* Refined Studio Warm Editorial Lighting */}
          <ambientLight intensity={1.15} color="#FFFFFF" />
          <directionalLight
            position={[4, 6, 4]}
            intensity={2.3}
            color="#FFFBF5"
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />
          <directionalLight position={[-4, 3, -3]} intensity={0.9} color="#E9DED0" />
          <pointLight position={[0, 1.2, 2.5]} intensity={1.5} color="#C59B62" distance={6} />
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
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E9DED0] text-[11px] font-mono tracking-wider text-[#263A50] shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C59B62] animate-pulse" />
          <span>01 / IDENTITY & PHILOSOPHY • 3D DOSSIER</span>
        </div>
        <span className="text-[10px] font-mono text-[#263A50]/70 hidden sm:inline">
          INTERACTIVE PARALLAX & TILT
        </span>
      </div>
    </div>
  );
}


