"use client";

import { PORTFOLIO_PROJECTS } from "./projectsData";

interface ProjectSpotlightInfoProps {
  scrollProgress: number; // 0 to 1
  onOpenDetails: (index: number) => void;
}

export default function ProjectSpotlightInfo({
  scrollProgress,
  onOpenDetails,
}: ProjectSpotlightInfoProps) {
  // Determine active project during Stage 03 (0.28 to 0.82)
  const isSpotlightActive = scrollProgress >= 0.28 && scrollProgress < 0.82;
  const fraction = (scrollProgress - 0.28) / 0.54;
  const activeIndex = Math.min(7, Math.max(0, Math.floor(fraction * 8)));

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-10 md:p-14">
      {/* Right: 8-node Minimal Vertical Dots Tracker Only */}
      <div className="self-end pointer-events-auto flex sm:flex-col gap-1.5 sm:gap-2 items-center bg-[#FFFDF8]/90 backdrop-blur-md p-2 sm:p-2.5 rounded-full border border-[#E8E1D5] shadow-sm">
        {PORTFOLIO_PROJECTS.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => onOpenDetails(idx)}
            aria-label={`View ${proj.title}`}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
              isSpotlightActive && activeIndex === idx
                ? "bg-[#292821] scale-150 ring-2 ring-[#D8C8AD]"
                : "bg-[#D8C8AD] hover:bg-[#858174]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
