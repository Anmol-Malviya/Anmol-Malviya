"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Sparkles, Layers, Clock, Cpu, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { ProjectItem } from "./projectsData";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#292821]/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-[#FFFDF8] border border-[#E8E1D5] shadow-[0_25px_70px_rgba(41,40,33,0.18)] z-10 max-h-[90vh] flex flex-col"
          >
            {/* Top Atmospheric Header */}
            <div className="relative px-6 pt-8 pb-6 sm:px-10 border-b border-[#E8E1D5]/70 bg-gradient-to-b from-[#F2EEE5]/70 to-[#FFFDF8]">
              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close project modal"
                className="absolute top-6 right-6 p-2 rounded-full bg-[#E8E1D5]/50 hover:bg-[#D8C8AD]/40 text-[#292821] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#D8C8AD]/30 border border-[#D8C8AD]/60 font-semibold text-[#292821]">
                  {project.num}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#858174]">
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#E8E1D5]/40 text-[#292821]">
                  <Clock className="w-3 h-3 text-[#8FBF7A]" />
                  {project.status}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#292821]">
                {project.title}
              </h2>
              <p className="mt-1 text-sm sm:text-base font-medium text-[#858174]">
                {project.tagline}
              </p>
            </div>

            {/* Scrollable Content */}
            <div className="px-6 py-6 sm:px-10 overflow-y-auto space-y-6">
              {/* Abstract Preview Panel */}
              <div className="relative h-44 sm:h-56 rounded-2xl overflow-hidden border border-[#E8E1D5] bg-gradient-to-br from-[#F2EEE5] to-[#E8E1D5]/50 flex flex-col justify-between p-6">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D8C8AD]/20 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-[#E8E1D5] text-xs font-mono text-[#292821]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D9A46F]" />
                    <span>Exhibition Specimen</span>
                  </div>
                  {project.highlightMetric && (
                    <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-[#8FBF7A]/20 text-[#3C6329] border border-[#8FBF7A]/30">
                      {project.highlightMetric}
                    </span>
                  )}
                </div>

                <div className="relative z-10">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#858174] mb-1">
                    System Architecture
                  </p>
                  <p className="text-base sm:text-lg font-bold text-[#292821]">
                    {project.title} • Next-Gen Digital Engineering
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#858174] mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Overview & Engineering
                </h3>
                <p className="text-sm sm:text-base text-[#4B4B4B] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Context Note if exists */}
              {project.contextNote && (
                <div className="p-3.5 rounded-xl bg-[#E8E1D5]/35 border border-[#D8C8AD]/50 text-xs font-mono text-[#292821] flex items-center gap-2">
                  <span className="text-[#8FBF7A] text-sm">✦</span>
                  <span>{project.contextNote}</span>
                </div>
              )}

              {/* Key Specifications / Stats */}
              {project.stats && (
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#858174] mb-3 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" /> Architecture Specs
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.stats.map((s) => (
                      <div
                        key={s.label}
                        className="p-3.5 rounded-xl bg-[#F2EEE5]/60 border border-[#E8E1D5]"
                      >
                        <div className="text-[11px] font-mono text-[#858174] uppercase tracking-wide">
                          {s.label}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-[#292821]">
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#858174] mb-2.5">
                  Tech Stack & Tooling
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-[#F2EEE5] border border-[#E8E1D5] text-[#292821]"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#8FBF7A]" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 sm:px-10 border-t border-[#E8E1D5] bg-[#F2EEE5]/40 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-mono text-[#858174]">
                Interactive 3D Portfolio Orbit
              </div>
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFDF8] border border-[#E8E1D5] hover:border-[#D8C8AD] text-[#292821] text-xs font-semibold transition-all shadow-sm"
                  >
                    <GithubIcon className="w-4 h-4 text-[#858174]" />
                    <span>GitHub Code</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#292821] text-[#FFFDF8] hover:bg-[#3D3C33] text-xs font-semibold transition-all shadow-sm"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

