"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Monitor, Laptop, Keyboard, BookOpen, Sun, Cpu } from "lucide-react";

export default function WorkspaceScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".workspace-element",
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
      className="relative min-h-screen w-full bg-[#030611] text-white py-32 px-6 sm:px-12 md:px-20 overflow-hidden"
    >
      {/* Warm natural light ambient halo inspired by reference video */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-sky-400/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-400/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 workspace-element">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono tracking-widest uppercase text-sky-300 mb-6">
            <Sun className="w-3.5 h-3.5 text-amber-300" />
            Scene 06 • Developer Workspace
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Dream. Design.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300">
              Develop. Repeat.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70 font-light">
            An intentionally designed ergonomic studio crafted for deep focus, creative flow, and building next-generation digital products.
          </p>
        </div>

        {/* Visual Architectural Grid of the Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Rig Card */}
          <div className="workspace-element md:col-span-2 p-8 sm:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 relative overflow-hidden group hover:border-sky-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Dual-Display Command Center</h3>
                  <p className="text-xs text-white/50">4K High Color-Accuracy Color Calibrated</p>
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active Session
              </span>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-white/70 font-light">
              <p>
                Equipped with ultra-crisp panoramic screens configured for simultaneous live code review, 3D WebGL shader inspection, and real-time terminal monitoring.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4 text-xs font-mono text-white/60">
              <div className="flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-sky-400" />
                <span>M-Series Silicon & High-End GPU</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Keyboard className="w-4 h-4 text-sky-400" />
                <span>Custom Mechanical Board</span>
              </div>
            </div>
          </div>

          {/* Minimalist Desk Philosophy */}
          <div className="workspace-element p-8 sm:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 flex flex-col justify-between group hover:border-sky-500/40 transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Continuous Curiosity</h3>
              <p className="mt-3 text-sm text-white/65 font-light leading-relaxed">
                Surrounded by foundational architecture books, distributed computing references, and hardware experimentation kits.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-xs font-mono text-white/50">
              Clean desk • Zero distractions
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

