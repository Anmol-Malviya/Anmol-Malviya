"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DynamicOrbitalScene from "./projects/DynamicOrbitalScene";
import ProjectSpotlightInfo from "./projects/ProjectSpotlightInfo";
import ProjectModal from "./projects/ProjectModal";
import { PORTFOLIO_PROJECTS, ProjectItem } from "./projects/projectsData";

export default function ProjectsSection() {
  const sectionWrapperRef = useRef<HTMLDivElement>(null);
  const stagePinnedRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // MASTER GSAP SCROLLTRIGGER
      // Pinned stage with ~600vh scroll distance
      // scrub: 1.2 for ultra-smooth physical inertia
      const progressProxy = { val: 0 };

      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionWrapperRef.current,
          start: "top top",
          end: "+=600%",
          pin: stagePinnedRef.current,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Self progress 0 to 1
            const p = self.progress;
            setScrollProgress(p);
          },
        },
      });

      // Dummy tween across master timeline to ensure smooth scrub interpolation
      masterTimeline.to(progressProxy, {
        val: 1,
        ease: "none",
        duration: 1,
      });
    }, sectionWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionWrapperRef}
      className="relative w-full bg-[#FAF6EE]"
      style={{
        // High desktop scroll travel distance for 5 cinematic stages
        height: "700vh",
      }}
    >
      {/* 
        STICKY / PINNED VISUAL 3D STAGE (100vh)
        Uses exact user background image behind the 3D scene.
        No generated 3D room, walls, or extraneous environment.
      */}
      <div
        ref={stagePinnedRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Subtle Warm Atmospheric Fill (Preserves original image colors) */}
        <div className="absolute inset-0 bg-[#FFFDF8]/10 pointer-events-none" />

        {/* 3D WebGL Orbital Stage */}
        <div className="relative z-10 w-full h-full">
          <DynamicOrbitalScene
            scrollProgress={scrollProgress}
            onSelectProject={setSelectedProject}
          />
        </div>

        {/* Cinematic Telemetry HUD & Stage Information */}
        <ProjectSpotlightInfo
          scrollProgress={scrollProgress}
          onOpenDetails={(idx) => setSelectedProject(PORTFOLIO_PROJECTS[idx])}
        />
      </div>

      {/* Project Dossier Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
