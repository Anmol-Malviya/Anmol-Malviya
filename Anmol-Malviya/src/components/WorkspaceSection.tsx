"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Monitor, Laptop, Keyboard, BookOpen, Sun } from "lucide-react";

export default function WorkspaceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
            end: "top 45%",
            scrub: 1,
          },
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }
      );

      gsap.fromTo(
        ".workspace-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "top 40%",
            scrub: 1,
          },
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="workspace"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#FFF5EA] text-[#4B4B4B] py-36 px-6 sm:px-12 md:px-20 overflow-hidden"
    >
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#FFE0C2]/30 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#CBE8C1]/25 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headlineRef} className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE0C2]/60 border border-[#FFD6A6] text-xs font-mono tracking-widest uppercase text-[#4B4B4B] mb-6 shadow-sm">
            <Sun className="w-3.5 h-3.5 text-[#8FBF7A]" />
            Section 05 • Developer Workspace
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#4B4B4B] leading-tight">
            Where ideas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD6A6] via-[#8FBF7A] to-[#4B4B4B]">
              become reality.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-xl text-[#8D857E] font-normal max-w-2xl mx-auto">
            Designing, experimenting, and building products that make technology feel more human.
          </p>
        </div>

        {/* Visual Grid inspired by video's finale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="workspace-card md:col-span-2 p-8 sm:p-12 rounded-3xl bg-[#FFFCF8]/90 backdrop-blur-2xl border border-[#E6E2DC] hover:border-[#FFD6A6] hover:shadow-[0_12px_40px_rgba(255,214,166,0.3)] transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFE0C2]/60 flex items-center justify-center text-[#4B4B4B] shadow-sm">
                  <Monitor className="w-6 h-6 text-[#8FBF7A]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#4B4B4B]">Dual-Monitor Workstation</h3>
                  <p className="text-xs text-[#8D857E]">4K Color-Accurate Engineering Setup</p>
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#CBE8C1]/60 text-[#4B4B4B] border border-[#8FBF7A]/40 font-medium">
                Active Session
              </span>
            </div>

            <p className="text-base text-[#8D857E] font-normal leading-relaxed">
              Equipped with high-refresh panoramic screens configured for simultaneous live code review, 3D WebGL shader inspection, and real-time terminal monitoring.
            </p>

            <div className="mt-10 pt-6 border-t border-[#E6E2DC] flex flex-wrap gap-4 text-xs font-mono text-[#8D857E]">
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-[#8FBF7A]" />
                <span>M-Series Silicon & High-End GPU</span>
              </div>
              <div className="flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-[#8FBF7A]" />
                <span>Custom Mechanical Keyboard</span>
              </div>
            </div>
          </div>

          <div className="workspace-card p-8 sm:p-12 rounded-3xl bg-[#FFFCF8]/90 backdrop-blur-2xl border border-[#E6E2DC] flex flex-col justify-between hover:border-[#FFD6A6] hover:shadow-[0_12px_40px_rgba(255,214,166,0.3)] transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FFE0C2]/60 flex items-center justify-center text-[#8FBF7A] mb-6 shadow-sm">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#4B4B4B]">Continuous Curiosity</h3>
              <p className="mt-4 text-sm sm:text-base text-[#8D857E] font-normal leading-relaxed">
                Surrounded by foundational architecture literature, system design manuals, and hardware experimentation modules.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-[#E6E2DC] text-xs font-mono text-[#8D857E]">
              Clean desk • Zero distractions
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

