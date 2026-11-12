"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface SpotlightRevealProps {
  baseImageSrc: string;
  revealImageSrc: string;
  alt?: string;
  revealRadius?: number;
  className?: string;
}

export default function SpotlightReveal({
  baseImageSrc,
  revealImageSrc,
  alt = "Hero background",
  revealRadius = 260,
  className = "",
}: SpotlightRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);

  // Target mouse coordinates relative to container
  const targetPos = useRef({ x: 0, y: 0 });
  // Current interpolated coordinates
  const currentPos = useRef({ x: 0, y: 0 });
  // Target opacity (1 when hovering hero, 0 when left)
  const targetOpacity = useRef(0);
  const currentOpacity = useRef(0);

  const isHovered = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const revealLayer = revealLayerRef.current;
    if (!container || !revealLayer) return;

    // We track mouse position over the hero area
    // Finding parent section or container bounds
    const getHeroRect = () => {
      const heroSection = container.closest("section") || container;
      return heroSection.getBoundingClientRect();
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = getHeroRect();
      const inHeroX = e.clientX >= rect.left && e.clientX <= rect.right;
      const inHeroY = e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (inHeroX && inHeroY) {
        targetPos.current.x = e.clientX - rect.left;
        targetPos.current.y = e.clientY - rect.top;

        if (!isHovered.current) {
          isHovered.current = true;
          targetOpacity.current = 1;
          if (currentOpacity.current < 0.05) {
            currentPos.current.x = targetPos.current.x;
            currentPos.current.y = targetPos.current.y;
          }
        }
      } else {
        if (isHovered.current) {
          isHovered.current = false;
          targetOpacity.current = 0;
        }
      }
    };

    const handleMouseLeaveWindow = () => {
      isHovered.current = false;
      targetOpacity.current = 0;
    };

    // Smooth lerp render loop
    const animate = () => {
      // Linear interpolation (lerp factor 0.12 for smooth, fluid cursor-following)
      const lerpFactor = 0.12;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      // Opacity easing
      const opacityFactor = isHovered.current ? 0.18 : 0.12;
      currentOpacity.current += (targetOpacity.current - currentOpacity.current) * opacityFactor;

      if (currentOpacity.current < 0.002) {
        currentOpacity.current = 0;
      }

      const x = Math.round(currentPos.current.x * 10) / 10;
      const y = Math.round(currentPos.current.y * 10) / 10;
      const opacity = Math.round(currentOpacity.current * 1000) / 1000;

      // Mask gradient: circular spotlight centered on cursor with soft feathered edge
      // Center fully opaque (visible reveal image), feathering smoothly out to 0 opacity
      const r = revealRadius;
      const maskGradient = `radial-gradient(circle ${r}px at ${x}px ${y}px, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) ${Math.round(r * 0.45)}px, rgba(0, 0, 0, 0.65) ${Math.round(r * 0.72)}px, rgba(0, 0, 0, 0.2) ${Math.round(r * 0.9)}px, transparent 100%)`;

      revealLayer.style.webkitMaskImage = maskGradient;
      revealLayer.style.maskImage = maskGradient;
      revealLayer.style.opacity = `${opacity}`;

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [revealRadius]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
    >
      {/* Base Hero Image (BG_IMAGEs_1) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src={baseImageSrc}
          alt={alt}
          fill
          priority
          quality={95}
          className="object-cover object-center w-full h-full pointer-events-none"
        />
      </div>

      {/* Reveal Character Image Layer (BG_IMAGEs_2) with soft circular spotlight mask */}
      <div
        ref={revealLayerRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{
          opacity: 0,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          pointerEvents: "none",
        }}
      >
        <Image
          src={revealImageSrc}
          alt={`${alt} Reveal Character`}
          fill
          priority
          quality={95}
          className="object-cover object-center w-full h-full pointer-events-none"
        />
      </div>
    </div>
  );
}
