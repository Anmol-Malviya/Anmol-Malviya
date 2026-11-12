"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Compass, Layers } from "lucide-react";

const pillars = [
  {
    num: "01",
    title: "DEVELOPER",
    desc: "Building modern high-performance web applications and digital products with clean architectures and rigorous engineering.",
    icon: Code2,
  },
  {
    num: "02",
    title: "CREATOR",
    desc: "Exploring visual storytelling, interactive 3D WebGL graphics, kinetic typography, and fluid micro-interactions.",
    icon: Compass,
  },
  {
    num: "03",
    title: "BUILDER",
    desc: "Experimenting with autonomous AI systems, intelligent developer tooling, and end-to-end product design.",
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

      // Connecting line drawing
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: 1,
          },
          scaleX: 1,
          transformOrigin: "left",
        }
      );

      // Pillars stagger reveal
      const cards = containerRef.current?.querySelectorAll(".pillar-card");
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 45, filter: "blur(8px)" },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
            },
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#FFF5EA] text-[#4B4B4B] py-36 px-6 sm:px-12 md:px-20 overflow-hidden"
    >
      {/* Soft Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-[#FFE0C2]/35 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#CBE8C1]/30 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headlineRef} className="max-w-4xl mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE0C2]/60 border border-[#FFD6A6] text-xs font-mono tracking-widest uppercase text-[#4B4B4B] mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#8FBF7A] shadow-[0_0_8px_#8FBF7A]" />
            Section 01 • About Me
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#4B4B4B] leading-tight">
            Behind the pixels,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD6A6] via-[#8FBF7A] to-[#4B4B4B]">
              there is a builder.
            </span>
          </h2>

          <p className="mt-8 text-lg sm:text-2xl text-[#8D857E] font-normal leading-relaxed max-w-3xl">
            I&apos;m Anmol Malviya, a computer science student and developer passionate about building useful products, exploring emerging technologies, and turning ideas into real experiences.
          </p>
        </div>

        {/* Connecting Line */}
        <div className="w-full h-[1px] bg-[#E6E2DC] mb-20 overflow-hidden">
          <div
            ref={lineRef}
            className="w-full h-full bg-gradient-to-r from-[#FFE0C2] via-[#8FBF7A] to-transparent"
          />
        </div>

        {/* Three Identity Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="pillar-card group relative p-8 sm:p-10 rounded-3xl bg-[#FFFCF8]/80 backdrop-blur-2xl border border-[#E6E2DC] hover:border-[#FFD6A6] hover:shadow-[0_12px_35px_rgba(255,214,166,0.35)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#F9E7D9] text-[#4B4B4B] border border-[#E6E2DC]">
                      {pillar.num}
                    </span>
                    <Icon className="w-5 h-5 text-[#8D857E] group-hover:text-[#8FBF7A] transition-colors" />
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-[#4B4B4B] group-hover:text-[#8FBF7A] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="mt-4 text-base text-[#8D857E] font-normal leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-10 pt-6 border-t border-[#E6E2DC] flex items-center gap-2 text-xs font-mono text-[#8D857E] group-hover:text-[#4B4B4B] transition-colors">
                  <span>Explore discipline</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

