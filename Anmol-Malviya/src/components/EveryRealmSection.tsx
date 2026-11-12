"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, Volume2, Sparkles, Disc3, Radio, Activity, Compass, ArrowUpRight } from "lucide-react";

interface Realm {
  id: string;
  name: string;
  realmNum: string;
  tagline: string;
  description: string;
  bpm: number;
  freq: number;
  scale: string;
  palette: {
    accent: string;
    border: string;
    glow: string;
    bgGrad: string;
    pillBg: string;
    pillText: string;
  };
  visualType: "solaria" | "elysium" | "chronos" | "abyssal" | "nebula" | "aurora" | "sanctum" | "mirage" | "vortex" | "lumina";
  audioToneType: "sine" | "triangle" | "sawtooth" | "square";
  waveformData: number[];
}

const REALMS: Realm[] = [
  {
    id: "solaria",
    name: "SOLARIA PRIME",
    realmNum: "REALM 01",
    tagline: "Solar Sanctuary • Ethereal Noon",
    description: "Bathed in molten peach luminescence and celestial wind harmonics reverberating across amber dunes.",
    bpm: 128,
    freq: 432,
    scale: "D Major • Golden Octave",
    palette: {
      accent: "#FFD6A6",
      border: "rgba(255, 214, 166, 0.45)",
      glow: "rgba(255, 214, 166, 0.35)",
      bgGrad: "radial-gradient(ellipse at 50% 20%, rgba(255, 224, 194, 0.45), rgba(255, 245, 234, 0.15) 70%, transparent 100%)",
      pillBg: "rgba(255, 224, 194, 0.6)",
      pillText: "#8A5424",
    },
    visualType: "solaria",
    audioToneType: "sine",
    waveformData: [14, 28, 48, 62, 75, 52, 38, 60, 82, 95, 70, 45, 32, 55, 78, 65, 40, 25, 45, 70, 85, 60, 35, 20],
  },
  {
    id: "elysium",
    name: "ELYSIUM GROVE",
    realmNum: "REALM 02",
    tagline: "Verdant Canopy • Sage Resonance",
    description: "Living chlorophyll oscillations pulsing through floating moss islands and crystalline dew fountains.",
    bpm: 94,
    freq: 528,
    scale: "F# Pentatonic • Flora Solfeggio",
    palette: {
      accent: "#8FBF7A",
      border: "rgba(203, 232, 193, 0.55)",
      glow: "rgba(143, 191, 122, 0.35)",
      bgGrad: "radial-gradient(ellipse at 50% 20%, rgba(203, 232, 193, 0.45), rgba(255, 245, 234, 0.15) 70%, transparent 100%)",
      pillBg: "rgba(203, 232, 193, 0.65)",
      pillText: "#3C6329",
    },
    visualType: "elysium",
    audioToneType: "triangle",
    waveformData: [20, 35, 50, 42, 65, 78, 55, 40, 60, 72, 85, 64, 45, 55, 68, 80, 52, 38, 50, 65, 48, 30, 22, 18],
  },
  {
    id: "chronos",
    name: "CHRONOS ATELIER",
    realmNum: "REALM 03",
    tagline: "Temporal Clockwork • Warm Ivory",
    description: "Gyroscopic pendulum bells striking in syncopated polyrhythms through perpetual porcelain chambers.",
    bpm: 110,
    freq: 396,
    scale: "A Minor • Mechanical Canon",
    palette: {
      accent: "#E2AA78",
      border: "rgba(226, 170, 120, 0.45)",
      glow: "rgba(249, 231, 217, 0.4)",
      bgGrad: "radial-gradient(ellipse at 50% 20%, rgba(249, 231, 217, 0.55), rgba(255, 245, 234, 0.2) 70%, transparent 100%)",
      pillBg: "rgba(249, 231, 217, 0.7)",
      pillText: "#7A4E27",
    },
    visualType: "chronos",
    audioToneType: "sine",
    waveformData: [30, 60, 20, 75, 40, 85, 30, 90, 50, 70, 35, 80, 25, 65, 90, 45, 75, 35, 85, 50, 65, 40, 25, 15],
  },
  {
    id: "abyssal",
    name: "ABYSSAL HORIZON",
    realmNum: "REALM 04",
    tagline: "Sub-Oceanic Drone • Pearlescent Tide",
    description: "Deep bioluminescent currents humming with resonant sub-bass beneath iridescent surface waves.",
    bpm: 72,
    freq: 174,
    scale: "C Sub-Bass • Ocean Rift",
    palette: {
      accent: "#76A9B0",
      border: "rgba(118, 169, 176, 0.45)",
      glow: "rgba(118, 169, 176, 0.35)",
      bgGrad: "radial-gradient(ellipse at 50% 20%, rgba(186, 222, 226, 0.45), rgba(255, 245, 234, 0.15) 70%, transparent 100%)",
      pillBg: "rgba(186, 222, 226, 0.6)",
      pillText: "#2C5B62",
    },
    visualType: "abyssal",
    audioToneType: "sine",
    waveformData: [45, 48, 52, 58, 65, 70, 74, 76, 74, 68, 60, 54, 50, 48, 52, 58, 66, 72, 70, 62, 55, 48, 44, 40],
  },
  {
    id: "nebula",
    name: "NEBULA DRIFT",
    realmNum: "REALM 05",
    tagline: "Starlight Reverie • Pastel Lilac",
    description: "Cosmic dust shimmering with granular synthesizers and floating glass chimes across interstellar auroras.",
    bpm: 140,
    freq: 639,
    scale: "E Dorian • Cosmic Drift",
    palette: {
      accent: "#B8A2CD",
      border: "rgba(215, 198, 235, 0.55)",
      glow: "rgba(184, 162, 205, 0.35)",
      bgGrad: "radial-gradient(ellipse at 50% 20%, rgba(229, 217, 243, 0.45), rgba(255, 245, 234, 0.15) 70%, transparent 100%)",
      pillBg: "rgba(229, 217, 243, 0.65)",
      pillText: "#5F4678",
    },
    visualType: "nebula",
    audioToneType: "triangle",
    waveformData: [10, 22, 45, 72, 88, 95, 60, 35, 55, 82, 92, 65, 40, 30, 60, 85, 70, 45, 25, 50, 75, 55, 30, 18],
  },
  {
    id: "aurora",
    name: "AURORA VALE",
    realmNum: "REALM 06",
    tagline: "Polar Ionosphere • Emerald Dawn",
    description: "Magnetic curtain choirs ascending and cascading through glacial valleys in pure crystalline harmonics.",
    bpm: 85,
    freq: 741,
    scale: "G Lydian • Polar Whisper",
    palette: {
      accent: "#8DC9A2",
      border: "rgba(180, 225, 198, 0.5)",
      glow: "rgba(141, 201, 162, 0.35)",
      bgGrad: "radial-gradient(ellipse at 50% 20%, rgba(205, 238, 218, 0.45), rgba(255, 245, 234, 0.15) 70%, transparent 100%)",
      pillBg: "rgba(205, 238, 218, 0.65)",
      pillText: "#2C633F",
    },
    visualType: "aurora",
    audioToneType: "sine",
    waveformData: [25, 40, 65, 80, 92, 75, 55, 40, 65, 85, 95, 78, 50, 35, 60, 80, 70, 48, 32, 55, 75, 58, 36, 22],
  },
  {
    id: "sanctum",
    name: "SANCTUM OF ECHOES",
    realmNum: "REALM 07",
    tagline: "Monastic Arch • Taupe Reverberation",
    description: "Endless cathedral decay times carrying ancient vocal drone mantras through floating travertine pillars.",
    bpm: 60,
    freq: 285,
    scale: "D Minor • Gregorian Pillar",
    palette: {
      accent: "#C2A382",
      border: "rgba(215, 190, 163, 0.5)",
      glow: "rgba(194, 163, 130, 0.35)",
      bgGrad: "radial-gradient(ellipse at 50% 20%, rgba(235, 218, 199, 0.45), rgba(255, 245, 234, 0.15) 70%, transparent 100%)",
      pillBg: "rgba(235, 218, 199, 0.65)",
      pillText: "#63472C",
    },
    visualType: "sanctum",
    audioToneType: "sine",
    waveformData: [20, 25, 30, 40, 60, 75, 85, 80, 65, 50, 42, 38, 45, 58, 72, 80, 68, 52, 40, 32, 28, 24, 20, 18],
  },
  {
    id: "mirage",
    name: "MIRAGE DUNES",
    realmNum: "REALM 08",
    tagline: "Heatwave Tremolo • Sunset Rose",
    description: "Shimmering acoustic tremolo ribbons bending light across endless rose quartz crystalline sands.",
    bpm: 118,
    freq: 417,
    scale: "F Mixolydian • Sand Dune",
    palette: {
      accent: "#E09C88",
      border: "rgba(238, 186, 172, 0.5)",
      glow: "rgba(224, 156, 136, 0.35)",
      bgGrad: "radial-gradient(ellipse at 50% 20%, rgba(248, 212, 203, 0.45), rgba(255, 245, 234, 0.15) 70%, transparent 100%)",
      pillBg: "rgba(248, 212, 203, 0.65)",
      pillText: "#7E3926",
    },
    visualType: "mirage",
    audioToneType: "triangle",
    waveformData: [15, 35, 55, 75, 60, 45, 68, 88, 70, 50, 65, 82, 60, 42, 58, 76, 55, 38, 52, 70, 50, 32, 22, 16],
  },
  {
    id: "vortex",
    name: "QUANTUM VORTEX",
    realmNum: "REALM 09",
    tagline: "Singularity Spin • Opal Frost",
    description: "Centrifugal synthesizer arpeggios spinning into hyper-dimensional gravitational audio pulses.",
    bpm: 155,
    freq: 852,
    scale: "B Aeolian • Quantum Pulse",
    palette: {
      accent: "#8EB8C9",
      border: "rgba(182, 215, 229, 0.5)",
      glow: "rgba(142, 184, 201, 0.35)",
      bgGrad: "radial-gradient(ellipse at 50% 20%, rgba(212, 233, 242, 0.45), rgba(255, 245, 234, 0.15) 70%, transparent 100%)",
      pillBg: "rgba(212, 233, 242, 0.65)",
      pillText: "#2C5465",
    },
    visualType: "vortex",
    audioToneType: "sawtooth",
    waveformData: [10, 40, 80, 20, 60, 95, 30, 75, 90, 40, 85, 25, 70, 90, 35, 80, 60, 30, 75, 95, 50, 30, 20, 15],
  },
  {
    id: "lumina",
    name: "LUMINA CELESTE",
    realmNum: "REALM 10",
    tagline: "Pure Resonance • Prismatic Crown",
    description: "The convergence of all harmonic overtones into a serene, everlasting bell chime of absolute stillness.",
    bpm: 104,
    freq: 963,
    scale: "Crown Solfeggio • Divine Stillness",
    palette: {
      accent: "#D4C27A",
      border: "rgba(235, 223, 172, 0.55)",
      glow: "rgba(212, 194, 122, 0.35)",
      bgGrad: "radial-gradient(ellipse at 50% 20%, rgba(246, 239, 205, 0.5), rgba(255, 245, 234, 0.2) 70%, transparent 100%)",
      pillBg: "rgba(246, 239, 205, 0.7)",
      pillText: "#68581E",
    },
    visualType: "lumina",
    audioToneType: "sine",
    waveformData: [35, 50, 68, 82, 92, 98, 92, 80, 65, 52, 45, 52, 65, 78, 88, 92, 85, 70, 55, 45, 40, 35, 28, 22],
  },
];

