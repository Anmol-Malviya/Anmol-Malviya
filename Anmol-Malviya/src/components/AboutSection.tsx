"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Briefcase,
  Rocket,
  GraduationCap,
  Trophy,
  Compass,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

// Dynamically load the 3D scene with SSR disabled for optimal performance
const About3DScene = dynamic(() => import("./about/About3DScene"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] rounded-3xl bg-[#F8F3EB] border border-[#E9DED0] flex flex-col items-center justify-center p-8 text-center animate-pulse">
      <div className="w-16 h-16 rounded-2xl bg-[#E9DED0]/60 flex items-center justify-center text-[#C59B62] mb-4">
        <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: "3s" }} />
      </div>
      <p className="text-xs font-mono tracking-widest uppercase text-[#263A50]/70">
        Initializing Spatial 3D Composition...
      </p>
    </div>
  ),
});

const identityPanels = [
  {
    num: "01",
    role: "Full-Stack & Senior Developer",
    focus: "Scalable Systems & Web Architecture",
    description:
      "Engineering resilient web platforms, type-safe full-stack backends, and cloud microservices utilizing React, Next.js, Node.js, and TypeScript with uncompromising craft.",
    icon: Code2,
    tags: ["React / Next.js", "TypeScript", "Node.js", "Clean Architecture"],
  },
  {
    num: "02",
    role: "Project Manager & Architect",
    focus: "Technical Delivery & Product Strategy",
    description:
      "Directing technical delivery and architectural strategy at AV Technologies (AdhritVerse) — bridging high-level client vision, rigorous sprint execution, and scalable system infrastructure.",
    icon: Briefcase,
    tags: ["AV Technologies", "AdhritVerse", "System Design", "Agile Execution"],
  },
  {
    num: "03",
    role: "AI & SaaS Product Builder",
    focus: "Intelligent Workflows & Autonomous Agents",
    description:
      "Creating autonomous agent pipelines, Gemini API integrations, and commercially viable SaaS tools built to solve real operational bottlenecks with high leverage.",
    icon: Rocket,
    tags: ["Gemini API", "AI Agents", "SaaS Automation", "Micro-Products"],
  },
];

