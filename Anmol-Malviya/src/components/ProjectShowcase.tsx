"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles, Terminal } from "lucide-react";

interface Project {
  title: string;
  badge: string;
  tagline: string;
  description: string;
  tech: string[];
  gradient: string;
  glow: string;
}

const projects: Project[] = [
  {
    title: "INFINITY",
    badge: "AI Ecosystem",
    tagline: "Autonomous Developer SDK & Agent Orchestration",
    description:
      "A next-generation AI-powered automation suite and developer SDK ecosystem designed to run autonomous agents, streamline multi-step workflows, and accelerate modern software delivery.",
    tech: ["Next.js", "TypeScript", "Python", "LLMs", "Autonomous Agents"],
    gradient: "from-sky-500/20 via-blue-600/10 to-transparent",
    glow: "#38bdf8",
  },
  {
    title: "VyorAI",
    badge: "Computer Vision",
    tagline: "AI-Powered Virtual Try-On Experience",
    description:
      "Cutting-edge generative vision architecture enabling realistic garment simulation and photorealistic virtual try-on in real time with high visual fidelity and precise fabric physics.",
    tech: ["React", "PyTorch", "WebGL", "Computer Vision", "Diffusion"],
    gradient: "from-indigo-500/20 via-purple-600/10 to-transparent",
    glow: "#818cf8",
  },
  {
    title: "AI Interviewer",
    badge: "Conversational AI",
    tagline: "Intelligent Mock Technical Interview Platform",
    description:
      "Real-time voice and code evaluation system that simulates live engineering interview rounds, provides instant actionable feedback, and tracks candidate mastery over algorithms and system architecture.",
    tech: ["Next.js", "WebRTC", "Voice AI", "TypeScript", "Tailwind CSS"],
    gradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
    glow: "#34d399",
  },
  {
    title: "Hotel ERP",
    badge: "Enterprise Platform",
    tagline: "Comprehensive Hospitality Management System",
    description:
      "An end-to-end enterprise platform managing bookings, guest experiences, operational analytics, real-time inventory synchronization, and secure multi-currency transaction processing.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "REST APIs"],
    gradient: "from-amber-500/20 via-orange-600/10 to-transparent",
    glow: "#fbbf24",
  },
  {
    title: "OpenJarvis",
    badge: "Open Source",
    tagline: "Modular Voice & Workflow Assistant",
    description:
      "An open-source AI desktop companion capable of local command execution, automated terminal operations, contextual file indexing, and natural voice interactions.",
    tech: ["Python", "FastAPI", "Electron", "Local LLM", "Automation"],
    gradient: "from-cyan-500/20 via-sky-600/10 to-transparent",
    glow: "#22d3ee",
  },
];

export default function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".project-card");
      items?.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 45%",
              scrub: 1,
            },
            opacity: 1,
            y: 0,
            scale: 1,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#02040a] text-white py-32 px-6 sm:px-12 md:px-20 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono tracking-widest uppercase text-[#38bdf8] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Scene 04 • Featured Projects
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-2xl leading-tight">
            Crafted with rigor.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-indigo-400">
              Built to make an impact.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60 font-light max-w-xl">
            Selected showcase of software products, AI platforms, and open-source innovations.
          </p>
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="project-card group relative rounded-3xl p-8 sm:p-12 bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] hover:border-sky-500/40 transition-all duration-500 overflow-hidden"
            >
              {/* Card Ambient Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                {/* Left details */}
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-mono tracking-widest uppercase text-[#38bdf8]">
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-base sm:text-lg font-medium text-white/90">
                    {project.tagline}
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-white/65 font-light leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Pill Badges */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="self-end lg:self-center">
                  <div className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-[#38bdf8] text-white hover:text-black font-medium text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group/btn">
                    <span>Explore Project</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

