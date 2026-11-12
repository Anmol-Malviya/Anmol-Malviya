"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { TECHNOLOGY_CATEGORIES, TechStackCategory } from "./techData";

interface TechUniverseScene3DProps {
  selectedCategoryId: string;
  onSelectCategory: (category: TechStackCategory) => void;
  hoveredCategoryId: string | null;
  onHoverCategory: (id: string | null) => void;
}

// Helper to draw a sleek rounded square icon texture onto canvas
function createCategoryTileTexture(category: TechStackCategory, isSelected: boolean) {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, 512, 512);

  // Background rounded squircle with subtle soft shadow / clay bevel
  const r = 68;
  const w = 480;
  const h = 480;
  const x = 16;
  const y = 16;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();

  // Ceramic white fill
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 512);
  bgGrad.addColorStop(0, "#FFFFFF");
  bgGrad.addColorStop(1, isSelected ? "#F3EADF" : "#F7F2EC");
  ctx.fillStyle = bgGrad;
  ctx.fill();

  // Subtle border
  ctx.lineWidth = isSelected ? 12 : 6;
  ctx.strokeStyle = isSelected ? "#C59B62" : "#E2D7C8";
  ctx.stroke();
  ctx.restore();

  // Draw Category Icon
  ctx.save();
  ctx.translate(256, 195);
  ctx.fillStyle = category.color || "#263A50";
  ctx.strokeStyle = category.color || "#263A50";
  ctx.lineWidth = 14;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (category.id === "frontend") {
    // Atom React-like ellipse rings
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.fill();

    for (let i = 0; i < 3; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 3);
      ctx.beginPath();
      ctx.ellipse(0, 0, 85, 32, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  } else if (category.id === "backend") {
    // Hexagon Node-like shape
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 6;
      const hx = Math.cos(angle) * 75;
      const hy = Math.sin(angle) * 75;
      if (i === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.font = "bold 64px -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("JS", 0, 6);
  } else if (category.id === "database") {
    // 3 Cylindrical database layers
    [-42, 0, 42].forEach((offsetY) => {
      ctx.beginPath();
      ctx.ellipse(0, offsetY, 65, 20, 0, 0, Math.PI * 2);
      ctx.stroke();
    });
  } else if (category.id === "ai-automation") {
    // Sparkle star icon
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const rad = i % 2 === 0 ? 80 : 25;
      const angle = (i * Math.PI) / 4;
      const sx = Math.cos(angle) * rad;
      const sy = Math.sin(angle) * rad;
      if (i === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.closePath();
    ctx.fill();
  } else if (category.id === "creative-dev") {
    // Isometric 3D wireframe Cube
    const s = 65;
    const h = s * Math.sin(Math.PI / 6);
    const w = s * Math.cos(Math.PI / 6);

    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(w, -h);
    ctx.lineTo(0, 0);
    ctx.lineTo(-w, -h);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-w, -h);
    ctx.lineTo(-w, h);
    ctx.lineTo(0, s);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w, -h);
    ctx.lineTo(w, h);
    ctx.lineTo(0, s);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.stroke();
  } else {
    // Cloud icon
    ctx.beginPath();
    ctx.arc(-25, 10, 35, Math.PI * 0.5, Math.PI * 1.5);
    ctx.arc(0, -25, 45, Math.PI * 0.9, Math.PI * 2.1);
    ctx.arc(35, 10, 30, Math.PI * 1.4, Math.PI * 2.5);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();

  // Category Label Text
  ctx.fillStyle = "#263A50";
  ctx.font = "bold 44px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (category.id === "creative-dev") {
    ctx.font = "bold 38px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("Creative", 256, 360);
    ctx.fillText("Development", 256, 410);
  } else if (category.id === "ai-automation") {
    ctx.font = "bold 38px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("AI &", 256, 360);
    ctx.fillText("Automation", 256, 410);
  } else if (category.id === "cloud-devops") {
    ctx.font = "bold 38px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("Cloud &", 256, 360);
    ctx.fillText("DevOps", 256, 410);
  } else {
    ctx.fillText(category.title, 256, 385);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

// 3D Category Pill/Button placed on the orbital rings
function CategoryPill3D({
  category,
  position,
  isSelected,
  isHovered,
  onClick,
  onHover,
}: {
  category: TechStackCategory;
  position: [number, number, number];
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useMemo(
    () => createCategoryTileTexture(category, isSelected),
    [category, isSelected]
  );

  const tileMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FAF6F0"),
      roughness: 0.28,
      metalness: 0.05,
    });
  }, []);

  const borderMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(isSelected ? "#C59B62" : isHovered ? "#DFCEB8" : "#E5DACB"),
      roughness: 0.2,
      metalness: isSelected ? 0.6 : 0.2,
      emissive: new THREE.Color(isSelected ? "#C59B62" : "#000000"),
      emissiveIntensity: isSelected ? 0.25 : 0,
    });
  }, [isSelected, isHovered]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScale = isSelected ? 1.15 : isHovered ? 1.08 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 10);

    const targetZ = isSelected ? position[2] + 0.35 : isHovered ? position[2] + 0.18 : position[2];
    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, targetZ, 8, delta);
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        onHover(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "auto";
        onHover(false);
      }}
    >
      {/* Soft rounded box base (squircle button) */}
      <mesh material={tileMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.65, 1.35, 0.22]} />
      </mesh>

      {/* Subtle border trim */}
      <mesh position={[0, 0, -0.01]} material={borderMaterial}>
        <boxGeometry args={[1.72, 1.42, 0.2]} />
      </mesh>

      {/* Front Face Texture Decal */}
      {texture && (
        <mesh position={[0, 0, 0.12]}>
          <planeGeometry args={[1.56, 1.28]} />
          <meshBasicMaterial map={texture} transparent depthWrite={false} />
        </mesh>
      )}

      {/* Warm bottom shadow plane for realistic floating illusion */}
      <mesh position={[0, -0.15, -0.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.8, 1.2]} />
        <meshBasicMaterial color="#263A50" transparent opacity={isSelected ? 0.18 : 0.08} />
      </mesh>
    </group>
  );
}