const timelineMilestones = [
  {
    period: "2022 — 2025",
    title: "Diploma in Computer Science Engineering",
    institution: "Government Polytechnic College, Itarsi",
    highlight: "Graduated with 7.8 CGPA",
    details: "Built solid groundings in fundamental computing principles, low-level architecture, algorithms, and networks.",
    icon: GraduationCap,
  },
  {
    period: "2025 — 2028",
    title: "B.Tech in CSE (IoT, Cyber Security & Blockchain)",
    institution: "Prestige Institute of Engineering Management & Research (PIEMR), Indore",
    highlight: "Active Undergraduate Degree",
    details: "Specializing in decentralized ledger architectures, hardware security, and distributed network engineering.",
    icon: GraduationCap,
  },
  {
    period: "2025 — Present",
    title: "Project Manager & Senior Developer",
    institution: "AV Technologies (AdhritVerse)",
    highlight: "Leadership & Architecture",
    details: "Guiding end-to-end client applications, product lifecycles, full-stack stacks, and generative AI deployments.",
    icon: Briefcase,
  },
  {
    period: "2025 Honors",
    title: "TECHSPRINT 2025 Winner & SIH 2025 Participant",
    institution: "GDG on Campus PIEMR & Smart India Hackathon",
    highlight: "Hackathon Champion",
    details: "Crowned Winner at TECHSPRINT 2025 and engineered MAILTRACE AI as a proposed candidate solution for SIH 2025.",
    icon: Trophy,
  },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeTilt, setActiveTilt] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Staggered headline reveal
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.children,
          { opacity: 0, y: 35, filter: "blur(6px)" },
          {
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 82%",
              end: "top 48%",
              scrub: 0.8,
            },
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.12,
            ease: "power2.out",
          }
        );
      }

      // 2. Identity panels staggered reveal
      if (panelsRef.current) {
        const cards = panelsRef.current.querySelectorAll(".identity-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              scrollTrigger: {
                trigger: card,
                start: "top 86%",
                end: "top 60%",
                scrub: 0.8,
              },
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "power2.out",
            }
          );
        });
      }

      // 3. Compact Timeline scroll reveal
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll(".timeline-item");
        items.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, x: -30 },
            {
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                end: "top 68%",
                scrub: 0.8,
              },
              opacity: 1,
              x: 0,
              ease: "power2.out",
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#F8F3EB] text-[#292929] py-20 sm:py-32 md:py-40 px-4 sm:px-8 md:px-16 lg:px-20 overflow-hidden"
    >
      {/* Subtle Warm Background Ambient Lighting */}
      <div className="absolute top-1/4 right-0 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] bg-[#E9DED0]/50 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[260px] sm:w-[450px] h-[260px] sm:h-[450px] bg-[#C59B62]/10 blur-[100px] sm:blur-[160px] rounded-full pointer-events-none" />

      {/* Editorial Content Frame */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION METADATA PILL */}
        <div className="flex flex-wrap items-center justify-between mb-8 pb-4 border-b border-[#E9DED0]/80 gap-2">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E9DED0] text-[11px] sm:text-xs font-mono tracking-widest uppercase text-[#263A50] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#C59B62]" />
            <span>01 / IDENTITY & PHILOSOPHY</span>
          </div>
          <span className="text-xs font-mono text-[#263A50]/60 hidden sm:inline">
            ANMOL MALVIYA • THE BUILDER&apos;S DOSSIER
          </span>
        </div>

        {/* EDITORIAL TWO-COLUMN HERO COMPOSITION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-center mb-16 sm:mb-24 lg:mb-28">
          
          {/* Left Column: Expressive Headline & Concise Narrative */}
          <div ref={headlineRef} className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-serif font-medium tracking-tight text-[#292929] leading-[1.12] sm:leading-[1.08]">
              Curious mind,{" "}
              <span className="italic font-normal text-[#C59B62] block sm:inline">
                builder at heart.
              </span>
            </h2>

            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-base sm:text-lg text-[#292929]/80 leading-relaxed font-sans max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl font-light text-[#263A50] leading-snug">
                I design and engineer high-impact digital systems — fusing robust full-stack architecture, 3D spatial web design, and autonomous AI automation into polished products.
              </p>
              
              <p className="text-sm sm:text-base text-[#292929]/70 leading-relaxed">
                My work spans technical project management at <strong className="text-[#263A50] font-semibold">AV Technologies (AdhritVerse)</strong>, winning <strong className="text-[#263A50] font-semibold">TECHSPRINT 2025</strong>, and architecting real-world tools ranging from enterprise hotel operations to AI simulation suites.
              </p>

              {/* Long-Term Vision Editorial Callout */}
              <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border-l-4 border-l-[#C59B62] border border-[#E9DED0] shadow-sm">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C59B62] font-semibold mb-1">
                  <Compass className="w-4 h-4" />
                  <span>The North Star Vision</span>
                </div>
                <p className="text-sm sm:text-base font-medium text-[#263A50] leading-relaxed">
                  Building a multi-product technology powerhouse — originating in India and scaling enduring, world-class software globally.
                </p>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#263A50] text-[#FFFFFF] text-xs font-mono uppercase tracking-wider hover:bg-[#C59B62] transition-colors duration-300 shadow-sm"
              >
                <span>Explore Creations</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#technology"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFFFF] border border-[#E9DED0] text-[#263A50] text-xs font-mono uppercase tracking-wider hover:border-[#C59B62] transition-colors duration-300 shadow-sm"
              >
                <span>Technology Universe</span>
                <span className="text-[#C59B62]">↓</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Spatial Composition */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-lg lg:max-w-none">
              <About3DScene />
            </div>
          </div>
        </div>

        {/* SECTION DIVIDER */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E9DED0] to-transparent mb-16 sm:mb-24" />

        {/* THREE PROFESSIONAL IDENTITY PANELS */}
        <div className="mb-16 sm:mb-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C59B62] font-semibold">
                Tri-Fold Professional Focus
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#263A50] mt-1">
                Architectural Identity & Capabilities
              </h3>
            </div>
            <p className="text-xs font-mono text-[#292929]/60 max-w-xs">
              Bridging engineering precision, technical leadership, and product intuition.
            </p>
          </div>

          <div ref={panelsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {identityPanels.map((panel, idx) => {
              const Icon = panel.icon;
              return (
                <div
                  key={panel.num}
                  onMouseEnter={() => setActiveTilt(idx)}
                  onMouseLeave={() => setActiveTilt(null)}
                  className={`identity-card group relative p-6 sm:p-8 lg:p-9 rounded-3xl bg-[#FFFFFF] border border-[#E9DED0] transition-all duration-500 flex flex-col justify-between ${
                    activeTilt === idx
                      ? "shadow-[0_20px_45px_rgba(197,155,98,0.18)] -translate-y-2 border-[#C59B62]"
                      : "shadow-[0_8px_30px_rgba(38,58,80,0.04)] hover:shadow-md"
                  }`}
                >
                  {/* Subtle top accent strip */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#C59B62] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="w-10 h-10 rounded-2xl bg-[#F8F3EB] border border-[#E9DED0] flex items-center justify-center font-mono text-xs font-semibold text-[#263A50] group-hover:bg-[#C59B62] group-hover:text-white transition-colors duration-300">
                        {panel.num}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-[#F8F3EB] border border-[#E9DED0] flex items-center justify-center text-[#263A50] group-hover:text-[#C59B62] transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#C59B62] font-semibold block mb-2">
                      {panel.focus}
                    </span>
                    <h4 className="text-xl font-bold tracking-tight text-[#263A50] group-hover:text-[#C59B62] transition-colors duration-300 leading-snug">
                      {panel.role}
                    </h4>

                    <p className="mt-4 text-sm text-[#292929]/75 leading-relaxed font-sans">
                      {panel.description}
                    </p>
                  </div>

                  {/* Micro Tags */}
                  <div className="mt-8 pt-6 border-t border-[#E9DED0]/80">
                    <div className="flex flex-wrap gap-1.5">
                      {panel.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#F8F3EB] border border-[#E9DED0] text-[#263A50]/80"
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

        {/* SECTION DIVIDER */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E9DED0] to-transparent mb-16 sm:mb-24" />

        {/* COMPACT EDUCATION & ACHIEVEMENT TIMELINE */}
        <div ref={timelineRef}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C59B62] font-semibold">
                Chronological Pedigree
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#263A50] mt-1">
                Education, Leadership & Accolades
              </h3>
            </div>
            <span className="text-xs font-mono text-[#292929]/60">
              2022 — 2028 MILESTONES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
            {timelineMilestones.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="timeline-item group p-5 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E9DED0] hover:border-[#C59B62]/80 transition-all duration-300 shadow-[0_4px_20px_rgba(38,58,80,0.03)] hover:shadow-md flex flex-col xs:flex-row sm:flex-row items-start gap-4"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#F8F3EB] border border-[#E9DED0] flex items-center justify-center text-[#263A50] group-hover:text-[#C59B62] group-hover:scale-105 transition-all duration-300 shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#E9DED0]/50 text-[#263A50] font-medium">
                        {item.period}
                      </span>
                      <span className="text-[11px] font-mono text-[#C59B62] font-semibold">
                        {item.highlight}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[#263A50] leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-[#292929]/70 mt-1">
                      {item.institution}
                    </p>
                    <p className="mt-2.5 text-xs sm:text-sm text-[#292929]/65 leading-relaxed font-sans">
                      {item.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
