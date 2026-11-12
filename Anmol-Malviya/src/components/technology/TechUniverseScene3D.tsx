"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TECHNOLOGY_CATEGORIES, TechStackCategory } from "./techData";

interface TechUniverseScene3DProps {
  selectedCategoryId: string;
  onSelectCategory: (category: TechStackCategory) => void;
  hoveredCategoryId: string | null;
  onHoverCategory: (id: string | null) => void;
}

// ---------------------------------------------------------------------------
// 1. High-Resolution HiDPI Canvas Texture Generator for Ceramic Category Tiles
// ---------------------------------------------------------------------------
function createCategoryTileTexture(category: TechStackCategory, isSelected: boolean) {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, 768, 768);

  // Background rounded squircle with subtle soft shadow & ceramic glaze
  const r = 110;
  const w = 720;
  const h = 720;
  const x = 24;
  const y = 24;

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

  // Ceramic pure white to warm ivory gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 768);
  bgGrad.addColorStop(0, "#FFFFFF");
  bgGrad.addColorStop(0.85, isSelected ? "#FDF8F0" : "#FCF8F2");
  bgGrad.addColorStop(1, isSelected ? "#F7ECDC" : "#F4ECE2");
  ctx.fillStyle = bgGrad;
  ctx.fill();

  // Bevel rim outline
  ctx.lineWidth = isSelected ? 18 : 10;
  ctx.strokeStyle = isSelected ? "#C59B62" : "#EADBCA";
  ctx.stroke();
  ctx.restore();

  // Draw Category Icon centered at top half (Y: 280)
  ctx.save();
  ctx.translate(384, 275);
  ctx.fillStyle = category.color || "#263A50";
  ctx.strokeStyle = category.color || "#263A50";
  ctx.lineWidth = 18;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (category.id === "frontend") {
    // React cyan atom with 3 orbital ellipses & center nucleus
    ctx.beginPath();
    ctx.arc(0, 0, 32, 0, Math.PI * 2);
    ctx.fill();

    for (let i = 0; i < 3; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 3);
      ctx.beginPath();
      ctx.ellipse(0, 0, 132, 48, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  } else if (category.id === "backend") {
    // Hexagon Node JS badge
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 6;
      const hx = Math.cos(angle) * 115;
      const hy = Math.sin(angle) * 115;
      if (i === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.font = "bold 96px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("JS", 0, 10);
  } else if (category.id === "database") {
    // Cylindrical database layers
    [-65, 0, 65].forEach((offsetY) => {
      ctx.beginPath();
      ctx.ellipse(0, offsetY, 105, 34, 0, 0, Math.PI * 2);
      ctx.stroke();
    });
  } else if (category.id === "ai-automation") {
    // 4-Point sparkle star
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const rad = i % 2 === 0 ? 120 : 38;
      const angle = (i * Math.PI) / 4;
      const sx = Math.cos(angle) * rad;
      const sy = Math.sin(angle) * rad;
      if (i === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.closePath();
    ctx.fill();

    // Secondary mini sparkle
    ctx.save();
    ctx.translate(110, -90);
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const rad = i % 2 === 0 ? 45 : 15;
      const angle = (i * Math.PI) / 4;
      const sx = Math.cos(angle) * rad;
      const sy = Math.sin(angle) * rad;
      if (i === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  } else if (category.id === "creative-dev") {
    // Isometric 3D wireframe Cube
    const s = 100;
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
    // Cloud & DevOps icon
    ctx.beginPath();
    ctx.arc(-40, 18, 55, Math.PI * 0.5, Math.PI * 1.5);
    ctx.arc(0, -36, 70, Math.PI * 0.9, Math.PI * 2.1);
    ctx.arc(55, 18, 48, Math.PI * 1.4, Math.PI * 2.5);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();

  // Category Label Text at bottom half (Y: 560-630)
  ctx.fillStyle = "#1E1E1E";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (category.id === "creative-dev") {
    ctx.font = "bold 60px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("Creative", 384, 550);
    ctx.fillText("Development", 384, 625);
  } else if (category.id === "ai-automation") {
    ctx.font = "bold 60px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("AI &", 384, 550);
    ctx.fillText("Automation", 384, 625);
  } else if (category.id === "cloud-devops") {
    ctx.font = "bold 60px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("Cloud &", 384, 550);
    ctx.fillText("DevOps", 384, 625);
  } else {
    ctx.font = "bold 68px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(category.title, 384, 580);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

// ---------------------------------------------------------------------------
// 2. High-Precision 3D Rounded Box Mesh for Ceramic Cushioned Pill Tiles
// ---------------------------------------------------------------------------
function CeramicPill3D({
  category,
  angleOffset,
  rotationAngle,
  radiusX,
  radiusY,
  isSelected,
  isHovered,
  onClick,
  onHover,
}: {
  category: TechStackCategory;
  angleOffset: number;
  rotationAngle: number;
  radiusX: number;
  radiusY: number;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useMemo(
    () => createCategoryTileTexture(category, isSelected),
    [category, isSelected]
  );

  // Ceramic physical materials
  const tileMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FAF6F0"),
      roughness: 0.22,
      metalness: 0.04,
    });
  }, []);

  const borderMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(isSelected ? "#C59B62" : isHovered ? "#DFCEB8" : "#E5DACB"),
      roughness: 0.2,
      metalness: isSelected ? 0.75 : 0.2,
      emissive: new THREE.Color(isSelected ? "#C59B62" : "#000000"),
      emissiveIntensity: isSelected ? 0.35 : 0,
    });
  }, [isSelected, isHovered]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Calculate current position along the ellipse
    const currentAngle = angleOffset + rotationAngle;
    const targetX = Math.cos(currentAngle) * radiusX;
    const targetY = Math.sin(currentAngle) * radiusY;

    // Depth: When sin(angle) < 0 it is top/further back (negative Z), when > 0 it is bottom/front
    const sinA = Math.sin(currentAngle);
    const depthZ = sinA * 0.45;
    const targetZ = isSelected ? depthZ + 0.55 : isHovered ? depthZ + 0.35 : depthZ;

    // Smooth damp positioning
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 10, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 10, delta);
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 10, delta);

    // Dynamic scale based on selection & hover
    const depthScale = 0.94 + (sinA + 1) * 0.06;
    const targetScale = isSelected ? 1.18 : isHovered ? 1.08 : depthScale;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 12
    );

    // Keep card facing camera with subtle parallax tilt
    groupRef.current.rotation.x = -sinA * 0.08;
    groupRef.current.rotation.y = Math.cos(currentAngle) * 0.06;
  });

  return (
    <group
      ref={groupRef}
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
      {/* Soft rounded box base with real physical thickness */}
      <mesh material={tileMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.72, 1.32, 0.22]} />
      </mesh>

      {/* Gold Bevel Rim Detail */}
      <mesh position={[0, 0, -0.015]} material={borderMaterial}>
        <boxGeometry args={[1.78, 1.38, 0.2]} />
      </mesh>

      {/* Front Face Texture Decal */}
      {texture && (
        <mesh position={[0, 0, 0.12]}>
          <planeGeometry args={[1.64, 1.25]} />
          <meshBasicMaterial map={texture} transparent depthWrite={false} />
        </mesh>
      )}

      {/* Soft Contact Shadow plane beneath tile */}
      <mesh position={[0, -0.16, -0.16]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.85, 1.35]} />
        <meshBasicMaterial
          color="#423120"
          transparent
          opacity={isSelected ? 0.28 : isHovered ? 0.2 : 0.12}
        />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// 3. Central 3D Technology Core: Premium Glass Marble Sphere
