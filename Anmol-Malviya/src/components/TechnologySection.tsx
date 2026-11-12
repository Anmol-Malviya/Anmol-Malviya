"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Server,
  Database,
  Sparkles,
  Bot,
  Wrench,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  FolderGit2,
} from "lucide-react";
import { TECHNOLOGY_CATEGORIES, TechStackCategory } from "./technology/techData";

// Dynamically load the comprehensive interactive 3D Orbital Scene
const TechUniverseScene3D = dynamic(
  () => import("./technology/TechUniverseScene3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[540px] lg:h-[620px] rounded-3xl bg-[#FAF6F0] flex flex-col items-center justify-center p-6 text-center animate-pulse">
        <div className="w-16 h-16 rounded-full bg-[#E9DED0] flex items-center justify-center mb-3">
          <span className="font-mono text-xl font-bold text-[#263A50]">&lt;/&gt;</span>
        </div>
        <p className="text-xs font-mono tracking-widest uppercase text-[#C59B62] font-semibold">
          Rendering 3D Technology Universe...
        </p>
      </div>
    ),
  }
);

// Map category icons to lucide icons
const iconMap: Record<string, typeof Code2> = {
  react: Code2,
  nodejs: Server,
  database: Database,
  sparkles: Bot,
  cube: Sparkles,
  cloud: Wrench,
};

