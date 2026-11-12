"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const swooshRef = useRef<SVGPathElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Intro timeline on page load
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -20, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, delay: 0.2 }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 30, scale: 0.96, filter: "blur(12px)" },
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.4 },
          "-=0.8"
        )
        .fromTo(
          swooshRef.current,
          { strokeDasharray: 500, strokeDashoffset: 500, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 1.5, ease: "power2.inOut" },
          "-=0.9"
        )
        .fromTo(
          scrollCueRef.current,
          { opacity: 0, y: 15 },
          { opacity: 0.8, y: 0, duration: 1 },
          "-=0.4"
        );

      // Hero scroll exit timeline — seamless cinematic lift & scale into video scene
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
        y: -100,
        scale: 0.94,
        opacity: 0,
        filter: "blur(6px)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#000000] text-white flex flex-col justify-between selection:bg-[#38bdf8]/30 font-sans overflow-hidden z-20"
    >
      {/* Invisible spacer so fixed nav has padding */}
      <div className="h-24 sm:h-28" />

      {/* Hero Section Center Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 -mt-8 sm:-mt-12 z-10 select-none">
        {/* Eyebrow: — Hye, I'm — */}
        <div
          ref={eyebrowRef}
          className="flex items-center justify-center gap-3.5 mb-3 sm:mb-4"
        >
          <span className="w-7 sm:w-8 h-[1.5px] bg-white/70" />
          <span className="text-base sm:text-lg md:text-xl font-normal text-white/90 tracking-wide">
            Hye, I&apos;m
          </span>
          <span className="w-7 sm:w-8 h-[1.5px] bg-white/70" />
        </div>

        {/* Main Name Heading with Curved Underline */}
        <div className="relative inline-flex flex-col items-center">
          <h1
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold tracking-tight text-white leading-tight"
          >
            Anmol Malviya
          </h1>

          {/* Cyan Curved Swoosh / Flourish underline */}
          <div className="w-[85%] sm:w-[90%] md:w-[92%] mt-1 sm:mt-2">
            <svg
              viewBox="0 0 420 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto overflow-visible"
            >
              <defs>
                <linearGradient id="cyanSwoosh" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
                  <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.85" />
                  <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.25" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path
                ref={swooshRef}
                d="M 12,24 C 95,8 240,4 408,18"
                stroke="url(#cyanSwoosh)"
                strokeWidth="4.5"
                strokeLinecap="round"
                filter="url(#glow)"
              />
            </svg>
          </div>
        </div>
      </main>

      {/* Subtle Scroll Cue */}
      <div
        ref={scrollCueRef}
        className="pb-10 flex flex-col items-center justify-center gap-2 pointer-events-none text-white/50"
      >
        <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-white/60">
          Scroll to explore
        </span>
        <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2 rounded-full bg-[#38bdf8] animate-bounce shadow-[0_0_8px_#38bdf8]" />
        </div>
      </div>
    </section>
  );
}