export default function EveryRealmSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.7);

  // Web Audio Context synthesizer
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscNodeRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const lfoGainRef = useRef<GainNode | null>(null);

  // Initialize Web Audio synthesizer on demand
  const stopAudio = () => {
    try {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.15);
        setTimeout(() => {
          oscNodeRef.current?.stop();
          oscNodeRef.current?.disconnect();
          oscNodeRef.current = null;
          lfoRef.current?.stop();
          lfoRef.current?.disconnect();
          lfoRef.current = null;
        }, 200);
      }
    } catch {
      // Audio already cleaned up
    }
    setPlayingId(null);
  };

  const playRealmSound = (realm: Realm) => {
    if (playingId === realm.id) {
      stopAudio();
      return;
    }

    // Stop currently playing
    stopAudio();

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(volume * 0.45, now + 0.3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Filter for lush warm sound
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(2.5, now);
      filter.connect(masterGain);
      filterNodeRef.current = filter;

      // Primary Oscillator
      const osc = ctx.createOscillator();
      osc.type = realm.audioToneType;
      osc.frequency.setValueAtTime(realm.freq, now);

      // Gentle LFO vibrato / tremolo modulated by BPM
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(realm.bpm / 60, now);
      lfoGain.gain.setValueAtTime(6.0, now);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start(now);
      lfoRef.current = lfo;
      lfoGainRef.current = lfoGain;

      osc.connect(filter);
      osc.start(now);
      oscNodeRef.current = osc;

      setPlayingId(realm.id);
    } catch (e) {
      console.warn("Audio playback not permitted yet", e);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // GSAP 3D Scroll-Controlled Pinning & Parallax Carousel
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = containerRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const totalCards = cards.length;

    // Responsive setup: On Desktop (pinned 3D carousel), on Mobile (touch horizontal scroll with active tracking)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      // Desktop: Pin section for 500vh to give deep, smooth scrub control
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=4000",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const rawProgress = self.progress * (totalCards - 1);
            const centerIdx = Math.round(rawProgress);
            const clamped = Math.max(0, Math.min(totalCards - 1, centerIdx));
            setActiveIndex(clamped);

            // Compute exact 3D positioning, blur, scale, depth, and rotation per card
            cards.forEach((card, idx) => {
              const dist = idx - rawProgress; // distance from viewport center in card units
              const absDist = Math.abs(dist);

              // 3D Arc calculation: like the reference video, cards curve backwards into the distance
              // Center card: x = 0, z = 0, scale = 1, opacity = 1, blur = 0
              // Left cards: x < 0, z < 0, rotY > 0, blur increases
              // Right cards: x > 0, z < 0, rotY < 0, blur increases
              const xPos = dist * 420; // 420px spacing
              const zPos = -Math.pow(absDist, 1.4) * 260; // Recedes backwards along Z axis
              const rotY = -dist * 24; // Angles towards center viewer
              const rotZ = dist * 2; // subtle cinematic roll
              const scale = Math.max(0.68, 1 - absDist * 0.12);
              const opacity = Math.max(0.15, 1 - absDist * 0.28);
              const blurVal = Math.min(18, absDist * 5.5);

              gsap.set(card, {
                x: xPos,
                z: zPos,
                rotateY: rotY,
                rotateZ: rotZ,
                scale: scale,
                opacity: opacity,
                filter: `blur(${blurVal}px)`,
                zIndex: Math.round(100 - absDist * 10),
                transformOrigin: "center center",
              });
            });
          },
        },
      });

      return () => {
        scrollTimeline.kill();
      };
    });

    mm.add("(max-width: 768px)", () => {
      // Mobile: Horizontal swipe carousel with snap & observer
      const mobileContainer = trackRef.current;
      if (!mobileContainer) return;

      const handleMobileScroll = () => {
        const scrollLeft = mobileContainer.scrollLeft;
        const cardWidth = mobileContainer.clientWidth * 0.82;
        const newIdx = Math.round(scrollLeft / cardWidth);
        const clamped = Math.max(0, Math.min(totalCards - 1, newIdx));
        setActiveIndex(clamped);
      };

      mobileContainer.addEventListener("scroll", handleMobileScroll, { passive: true });
      return () => {
        mobileContainer.removeEventListener("scroll", handleMobileScroll);
      };
    });

    return () => mm.revert();
  }, []);

  const jumpToRealm = (index: number) => {
    setActiveIndex(index);
    if (window.innerWidth <= 768 && trackRef.current) {
      const cardWidth = trackRef.current.clientWidth * 0.82;
      trackRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    } else if (containerRef.current) {
      // Desktop: Scroll to corresponding section percentage
      const st = ScrollTrigger.getById("every-realm-pin") || ScrollTrigger.getAll().find(s => s.trigger === containerRef.current);
      if (st) {
        const targetScroll = st.start + (st.end - st.start) * (index / (REALMS.length - 1));
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }
  };

  const activeRealm = REALMS[activeIndex] || REALMS[0];

  return (
    <section
      id="every-realm"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#FFF5EA] text-[#4B4B4B] overflow-hidden flex flex-col justify-between py-12 md:py-16 selection:bg-[#FFE0C2]"
      style={{ perspective: "1500px" }}
    >
      {/* Dynamic Iridescent Ambient Background Glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] rounded-full blur-[170px] pointer-events-none transition-all duration-1000 opacity-60"
        style={{
          background: `radial-gradient(circle, ${activeRealm.palette.accent}66 0%, rgba(203, 232, 193, 0.3) 50%, transparent 75%)`,
        }}
      />
      <div className="absolute top-10 right-10 w-[420px] h-[420px] bg-[#FFE0C2]/35 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[460px] h-[460px] bg-[#CBE8C1]/30 blur-[150px] rounded-full pointer-events-none" />

      {/* Floating Starlight / Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[18%] left-[12%] w-1.5 h-1.5 rounded-full bg-[#FFD6A6] animate-ping" />
        <div className="absolute top-[28%] right-[18%] w-2 h-2 rounded-full bg-[#8FBF7A] animate-pulse" />
        <div className="absolute bottom-[24%] left-[22%] w-2 h-2 rounded-full bg-[#FFE0C2] animate-bounce" />
        <div className="absolute top-[65%] right-[25%] w-1.5 h-1.5 rounded-full bg-[#76A9B0] animate-pulse" />
      </div>

      {/* Top Header Section */}
      <div className="relative z-30 max-w-6xl mx-auto w-full px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFCF8]/80 backdrop-blur-md border border-[#E6E2DC] text-xs font-mono tracking-widest uppercase text-[#4B4B4B] mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#8FBF7A]" />
          <span>Interactive Auditory Cosmos • 10 Dimensions</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#4B4B4B] leading-tight">
          Every Realm Has Its{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD6A6] via-[#8FBF7A] to-[#76A9B0]">
            Own Sound.
          </span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-[#8D857E] font-normal max-w-xl mx-auto">
          Scroll to orbit through 10 floating glass worlds. Each realm emits its own bespoke BPM, harmonic resonance, and live audio frequency.
        </p>

        {/* Mini Dimension Indicator Pills */}
        <div className="mt-6 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
          {REALMS.map((r, i) => (
            <button
              key={r.id}
              onClick={() => jumpToRealm(i)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                activeIndex === i
                  ? "bg-[#4B4B4B] text-[#FFFCF8] shadow-md scale-105"
                  : "bg-[#FFFCF8]/70 hover:bg-[#FFFCF8] text-[#8D857E] border border-[#E6E2DC]"
              }`}
            >
              {`0${i + 1}`}
            </button>
          ))}
        </div>
      </div>

      {/* Center 3D Carousel Stage */}
      {/* Desktop Perspective Viewport */}
      <div className="relative z-20 w-full flex-1 flex items-center justify-center my-6 min-h-[520px]">
        {/* Desktop Container */}
        <div
          ref={trackRef}
          className="hidden md:flex relative w-full h-[520px] items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1600px",
          }}
        >
          {REALMS.map((realm, index) => {
            const isPlaying = playingId === realm.id;
            const isActive = activeIndex === index;

            return (
              <div
                key={realm.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onClick={() => jumpToRealm(index)}
                className="absolute w-[360px] lg:w-[420px] h-[500px] rounded-[32px] p-7 transition-shadow duration-500 cursor-pointer select-none flex flex-col justify-between"
                style={{
                  background: "rgba(255, 252, 248, 0.72)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  border: `1.5px solid ${isActive ? realm.palette.border : "rgba(230, 226, 220, 0.6)"}`,
                  boxShadow: isActive
                    ? `0 25px 60px -15px ${realm.palette.glow}, 0 0 0 1px ${realm.palette.border}, inset 0 1px 1px rgba(255,255,255,0.9)`
                    : "0 10px 30px -10px rgba(75, 75, 75, 0.08)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Iridescent internal gradient mask */}
                <div
                  className="absolute inset-0 rounded-[32px] pointer-events-none opacity-80 transition-opacity duration-500"
                  style={{
                    background: realm.palette.bgGrad,
                  }}
                />

                {/* Card Top: Realm Number Badge & Audio Indicator */}
                <div className="relative z-10 flex items-center justify-between">
                  <div
                    className="px-3.5 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase font-semibold transition-colors duration-300"
                    style={{
                      backgroundColor: realm.palette.pillBg,
                      color: realm.palette.pillText,
                    }}
                  >
                    {realm.realmNum}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-xs font-mono text-[#8D857E]">
                      <Radio className={`w-3.5 h-3.5 ${isPlaying ? "text-[#8FBF7A] animate-pulse" : "text-[#C8BEB5]"}`} />
                      {realm.bpm} BPM
                    </span>
                  </div>
                </div>

                {/* Card Center: Unique Generative Fantasy Visual */}
                <div className="relative z-10 my-4 flex-1 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-4 border border-white/60 shadow-inner bg-gradient-to-b from-white/40 to-white/10 group">
                  <FantasyVisual visualType={realm.visualType} accent={realm.palette.accent} isPlaying={isPlaying} />

                  <div className="mt-3 text-center">
                    <h3 className="text-2xl font-black tracking-tight text-[#4B4B4B]">{realm.name}</h3>
                    <p className="text-xs text-[#8D857E] font-medium tracking-wide mt-0.5">{realm.tagline}</p>
                  </div>
                </div>

                {/* Card Bottom: Waveform Visualizer & Play Action */}
                <div className="relative z-10 space-y-4 pt-2">
                  <p className="text-xs text-[#8D857E] line-clamp-2 leading-relaxed">{realm.description}</p>

                  {/* Dynamic Sound Waveform Bars */}
                  <div className="flex items-center justify-between gap-1 h-8 px-3 py-1.5 rounded-xl bg-white/70 border border-[#E6E2DC]/80 backdrop-blur-sm">
                    <div className="flex items-center gap-1 flex-1 h-full">
                      {realm.waveformData.map((height, barIdx) => {
                        const dynamicHeight = isPlaying
                          ? `${Math.max(15, (height * 0.8 + Math.sin(barIdx + Date.now() * 0.005) * 35))}%`
                          : `${height * 0.5}%`;
                        return (
                          <div
                            key={barIdx}
                            className="flex-1 rounded-full transition-all duration-150"
                            style={{
                              height: dynamicHeight,
                              backgroundColor: isPlaying ? realm.palette.accent : "#C8BEB5",
                              opacity: isPlaying ? 1 : 0.6,
                            }}
                          />
                        );
                      })}
                    </div>
                    <span className="text-[10px] font-mono text-[#8D857E] pl-2">{realm.freq}Hz</span>
                  </div>

                  {/* Action Row */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-[11px] font-mono text-[#8D857E] flex items-center gap-1">
                      <Activity className="w-3 h-3 text-[#8FBF7A]" />
                      <span>{realm.scale}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playRealmSound(realm);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wider text-[#4B4B4B] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
                      style={{
                        backgroundColor: isPlaying ? realm.palette.accent : "#FFFCF8",
                        border: `1.5px solid ${realm.palette.border}`,
                      }}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>PAUSE</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>LISTEN</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Horizontal Carousel (Swipeable with snap) */}
        <div
          ref={trackRef}
          className="md:hidden flex w-full overflow-x-auto snap-x snap-mandatory px-6 gap-5 py-4 no-scrollbar"
        >
          {REALMS.map((realm, index) => {
            const isPlaying = playingId === realm.id;
            const isActive = activeIndex === index;

            return (
              <div
                key={realm.id}
                onClick={() => jumpToRealm(index)}
                className="snap-center shrink-0 w-[82vw] max-w-[340px] h-[480px] rounded-[28px] p-6 flex flex-col justify-between relative overflow-hidden"
                style={{
                  background: "rgba(255, 252, 248, 0.85)",
                  backdropFilter: "blur(20px)",
                  border: `1.5px solid ${isActive ? realm.palette.border : "rgba(230, 226, 220, 0.7)"}`,
                  boxShadow: isActive ? `0 15px 40px -10px ${realm.palette.glow}` : "none",
                }}
              >
                {/* Iridescent internal gradient */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-80"
                  style={{ background: realm.palette.bgGrad }}
                />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-semibold"
                    style={{
                      backgroundColor: realm.palette.pillBg,
                      color: realm.palette.pillText,
                    }}
                  >
                    {realm.realmNum}
                  </span>
                  <span className="text-xs font-mono text-[#8D857E] flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 text-[#8FBF7A]" />
                    {realm.bpm} BPM
                  </span>
                </div>

                {/* Fantasy Art */}
                <div className="relative z-10 my-3 flex-1 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-3 border border-white/60 bg-white/40">
                  <FantasyVisual visualType={realm.visualType} accent={realm.palette.accent} isPlaying={isPlaying} />
                  <div className="mt-2 text-center">
                    <h3 className="text-xl font-black text-[#4B4B4B]">{realm.name}</h3>
                    <p className="text-[11px] text-[#8D857E]">{realm.tagline}</p>
                  </div>
                </div>

                {/* Bottom Audio Info */}
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between gap-1 h-7 px-3 rounded-lg bg-white/70 border border-[#E6E2DC]/80">
                    <div className="flex items-center gap-1 flex-1 h-full">
                      {realm.waveformData.slice(0, 16).map((h, b) => (
                        <div
                          key={b}
                          className="flex-1 rounded-full"
                          style={{
                            height: isPlaying ? `${Math.max(20, h * 0.9)}%` : `${h * 0.4}%`,
                            backgroundColor: isPlaying ? realm.palette.accent : "#C8BEB5",
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-[#8D857E]">{realm.freq}Hz</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#8D857E]">{realm.scale}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playRealmSound(realm);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold bg-white border border-[#E6E2DC] text-[#4B4B4B]"
                    >
                      {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                      <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="relative z-30 max-w-4xl mx-auto w-full px-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E6E2DC]/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#FFFCF8] border border-[#FFD6A6] flex items-center justify-center text-[#4B4B4B] shadow-sm">
            <Disc3 className={`w-4 h-4 ${playingId ? "animate-spin text-[#8FBF7A]" : "text-[#8D857E]"}`} />
          </div>
          <div>
            <div className="text-xs font-mono font-semibold text-[#4B4B4B]">
              {playingId ? `BROADCASTING: ${activeRealm.name}` : "SELECT A REALM TO RESONATE"}
            </div>
            <div className="text-[11px] text-[#8D857E] font-normal">
              {activeRealm.scale} • {activeRealm.freq}Hz Solfeggio Harmonic
            </div>
          </div>
        </div>

        {/* Volume & Navigator controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#8D857E]" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolume(val);
                if (gainNodeRef.current && audioCtxRef.current) {
                  gainNodeRef.current.gain.setTargetAtTime(val * 0.45, audioCtxRef.current.currentTime, 0.05);
                }
              }}
              className="w-20 sm:w-28 accent-[#8FBF7A] cursor-pointer"
            />
          </div>

          <div className="text-xs font-mono text-[#8D857E] bg-[#FFFCF8] px-3 py-1 rounded-full border border-[#E6E2DC]">
            {activeIndex + 1} / {REALMS.length}
          </div>
        </div>
      </div>
    </section>
  );
}

// Generative Fantasy Visuals for each of the 10 dimensions
function FantasyVisual({
  visualType,
  accent,
  isPlaying,
}: {
  visualType: Realm["visualType"];
  accent: string;
  isPlaying: boolean;
}) {
  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      {/* Outer ambient pulse ring */}
      <div
        className={`absolute inset-0 rounded-full blur-md opacity-40 transition-transform duration-700 ${
          isPlaying ? "scale-110" : "scale-95"
        }`}
        style={{ backgroundColor: accent }}
      />

      {/* Visual representations */}
      {visualType === "solaria" && (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#FFD6A6] fill-none">
          <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className={isPlaying ? "animate-spin" : ""} style={{ animationDuration: "20s" }} />
          <circle cx="50" cy="50" r="22" fill="#FFE0C2" fillOpacity="0.6" stroke="#E2AA78" strokeWidth="2" />
          <polygon points="50,12 55,24 68,24 57,32 61,45 50,37 39,45 43,32 32,24 45,24" fill="#FFD6A6" className={isPlaying ? "animate-pulse" : ""} />
        </svg>
      )}

      {visualType === "elysium" && (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#8FBF7A] fill-none">
          <path d="M50 20 C65 20, 80 35, 80 50 C80 65, 65 80, 50 80 C35 80, 20 65, 20 50 C20 35, 35 20, 50 20 Z" stroke="currentColor" strokeWidth="2" />
          <path d="M50 25 C40 40, 40 60, 50 75 C60 60, 60 40, 50 25 Z" fill="#CBE8C1" fillOpacity="0.7" stroke="#8FBF7A" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="6" fill="#8FBF7A" className={isPlaying ? "animate-ping" : ""} />
        </svg>
      )}

      {visualType === "chronos" && (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#E2AA78] fill-none">
          <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="28" stroke="#FFE0C2" strokeWidth="1" strokeDasharray="3 3" className={isPlaying ? "animate-spin" : ""} style={{ animationDuration: "12s" }} />
          <line x1="50" y1="50" x2="50" y2="28" stroke="#7A4E27" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="50" x2="68" y2="50" stroke="#7A4E27" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="50" r="4" fill="#E2AA78" />
        </svg>
      )}

      {visualType === "abyssal" && (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#76A9B0] fill-none">
          <path d="M15 45 Q 32 30, 50 45 T 85 45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={isPlaying ? "animate-pulse" : ""} />
          <path d="M20 55 Q 35 40, 50 55 T 80 55" stroke="#BAEBEE" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="50" r="26" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 3" />
          <circle cx="50" cy="50" r="10" fill="#76A9B0" fillOpacity="0.4" />
        </svg>
      )}

      {visualType === "nebula" && (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#B8A2CD] fill-none">
          <ellipse cx="50" cy="50" rx="36" ry="18" stroke="currentColor" strokeWidth="2" transform="rotate(-30 50 50)" />
          <ellipse cx="50" cy="50" rx="36" ry="18" stroke="#E5D9F3" strokeWidth="1.5" transform="rotate(30 50 50)" />
          <circle cx="50" cy="50" r="16" fill="#B8A2CD" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="4" fill="#FFFFFF" className={isPlaying ? "animate-ping" : ""} />
        </svg>
      )}

      {visualType === "aurora" && (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#8DC9A2] fill-none">
          <path d="M20 70 Q 35 25, 50 50 T 80 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 80 Q 40 40, 55 60 T 85 40" stroke="#CDEEDA" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
        </svg>
      )}

      {visualType === "sanctum" && (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#C2A382] fill-none">
          <path d="M30 80 L30 45 Q50 15, 70 45 L70 80 Z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M40 80 L40 50 Q50 30, 60 50 L60 80 Z" fill="#EBDAC7" fillOpacity="0.6" stroke="#C2A382" strokeWidth="1.5" />
          <circle cx="50" cy="38" r="4" fill="#C2A382" />
        </svg>
      )}

      {visualType === "mirage" && (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#E09C88] fill-none">
          <circle cx="50" cy="40" r="18" fill="#F8D4CB" fillOpacity="0.7" stroke="currentColor" strokeWidth="2" />
          <path d="M15 75 Q 35 60, 55 70 T 85 65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M20 85 Q 45 70, 65 80 T 90 75" stroke="#E09C88" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}

      {visualType === "vortex" && (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#8EB8C9] fill-none">
          <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="2" strokeDasharray="12 4" className={isPlaying ? "animate-spin" : ""} style={{ animationDuration: "8s" }} />
          <circle cx="50" cy="50" r="22" stroke="#B6D7E5" strokeWidth="2" strokeDasharray="8 4" className={isPlaying ? "animate-spin" : ""} style={{ animationDuration: "5s", animationDirection: "reverse" }} />
          <circle cx="50" cy="50" r="10" fill="#8EB8C9" fillOpacity="0.6" />
        </svg>
      )}

      {visualType === "lumina" && (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4C27A] fill-none">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" />
          <polygon points="50,15 60,40 85,50 60,60 50,85 40,60 15,50 40,40" fill="#F6ECCD" fillOpacity="0.7" stroke="#D4C27A" strokeWidth="1.5" className={isPlaying ? "animate-pulse" : ""} />
          <circle cx="50" cy="50" r="5" fill="#D4C27A" />
        </svg>
      )}
    </div>
  );
}

