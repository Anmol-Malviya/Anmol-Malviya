"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles, Layers, Clock } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

interface Project {
  num: string;
  title: string;
  category: string;
  status: string;
  description: string;
  tech: string[];
  gradient: string;
  demoUrl?: string;
  githubUrl?: string;
  contextNote?: string;
}

const projects: Project[] = [
  {
    num: "01",
    title: "INFINITY",
    category: "AI Ecosystem / Developer SDK",
    status: "Product development / exploration",
    description: "An AI-powered automation ecosystem focused on intelligent agents, developer workflows, and productivity enhancement.",
    tech: ["AI Agents", "Automation", "Developer Workflows", "TypeScript", "Python"],
    gradient: "from-[#FFE0C2]/30 via-[#FFD6A6]/20 to-transparent",
  },
  {
    num: "02",
    title: "VyorAI",
    category: "AI / Computer Vision",
    status: "Product development",
    description: "An AI-powered virtual try-on experience exploring realistic garment visualization and digital fitting workflows.",
    tech: ["Computer Vision", "Generative AI", "Image Processing", "React", "Next.js"],
    gradient: "from-[#CBE8C1]/30 via-[#8FBF7A]/20 to-transparent",
  },
  {
    num: "03",
    title: "AI Interviewer",
    category: "AI / EdTech",
    status: "Active development",
    description: "An AI-powered mock interview platform with real-time interview simulation, daily MCQ technical practice, and personalized learning analytics.",
    tech: ["Next.js", "Gemini API", "React", "Learning Analytics", "Tailwind CSS"],
    gradient: "from-[#FFE0C2]/30 via-[#CBE8C1]/20 to-transparent",
    contextNote: "PM Internship Scheme project • Linux 2.0 team",
  },
  {
    num: "04",
    title: "Hotel ERP / HMS-X",
    category: "SaaS / Hospitality",
    status: "Live & Open Source",
    description: "A comprehensive hotel management and booking platform featuring room reservations, operational workflows, and a modern high-performance web interface.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST APIs"],
    gradient: "from-[#FFD6A6]/30 via-[#FFE0C2]/20 to-transparent",
    demoUrl: "https://hmsx-three.vercel.app",
    githubUrl: "https://github.com/Anmol-Malviya/anmol-malviya-hotel-erp",
  },
  {
    num: "05",
    title: "OpenJarvis",
    category: "Open Source / AI Assistant",
    status: "Open Source",
    description: "An open-source AI assistant project exploring local AI execution, voice interaction pipelines, and customizable workflow automations.",
    tech: ["Python", "Local AI", "Voice Interaction", "Workflow Automation", "LLMs"],
    gradient: "from-[#CBE8C1]/30 via-[#FFE0C2]/20 to-transparent",
    githubUrl: "https://github.com/Anmol-Malviya/OpenJarvis",
  },
  {
    num: "06",
    title: "MAILTRACE AI",
    category: "Cybersecurity / SIH",
    status: "SIH problem statement / proposed solution",
    description: "An AI-powered email threat detection, geolocation intelligence, and digital forensic platform concept designed to investigate suspicious email communications.",
    tech: ["Cybersecurity", "Threat Detection", "Digital Forensics", "SIH 2025", "AI"],
    gradient: "from-[#FFE0C2]/35 via-[#FFD6A6]/20 to-transparent",
    contextNote: "Smart India Hackathon (SIH 2025) proposed solution",
  },
  {
    num: "07",
    title: "Developer Marketplace",
    category: "SaaS / Marketplace",
    status: "Platform concept",
    description: "A platform concept for discovering, sharing, uploading, and licensing developer projects, custom UI components, and digital software products.",
    tech: ["Next.js", "Marketplace Architecture", "Digital Licensing", "PostgreSQL", "Prisma"],
    gradient: "from-[#F9E7D9]/40 via-[#FFE0C2]/20 to-transparent",
  },
  {
    num: "08",
    title: "PEN-LLM",
    category: "AI / Local LLM",
    status: "Experimental idea",
    description: "An experimental exploration into portable, offline local LLM execution operating directly from a portable USB drive environment.",
    tech: ["Local LLM", "Edge AI", "Offline Systems", "Hardware Experimentation"],
    gradient: "from-[#CBE8C1]/30 via-[#FFD6A6]/20 to-transparent",
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          scrollTrigger: { trigger: headlineRef.current, start: "top 80%", end: "top 45%", scrub: 1 },
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }
      );
      containerRef.current?.querySelectorAll(".project-item").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            scrollTrigger: { trigger: card, start: "top 85%", end: "top 50%", scrub: 1 },
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
    <section id="projects" ref={containerRef} className="relative min-h-screen w-full bg-[#FFF5EA] text-[#4B4B4B] py-36 px-6 sm:px-12 md:px-20 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#FFE0C2]/30 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#CBE8C1]/25 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headlineRef} className="max-w-4xl mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE0C2]/60 border border-[#FFD6A6] text-xs font-mono tracking-widest uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#8FBF7A]" /> Featured Projects & Initiatives
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Ideas into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9A46F] via-[#8FBF7A] to-[#4B4B4B]">working experiences.</span>
          </h2>
          <p className="mt-6 text-base sm:text-xl text-[#8D857E] max-w-2xl">
            A curated showcase of 8 software products, AI systems, open-source initiatives, and engineering concepts I am actively designing and building.
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="project-item group relative overflow-hidden rounded-3xl border border-[#E6E2DC] bg-[#FFFCF8]/85 p-8 sm:p-10 transition-all duration-500 hover:border-[#FFD6A6] hover:shadow-[0_15px_40px_rgba(75,75,75,0.06)]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 pointer-events-none`} />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  {/* Header Badge Row */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#F9E7D9] border border-[#E6E2DC] font-semibold text-[#8A5424]">
                      {project.num}
                    </span>
                    <span className="text-xs font-mono tracking-wider uppercase text-[#8D857E]">
                      {project.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#FFF5EA] border border-[#E6E2DC] text-[#4B4B4B]">
                      <Clock className="w-3 h-3 text-[#8FBF7A]" />
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-bold tracking-tight group-hover:text-[#8FBF7A] transition-colors">
                    {project.title}
                  </h3>

                  {project.contextNote && (
                    <p className="mt-1.5 text-xs font-mono text-[#8FBF7A] font-medium">
                      ↳ {project.contextNote}
                    </p>
                  )}

                  <p className="mt-4 max-w-3xl text-sm sm:text-base text-[#8D857E] leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-mono rounded-lg bg-[#FFF5EA] border border-[#E6E2DC] text-[#4B4B4B]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FFE0C2] border border-[#FFD6A6] text-[#4B4B4B] font-semibold text-sm hover:bg-[#FFD6A6] transition-all duration-200 shadow-sm"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code of ${project.title}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FFF5EA] border border-[#E6E2DC] hover:border-[#8FBF7A] text-[#4B4B4B] font-medium text-sm transition-all duration-200 shadow-sm"
                    >
                      <GithubIcon className="w-4 h-4 text-[#8D857E]" />
                      <span>View Source</span>
                    </a>
                  )}

                  {!project.demoUrl && !project.githubUrl && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFF5EA] border border-[#E6E2DC] text-xs font-mono text-[#8D857E]">
                      <Layers className="w-3.5 h-3.5 text-[#8FBF7A]" />
                      <span>Product Exploration</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}