"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import CentralPillar from "./CentralPillar";
import OrbitalRings from "./OrbitalRings";
import ProjectCard3D from "./ProjectCard3D";
import { PORTFOLIO_PROJECTS, ProjectItem } from "./projectsData";

interface OrbitalSceneProps {
  scrollProgress: number; // 0 to 1 driven by master GSAP ScrollTrigger
  onSelectProject: (project: ProjectItem) => void;
  mousePos: { x: number; y: number };
}

function SceneHierarchy({
  scrollProgress,
  onSelectProject,
  mousePos,
}: OrbitalSceneProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const masterGroupRef = useRef<THREE.Group>(null);

  // Rings opacity synced with stages
  let ringsOpacity = 0.75;
  if (scrollProgress < 0.12) {
    ringsOpacity = (scrollProgress / 0.12) * 0.75;
  } else if (scrollProgress > 0.92) {
    const t = (scrollProgress - 0.92) / 0.08;
    ringsOpacity = Math.max(0, 0.75 * (1 - t * 1.5));
  }

  useFrame((state, delta) => {
    // Camera is steady: pillar size and perspective stay stationary and anchored!
    const targetCamZ = 9.2;
    const targetCamY = 0.35;

    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetCamZ,
      5,
      delta
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      targetCamY,
      5,
      delta
    );

    // Subtle parallax tilt with mouse
    if (masterGroupRef.current) {
      const targetRotX = mousePos.y * 0.04;
      const targetRotY = mousePos.x * 0.07;
      masterGroupRef.current.rotation.x = THREE.MathUtils.damp(
        masterGroupRef.current.rotation.x,
        targetRotX,
        4,
        delta
      );
      masterGroupRef.current.rotation.y = THREE.MathUtils.damp(
        masterGroupRef.current.rotation.y,
        targetRotY,
        4,
        delta
      );
    }
  });

  return (
    <group ref={masterGroupRef}>
      {/* Studio Lighting - warm ambient matching the background photograph */}
      <ambientLight intensity={1.4} color="#FFFDF8" />
      <directionalLight
        position={[5, 8, 6]}
        intensity={1.2}
        color="#FFFDF8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-5, 4, -4]} intensity={0.5} color="#FFE6CD" />
      <pointLight position={[0, 4, 3]} intensity={0.8} color="#FAF6EE" />
      <pointLight position={[0, -1.5, 3.5]} intensity={0.5} color="#FFFDF8" />

      {/* Central Pillar: Constant size, stationary on the podium */}
      <CentralPillar />

      {/* Orbital Glowing Rings - perfectly aligned around pillar */}
      <OrbitalRings scrollProgress={scrollProgress} opacity={ringsOpacity} />

      {/* 8 Compact 3D Floating Project Cards orbiting around the pillar */}
      {PORTFOLIO_PROJECTS.map((project, index) => (
        <ProjectCard3D
          key={project.id}
          project={project}
          index={index}
          totalCards={PORTFOLIO_PROJECTS.length}
          scrollProgress={scrollProgress}
          isHovered={hoveredIndex === index}
          onHover={setHoveredIndex}
          onSelect={onSelectProject}
        />
      ))}
    </group>
  );
}

export default function OrbitalScene({
  scrollProgress,
  onSelectProject,
}: {
  scrollProgress: number;
  onSelectProject: (project: ProjectItem) => void;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full h-full flex items-center justify-center cursor-default"
    >
      <Canvas
        camera={{ position: [0, 0.35, 9.2], fov: 44 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true, // transparent WebGL canvas renders directly over background.png
          powerPreference: "high-performance",
        }}
        shadows
        style={{ width: "100%", height: "100%" }}
      >
        <SceneHierarchy
          scrollProgress={scrollProgress}
          onSelectProject={onSelectProject}
          mousePos={mousePos}
        />
      </Canvas>
    </div>
  );
}
