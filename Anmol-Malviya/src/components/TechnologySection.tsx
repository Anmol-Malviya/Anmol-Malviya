"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Server,
  Database,
  Sparkles,
  Bot,
  Wrench,
} from "lucide-react";

interface TechGroup {
  category: string;
  skills: string[];
  icon: typeof Code2;
  accent: string;
}

const techGroups: TechGroup[] = [
  {
    category: "FRONTEND",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
    icon: Code2,
    accent: "from-[#FFE0C2] to-[#FFD6A6]",
  },
  {
    category: "BACKEND",
    skills: ["Node.js", "Express.js", "REST APIs", "Python"],
    icon: Server,
    accent: "from-[#CBE8C1] to-[#8FBF7A]",
  },
  {
    category: "DATABASE",
    skills: ["MongoDB", "PostgreSQL", "Prisma", "Supabase", "Redis"],
    icon: Database,
    accent: "from-[#F9E7D9] to-[#FFD6A6]",
  },
  {
    category: "AI & AUTOMATION",
    skills: ["Gemini API", "LLMs", "AI Agents", "AI Integrations", "Automation Workflows"],
    icon: Bot,
    accent: "from-[#CBE8C1] to-[#8FBF7A]",
  },
  {
    category: "CREATIVE DEV",
    skills: ["GSAP", "Three.js", "WebGL", "Framer Motion", "Motion One"],
    icon: Sparkles,
    accent: "from-[#FFE0C2] to-[#CBE8C1]",
  },
  {
    category: "CLOUD & TOOLS",
    skills: ["Git", "GitHub", "Vercel", "AWS", "Docker", "VS Code"],
    icon: Wrench,
    accent: "from-[#F9E7D9] to-[#C8BEB5]",
  },
];

export default function TechnologySection() {
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

      // Staggered tech cards
      const cards = containerRef.current?.querySelectorAll(".tech-group-card");
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 55%",
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
      id="technology"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#FFFCF8] text-[#4B4B4B] py-36 px-6 sm:px-12 md:px-20 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FFE0C2]/30 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#CBE8C1]/25 blur-[160px] rounded-full pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#C8BEB515_1px,transparent_1px),linear-gradient(to_bottom,#C8BEB515_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headlineRef} className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE0C2]/60 border border-[#FFD6A6] text-xs font-mono tracking-widest uppercase text-[#4B4B4B] mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#8FBF7A] shadow-[0_0_8px_#8FBF7A]" />
            Section 02 • Technology Universe
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#4B4B4B] leading-tight">
            Tools are my{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD6A6] via-[#8FBF7A] to-[#4B4B4B]">
              playground.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-xl text-[#8D857E] font-normal max-w-2xl mx-auto">
            Exploring the technologies that help me design, build, and ship digital products with craft and precision.
          </p>
        </div>

        {/* Dynamic Categorized Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.category}
                className="tech-group-card group relative p-8 rounded-3xl bg-[#FFF5EA]/90 backdrop-blur-2xl border border-[#E6E2DC] hover:border-[#FFD6A6] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,214,166,0.3)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFFCF8] border border-[#E6E2DC] flex items-center justify-center text-[#8FBF7A] group-hover:scale-110 group-hover:border-[#FFD6A6] transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono tracking-widest uppercase text-[#8D857E] group-hover:text-[#4B4B4B] transition-colors">
                      {group.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[#4B4B4B] mb-6 group-hover:text-[#8FBF7A] transition-colors">
                    {group.category}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#FFFCF8] border border-[#E6E2DC] text-[#4B4B4B] group-hover:border-[#FFD6A6] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E6E2DC] flex items-center gap-1.5 text-xs text-[#8D857E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8FBF7A]" />
                  <span>Actively building & shipping</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

