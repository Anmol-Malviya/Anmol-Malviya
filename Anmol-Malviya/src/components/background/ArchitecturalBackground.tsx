"use client";

import Image from "next/image";
import { forwardRef } from "react";

interface ArchitecturalBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
}

const ArchitecturalBackground = forwardRef<HTMLDivElement, ArchitecturalBackgroundProps>(
  ({ className = "", style }, ref) => {
    return (
      <div
        ref={ref}
        className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
        style={style}
      >
        {/* Warm Architectural Studio Render */}
        <div className="relative w-full h-full">
          <Image
            src="/warm-background.png"
            alt="Warm 3D Architectural Studio"
            fill
            priority
            quality={95}
            className="object-cover object-center w-full h-full"
          />

          {/* Central Warm Ambient Light Pulse matching the circular halo arch */}
          <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full bg-gradient-to-r from-amber-100/20 via-orange-100/15 to-amber-200/20 blur-[90px] pointer-events-none" />

          {/* Podium Table Surface Accent Glow */}
          <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-[520px] sm:w-[680px] h-[140px] rounded-[100%] bg-amber-200/25 blur-[50px] pointer-events-none" />

          {/* Smooth Bottom Transition into next warm section */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FFF5EA] via-[#FFF5EA]/60 to-transparent pointer-events-none" />
        </div>
      </div>
    );
  }
);

ArchitecturalBackground.displayName = "ArchitecturalBackground";

export default ArchitecturalBackground;

