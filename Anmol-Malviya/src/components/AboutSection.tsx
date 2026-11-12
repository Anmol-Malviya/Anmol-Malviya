"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Compass, Layers } from "lucide-react";

const pillars = [
  {
    num: "01",
    title: "PRODUCT ENGINEER",
    desc: "Turning ideas into dependable web products with thoughtful architecture, useful interfaces, and a focus on shipping.",
    icon: Code2,
  },
  {
    num: "02",
    title: "CREATIVE DEVELOPER",
    desc: "Exploring interaction design, motion, 3D experiences, and visual storytelling for the web.",
    icon: Compass,
  },
  {
    num: "03",
    title: "FUTURE FOUNDER",
    desc: "Experimenting with AI, developer tools, and SaaS ideas while learning how to turn technology into sustainable products.",
    icon: Layers,
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
        <div ref={headlineRef} className="max-w-4xl mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE0C2]/60 border border-[#FFD6A6] text-xs font-mono tracking-widest uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#8FBF7A]" /> About Anmol
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Curious mind,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9A46F] via-[#8FBF7A] to-[#4B4B4B]">builder at heart.</span>
          </h2>
          <p className="mt-8 text-lg sm:text-2xl text-[#8D857E] leading-relaxed max-w-3xl">
            I&apos;m Anmol Malviya, a computer science student, developer, and project manager based in Indore, India. I enjoy building useful digital products, exploring emerging technology, and bringing ambitious ideas to life.
          </p>
          <p className="mt-5 text-base sm:text-lg text-[#8D857E] leading-relaxed max-w-3xl">
            My long-term ambition is to build a multi-product technology company, starting with products that solve real problems for people and businesses.
          </p>
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
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-[#8FBF7A] transition-colors">{pillar.title}</h3>
                  <p className="mt-4 text-base text-[#8D857E] leading-relaxed">{pillar.desc}</p>
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
