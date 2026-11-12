"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  Palette,
  Code2,
  Server,
  Bot,
  Rocket,
  CheckCircle2,
  Workflow,
} from "lucide-react";

interface WorkflowStep {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: typeof Search;
  tags: string[];
}

const workflowSteps: WorkflowStep[] = [
  {
    num: "01",
    title: "Research & Planning",
    subtitle: "Problem Definition & Requirements",
    desc: "Mapping product scope, analyzing user needs, deconstructing domain complexities, and architecting technical specifications before writing a single line of code.",
    icon: Search,
    tags: ["Product Discovery", "System Specs", "Feasibility"],
  },
  {
    num: "02",
    title: "UI/UX Design",
    subtitle: "Visual Clarity & Interactions",
    desc: "Crafting modern, accessible wireframes, interactive component states, and motion prototypes with an emphasis on intuitive user flow and refined aesthetics.",
    icon: Palette,
    tags: ["User Flow", "Wireframing", "Component Systems"],
  },
  {
    num: "03",
    title: "Frontend Development",
    subtitle: "High-Performance Interfaces",
    desc: "Engineering responsive web interfaces using React.js, Next.js, TypeScript, and Tailwind CSS with GSAP and Three.js for immersive digital storytelling.",
    icon: Code2,
    tags: ["React / Next.js", "TypeScript", "Tailwind CSS", "GSAP / Three.js"],
  },
  {
    num: "04",
    title: "Backend Engineering",
    subtitle: "Robust APIs & Data Structures",
    desc: "Implementing secure RESTful endpoints, performant database models with PostgreSQL, MongoDB, Prisma, and Redis caching for low-latency operations.",
    icon: Server,
    tags: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Prisma"],
  },
  {
    num: "05",
    title: "AI Integration",
    subtitle: "Agents & Intelligent Automations",
    desc: "Connecting Gemini API, fine-tuned LLM workflows, contextual vector embeddings, and autonomous agent systems to deliver smart, value-driven software.",
    icon: Bot,
    tags: ["Gemini API", "LLM Workflows", "AI Agents", "Automations"],
  },
  {
    num: "06",
    title: "Testing & Deployment",
    subtitle: "Quality Assurance & Production",
    desc: "Validating edge cases, cross-device responsiveness, end-to-end reliability, and deploying through continuous delivery pipelines on Vercel and cloud platforms.",
    icon: Rocket,
    tags: ["Vercel", "Docker / AWS", "CI/CD", "Quality Verification"],
  },
];

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
        ".workflow-card",
        { opacity: 0, y: 45, scale: 0.96 },
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
          stagger: 0.12,
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
        <div ref={headlineRef} className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE0C2]/60 border border-[#FFD6A6] text-xs font-mono tracking-widest uppercase text-[#4B4B4B] mb-6 shadow-sm">
            <Workflow className="w-3.5 h-3.5 text-[#8FBF7A]" />
            Development & Engineering Methodology
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#4B4B4B] leading-tight">
            Where ideas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9A46F] via-[#8FBF7A] to-[#4B4B4B]">
              become reality.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-xl text-[#8D857E] font-normal max-w-2xl mx-auto leading-relaxed">
            A structured, disciplined engineering workflow guiding projects from early conceptualization to scalable production delivery.
          </p>
        </div>

        {/* 6-Phase Development Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="workflow-card group relative p-8 rounded-3xl bg-[#FFFCF8]/90 backdrop-blur-2xl border border-[#E6E2DC] hover:border-[#FFD6A6] hover:shadow-[0_12px_40px_rgba(255,214,166,0.3)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#F9E7D9] border border-[#E6E2DC] font-semibold text-[#8A5424]">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#FFE0C2]/50 flex items-center justify-center text-[#8FBF7A] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#4B4B4B] group-hover:text-[#8FBF7A] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono text-[#8D857E] mt-1 mb-4 uppercase tracking-wider">
                    {step.subtitle}
                  </p>

                  <p className="text-sm text-[#8D857E] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E6E2DC]">
                  <div className="flex flex-wrap gap-1.5">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#FFF5EA] text-[#4B4B4B] border border-[#E6E2DC]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}