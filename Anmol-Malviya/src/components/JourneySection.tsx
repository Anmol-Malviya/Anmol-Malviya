"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Briefcase, GraduationCap, Trophy, Code2, Cloud, Sparkles, CheckCircle } from "lucide-react";

interface Milestone {
  period: string;
  role: string;
  institution: string;
  details: string;
  icon: typeof Trophy;
  highlight?: boolean;
  category?: string;
}

const milestones: Milestone[] = [
  {
    period: "2026",
    role: "IUCEE Student Project Competition 2026",
    institution: "Indo-Universal Collaboration for Engineering Education (IUCEE)",
    details: "Presenting innovative student engineering initiatives with peer feedback and academic-industry mentorship.",
    icon: Award,
    category: "Competition",
  },
  {
    period: "2025",
    role: "TECHSPRINT 2025 Winner",
    institution: "GDG on Campus • PIEMR",
    details: "Won first place at TECHSPRINT 2025 organized by Google Developer Groups on Campus PIEMR, engineering solutions under tight sprint deadlines.",
    icon: Trophy,
    highlight: true,
    category: "Hackathon Victory",
  },
  {
    period: "2025",
    role: "Smart India Hackathon (SIH) 2025 Participant",
    institution: "Ministry of Education / AICTE Innovation Cell",
    details: "Participated in SIH 2025 addressing critical challenges with MAILTRACE AI, an email threat detection and forensic intelligence concept.",
    icon: Sparkles,
    category: "National Hackathon",
  },
  {
    period: "2025 – 2028",
    role: "B.Tech • Computer Science Engineering",
    institution: "Prestige Institute of Engineering Management & Research (PIEMR), Indore",
    details: "Specialization in IoT + Cyber Security + Blockchain. Deepening knowledge in decentralized systems, security protocols, and scalable architecture.",
    icon: GraduationCap,
    category: "Degree",
  },
  {
    period: "Ongoing",
    role: "Project Manager & Senior Developer",
    institution: "AV Technologies (AdhritVerse)",
    details: "Leading project coordination, technical architecture, full-stack web development, and AI integration across active products.",
    icon: Briefcase,
    highlight: true,
    category: "Experience",
  },
  {
    period: "2022 – 2025",
    role: "Diploma • Computer Science Engineering",
    institution: "Government Polytechnic College, Itarsi (MP Board)",
    details: "Graduated with 7.8 CGPA. Formed a strong engineering foundation in algorithms, programming principles, and computer networks.",
    icon: Code2,
    category: "Diploma",
  },
  {
    period: "Activities & Learning",
    role: "GDG Activities & Cloud Study Jams",
    institution: "Google Cloud Study Jam & GDG on Campus PIEMR",
    details: "Active participant in community tech workshops, hands-on Google Cloud Study Jams, and developer learning sessions.",
    icon: Cloud,
    category: "Community",
  },
  {
    period: "Certifications",
    role: "Infosys Springboard Certifications",
    institution: "Infosys Springboard",
    details: "Completed industry-curated technical certification tracks spanning software foundations, cloud concepts, and development practices.",
    icon: CheckCircle,
    category: "Certifications",
  },
];

export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
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
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scrollTrigger: { trigger: containerRef.current, start: "top 60%", end: "bottom 80%", scrub: 1.2 },
          scaleY: 1,
          transformOrigin: "top",
        }
      );
      containerRef.current?.querySelectorAll(".timeline-node").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: -30, filter: "blur(8px)" },
          {
            scrollTrigger: { trigger: card, start: "top 85%", end: "top 55%", scrub: 1 },
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
    <section id="journey" ref={containerRef} className="relative min-h-screen w-full bg-[#FFFCF8] text-[#4B4B4B] py-36 px-6 sm:px-12 md:px-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#FFE0C2]/25 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#CBE8C1]/20 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div ref={headlineRef} className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE0C2]/60 border border-[#FFD6A6] text-xs font-mono tracking-widest uppercase mb-6 shadow-sm">
            <Award className="w-3.5 h-3.5 text-[#8FBF7A]" /> Journey, Experience & Achievements
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Learning, building,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9A46F] via-[#8FBF7A] to-[#4B4B4B]">moving forward.</span>
          </h2>
          <p className="mt-4 text-base sm:text-xl text-[#8D857E]">
            A chronicle of formal education, professional leadership, hackathons, and certified milestones.
          </p>
        </div>

        <div className="relative pl-8 sm:pl-16">
          <div className="absolute top-0 bottom-0 left-3 sm:left-6 w-[2px] bg-[#E6E2DC]">
            <div ref={lineRef} className="w-full h-full bg-gradient-to-b from-[#8FBF7A] via-[#FFD6A6] to-[#CBE8C1]" />
          </div>

          <div className="space-y-10">
            {milestones.map((milestone) => {
              const Icon = milestone.icon;
              return (
                <div key={milestone.role} className="timeline-node relative group flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className={`absolute -left-[27px] sm:-left-[43px] w-6 h-6 rounded-full flex items-center justify-center ${milestone.highlight ? "bg-[#8FBF7A] shadow-[0_0_14px_rgba(143,191,122,0.6)]" : "bg-[#FFF5EA] border border-[#C8BEB5]"}`}>
                    <div className={`w-2 h-2 rounded-full ${milestone.highlight ? "bg-[#FFFCF8]" : "bg-[#8FBF7A]"}`} />
                  </div>

                  <div className={`w-full p-6 sm:p-8 rounded-2xl bg-[#FFF5EA]/90 backdrop-blur-xl border ${milestone.highlight ? "border-[#FFD6A6] shadow-[0_4px_25px_rgba(255,214,166,0.35)]" : "border-[#E6E2DC]"} hover:border-[#8FBF7A] transition-all duration-300`}>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#8FBF7A]" />
                        <span className="text-sm font-semibold tracking-wide text-[#4B4B4B]">{milestone.institution}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {milestone.category && (
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#8D857E]">
                            {milestone.category}
                          </span>
                        )}
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#F9E7D9] border border-[#E6E2DC] font-medium text-[#4B4B4B]">
                          {milestone.period}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold group-hover:text-[#8FBF7A] transition-colors">
                      {milestone.role}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base text-[#8D857E] leading-relaxed">
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