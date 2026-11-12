"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Send, ArrowUp } from "lucide-react";

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60, filter: "blur(10px)" },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "top 40%",
            scrub: 1,
          },
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full bg-[#FFFCF8] text-[#4B4B4B] pt-36 pb-16 px-6 sm:px-12 md:px-20 border-t border-[#E6E2DC] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FFE0C2]/30 blur-[150px] rounded-full pointer-events-none" />

      <div ref={contentRef} className="max-w-5xl mx-auto relative z-10">
        {/* Main CTA Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE0C2]/60 border border-[#FFD6A6] text-xs font-mono tracking-widest uppercase text-[#4B4B4B] mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#8FBF7A] animate-ping" />
            Section 06 • Connect
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#4B4B4B] leading-tight">
            Have an idea?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD6A6] via-[#8FBF7A] to-[#4B4B4B]">
              Let&apos;s build it.
            </span>
          </h2>

          <p className="mt-6 text-lg sm:text-2xl text-[#8D857E] font-normal max-w-xl mx-auto">
            I&apos;m always interested in meaningful collaborations, ambitious products, and interesting technical challenges.
          </p>

          {/* Contact Direct Email Button */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:anmolmalviya@example.com"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FFE0C2] text-[#4B4B4B] font-semibold text-base hover:bg-[#FFD6A6] transition-all duration-300 shadow-[0_8px_25px_rgba(255,214,166,0.5)] group border border-[#FFD6A6]"
            >
              <Mail className="w-5 h-5 text-[#4B4B4B]" />
              <span>Say Hello</span>
              <Send className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-[#FFF5EA] border border-[#E6E2DC] hover:border-[#8FBF7A] text-[#4B4B4B] font-medium text-base hover:bg-[#FFFCF8] transition-all duration-300 shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-[#FFF5EA] border border-[#E6E2DC] hover:border-[#8FBF7A] text-[#4B4B4B] font-medium text-base hover:bg-[#FFFCF8] transition-all duration-300 shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="pt-16 mt-16 border-t border-[#E6E2DC] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#8D857E] font-mono">
          <div className="flex items-center gap-2">
            <span>© 2026 Anmol Malviya.</span>
            <span>All rights reserved.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF5EA] border border-[#E6E2DC] hover:border-[#8FBF7A] text-[#8D857E] hover:text-[#4B4B4B] transition-colors duration-200 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#8FBF7A]" />
          </button>
        </div>
      </div>
    </section>
  );
}

