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
      gsap.fromTo(contentRef.current, { opacity: 0, y: 60, filter: "blur(10px)" }, {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%", end: "top 40%", scrub: 1 },
        opacity: 1, y: 0, filter: "blur(0px)",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section id="contact" ref={containerRef} className="relative w-full bg-[#FFFCF8] text-[#4B4B4B] pt-36 pb-16 px-6 sm:px-12 md:px-20 border-t border-[#E6E2DC] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FFE0C2]/30 blur-[150px] rounded-full pointer-events-none" />
      <div ref={contentRef} className="max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE0C2]/60 border border-[#FFD6A6] text-xs font-mono tracking-widest uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#8FBF7A] animate-ping" /> Get in touch
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Have an idea?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9A46F] via-[#8FBF7A] to-[#4B4B4B]">Let&apos;s build it.</span>
          </h2>
          <p className="mt-6 text-lg sm:text-2xl text-[#8D857E] max-w-xl mx-auto">
            Open to thoughtful collaborations, interesting engineering challenges, and conversations about building useful products.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:anmolmalviya4328@gmail.com" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FFE0C2] text-[#4B4B4B] font-semibold text-base hover:bg-[#FFD6A6] transition-all duration-300 shadow-[0_8px_25px_rgba(255,214,166,0.5)] group border border-[#FFD6A6]">
              <Mail className="w-5 h-5" /><span>Say Hello</span><Send className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="https://github.com/Anmol-Malviya" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-[#FFF5EA] border border-[#E6E2DC] hover:border-[#8FBF7A] text-[#4B4B4B] font-medium text-base transition-all duration-300 shadow-sm">
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/anmol-malviya/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-[#FFF5EA] border border-[#E6E2DC] hover:border-[#8FBF7A] text-[#4B4B4B] font-medium text-base transition-all duration-300 shadow-sm">
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
        <div className="pt-16 mt-16 border-t border-[#E6E2DC] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#8D857E] font-mono">
          <div className="flex items-center gap-2"><span>© 2026 Anmol Malviya.</span><span>Built with curiosity.</span></div>
          <button onClick={scrollToTop} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF5EA] border border-[#E6E2DC] hover:border-[#8FBF7A] text-[#8D857E] hover:text-[#4B4B4B] transition-colors duration-200 cursor-pointer">
            <span>Back to top</span><ArrowUp className="w-3.5 h-3.5 text-[#8FBF7A]" />
          </button>
        </div>
      </div>
    </section>
  );
}
