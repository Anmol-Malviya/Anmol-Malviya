"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Train, ChevronRight } from "lucide-react";
import TrainSceneWrapper from "./journey/TrainSceneWrapper";
import { JOURNEY_MILESTONES } from "./journey/journeyData";

export default function JourneySection() {
  const sectionWrapperRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionWrapperRef.current,
          start: "top top",
          end: "+=500%",
          pin: pinContainerRef.current,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            if (progressLineRef.current) {
              progressLineRef.current.style.width = `${p * 100}%`;
            }
          },
        },
      });

      masterTimeline.to({}, { duration: 1 });
    }, sectionWrapperRef);

    return () => ctx.revert();
  }, []);

  const activeIndex = Math.min(
    JOURNEY_MILESTONES.length - 1,
    Math.floor(scrollProgress * JOURNEY_MILESTONES.length)
  );

  return (
    <section
      id="journey"
      ref={sectionWrapperRef}
      className="relative w-full bg-[#FAF6EE] text-[#292821]"
      style={{ height: "600vh" }}
    >
      {/* Pinned 100vh Viewport Stage */}
      <div
        ref={pinContainerRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between py-8 px-6 sm:px-12 md:px-16"
      >
        {/* Soft Architectural Ambient Lights */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-[#FFE0C2]/30 blur-[180px] rounded-full" />
          <div className="absolute -bottom-32 right-1/4 w-[600px] h-[600px] bg-[#CBE8C1]/20 blur-[180px] rounded-full" />
        </div>

        {/* Section Top Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-7xl mx-auto w-full pt-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#EAE2D6] text-xs font-mono uppercase tracking-widest text-[#858174] mb-3 shadow-sm">
              <Train className="w-3.5 h-3.5 text-[#8FBF7A]" /> 3D Journey Express • Career Odyssey
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Learning, building,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9A46F] via-[#8FBF7A] to-[#292821]">
                moving forward.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-6 text-sm font-mono text-[#858174]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8FBF7A] animate-ping" />
              <span>CARRIAGE {activeIndex + 1} / {JOURNEY_MILESTONES.length}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span>SCROLL TO ADVANCE TRAIN</span>
              <ChevronRight className="w-4 h-4 text-[#8FBF7A] animate-pulse" />
            </div>
          </div>
        </div>

        {/* 3D WebGL Train Canvas Stage */}
        <div className="relative z-10 w-full h-[62vh] my-auto">
          <TrainSceneWrapper scrollProgress={scrollProgress} />
        </div>

        {/* Bottom Railroad Track Progress Line */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pb-3">
          <div className="w-full h-1.5 rounded-full bg-[#EAE2D6] overflow-hidden">
            <div
              ref={progressLineRef}
              className="h-full bg-gradient-to-r from-[#D9A46F] via-[#8FBF7A] to-[#292821] transition-all duration-100 ease-out"
              style={{ width: "0%" }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] font-mono text-[#858174] mt-3">
            <span>2022 • FOUNDATIONS</span>
            <span>ACTIVE LEADERSHIP • PM & DEV</span>
            <span>2026+ • BEYOND</span>
          </div>
        </div>
      </div>
    </section>
  );
}
