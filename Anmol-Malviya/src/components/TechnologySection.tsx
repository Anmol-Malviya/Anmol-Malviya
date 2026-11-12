"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { TECHNOLOGY_CATEGORIES, TechStackCategory } from "./technology/techData";

// Clean Crisp SVG Icons for the 6 Category Nodes matching reference
function CategoryNodeIcon({ id }: { id: string }) {
  if (id === "frontend") {
    return (
      <svg className="w-9 h-9" viewBox="0 0 115.3 100" fill="none">
        <circle cx="57.65" cy="50" r="9" fill="#00B4D8" />
        <ellipse cx="57.65" cy="50" rx="14" ry="48" transform="matrix(0.5 -0.866 0.866 0.5 -14.41 68.83)" stroke="#00B4D8" strokeWidth="5.5" />
        <ellipse cx="57.65" cy="50" rx="14" ry="48" transform="matrix(0.5 0.866 -0.866 0.5 72.06 -24.41)" stroke="#00B4D8" strokeWidth="5.5" />
        <ellipse cx="57.65" cy="50" rx="14" ry="48" transform="matrix(1 0 0 1 0 0)" stroke="#00B4D8" strokeWidth="5.5" />
      </svg>
    );
  }
  if (id === "backend") {
    return (
      <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
        <path d="M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z" stroke="#22C55E" strokeWidth="6" strokeLinejoin="round" fill="none" />
        <text x="50" y="58" textAnchor="middle" fill="#22C55E" fontSize="30" fontWeight="bold" fontFamily="-apple-system, sans-serif">JS</text>
      </svg>
    );
  }
  if (id === "database") {
    return (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#263A50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    );
  }
  if (id === "ai-automation") {
    return (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
        <path d="M19 4v4" />
        <path d="M21 6h-4" />
      </svg>
    );
  }
  if (id === "creative-dev") {
    return (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#6D28D9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.29 7 12 12 20.71 7" />
        <line x1="12" y1="22" x2="12" y2="12" />
      </svg>
    );
  }
  // Cloud & DevOps
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

export default function TechnologySection() {
  const [selectedCategory, setSelectedCategory] = useState<TechStackCategory>(
    TECHNOLOGY_CATEGORIES[0]
  );
  const [isPaused, setIsPaused] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Continuous smooth orbital rotation
  useEffect(() => {
    const loop = (currentTime: number) => {
      const dt = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      if (!isPaused) {
        setRotationAngle((prev) => (prev + dt * 0.12) % (Math.PI * 2));
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused]);

  // Smooth mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const cycleNext = () => {
    const currIdx = TECHNOLOGY_CATEGORIES.findIndex((c) => c.id === selectedCategory.id);
    const nextIdx = (currIdx + 1) % TECHNOLOGY_CATEGORIES.length;
    setSelectedCategory(TECHNOLOGY_CATEGORIES[nextIdx]);
  };

  // Base angles for the 6 cards on the orbit
  const categoryBaseAngles: Record<string, number> = {
    frontend: -Math.PI * 0.72,
    backend: -Math.PI * 0.28,
    database: 0.0,
    "ai-automation": Math.PI * 0.28,
    "creative-dev": Math.PI * 0.72,
    "cloud-devops": Math.PI,
  };

  return (
    <section
      id="technology"
      className="relative w-full bg-[#FBF7F0] text-[#292929] py-5 sm:py-6 md:py-8 px-3 sm:px-5 md:px-8 flex justify-center items-center overflow-hidden"
    >
      {/* Background Soft Lighting Gradients matching reference palette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[450px] bg-[#EFE4D2]/45 blur-[150px] rounded-full pointer-events-none" />

      {/* =========================================================================
          PANORAMIC COMPACT BANNER (Exact Warm Ivory & Golden Hue from Reference)
          ========================================================================= */}
      <div className="relative w-full max-w-[1460px] rounded-[2.2rem] bg-gradient-to-br from-[#FFFFFF] via-[#FAF5EC] to-[#F5ECE0] border border-[#EFE5D6] shadow-[0_20px_50px_rgba(180,140,85,0.08),inset_0_1px_3px_#FFFFFF] px-6 py-5 sm:px-8 sm:py-6 lg:px-9 lg:py-5 overflow-hidden z-10">

        {/* 3-COLUMN COMPOSITION: Left Headline | Center Minimal 3D Orbit | Right Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 xl:gap-5 items-center">

          {/* -------------------------------------------------------------
              1. LEFT: Editorial Headline + Subtitle + Action Button
              ------------------------------------------------------------- */}
          <div className="lg:col-span-3 flex flex-col justify-center z-20">
            {/* Tag */}
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-5 h-[2px] bg-[#C59B62]" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#A37B42]">
                02 / TECHNOLOGY UNIVERSE
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl xl:text-[2.85rem] font-serif font-bold text-[#1A1A1A] leading-[1.04] tracking-tight">
              Tools are my{" "}
              <span className="font-serif font-bold text-[#C59B62] block mt-0.5">
                playground.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-3 text-xs sm:text-[13px] text-[#555555] leading-relaxed max-w-[280px]">
              The technologies behind every idea I bring to life.
            </p>

            {/* CTA Button */}
            <div className="mt-5">
              <button
                onClick={cycleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C1F26] text-white text-[11px] font-mono font-medium tracking-wider hover:bg-[#C59B62] transition-colors duration-300 shadow-md group cursor-pointer"
              >
                <span>Explore My Stack</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* -------------------------------------------------------------
              2. CENTER: Luminous Champagne-Gold & Crystal Glass Ball
                 - Exact warm golden ambient gradient
                 - High-contrast white typography with dark glass backing
                 - Shimmering champagne-gold single orbit
                 - Soft claymorphic ceramic cards with delicate warm bevels
              ------------------------------------------------------------- */}
          <div
            className="lg:col-span-6 relative w-full h-[320px] sm:h-[350px] flex items-center justify-center select-none"
            style={{ perspective: "1100px" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setIsPaused(false);
              setMousePos({ x: 0, y: 0 });
            }}
          >
            {/* 3D Perspective Stage */}
            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
              style={{
                transform: `rotateX(${-mousePos.y * 12}deg) rotateY(${mousePos.x * 14}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* SINGLE ELEGANT CHAMPAGNE-GOLD ORBIT PATH */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 600 340"
                fill="none"
              >
                <defs>
                  <linearGradient id="orbitChampagneGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EAD8BE" stopOpacity="0.75" />
                    <stop offset="35%" stopColor="#C59B62" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#FFF9F0" stopOpacity="1" />
                    <stop offset="65%" stopColor="#C59B62" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#EAD8BE" stopOpacity="0.75" />
                  </linearGradient>

                  <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* EXACT SINGLE GOLDEN ORBIT ELLIPSE */}
                <ellipse
                  cx="300"
                  cy="170"
                  rx="235"
                  ry="95"
                  stroke="url(#orbitChampagneGold)"
                  strokeWidth="1.8"
                  opacity="0.9"
                />

                {/* Light flare beads along orbit */}
                <circle cx="300" cy="75" r="3.5" fill="#FFFFFF" filter="url(#goldGlow)" />
                <circle cx="430" cy="95" r="3" fill="#FFF8EE" filter="url(#goldGlow)" />
                <circle cx="170" cy="95" r="3" fill="#FFF8EE" filter="url(#goldGlow)" />
                <circle cx="205" cy="245" r="2.8" fill="#FFF8EE" filter="url(#goldGlow)" />
                <circle cx="395" cy="245" r="2.8" fill="#FFF8EE" filter="url(#goldGlow)" />
              </svg>

              {/* -------------------------------------------------------------
                  CENTER 3D TEXTURED BALL: WARM CHAMPAGNE-GOLD & CRYSTAL GLASS
                  - Exact rich warm amber-gold radial shading from reference
                  - Deep glass backing behind white typography for sharp contrast
                  - Glossy top crystal reflection and specular hotspot
                 ------------------------------------------------------------- */}
              <div
                onClick={cycleNext}
                className="relative w-[168px] h-[168px] sm:w-[182px] sm:h-[182px] rounded-full flex items-center justify-center cursor-pointer group select-none transition-transform duration-300 hover:scale-105"
                style={{
                  zIndex: 25,
                  transform: "translateZ(0px)",
                }}
              >
                {/* 1. Soft Warm Ambient Shadow */}
                <div className="absolute -bottom-5 w-[170px] h-[26px] bg-[#C59B62]/30 rounded-full blur-xl pointer-events-none" />

                {/* 2. Base 3D Shaded Texture: Warm Amber-Gold to Rich Champagne */}
                <div
                  className="absolute inset-0 rounded-full overflow-hidden shadow-[0_18px_45px_rgba(165,120,60,0.38)]"
                  style={{
                    background: `
                      radial-gradient(circle at 35% 25%, #FFFDF8 0%, #F5E3C4 22%, #DDB678 52%, #B5843E 80%, #8A5F24 100%)
                    `,
                  }}
                >
                  <div className="absolute inset-0 opacity-12 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-[#FFF8EC]/25 to-[#FFFFFF]/45" />
                </div>

                {/* 3. Outer Crystal Glass Shell with Specular Glaze */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    boxShadow: `
                      inset 0 4px 16px rgba(255, 255, 255, 0.95),
                      inset 0 -12px 26px rgba(138, 95, 36, 0.65),
                      inset 8px 0 16px rgba(255, 255, 255, 0.35),
                      inset -8px 0 16px rgba(138, 95, 36, 0.35)
                    `,
                    border: "1.5px solid rgba(255, 255, 255, 0.75)",
                  }}
                />

                {/* 4. Top Glossy Crystal Bubble Highlight */}
                <div className="absolute top-2 left-6 right-6 h-[60px] rounded-[50%] bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF]/45 to-transparent pointer-events-none blur-[0.5px]" />

                {/* 5. Sharp Specular Diamond Glint */}
                <div className="absolute top-6 left-10 w-6 h-4 rounded-[50%] bg-white blur-[1px] pointer-events-none opacity-95 transform -rotate-12 shadow-[0_0_8px_#ffffff]" />

                {/* 6. Bottom Edge Rim Reflection */}
                <div className="absolute bottom-2 left-10 right-10 h-[18px] rounded-[50%] bg-gradient-to-t from-[#FFFFFF]/60 to-transparent pointer-events-none" />

                {/* 7. Typography Decal ("</> MY TECH STACK") with Dark Glass Shadow for Maximum Contrast */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-2 select-none">
                  {/* Subtle translucent dark circular backing to make white text pop */}
                  <div className="absolute inset-1 rounded-full bg-black/15 blur-[6px] pointer-events-none" />
                  
                  <span className="relative z-10 font-mono text-2xl sm:text-[26px] font-extrabold text-white tracking-wider mb-0.5 opacity-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    &lt;/&gt;
                  </span>
                  <span className="relative z-10 font-sans text-[11.5px] sm:text-[13px] font-black text-white tracking-[0.16em] uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    MY TECH
                  </span>
                  <span className="relative z-10 font-sans text-[11.5px] sm:text-[13px] font-black text-white tracking-[0.16em] uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    STACK
                  </span>
                </div>
              </div>

              {/* -------------------------------------------------------------
                  SIX 3D THICK CLAY TILES: PURE CERAMIC WHITE & WARM GOLDEN RIM
                 ------------------------------------------------------------- */}
              {TECHNOLOGY_CATEGORIES.map((cat) => {
                const baseAngle = categoryBaseAngles[cat.id] ?? 0;
                const currentAngle = baseAngle + rotationAngle;

                const cosA = Math.cos(currentAngle);
                const sinA = Math.sin(currentAngle);

                const posX = 50 + cosA * 39;
                const posY = 50 + sinA * 30;

                const depthZ = sinA * 70;
                const depthScale = 0.9 + (sinA + 1) * 0.09;
                
                const zIdx = sinA < 0 ? Math.round(12 + (sinA + 1) * 5) : Math.round(28 + sinA * 12);
                const isSelected = selectedCategory.id === cat.id;

                const tiltX = -sinA * 8;
                const tiltY = cosA * 10;

                return (
                  <div
                    key={cat.id}
                    style={{
                      left: `${posX}%`,
                      top: `${posY}%`,
                      transform: `translate(-50%, -50%) translateZ(${depthZ}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${isSelected ? 1.12 : depthScale})`,
                      zIndex: isSelected ? 50 : zIdx,
                      transformStyle: "preserve-3d",
                    }}
                    className="absolute pointer-events-auto transition-transform duration-100 ease-out"
                  >
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className="group cursor-pointer block focus:outline-none relative"
                      title={`View ${cat.title}`}
                    >
                      {/* Physical 3D Clay Base (Warm Cream/Gold Extrusion) */}
                      <div
                        className="absolute inset-0 rounded-[1.4rem] bg-gradient-to-b from-[#F7EFE2] to-[#E9DAC3] transform translate-y-[6px] translate-z-[-4px] pointer-events-none"
                        style={{
                          boxShadow: `
                            0 14px 26px rgba(180, 140, 85, 0.18),
                            0 4px 8px rgba(0, 0, 0, 0.04)
                          `,
                        }}
                      />

                      {/* Front Top Pure Ceramic White Face */}
                      <div
                        style={{
                          background: "linear-gradient(180deg, #FFFFFF 0%, #FAF6F0 100%)",
                          boxShadow: isSelected
                            ? "0 0 0 2.5px #C59B62, inset 0 2px 4px #FFFFFF, inset 0 -2px 4px rgba(197,155,98,0.2)"
                            : "inset 0 2px 4px #FFFFFF, inset 0 -2px 4px rgba(220,205,185,0.3)",
                        }}
                        className={`relative w-[104px] sm:w-[114px] h-[78px] sm:h-[84px] rounded-[1.4rem] border ${
                          isSelected ? "border-[#C59B62]" : "border-[#EFE5D8]"
                        } flex flex-col items-center justify-center gap-1.5 transition-all duration-300`}
                      >
                        {/* Icon */}
                        <div className="transform group-hover:scale-108 transition-transform duration-200">
                          <CategoryNodeIcon id={cat.id} />
                        </div>

                        {/* Title */}
                        <span className="text-[10px] sm:text-[11px] font-bold text-[#1E1E1E] tracking-tight leading-tight text-center px-1">
                          {cat.id === "cloud-devops" ? (
                            <>Cloud &amp;<br />DevOps</>
                          ) : cat.id === "creative-dev" ? (
                            <>Creative<br />Development</>
                          ) : cat.id === "ai-automation" ? (
                            <>AI &amp;<br />Automation</>
                          ) : (
                            cat.title
                          )}
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* -------------------------------------------------------------
              3. RIGHT: Floating Ceramic Detail Card (Warm Ivory & Champagne Accent)
              ------------------------------------------------------------- */}
          <div className="lg:col-span-3 z-20">
            <div className="p-5 rounded-[1.8rem] bg-[#FFFFFF] border border-[#EFE5D8] shadow-[0_16px_40px_rgba(180,140,85,0.08),inset_0_1px_2px_#FFFFFF] flex flex-col justify-between min-h-[300px] sm:min-h-[320px]">
              
              <div>
                {/* Header: Squircle Icon + Title + Next Arrow */}
                <div className="flex items-start justify-between gap-2.5 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#FAF6F0] border border-[#EFE5D8] flex items-center justify-center shadow-xs shrink-0">
                      <CategoryNodeIcon id={selectedCategory.id} />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#1E1E1E] tracking-tight">
                        {selectedCategory.title}
                      </h3>
                      <p className="text-[11px] text-[#666666] font-normal leading-snug mt-0.5 line-clamp-2">
                        {selectedCategory.tagline}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={cycleNext}
                    className="w-8 h-8 rounded-full bg-[#1C1F26] text-white flex items-center justify-center hover:bg-[#C59B62] transition-colors shrink-0 shadow-sm cursor-pointer"
                    title="Next category"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Horizontal Tool Icon Badges */}
                <div className="my-4">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {selectedCategory.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#FAF6F0] border border-[#EFE5D8] flex items-center justify-center shrink-0 hover:-translate-y-0.5 hover:shadow-xs transition-all cursor-default"
                        title={tool.name}
                      >
                        <div
                          className="w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                          dangerouslySetInnerHTML={{ __html: tool.iconSvg }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* "Used in" Section */}
              <div className="pt-3 border-t border-[#F0E6D8]">
                <div className="flex items-center gap-1.5 text-[11px] text-[#777777] font-semibold mb-2">
                  <svg className="w-3.5 h-3.5 text-[#C59B62]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 8 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                  </svg>
                  <span>Used in</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {selectedCategory.usedInProjects.map((proj) => (
                    <a
                      key={proj.name}
                      href={proj.url || "#projects"}
                      target={proj.isExternal ? "_blank" : undefined}
                      rel={proj.isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF6F0] border border-[#EFE5D8] text-[11px] font-medium text-[#2A2A2A] hover:border-[#C59B62] hover:text-[#C59B62] transition-colors"
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

      </div>
    </section>
  );
}
