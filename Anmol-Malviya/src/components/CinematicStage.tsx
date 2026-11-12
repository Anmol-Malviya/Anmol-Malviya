"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import ArchitecturalBackground from "@/components/background/ArchitecturalBackground";
import SpotlightReveal from "@/components/SpotlightReveal";

export default function CinematicStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const warmBgRef = useRef<HTMLDivElement>(null);

  // Hero overlay refs
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const heroEyebrowRef = useRef<HTMLDivElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroSwooshRef = useRef<SVGPathElement>(null);
  const heroScrollCueRef = useRef<HTMLDivElement>(null);

  // Video window frame container
  const stageFrameRef = useRef<HTMLDivElement>(null);

  const totalFrames = 239;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d", { alpha: false });
    if (!ctx2d) return;

    // Cache preloaded frame image objects
    const images: HTMLImageElement[] = new Array(totalFrames);
    let currentRenderedIndex = -1;

    const renderFrame = (index: number) => {
      const clamped = Math.max(0, Math.min(totalFrames - 1, Math.round(index)));
      if (clamped === currentRenderedIndex) return;

      const img = images[clamped];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx2d.drawImage(img, 0, 0, canvas.width, canvas.height);
        currentRenderedIndex = clamped;
      }
    };

    // Load first frame immediately for instant rendering
    const firstImg = new Image();
    firstImg.src = "/frames300/f_0001.jpg";
    firstImg.onload = () => {
      images[0] = firstImg;
      ctx2d.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
      currentRenderedIndex = 0;

      // Preload next batch smoothly in idle intervals
      for (let i = 1; i < totalFrames; i++) {
        const frameNum = String(i + 1).padStart(4, "0");
        const img = new Image();
        img.src = `/frames300/f_${frameNum}.jpg`;
        images[i] = img;
      }
    };

    const gsapContext = gsap.context(() => {
      // Initial Hero load animation
      const loadTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      loadTl
        .fromTo(
          heroEyebrowRef.current,
          { opacity: 0, y: -20, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, delay: 0.1 }
        )
        .fromTo(
          heroHeadingRef.current,
          { opacity: 0, y: 30, scale: 0.96, filter: "blur(12px)" },
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.4 },
          "-=0.8"
        )
        .fromTo(
          heroSwooshRef.current,
          { strokeDasharray: 500, strokeDashoffset: 500, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 1.5, ease: "power2.inOut" },
          "-=0.9"
        )
        .fromTo(
          heroScrollCueRef.current,
          { opacity: 0, y: 15 },
          { opacity: 0.8, y: 0, duration: 1 },
          "-=0.4"
        );

      const playhead = { frame: 0 };

      // Master ScrollTrigger Timeline across pinned section
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5800",
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          onUpdate: (self) => {
            renderFrame(playhead.frame);
          },
        },
      });

      // SECTION 5: Hero fade out (0.00 -> 0.08)
      masterTimeline
        .to(
          heroWrapperRef.current,
          {
            opacity: 0,
            scale: 0.96,
            ease: "power2.inOut",
            duration: 0.8,
          },
          0
        )
        .to(
          heroHeadingRef.current,
          {
            y: -40,
            letterSpacing: "0.06em",
            opacity: 0,
            duration: 0.7,
          },
          0
        )
        .to(
          heroSwooshRef.current,
          {
            opacity: 0,
            scaleX: 1.3,
            duration: 0.5,
          },
          0
        )
        .to(
          [heroEyebrowRef.current, heroScrollCueRef.current],
          {
            opacity: 0,
            y: -20,
            duration: 0.4,
          },
          0
        );

      // VIDEO PLAYS IN FULL SCREEN ALL THE WAY TO THE EXACT FINAL FRAME (0.05 -> 0.88)
      masterTimeline.to(
        playhead,
        {
          frame: totalFrames - 1, // Exactly frame 239 (Last frame in developer workspace chair)
          ease: "none",
          duration: 8.3,
        },
        0.05
      );

      // =========================================================================
      // AFTER VIDEO COMPLETELY REACHES FINAL FRAME (FRAME 239) IN FULLSCREEN:
      // AUTOMATIC MINIMIZE IN THE CENTER (0.88 -> 1.00)
      // FULLSCREEN 16:9 → 4:3 CENTERED WINDOW (480px x 360px)
      // =========================================================================

      // Smoothly reveal warm architectural background behind video as it minimizes
      masterTimeline.fromTo(
        warmBgRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, ease: "power2.out", duration: 1.2 },
        0.86
      );

      // Smoothly shrink fullscreen video into EXACT CENTER in 4:3 aspect ratio
      masterTimeline.to(
        stageFrameRef.current,
        {
          width: "480px",
          height: "360px", // Exactly 4:3 aspect ratio (480 : 360 = 4 : 3)
          borderRadius: "24px",
          border: "1px solid rgba(255, 214, 166, 0.6)",
          boxShadow:
            "0 35px 80px -15px rgba(75, 75, 75, 0.25), 0 0 50px rgba(255, 214, 166, 0.35), 0 0 20px rgba(255, 252, 248, 0.8)",
          ease: "power3.inOut",
          duration: 1.2,
        },
        0.88
      );
    }, containerRef);

    return () => gsapContext.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen bg-[#FFFCF8] overflow-hidden select-none"
    >
      {/* Warm 3D Architectural Studio Background */}
      <ArchitecturalBackground ref={warmBgRef} />

      {/* Background ambient glow behind minimized center window */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFE0C2]/40 blur-[160px] rounded-full pointer-events-none" />

      {/* =========================================================================
          CINEMATIC STAGE: INITIALLY 100VW x 100VH FULLSCREEN UNTIL FINAL FRAME
          AFTER FINAL FRAME IS REACHED, MINIMIZES SMOOTHLY IN THE DEAD CENTER (4:3)
         ========================================================================= */}
      <div
        ref={stageFrameRef}
        className="absolute inset-0 m-auto z-10 overflow-hidden flex items-center justify-center transition-shadow"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "0px",
        }}
      >
        {/* High-Performance Canvas Scrubbing Optimized Frames */}
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="w-full h-full object-cover"
        />
      </div>

      {/* The Opening Hero Layer (Smoothly fades on scroll to reveal 100vw x 100vh fullscreen video) */}
      <div
        ref={heroWrapperRef}
        className="absolute inset-0 z-30 bg-[#FFFCF8] flex flex-col justify-between font-sans overflow-hidden select-none pointer-events-auto"
      >
        {/* Base Hero Image + Cursor Following Spotlight Character Reveal */}
        <SpotlightReveal
          baseImageSrc="/BG_IMAGEs_1.jpg"
          revealImageSrc="/BG_IMAGEs_2.jpg"
          alt="Hero Scene"
          revealRadius={260}
        />

        <div className="h-24 sm:h-28" />

        {/* Centered Hero Content */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 -mt-4 sm:-mt-6 z-10 select-none">
          <div
            ref={heroEyebrowRef}
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
              ref={heroHeadingRef}
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
                  <linearGradient id="heroWarmSwoosh" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                    <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.9" />
                    <stop offset="70%" stopColor="#8FBF7A" stopOpacity="1" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.5" />
                  </linearGradient>
                  <filter id="heroGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <path
                  ref={heroSwooshRef}
                  d="M 12,24 C 95,8 240,4 408,18"
                  stroke="url(#heroWarmSwoosh)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  filter="url(#heroGlow)"
                />
              </svg>
            </div>
          </div>

          {/* Professional Headline & Supporting Persona */}
          <div className="mt-4 sm:mt-6 max-w-xl mx-auto flex flex-col items-center">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              Building Ideas Into Digital Reality.
            </p>
            <p className="mt-2 text-sm sm:text-base font-medium text-white/90 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Developer. Product Builder. Technology Enthusiast.
            </p>

            {/* Hero CTAs & Quick Social Links */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFE0C2] hover:bg-[#FFD6A6] text-[#4B4B4B] font-semibold text-sm transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.25)] border border-[#FFD6A6]"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white font-medium text-sm transition-all duration-300 border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
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
                  className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 hover:text-white transition-all shadow-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/anmol-malviya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 hover:text-white transition-all shadow-sm"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </main>

        <div
          ref={heroScrollCueRef}
          className="pb-10 flex flex-col items-center justify-center gap-2 pointer-events-none text-white/75 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-white/80">
            Scroll to explore
          </span>
          <div className="w-5 h-9 rounded-full border border-white/40 flex items-start justify-center p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            <div className="w-1.5 h-2 rounded-full bg-[#8FBF7A] animate-bounce shadow-[0_0_8px_#8FBF7A]" />
          </div>
        </div>
      </div>
    </section>
  );
}