export default function TechnologySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const mainBoardRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<TechStackCategory>(
    TECHNOLOGY_CATEGORIES[0]
  );
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Headline reveal
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.children,
          { opacity: 0, y: 35, filter: "blur(6px)" },
          {
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 82%",
              end: "top 50%",
              scrub: 0.8,
            },
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }

      // Main board entrance
      if (mainBoardRef.current) {
        gsap.fromTo(
          mainBoardRef.current,
          { opacity: 0, scale: 0.95, y: 30 },
          {
            scrollTrigger: {
              trigger: mainBoardRef.current,
              start: "top 85%",
              end: "top 58%",
              scrub: 0.8,
            },
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "power2.out",
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
      className="relative min-h-screen w-full bg-[#FAF5EE] text-[#292929] py-28 sm:py-36 px-4 sm:px-8 md:px-14 lg:px-20 overflow-hidden"
    >
      {/* Background Soft Lighting Gradients (Ivory, Champagne, Warm Beige) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[850px] bg-[#E9DED0]/40 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-[#C59B62]/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Subtle Warm Grid Mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E9DED035_1px,transparent_1px),linear-gradient(to_bottom,#E9DED035_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_50%_at_50%_50%,#000_65%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* =========================================================================
            MASTER EDITORIAL PANORAMIC CARD CONTAINER (Exact match to reference image)
            - Left: Expressive headline & CTA
            - Center: Full 3D Interactive Orbital Universe with glass sphere & 6 nodes
            - Right: Floating ceramic detail inspector panel with live project chips
           ========================================================================= */}
        <div
          ref={mainBoardRef}
          className="relative rounded-[2.5rem] bg-gradient-to-b from-[#FFFFFF] to-[#FBF8F3] border border-[#E9DED0] shadow-[0_30px_70px_rgba(38,58,80,0.06)] p-6 sm:p-10 lg:p-14 overflow-hidden"
        >
          {/* Subtle Inner Ambient Glow Behind 3D Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C59B62]/8 blur-[120px] rounded-full pointer-events-none" />

          {/* DESKTOP 3-PANEL COMPOSITION */}
          <div className="hidden lg:grid grid-cols-12 gap-6 items-center min-h-[580px]">
            
            {/* 1. LEFT COLUMN: Headline & Narrative (3 Columns) */}
            <div ref={headlineRef} className="col-span-3 flex flex-col justify-center pr-2 z-20">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-6 h-[1.5px] bg-[#292929]" />
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#292929]">
                  02 / TECHNOLOGY UNIVERSE
                </span>
              </div>

              <h2 className="text-4xl xl:text-5xl font-serif font-medium tracking-tight text-[#292929] leading-[1.08]">
                Tools are my{" "}
                <span className="italic font-normal text-[#C59B62] block">
                  playground.
                </span>
              </h2>

              <p className="mt-5 text-sm xl:text-base text-[#292929]/70 font-sans leading-relaxed">
                The technologies behind every idea I bring to life.
              </p>

              <div className="mt-8">
                <button
                  onClick={() => {
                    // Smooth cycle to next category
                    const currIdx = TECHNOLOGY_CATEGORIES.findIndex((c) => c.id === selectedCategory.id);
                    const nextIdx = (currIdx + 1) % TECHNOLOGY_CATEGORIES.length;
                    setSelectedCategory(TECHNOLOGY_CATEGORIES[nextIdx]);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#263A50] text-[#FFFFFF] text-xs font-mono uppercase tracking-wider hover:bg-[#C59B62] transition-colors duration-300 shadow-sm group cursor-pointer"
                >
                  <span>Explore My Stack</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 2. CENTER COLUMN: Interactive 3D Technology Universe (6 Columns) */}
            <div className="col-span-6 relative h-[560px] flex items-center justify-center z-10">
              <TechUniverseScene3D
                selectedCategoryId={selectedCategory.id}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                hoveredCategoryId={hoveredCategoryId}
                onHoverCategory={(id) => setHoveredCategoryId(id)}
              />
            </div>

            {/* 3. RIGHT COLUMN: Refined Information Card (3 Columns) */}
            <div className="col-span-3 z-20 pl-2">
              <div className="p-6 xl:p-8 rounded-[2rem] bg-[#FFFFFF] border border-[#E9DED0] shadow-[0_12px_35px_rgba(38,58,80,0.06)] flex flex-col justify-between min-h-[460px]">
                
                <div>
                  {/* Category Header: Icon + Title + Next Button */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] border border-[#E9DED0] flex items-center justify-center text-[#263A50] shadow-2xs">
                        {(() => {
                          const Icon = iconMap[selectedCategory.iconName] || Code2;
                          return <Icon className="w-6 h-6 text-[#263A50]" />;
                        })()}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#263A50] tracking-tight">
                          {selectedCategory.title}
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const currIdx = TECHNOLOGY_CATEGORIES.findIndex((c) => c.id === selectedCategory.id);
                        const nextIdx = (currIdx + 1) % TECHNOLOGY_CATEGORIES.length;
                        setSelectedCategory(TECHNOLOGY_CATEGORIES[nextIdx]);
                      }}
                      className="w-8 h-8 rounded-full bg-[#263A50] text-[#FFFFFF] flex items-center justify-center hover:bg-[#C59B62] transition-colors shadow-2xs cursor-pointer"
                      title="Next category"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtitle / Description */}
                  <p className="text-xs text-[#292929]/70 font-sans leading-relaxed mb-6">
                    {selectedCategory.tagline}
                  </p>

                  {/* Technology Badges Row (with direct clean icons matching reference) */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory.tools.map((tool) => (
                        <div
                          key={tool.name}
                          className="group/badge inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#E9DED0] hover:border-[#C59B62] transition-colors"
                          title={tool.name}
                        >
                          <div
                            className="w-4 h-4 flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full"
                            dangerouslySetInnerHTML={{ __html: tool.iconSvg }}
                          />
                          <span className="text-[11px] font-mono text-[#263A50]">
                            {tool.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Used in Section */}
                <div className="pt-4 border-t border-[#E9DED0]">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#292929]/70 font-semibold mb-2.5">
                    <FolderGit2 className="w-3.5 h-3.5 text-[#C59B62]" />
                    <span>Used in</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCategory.usedInProjects.map((proj) => (
                      <a
                        key={proj.name}
                        href={proj.url || "#projects"}
                        target={proj.isExternal ? "_blank" : undefined}
                        rel={proj.isExternal ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF6F0] border border-[#E9DED0] text-[11px] font-mono text-[#263A50] hover:border-[#C59B62] hover:text-[#C59B62] transition-colors shadow-2xs"
                      >
                        <span>{proj.name}</span>
                        <ExternalLink className="w-2.5 h-2.5 text-[#C59B62]" />
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* TABLET LAYOUT (Stacked 3D with detail panel below) */}
          <div className="hidden sm:block lg:hidden">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-[1.5px] bg-[#292929]" />
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#292929]">
                  02 / TECHNOLOGY UNIVERSE
                </span>
              </div>
              <h2 className="text-4xl font-serif font-medium text-[#292929]">
                Tools are my <span className="italic text-[#C59B62]">playground.</span>
              </h2>
              <p className="mt-2 text-sm text-[#292929]/70">
                The technologies behind every idea I bring to life.
              </p>
            </div>

            {/* 3D Scene */}
            <div className="h-[480px] w-full">
              <TechUniverseScene3D
                selectedCategoryId={selectedCategory.id}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                hoveredCategoryId={hoveredCategoryId}
                onHoverCategory={(id) => setHoveredCategoryId(id)}
              />
            </div>

            {/* Detail Panel Below */}
            <div className="mt-6 p-6 rounded-3xl bg-[#FFFFFF] border border-[#E9DED0] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#263A50]">{selectedCategory.title}</h3>
                <span className="text-xs font-mono text-[#C59B62] uppercase tracking-wider">{selectedCategory.num} / 06</span>
              </div>
              <p className="text-sm text-[#292929]/75 mb-5">{selectedCategory.tagline}</p>
              
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedCategory.tools.map((t) => (
                  <div key={t.name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#E9DED0]">
                    <div className="w-4 h-4" dangerouslySetInnerHTML={{ __html: t.iconSvg }} />
                    <span className="text-xs font-mono text-[#263A50]">{t.name}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E9DED0] flex flex-wrap gap-2 items-center">
                <span className="text-xs font-mono text-[#292929]/70 font-semibold mr-2">Used in:</span>
                {selectedCategory.usedInProjects.map((p) => (
                  <a key={p.name} href={p.url || "#projects"} className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#FAF6F0] border border-[#E9DED0] text-[#263A50]">
                    {p.name} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE RESPONSIVE FALLBACK: Clean Expandable Category Cards */}
          <div className="sm:hidden flex flex-col gap-4">
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-[1.5px] bg-[#292929]" />
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#292929]">
                  02 / TECH STACK
                </span>
              </div>
              <h2 className="text-3xl font-serif font-medium text-[#292929]">
                Tools are my <span className="italic text-[#C59B62]">playground.</span>
              </h2>
            </div>

            {/* Central Badge */}
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E9DED0] text-center shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#263A50] text-[#FFFFFF] flex items-center justify-center mx-auto mb-2 font-mono font-bold text-sm">
                &lt;/&gt;
              </div>
              <h4 className="text-sm font-bold text-[#263A50]">MY TECH STACK</h4>
            </div>

            {/* Categories */}
            {TECHNOLOGY_CATEGORIES.map((cat) => {
              const Icon = iconMap[cat.iconName] || Code2;
              const isSelected = selectedCategory.id === cat.id;

              return (
                <div
                  key={cat.id}
                  className={`p-5 rounded-2xl bg-[#FFFFFF] border transition-all duration-300 ${
                    isSelected
                      ? "border-[#C59B62] shadow-[0_8px_25px_rgba(197,155,98,0.15)] ring-1 ring-[#C59B62]/30"
                      : "border-[#E9DED0] shadow-2xs"
                  }`}
                >
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isSelected ? "bg-[#263A50] text-[#FFFFFF]" : "bg-[#FAF6F0] text-[#263A50]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-[#263A50]">{cat.title}</span>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 text-[#263A50] transition-transform duration-300 ${
                        isSelected ? "rotate-90 text-[#C59B62]" : ""
                      }`}
                    />
                  </button>

                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-[#E9DED0]">
                      <p className="text-xs text-[#292929]/75 mb-3 leading-relaxed">{cat.tagline}</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {cat.tools.map((t) => (
                          <div
                            key={t.name}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#FAF6F0] border border-[#E9DED0]"
                          >
                            <div className="w-3.5 h-3.5" dangerouslySetInnerHTML={{ __html: t.iconSvg }} />
                            <span className="text-[11px] font-mono text-[#263A50]">{t.name}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {cat.usedInProjects.map((p) => (
                          <a
                            key={p.name}
                            href={p.url || "#projects"}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF6F0] border border-[#E9DED0] text-[#263A50]"
                          >
                            {p.name} ↗
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
