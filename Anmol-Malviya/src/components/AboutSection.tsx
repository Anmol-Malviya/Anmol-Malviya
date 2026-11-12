"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Compass, Layers, ShieldCheck, Cpu, Rocket, Briefcase, Sparkles } from "lucide-react";

const pillars = [
  {
    num: "01",
    title: "FULL-STACK & SENIOR DEVELOPER",
    desc: "Building scalable web platforms, resilient architectures, and modern cloud applications using React, Next.js, Node.js, and TypeScript.",
    icon: Code2,
  },
  {
    num: "02",
    title: "PROJECT MANAGER & ARCHITECT",
    desc: "Leading technical delivery at AV Technologies (AdhritVerse) — steering projects from conceptualization and system design to production execution.",
    icon: Briefcase,
  },
  {
    num: "03",
    title: "AI & SAAS PRODUCT BUILDER",
    desc: "Architecting intelligent agent workflows, LLM integrations, and modern SaaS utilities designed to turn practical ideas into viable digital solutions.",
    icon: Rocket,
  },
];

const journeyHighlights = [
  {
    label: "Foundation",
    detail: "Computer Science Diploma with 7.8 CGPA from Govt. Polytechnic College, Itarsi (2022–2025).",
    icon: ShieldCheck,
  },
  {
    label: "Engineering",
    detail: "B.Tech CSE in IoT, Cyber Security & Blockchain at PIEMR, Indore (2025–2028).",
    icon: Cpu,
  },
  {
    label: "Open Source & Hackathons",
    detail: "TECHSPRINT 2025 Winner (GDG on Campus PIEMR), SIH 2025 Participant, and active open source contributor.",
    icon: Sparkles,
  },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current, { opacity: 0, y: 50, filter: "blur(10px)" }, {
        scrollTrigger: { trigger: headlineRef.current, start: "top 80%", end: "top 45%", scrub: 1 },
        opacity: 1, y: 0, filter: "blur(0px)",
      });
      gsap.fromTo(lineRef.current, { scaleX: 0 }, {
        scrollTrigger: { trigger: lineRef.current, start: "top 85%", end: "top 55%", scrub: 1 },
        scaleX: 1, transformOrigin: "left",
      });
      containerRef.current?.querySelectorAll(".pillar-card").forEach((card) => {
        gsap.fromTo(card, { opacity: 0, y: 45, filter: "blur(8px)" }, {
          scrollTrigger: { trigger: card, start: "top 85%", end: "top 55%", scrub: 1 },
          opacity: 1, y: 0, filter: "blur(0px)",
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative min-h-screen w-full bg-[#FFF5EA] text-[#4B4B4B] py-36 px-6 sm:px-12 md:px-20 overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-[#FFE0C2]/35 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#CBE8C1]/30 blur-[150px] rounded-full pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headlineRef} className="max-w-4xl mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE0C2]/60 border border-[#FFD6A6] text-xs font-mono tracking-widest uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#8FBF7A]" /> About Anmol
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Curious mind,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9A46F] via-[#8FBF7A] to-[#4B4B4B]">builder at heart.</span>
          </h2>
          
          <div className="mt-8 space-y-5 text-base sm:text-xl text-[#8D857E] leading-relaxed max-w-3xl">
            <p className="text-lg sm:text-2xl text-[#4B4B4B] font-medium leading-relaxed">
              I&apos;m Anmol Malviya, a developer and technology enthusiast passionate about building impactful digital products. I work across full-stack development, AI-powered applications, SaaS platforms, and interactive web experiences. I enjoy turning ideas into functional products and leading projects from concept to execution.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              My software journey began with a Computer Science diploma at Government Polytechnic College, Itarsi, followed by pursuing my B.Tech in CSE (IoT, Cyber Security & Blockchain) at Prestige Institute of Engineering Management & Research (PIEMR), Indore. This academic evolution gave me a grounded perspective spanning low-level computing principles, networks, distributed ledgers, and modern web software.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              At AV Technologies (AdhritVerse), I serve as Project Manager and Senior Developer, overseeing technical architecture, web development pipelines, product engineering, and AI workflow integration. Through competitive hackathons like TECHSPRINT 2025 (Winner) and the Smart India Hackathon (SIH 2025), I thrive on converting complex real-world problem statements into resilient, production-ready code.
            </p>
            <p className="text-sm sm:text-base font-semibold text-[#4B4B4B]">
              Long-term vision: Build a multi-product technology company, starting in India and eventually expanding globally.
            </p>
          </div>
        </div>

        {/* Storytelling Timeline Snapshot Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20">
          {journeyHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="p-6 rounded-2xl bg-[#FFFCF8]/70 border border-[#E6E2DC] flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#FFE0C2]/60 flex items-center justify-center shrink-0 text-[#8FBF7A]">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#4B4B4B] font-semibold">{item.label}</h4>
                  <p className="mt-1 text-xs sm:text-sm text-[#8D857E] leading-relaxed">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full h-px bg-[#E6E2DC] mb-20 overflow-hidden"><div ref={lineRef} className="w-full h-full bg-gradient-to-r from-[#FFE0C2] via-[#8FBF7A] to-transparent" /></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="pillar-card group relative p-8 sm:p-10 rounded-3xl bg-[#FFFCF8]/80 backdrop-blur-2xl border border-[#E6E2DC] hover:border-[#FFD6A6] hover:shadow-[0_12px_35px_rgba(255,214,166,0.35)] transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#F9E7D9] border border-[#E6E2DC]">{pillar.num}</span>
                    <Icon className="w-5 h-5 text-[#8D857E] group-hover:text-[#8FBF7A] transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-[#8FBF7A] transition-colors leading-snug">{pillar.title}</h3>
                  <p className="mt-4 text-sm sm:text-base text-[#8D857E] leading-relaxed">{pillar.desc}</p>
                </div>
                <div className="mt-10 pt-6 border-t border-[#E6E2DC] flex items-center gap-2 text-xs font-mono text-[#8D857E] group-hover:text-[#4B4B4B] transition-colors">
                  <span>Explore my work</span><span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
