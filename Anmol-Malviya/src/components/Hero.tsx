"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SpotlightReveal from "@/components/SpotlightReveal";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const swooshRef = useRef<SVGPathElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -20, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, delay: 0.1 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 30, scale: 0.96, filter: "blur(12px)" },
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.4 },
          "-=0.8"
        )
        .fromTo(
          swooshRef.current,
          { strokeDasharray: 500, strokeDashoffset: 500, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "-=0.9"
        )
        .fromTo(
          scrollCueRef.current,
          { opacity: 0, y: 15 },
          { opacity: 0.8, y: 0, duration: 1 },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen bg-[#FFFCF8] flex flex-col justify-between font-sans overflow-hidden select-none"
    >
      <SpotlightReveal
        baseImageSrc="/BG_IMAGEs_1.jpg"
        revealImageSrc="/BG_IMAGEs_2.jpg"
        alt="Hero Scene"
        revealRadius={260}
      />

      <div className="h-24 sm:h-28" />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 -mt-8 sm:-mt-12 z-10 select-none">
        <div
          ref={eyebrowRef}
          className="flex items-center justify-center gap-3.5 mb-3 sm:mb-4"
        >
          <span className="w-7 sm:w-8 h-[1.5px] bg-white/70 shadow-[0_1px_4px_rgba(0,0,0,0.5)]" />
          <span className="text-base sm:text-lg md:text-xl font-normal text-white/95 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Hey, I&apos;m
          </span>
          <span className="w-7 sm:w-8 h-[1.5px] bg-white/70 shadow-[0_1px_4px_rgba(0,0,0,0.5)]" />
        </div>

        <div className="relative inline-flex flex-col items-center">
          <h1
            ref={headlineRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          >
            Anmol Malviya
          </h1>

          <div className="w-[85%] sm:w-[90%] md:w-[92%] mt-1 sm:mt-2">
            <svg
              viewBox="0 0 420 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto overflow-visible"
            >
              <defs>
                <linearGradient id="heroWarmSwoosh2" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                  <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#8FBF7A" stopOpacity="1" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.5" />
                </linearGradient>
                <filter id="heroGlow2" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path
                ref={swooshRef}
                d="M 12,24 C 95,8 240,4 408,18"
                stroke="url(#heroWarmSwoosh2)"
                strokeWidth="4.5"
                strokeLinecap="round"
                filter="url(#heroGlow2)"
              />
            </svg>
          </div>
        </div>

        <p className="mt-4 text-xl sm:text-2xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
          Building Ideas Into Digital Reality.
        </p>
        <p className="mt-1 text-sm sm:text-base font-medium text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          Developer. Product Builder. Technology Enthusiast.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFE0C2] hover:bg-[#FFD6A6] text-[#4B4B4B] font-semibold text-sm transition-all shadow-sm border border-[#FFD6A6]"
          >
            <span>Explore Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white font-medium text-sm transition-all border border-white/20 shadow-sm"
          >
            <Mail className="w-4 h-4 text-[#8FBF7A]" />
            <span>Let&apos;s Connect</span>
          </a>
          <div className="flex items-center gap-2 ml-1">
            <a
              href="https://github.com/Anmol-Malviya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white/90 hover:text-white transition-all shadow-sm"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/anmol-malviya/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white/90 hover:text-white transition-all shadow-sm"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <div
        ref={scrollCueRef}
        className="pb-10 flex flex-col items-center justify-center gap-2 pointer-events-none text-white/75 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
      >
        <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-white/80">
          Scroll to explore
        </span>
        <div className="w-5 h-9 rounded-full border border-white/40 flex items-start justify-center p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          <div className="w-1.5 h-2 rounded-full bg-[#8FBF7A] animate-bounce shadow-[0_0_8px_#8FBF7A]" />
        </div>
      </div>
    </section>
  );
}