"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CinematicVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Overlay scene text refs
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    if (!video) return;

    // Use actual escaped video file path from public folder
    const videoSrc = "/vedio/Creating_seamless_cinematic_vide%E2%80%A6_8b1e1d24_1080p.mp4";
    if (video.src !== window.location.origin + videoSrc) {
      video.src = videoSrc;
    }

    let isSeeking = false;
    let targetTime = 0;
    let rafId: number | null = null;

    const renderLoop = () => {
      if (video && video.readyState >= 2 && !isSeeking) {
        const diff = Math.abs(video.currentTime - targetTime);
        if (diff > 0.04) {
          isSeeking = true;
          video.currentTime = targetTime;
        }
      }
      rafId = requestAnimationFrame(renderLoop);
    };

    const onSeeked = () => {
      isSeeking = false;
    };
    video.addEventListener("seeked", onSeeked);

    const onLoadedMetadata = () => {
      setIsVideoReady(true);
      rafId = requestAnimationFrame(renderLoop);

      // Create scroll-driven video timeline
      const ctx = gsap.context(() => {
        const videoDuration = video.duration || 10;

        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=4000",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              // Smooth scrub target time
              targetTime = self.progress * videoDuration;
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${self.progress * 100}%`;
              }
            },
          },
        });

        // Scene 1: Environment (0% - 25%)
        mainTimeline.fromTo(
          scene1Ref.current,
          { opacity: 0, y: 40, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
          0.05
        );
        mainTimeline.to(
          scene1Ref.current,
          { opacity: 0, y: -30, filter: "blur(8px)", duration: 0.8 },
          0.22
        );

        // Scene 2: Character Reveal (28% - 50%)
        mainTimeline.fromTo(
          scene2Ref.current,
          { opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" },
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1 },
          0.28
        );
        mainTimeline.to(
          scene2Ref.current,
          { opacity: 0, y: -30, scale: 1.05, filter: "blur(8px)", duration: 0.8 },
          0.48
        );

        // Scene 3: Technology Universe / Octopus (53% - 75%)
        mainTimeline.fromTo(
          scene3Ref.current,
          { opacity: 0, y: 40, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
          0.53
        );
        mainTimeline.to(
          scene3Ref.current,
          { opacity: 0, y: -30, filter: "blur(8px)", duration: 0.8 },
          0.73
        );

        // Scene 4: Developer Workspace (78% - 100%)
        mainTimeline.fromTo(
          scene4Ref.current,
          { opacity: 0, y: 40, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
          0.78
        );
        mainTimeline.to(
          scene4Ref.current,
          { opacity: 0.9, y: 0, filter: "blur(0px)", duration: 0.5 },
          0.95
        );
      }, containerRef);

      return () => ctx.revert();
    };

    if (video.readyState >= 1) {
      onLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", onLoadedMetadata, { once: true });
    }

    return () => {
      video.removeEventListener("seeked", onSeeked);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="cinematic"
      ref={containerRef}
      className="relative w-full h-screen bg-[#000000] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Video Canvas Container */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          playsInline
          muted
          preload="auto"
          className="w-full h-full object-cover pointer-events-none brightness-95 contrast-105"
        />

        {/* Cinematic Vignette & Edge Shadow Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)] pointer-events-none" />
      </div>

      {/* Floating Timeline & Progress Indicator */}
      <div className="absolute top-28 right-8 sm:right-14 z-30 flex items-center gap-3 pointer-events-none">
        <span className="text-[11px] font-mono tracking-widest uppercase text-white/50">
          Cinematic Reel
        </span>
        <div className="w-24 sm:w-32 h-[2px] bg-white/20 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="w-0 h-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8] transition-all"
          />
        </div>
      </div>

      {/* OVERLAY SCENE A: Environment */}
      <div
        ref={scene1Ref}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20 opacity-0"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs tracking-widest uppercase text-[#38bdf8] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
          Scene 01 • Prologue
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] max-w-4xl">
          Welcome to my world.
        </h2>
        <p className="mt-4 text-base sm:text-xl text-white/80 max-w-xl font-light drop-shadow">
          Where ideas take form through code, craft, and seamless digital interaction.
        </p>
      </div>

      {/* OVERLAY SCENE B: Character Reveal */}
      <div
        ref={scene2Ref}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20 opacity-0"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs tracking-widest uppercase text-[#38bdf8] mb-4">
          Scene 02 • Identity
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] max-w-4xl">
          Meet the mind behind the creations.
        </h2>
        <p className="mt-4 text-base sm:text-xl text-white/80 max-w-xl font-light drop-shadow">
          Architecting modern high-performance interfaces with obsessive attention to motion and feel.
        </p>
      </div>

      {/* OVERLAY SCENE C: Technology Universe */}
      <div
        ref={scene3Ref}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20 opacity-0"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs tracking-widest uppercase text-[#38bdf8] mb-4">
          Scene 03 • The Playground
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] max-w-4xl">
          Where creativity meets technology.
        </h2>
        <p className="mt-4 text-base sm:text-xl text-white/80 max-w-xl font-light drop-shadow">
          Fullstack engineering powered by Next.js, 3D graphics, intelligent AI, and reactive animations.
        </p>
      </div>

      {/* OVERLAY SCENE D: Developer Workspace */}
      <div
        ref={scene4Ref}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20 opacity-0"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs tracking-widest uppercase text-[#38bdf8] mb-4">
          Scene 04 • The Workshop
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] max-w-4xl">
          Always learning. Always building.
        </h2>
        <p className="mt-4 text-base sm:text-xl text-white/80 max-w-xl font-light drop-shadow">
          Every line of code crafted with purpose, curiosity, and high engineering standards.
        </p>
      </div>

      {/* Loading state indicator */}
      {!isVideoReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-30">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-[#38bdf8] animate-spin" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/50">
              Calibrating Reel...
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

