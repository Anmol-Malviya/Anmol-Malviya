"use client";

import dynamic from "next/dynamic";
import { ProjectItem } from "./projectsData";

const OrbitalScene = dynamic(() => import("./OrbitalScene"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#D8C8AD] border-t-[#292821] animate-spin" />
        <span className="text-xs font-mono uppercase tracking-widest text-[#858174]">
          Initializing 3D Orbital Pipeline...
        </span>
      </div>
    </div>
  ),
});

export default function DynamicOrbitalScene({
  scrollProgress,
  onSelectProject,
}: {
  scrollProgress: number;
  onSelectProject: (project: ProjectItem) => void;
}) {
  return (
    <OrbitalScene
      scrollProgress={scrollProgress}
      onSelectProject={onSelectProject}
    />
  );
}

