"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface Project {
  title: string;
  badge: string;
  tagline: string;
  description: string;
  tech: string[];
  gradient: string;
}

const projects: Project[] = [
  {
    title: "INFINITY",
    badge: "01 • AI ECOSYSTEM",
    tagline: "Autonomous Developer SDK & Agent Orchestration",
    description:
      "A next-generation AI-powered automation suite and developer SDK ecosystem designed to run autonomous agents, streamline multi-step workflows, and accelerate software delivery.",
    tech: ["Next.js", "TypeScript", "Python", "Autonomous Agents", "LLMs"],
    gradient: "from-[#FFE0C2]/30 via-[#FFD6A6]/20 to-transparent",
  },
  {
    title: "VyorAI",
    badge: "02 • COMPUTER VISION",
    tagline: "AI-Powered Virtual Try-On Experience",
    description:
      "Generative vision architecture enabling realistic garment simulation and photorealistic virtual try-on in real time with high visual fidelity and precise fabric physics.",
    tech: ["React", "PyTorch", "WebGL", "Computer Vision", "Diffusion"],
    gradient: "from-[#CBE8C1]/30 via-[#8FBF7A]/20 to-transparent",
  },
  {
    title: "AI Interviewer",
    badge: "03 • CONVERSATIONAL AI",
    tagline: "Intelligent Mock Technical Interview Platform",
    description:
      "Real-time voice and code evaluation platform that simulates live technical interview rounds, provides instant actionable feedback, and tracks engineering mastery.",
    tech: ["Next.js", "WebRTC", "Voice AI", "TypeScript", "Tailwind CSS"],
    gradient: "from-[#FFD6A6]/30 via-[#FFE0C2]/20 to-transparent",
  },
  {
    title: "Hotel ERP",
    badge: "04 • ENTERPRISE PLATFORM",
    tagline: "Comprehensive Hospitality Management System",
    description:
      "An end-to-end hospitality operations platform managing reservations, guest experiences, operational analytics, inventory synchronization, and billing.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "REST APIs"],
    gradient: "from-[#F9E7D9]/40 via-[#FFE0C2]/20 to-transparent",
  },
  {
    title: "OpenJarvis",
    badge: "05 • OPEN SOURCE",
    tagline: "Modular Voice & Workflow Assistant",
    description:
      "An open-source AI desktop companion capable of automated terminal operations, contextual indexing, and voice-assisted workflow execution.",
    tech: ["Python", "FastAPI", "Electron", "Local LLM", "Automation"],
    gradient: "from-[#CBE8C1]/30 via-[#FFE0C2]/20 to-transparent",
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

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
            end: "top 45%",
            scrub: 1,
          },
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }
      );

      // Staggered Project Cards
      const cards = containerRef.current?.querySelectorAll(".project-item");
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
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
      className="relative min-h-screen w-full bg-[#FFF5EA] text-[#4B4B4B] py-36 px-6 sm:px-12 md:px-20 overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#FFE0C2]/30 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#CBE8C1]/25 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headlineRef} className="max-w-4xl mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE0C2]/60 border border-[#FFD6A6] text-xs font-mono tracking-widest uppercase text-[#4B4B4B] mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#8FBF7A]" />
            Section 03 • Featured Work
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#4B4B4B] leading-tight">
            Things I&apos;ve{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD6A6] via-[#8FBF7A] to-[#4B4B4B]">
              brought to life.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-xl text-[#8D857E] font-normal max-w-2xl">
            From experimental ideas to real digital products, every project is another opportunity to build something meaningful.
          </p>
        </div>

        {/* Project Editorial List */}
        <div className="space-y-10">
          {projects.map((project) => (
            <div
              key={project.title}
              className="project-item group relative p-8 sm:p-12 rounded-3xl bg-[#FFFCF8]/90 backdrop-blur-2xl border border-[#E6E2DC] hover:border-[#FFD6A6] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-[0_12px_40px_rgba(255,214,166,0.35)]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="max-w-3xl">
                  <span className="text-xs font-mono tracking-widest uppercase text-[#8FBF7A] font-semibold block mb-3">
                    {project.badge}
                  </span>

                  <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#4B4B4B] group-hover:text-[#4B4B4B] transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-base sm:text-lg font-medium text-[#4B4B4B]/90">
                    {project.tagline}
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-[#8D857E] font-normal leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-3 py-1 rounded-md bg-[#F9E7D9] border border-[#E6E2DC] text-[#4B4B4B]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="self-end lg:self-center">
                  <button className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FFE0C2] hover:bg-[#FFD6A6] text-[#4B4B4B] font-semibold text-sm transition-all duration-300 shadow-[0_4px_15px_rgba(255,214,166,0.4)] group/btn cursor-pointer">
                    <span>Explore Project</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

