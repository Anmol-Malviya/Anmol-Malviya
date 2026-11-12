"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Briefcase, GraduationCap, Rocket, Trophy } from "lucide-react";

interface Milestone {
  period: string;
  role: string;
  institution: string;
  details: string;
  icon: typeof GraduationCap;
  highlight?: boolean;
}

const milestones: Milestone[] = [
  {
    period: "2026",
    role: "IUCEE Student Project Competition 2026",
    institution: "IUCEE",
    details:
      "Presenting engineering project concepts and learning through peer feedback and academic-industry evaluation.",
    icon: Award,
  },
  {
    period: "2025",
    role: "Winner • TECHSPRINT 2025",
    institution: "GDG on Campus • PIEMR",
    details:
      "Won TECHSPRINT 2025 organized by GDG on Campus PIEMR, engineering solutions under tight sprint deadlines.",
    icon: Trophy,
    highlight: true,
  },
  {
    period: "2025",
    role: "Participant • Smart India Hackathon (SIH) 2025",
    institution: "SIH 2025",
    details:
      "Participated in SIH 2025 with MAILTRACE AI, an email threat detection and forensic intelligence concept.",
    icon: Award,
  },
  {
    period: "2025 - 2028",
    role: "B.Tech • Computer Science Engineering (IoT + Cyber Security + Blockchain)",
    institution: "Prestige Institute of Engineering Management & Research (PIEMR), Indore",
    details:
      "Pursuing Computer Science Engineering with focus on IoT, Cyber Security, and Blockchain architectures.",
    icon: GraduationCap,
  },
  {
    period: "Ongoing",
    role: "Project Manager & Senior Developer",
    institution: "AV Technologies (AdhritVerse)",
    details:
      "Leading project coordination, technical architecture, web development, product development, and AI integration.",
    icon: Briefcase,
    highlight: true,
  },
  {
    period: "2022 - 2025",
    role: "Diploma • Computer Science Engineering",
    institution: "Government Polytechnic College, Itarsi (MP Board)",
    details:
      "Completed Computer Science Engineering diploma under MP Board with 7.8 CGPA, mastering foundational computing.",
    icon: Rocket,
  },
];

export default function MyJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Timeline vertical progress bar animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1.2,
          },
          scaleY: 1,
          transformOrigin: "top",
        }
      );

      // Milestone card reveals
      const cards = containerRef.current?.querySelectorAll(".timeline-card");
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: -30, filter: "blur(8px)" },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 55%",
              scrub: 1,
            },
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#000000] text-white py-32 px-6 sm:px-12 md:px-20 overflow-hidden"
    >
      {/* Subtle backdrop lights */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-sky-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono tracking-widest uppercase text-[#38bdf8] mb-6">
            <Award className="w-3.5 h-3.5" />
            Scene 05 • Narrative & Evolution
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Every experience{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-blue-400">
              builds something new.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60 font-light">
            A chronological timeline of milestones, competitive wins, and engineering leadership.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-8 sm:pl-16">
          {/* Animated Vertical Line */}
          <div className="absolute top-0 bottom-0 left-3 sm:left-6 w-[2px] bg-white/10">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-[#38bdf8] via-sky-400 to-indigo-500 shadow-[0_0_12px_#38bdf8]"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {milestones.map((milestone) => {
              const Icon = milestone.icon;
              return (
                <div
                  key={milestone.role}
                  className="timeline-card relative group flex flex-col sm:flex-row items-start sm:items-center gap-6"
                >
                  {/* Dot Marker on Timeline */}
                  <div
                    className={`absolute -left-[27px] sm:-left-[43px] w-6 h-6 rounded-full flex items-center justify-center ${
                      milestone.highlight
                        ? "bg-[#38bdf8] shadow-[0_0_16px_#38bdf8]"
                        : "bg-[#0d1527] border border-white/20"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        milestone.highlight ? "bg-black" : "bg-sky-400"
                      }`}
                    />
                  </div>

                  {/* Card Content */}
                  <div
                    className={`w-full p-6 sm:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border ${
                      milestone.highlight
                        ? "border-sky-500/30 shadow-[0_4px_25px_rgba(56,189,248,0.08)]"
                        : "border-white/[0.08]"
                    } hover:border-sky-400/50 transition-all duration-300`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#38bdf8]" />
                        <span className="text-sm font-semibold tracking-wide text-white">
                          {milestone.institution}
                        </span>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/10 text-white/80">
                        {milestone.period}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">
                      {milestone.role}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base text-white/65 font-light leading-relaxed">
                      {milestone.details}
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

