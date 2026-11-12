"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function CentralPillar() {
  const groupRef = useRef<THREE.Group>(null);

  // Exact front typography matching user reference image
  const faceTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, 1024, 1024);

    // 1. Geometric Cube wireframe icon
    ctx.strokeStyle = "#292821";
    ctx.lineWidth = 11;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // Isometric Cube coordinates centered at X=512, Y=250
    const cx = 512;
    const cy = 250;
    const size = 72;
    const h = size * Math.sin(Math.PI / 6);
    const w = size * Math.cos(Math.PI / 6);

    // Top rhombus
    ctx.beginPath();
    ctx.moveTo(cx, cy - size);
    ctx.lineTo(cx + w, cy - h);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx - w, cy - h);
    ctx.closePath();
    ctx.stroke();

    // Left face
    ctx.beginPath();
    ctx.moveTo(cx - w, cy - h);
    ctx.lineTo(cx - w, cy + h);
    ctx.lineTo(cx, cy + size);
    ctx.lineTo(cx, cy);
    ctx.closePath();
    ctx.stroke();

    // Right face
    ctx.beginPath();
    ctx.moveTo(cx + w, cy - h);
    ctx.lineTo(cx + w, cy + h);
    ctx.lineTo(cx, cy + size);
    ctx.lineTo(cx, cy);
    ctx.closePath();
    ctx.stroke();

    // 2. Bold "Projects" Header
    ctx.fillStyle = "#1E1E1C";
    ctx.font = "bold 66px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Projects", cx, 435);

    // 3. Two-line subtitle
    ctx.fillStyle = "#6B675E";
    ctx.font = "500 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("A collection of real world", cx, 505);
    ctx.fillText("solutions, experiments", cx, 545);
    ctx.fillText("and utilities.", cx, 585);

    // 4. Clean minimal divider line
    ctx.fillStyle = "#C8BFA8";
    ctx.fillRect(cx - 36, 645, 72, 5);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Warm ivory matte ceramic material with soft warm-white reflections
  const pillarMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FAF4EB"),
      roughness: 0.32,
      metalness: 0.04,
      emissive: new THREE.Color("#FFF8EE"),
      emissiveIntensity: 0.18,
      envMapIntensity: 0.8,
    });
  }, []);

  const trimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#E8DEC8"),
      roughness: 0.25,
      metalness: 0.2,
      emissive: new THREE.Color("#FFF5E6"),
      emissiveIntensity: 0.2,
    });
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.20, 0]}>
      {/* Main Architectural Pillar - Seamless clean column extending down to the podium */}
      <mesh position={[0, 0.0, 0]} castShadow receiveShadow material={pillarMaterial}>
        <cylinderGeometry args={[1.04, 1.06, 4.0, 64, 1, false]} />
      </mesh>

      {/* Front Face Typography Decal */}
      {faceTexture && (
        <mesh position={[0, 0.32, 1.07]}>
          <planeGeometry args={[1.65, 1.65]} />
          <meshBasicMaterial map={faceTexture} transparent={true} depthWrite={false} />
        </mesh>
      )}

      {/* Subtle Beveled Top Cap */}
      <mesh position={[0, 2.02, 0]} material={trimMaterial} castShadow>
        <cylinderGeometry args={[0.98, 1.04, 0.05, 64]} />
      </mesh>
      {/* Top rim warm glowing ring */}
      <mesh position={[0, 2.0, 0]}>
        <torusGeometry args={[1.04, 0.016, 16, 64]} />
        <meshBasicMaterial color="#FFECC9" />
      </mesh>

      {/* Soft warm-white ambient illumination matching background */}
      <pointLight position={[0, 0.5, 1.5]} intensity={1.1} distance={5.0} color="#FFF8EE" />
      <pointLight position={[0, -1.0, 1.2]} intensity={0.7} distance={3.5} color="#FFE0C2" />
    </group>
  );
}
