"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Database,
  Globe2,
  Terminal,
  Bot,
} from "lucide-react";

const techStack = [
  { name: "React / Next.js", category: "Core Framework", icon: Code2, accent: "from-sky-400 to-blue-600" },
  { name: "TypeScript", category: "Type Safety", icon: Terminal, accent: "from-blue-500 to-indigo-600" },
  { name: "Three.js / WebGL", category: "3D Graphics", icon: Globe2, accent: "from-cyan-400 to-teal-500" },
  { name: "GSAP & Motion", category: "Animation Engine", icon: Sparkles, accent: "from-emerald-400 to-green-600" },
  { name: "Node.js & Python", category: "Backend & Systems", icon: Cpu, accent: "from-amber-400 to-orange-500" },
  { name: "AI & Automation", category: "Intelligent Agents", icon: Bot, accent: "from-violet-400 to-purple-600" },
  { name: "PostgreSQL & Mongo", category: "Database Layer", icon: Database, accent: "from-rose-400 to-pink-600" },
  { name: "Tailwind CSS", category: "Design Architecture", icon: Layers, accent: "from-cyan-400 to-blue-500" },
];

export default function TechnologyUniverse() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }
      );

      // Orbit card staggered float animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              end: "bottom 85%",
              scrub: 1,
            },
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technology"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#030712] text-white py-32 px-6 sm:px-12 md:px-20 overflow-hidden select-none"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#38bdf8]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headlineRef} className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono tracking-widest uppercase text-[#38bdf8] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
            Scene 03 • Technology Universe
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-white">
            Building with technology.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-sky-300 to-indigo-400">
              Creating with imagination.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/70 font-light leading-relaxed">
            The multi-disciplinary toolkit powering modern fullstack engineering, interactive 3D WebGL experiences, and autonomous AI systems.
          </p>
        </div>

        {/* Mascot Centerpiece & Orbiting Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className="group relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-sky-500/40 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(56,189,248,0.15)] hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-8">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tech.accent} p-[1px] flex items-center justify-center`}
                  >
                    <div className="w-full h-full bg-[#0a0f1d] rounded-[11px] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-sky-300" />
                    </div>
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 group-hover:text-sky-400 transition-colors">
                    {tech.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-sky-200 transition-colors">
                    {tech.name}
                  </h3>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-white/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                    Production Ready
                  </div>
                </div>

                {/* Subtle hover gradient highlight */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