// Complete 3D Orbital Scene
function OrbitalExperienceScene({
  selectedCategoryId,
  onSelectCategory,
  hoveredCategoryId,
  onHoverCategory,
}: TechUniverseScene3DProps) {
  const { mouse } = useThree();
  const sceneGroupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Label Decal Texture for Central Sphere
  const centerDecalTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, 1024, 1024);

    // Subtle soft champagne glow
    const grad = ctx.createRadialGradient(512, 512, 0, 512, 512, 450);
    grad.addColorStop(0, "rgba(255, 248, 238, 0.45)");
    grad.addColorStop(0.5, "rgba(197, 155, 98, 0.18)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Code Icon "</>"
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 130px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("</>", 512, 380);

    // "MY TECH STACK" text exactly like reference
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 88px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
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

  // Ceramic & Glass materials matching reference image
  const glassCoreMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FAF4EB"),
      transmission: 0.88,
      transparent: true,
      opacity: 1,
      roughness: 0.12,
      ior: 1.52,
      reflectivity: 0.7,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
  }, []);

  const innerCoreMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#C59B62"),
      roughness: 0.35,
      metalness: 0.4,
      emissive: new THREE.Color("#C59B62"),
      emissiveIntensity: 0.45,
    });
  }, []);

  const orbitalGoldRingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#DEC8A8"),
      metalness: 0.85,
      roughness: 0.22,
      emissive: new THREE.Color("#C59B62"),
      emissiveIntensity: 0.3,
    });
  }, []);

  // Exact 6 Orbital coordinates matching reference image layout:
  // Center is at (0, 0, 0)
  // 1. Frontend: top-left [-2.1, 1.65, 0.1]
  // 2. Backend: top-right [2.1, 1.65, 0.1]
  // 3. Database: middle-right [3.45, 0.05, 0.15]
  // 4. AI & Automation: bottom-right [2.1, -1.65, 0.2]
  // 5. Creative Development: bottom-left [-2.1, -1.65, 0.2]
  // 6. Cloud & DevOps: middle-left [-3.45, 0.05, 0.15]
  const categoryPositions: Record<string, [number, number, number]> = {
    frontend: [-2.15, 1.68, 0.12],
    backend: [2.15, 1.68, 0.12],
    database: [3.42, 0.02, 0.15],
    "ai-automation": [2.15, -1.68, 0.18],
    "creative-dev": [-2.15, -1.68, 0.18],
    "cloud-devops": [-3.42, 0.02, 0.15],
  };

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Responsive subtle mouse tilt parallax on the whole 3D ecosystem
    if (sceneGroupRef.current) {
      const targetRotX = -mouse.y * 0.18;
      const targetRotY = mouse.x * 0.22;
      sceneGroupRef.current.rotation.x = THREE.MathUtils.damp(
        sceneGroupRef.current.rotation.x,
        targetRotX,
        4,
        delta
      );
      sceneGroupRef.current.rotation.y = THREE.MathUtils.damp(
        sceneGroupRef.current.rotation.y,
        targetRotY,
        4,
        delta
      );
    }

    // Rings slow breathing & slight shimmer
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = Math.sin(t * 0.3) * 0.04;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -Math.sin(t * 0.25) * 0.05;
    }
  });

  return (
    <group ref={sceneGroupRef} position={[0, 0, 0]}>
      {/* 1. Large Elliptical Golden Orbital Path Rings matching reference image */}
      <group position={[0, 0, -0.1]}>
        {/* Main wide outer orbital ellipse */}
        <mesh ref={ring1Ref} material={orbitalGoldRingMaterial} scale={[4.2, 2.35, 1]}>
          <ringGeometry args={[0.985, 1.0, 96]} />
        </mesh>

        {/* Second tilted elliptical ring */}
        <mesh
          ref={ring2Ref}
          material={orbitalGoldRingMaterial}
          scale={[3.6, 2.05, 1]}
          rotation={[0, 0, Math.PI / 18]}
        >
          <ringGeometry args={[0.985, 1.0, 96]} />
        </mesh>
      </group>

      {/* 2. Central Glass Technology Sphere ("</> MY TECH STACK") */}
      <Float speed={1.8} rotationIntensity={0.12} floatIntensity={0.25}>
        <group
          ref={coreRef}
          position={[0, 0, 0.1]}
          onClick={() => {
            // Cycle category
            const currIdx = TECHNOLOGY_CATEGORIES.findIndex((c) => c.id === selectedCategoryId);
            const nextIdx = (currIdx + 1) % TECHNOLOGY_CATEGORIES.length;
            onSelectCategory(TECHNOLOGY_CATEGORIES[nextIdx]);
          }}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
          }}
        >
          {/* Frosted Physical Glass Shell */}
          <mesh material={glassCoreMaterial} castShadow receiveShadow>
            <sphereGeometry args={[1.28, 64, 64]} />
          </mesh>

          {/* Internal Warm Amber Core */}
          <mesh material={innerCoreMaterial} scale={0.88}>
            <sphereGeometry args={[1.0, 32, 32]} />
          </mesh>

          {/* Front Label Decal Plane */}
          {centerDecalTexture && (
            <mesh position={[0, 0, 0.72]}>
              <planeGeometry args={[1.5, 1.5]} />
              <meshBasicMaterial map={centerDecalTexture} transparent depthWrite={false} />
            </mesh>
          )}

          {/* Golden Halo Ring encircling the center sphere */}
          <mesh material={orbitalGoldRingMaterial} rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[1.72, 0.018, 16, 80]} />
          </mesh>
          <mesh material={orbitalGoldRingMaterial} rotation={[-Math.PI / 3.5, Math.PI / 8, 0]}>
            <torusGeometry args={[1.9, 0.014, 16, 80]} />
          </mesh>
        </group>
      </Float>

      {/* 3. Six 3D Category Ceramic Buttons Positioned Along the Orbits */}
      {TECHNOLOGY_CATEGORIES.map((category) => {
        const pos = categoryPositions[category.id] || [0, 0, 0];
        const isSelected = selectedCategoryId === category.id;
        const isHovered = hoveredCategoryId === category.id;

        return (
          <CategoryPill3D
            key={category.id}
            category={category}
            position={pos}
            isSelected={isSelected}
            isHovered={isHovered}
            onClick={() => onSelectCategory(category)}
            onHover={(hovered) => onHoverCategory(hovered ? category.id : null)}
          />
        );
      })}

      {/* 4. Warm Point Lights for Realistic Depth & Specular Reflections */}
      <pointLight position={[0, 0, 2.8]} intensity={2.2} color="#FFF8EE" distance={8} />
      <pointLight position={[0, 0, -2.5]} intensity={1.2} color="#C59B62" distance={7} />
      <pointLight position={[-3.5, 2, 2]} intensity={0.9} color="#FFFFFF" distance={6} />
      <pointLight position={[3.5, -2, 2]} intensity={0.9} color="#FAF4EB" distance={6} />
    </group>
  );
}

export default function TechUniverseScene3D({
  selectedCategoryId,
  onSelectCategory,
  hoveredCategoryId,
  onHoverCategory,
}: TechUniverseScene3DProps) {
  return (
    <div className="relative w-full h-[540px] lg:h-[620px] select-none">
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.8]}
      >
        <ambientLight intensity={1.3} color="#FFFFFF" />
        <directionalLight position={[5, 7, 5]} intensity={2.2} color="#FFFBF5" castShadow />
        <directionalLight position={[-5, -4, -3]} intensity={0.8} color="#E9DED0" />

        <OrbitalExperienceScene
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={onSelectCategory}
          hoveredCategoryId={hoveredCategoryId}
          onHoverCategory={onHoverCategory}
        />
      </Canvas>
    </div>
  );
}

