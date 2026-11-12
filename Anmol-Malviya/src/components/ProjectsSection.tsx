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
  link?: string;
}

const projects: Project[] = [
  {
    title: "MAILTRACE AI",
    badge: "01 • CYBER SECURITY / SIH",
    tagline: "Email threat detection and forensic intelligence",
    description: "A proposed platform concept combining email threat analysis, geolocation context, and forensic intelligence for investigating suspicious messages.",
    tech: ["AI", "Email Security", "Threat Detection", "Digital Forensics"],
    gradient: "from-[#FFE0C2]/30 via-[#FFD6A6]/20 to-transparent",
  },
  {
    title: "AI Interviewer",
    badge: "02 • AI / EDUCATION",
    tagline: "Mock interviews and daily technical practice",
    description: "An AI-assisted interview preparation platform with mock interview flows, daily MCQ practice, and learning analytics.",
    tech: ["Next.js", "React", "Gemini API", "Analytics"],
    gradient: "from-[#CBE8C1]/30 via-[#8FBF7A]/20 to-transparent",
  },
  {
    title: "Hotel ERP / HMS-X",
    badge: "03 • SAAS / HOSPITALITY",
    tagline: "A digital workspace for hotel operations",
    description: "A hotel management product concept covering booking workflows and operational experiences. Frontend project: hmsx-three.vercel.app.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    gradient: "from-[#FFD6A6]/30 via-[#FFE0C2]/20 to-transparent",
    link: "https://hmsx-three.vercel.app",
  },
  {
    title: "OpenJarvis",
    badge: "04 • OPEN SOURCE / AI",
    tagline: "An evolving personal AI assistant project",
    description: "An open-source project exploring a Jarvis-like assistant experience. Contributions and implementation details evolve in the repository.",
    tech: ["AI", "Automation", "Developer Tools"],
    gradient: "from-[#CBE8C1]/30 via-[#FFE0C2]/20 to-transparent",
    link: "https://github.com/Anmol-Malviya/OpenJarvis",
  },
  {
    title: "Developer Marketplace",
    badge: "05 • PRODUCT IDEA",
    tagline: "A marketplace for reusable developer assets",
    description: "A product idea for discovering, sharing, and licensing developer projects, UI components, and digital tools.",
    tech: ["Next.js", "MongoDB", "Cloud Storage", "Marketplace"],
    gradient: "from-[#F9E7D9]/40 via-[#FFE0C2]/20 to-transparent",
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current, { opacity: 0, y: 50, filter: "blur(10px)" }, {
        scrollTrigger: { trigger: headlineRef.current, start: "top 80%", end: "top 45%", scrub: 1 },
        opacity: 1, y: 0, filter: "blur(0px)",
      });
      containerRef.current?.querySelectorAll(".project-item").forEach((card) => {
        gsap.fromTo(card, { opacity: 0, y: 50, scale: 0.96 }, {
          scrollTrigger: { trigger: card, start: "top 85%", end: "top 50%", scrub: 1 },
          opacity: 1, y: 0, scale: 1,
        });
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
            <Sparkles className="w-3.5 h-3.5 text-[#8FBF7A]" /> Selected work & experiments
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Ideas into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9A46F] via-[#8FBF7A] to-[#4B4B4B]">working experiences.</span>
          </h2>
          <p className="mt-6 text-base sm:text-xl text-[#8D857E] max-w-2xl">
            A selection of products, experiments, and open-source work I&apos;m exploring.
          </p>
        </div>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={project.title} className={`project-item group relative overflow-hidden rounded-3xl border border-[#E6E2DC] bg-[#FFFCF8]/80 p-8 sm:p-10 transition-all duration-500 hover:border-[#FFD6A6] hover:shadow-[0_15px_40px_rgba(75,75,75,0.06)]`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 pointer-events-none`} />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-mono tracking-widest text-[#8D857E]">{project.badge}</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-bold tracking-tight group-hover:text-[#8FBF7A] transition-colors">{project.title}</h3>
                  <p className="mt-2 text-base sm:text-lg text-[#4B4B4B] font-medium">{project.tagline}</p>
                  <p className="mt-4 max-w-3xl text-sm sm:text-base text-[#8D857E] leading-relaxed">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((tech) => <span key={tech} className="px-3 py-1.5 text-xs font-mono rounded-lg bg-[#FFF5EA] border border-[#E6E2DC] text-[#4B4B4B]">{tech}</span>)}
                  </div>
                </div>
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FFE0C2] border border-[#FFD6A6] text-[#4B4B4B] font-medium hover:bg-[#FFD6A6] transition-colors">
                    View project <ArrowUpRight className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-[#8D857E]">Exploration</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