// ---------------------------------------------------------------------------
function TechGlassCore({
  onCenterClick,
}: {
  onCenterClick: () => void;
}) {
  const sphereRef = useRef<THREE.Group>(null);
  const outerGlassRef = useRef<THREE.Mesh>(null);
  const halo1Ref = useRef<THREE.Mesh>(null);
  const halo2Ref = useRef<THREE.Mesh>(null);

  // Label Decal Texture for Central Glass Core: "</> \n MY TECH \n STACK"
  const decalTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, 1024, 1024);

    // Warm radial core glow behind text
    const grad = ctx.createRadialGradient(512, 512, 0, 512, 512, 480);
    grad.addColorStop(0, "rgba(255, 248, 238, 0.35)");
    grad.addColorStop(0.5, "rgba(197, 155, 98, 0.15)");
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
    ctx.font = "bold 90px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.letterSpacing = "6px";
    ctx.fillText("MY TECH", 512, 535);
    ctx.fillText("STACK", 512, 645);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Premium Physical Glass Material
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FAF4EB"),
      transmission: 0.88,
      transparent: true,
      opacity: 1,
      roughness: 0.08,
      ior: 1.54,
      reflectivity: 0.8,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
  }, []);

  // Warm champagne gold inner core
  const innerCoreMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#C59B62"),
      roughness: 0.32,
      metalness: 0.45,
      emissive: new THREE.Color("#C59B62"),
      emissiveIntensity: 0.45,
    });
  }, []);

  // Champagne-gold metallic ring material
  const goldRingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#DFCBAF"),
      metalness: 0.9,
      roughness: 0.18,
      emissive: new THREE.Color("#C59B62"),
      emissiveIntensity: 0.35,
    });
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Gentle floating
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(t * 1.5) * 0.06;
    }

    // Slow glass shell rotation
    if (outerGlassRef.current) {
      outerGlassRef.current.rotation.y = t * 0.12;
    }

    // Halo rings gentle breathing
    if (halo1Ref.current) {
      halo1Ref.current.rotation.z = t * 0.18;
      halo1Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.08;
    }
    if (halo2Ref.current) {
      halo2Ref.current.rotation.z = -t * 0.15;
      halo2Ref.current.rotation.y = Math.PI / 6 + Math.cos(t * 0.4) * 0.08;
    }
  });

  return (
    <group
      ref={sphereRef}
      position={[0, 0, 0.1]}
      onClick={(e) => {
        e.stopPropagation();
        onCenterClick();
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      {/* Outer Physical Glass Shell */}
      <mesh ref={outerGlassRef} material={glassMaterial} castShadow receiveShadow>
        <sphereGeometry args={[1.32, 64, 64]} />
      </mesh>

      {/* Internal Warm Amber Core */}
      <mesh material={innerCoreMaterial} scale={0.88}>
        <sphereGeometry args={[1.05, 32, 32]} />
      </mesh>

      {/* Center Label Decal Plane (always camera facing) */}
      {decalTexture && (
        <mesh position={[0, 0, 0.8]}>
          <planeGeometry args={[1.52, 1.52]} />
          <meshBasicMaterial map={decalTexture} transparent depthWrite={false} />
        </mesh>
      )}

      {/* Thin Gold Orbital Halo Rings encircling the sphere */}
      <mesh ref={halo1Ref} material={goldRingMaterial} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.78, 0.016, 16, 80]} />
      </mesh>
      <mesh ref={halo2Ref} material={goldRingMaterial} rotation={[-Math.PI / 3.5, Math.PI / 7, 0]}>
        <torusGeometry args={[1.96, 0.013, 16, 80]} />
      </mesh>

      {/* Soft Ground Contact Shadow plane beneath sphere */}
      <mesh position={[0, -1.35, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 1.6]} />
        <meshBasicMaterial color="#5B452D" transparent opacity={0.2} />
      </mesh>

      {/* Warm Point Lights */}
      <pointLight position={[0, 0, 2.4]} intensity={2.6} color="#FFF8EE" distance={7} />
      <pointLight position={[0, 0, -2.2]} intensity={1.2} color="#C59B62" distance={6} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// 4. Master 3D Orbital Scene: Rings, Luminous Nodes & 6 Rotating Ceramic Tiles
// ---------------------------------------------------------------------------
export default function TechUniverseScene3D({
  selectedCategoryId,
  onSelectCategory,
  hoveredCategoryId,
  onHoverCategory,
}: TechUniverseScene3DProps) {
  const sceneGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const luminousNodesRef = useRef<THREE.Group>(null);

  // Rotation animation state
  const rotationAngleRef = useRef(0);
  const isPausedRef = useRef(false);

  // Base angles for the 6 cards matching reference layout
  const categoryBaseAngles: Record<string, number> = {
    frontend: -Math.PI * 0.72,       // Top-left
    backend: -Math.PI * 0.28,        // Top-right
    database: 0.0,                   // Middle-right
    "ai-automation": Math.PI * 0.28,  // Bottom-right
    "creative-dev": Math.PI * 0.72,   // Bottom-left
    "cloud-devops": Math.PI,         // Middle-left
  };

  // Orbital dimensions (matching compact panoramic canvas)
  const RADIUS_X = 3.65;
  const RADIUS_Y = 1.95;

  // Gold material for the wide orbital path rings
  const orbitalGoldMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#DFCBAF"),
      metalness: 0.9,
      roughness: 0.2,
      emissive: new THREE.Color("#C59B62"),
      emissiveIntensity: 0.4,
    });
  }, []);

  const starBeadMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FFFFFF"),
    });
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Infinite smooth rotation of cards on the orbit (pause when hovered)
    if (!isPausedRef.current) {
      rotationAngleRef.current = (rotationAngleRef.current + delta * 0.1) % (Math.PI * 2);
    }

    // Pointer-responsive subtle parallax tilt
    if (sceneGroupRef.current) {
      const targetRotX = -state.pointer.y * 0.12;
      const targetRotY = state.pointer.x * 0.14;
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

    // Luminous nodes slow travel along the ring
    if (luminousNodesRef.current) {
      luminousNodesRef.current.rotation.z = t * 0.08;
    }

    // Subtle breathing on orbital rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = Math.sin(t * 0.3) * 0.02;
    }
  });

  return (
    <group
      ref={sceneGroupRef}
      position={[0, 0, 0]}
      onPointerEnter={() => {
        isPausedRef.current = true;
      }}
      onPointerLeave={() => {
        isPausedRef.current = false;
      }}
    >
      {/* 1. Large Elliptical 3D Golden Orbital Rings matching reference */}
      <group position={[0, 0, -0.05]}>
        {/* Main wide outer orbital ellipse */}
        <mesh ref={ring1Ref} material={orbitalGoldMaterial} scale={[RADIUS_X, RADIUS_Y, 1]}>
          <ringGeometry args={[0.988, 1.0, 96]} />
        </mesh>

        {/* Second tilted intersecting orbital ellipse */}
        <mesh
          ref={ring2Ref}
          material={orbitalGoldMaterial}
          scale={[RADIUS_X * 0.88, RADIUS_Y * 0.85, 1]}
          rotation={[0, 0, -Math.PI / 22]}
        >
          <ringGeometry args={[0.988, 1.0, 96]} />
        </mesh>

        {/* Third inner subtle ring */}
        <mesh
          material={orbitalGoldMaterial}
          scale={[RADIUS_X * 0.58, RADIUS_Y * 0.55, 1]}
        >
          <ringGeometry args={[0.986, 1.0, 80]} />
        </mesh>

        {/* Small luminous star flare beads along rings */}
        <group ref={luminousNodesRef}>
          {[0, Math.PI * 0.35, Math.PI * 0.65, Math.PI * 1.1, Math.PI * 1.45, Math.PI * 1.8].map((ang, i) => (
            <mesh
              key={i}
              position={[Math.cos(ang) * RADIUS_X, Math.sin(ang) * RADIUS_Y, 0.02]}
              material={starBeadMaterial}
            >
              <sphereGeometry args={[0.045, 16, 16]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 2. Central 3D Glass Marble Sphere */}
      <TechGlassCore
        onCenterClick={() => {
          const currIdx = TECHNOLOGY_CATEGORIES.findIndex((c) => c.id === selectedCategoryId);
          const nextIdx = (currIdx + 1) % TECHNOLOGY_CATEGORIES.length;
          onSelectCategory(TECHNOLOGY_CATEGORIES[nextIdx]);
        }}
      />

      {/* 3. Six 3D Ceramic Category Cushioned Pill Tiles */}
      {TECHNOLOGY_CATEGORIES.map((cat) => {
        const baseAngle = categoryBaseAngles[cat.id] ?? 0;
        const isSelected = selectedCategoryId === cat.id;
        const isHovered = hoveredCategoryId === cat.id;

        return (
          <CeramicPill3D
            key={cat.id}
            category={cat}
            angleOffset={baseAngle}
            rotationAngle={rotationAngleRef.current}
            radiusX={RADIUS_X}
            radiusY={RADIUS_Y}
            isSelected={isSelected}
            isHovered={isHovered}
            onClick={() => onSelectCategory(cat)}
            onHover={(hovered) => onHoverCategory(hovered ? cat.id : null)}
          />
        );
      })}

      {/* 4. Studio Lighting Rig: Warm Studio Photography Setup */}
      <ambientLight intensity={1.4} color="#FFFBF5" />
      <directionalLight position={[6, 8, 5]} intensity={2.4} color="#FFFFFF" castShadow />
      <directionalLight position={[-6, -5, -3]} intensity={0.8} color="#E9DED0" />
      <pointLight position={[-4, 2.5, 2]} intensity={0.9} color="#FFFFFF" distance={7} />
      <pointLight position={[4, -2.5, 2]} intensity={0.9} color="#FAF4EB" distance={7} />
    </group>
  );
}
