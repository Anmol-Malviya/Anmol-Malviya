"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Send, ArrowUp, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/SocialIcons";

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
          scrollTrigger: { trigger: containerRef.current, start: "top 75%", end: "top 40%", scrub: 1 },
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full bg-[#FFFCF8] text-[#4B4B4B] pt-20 sm:pt-28 md:pt-36 pb-12 sm:pb-16 px-4 sm:px-10 md:px-16 lg:px-20 border-t border-[#E6E2DC] overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] sm:w-[700px] h-[250px] sm:h-[350px] bg-[#FFE0C2]/30 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />
      
      <div ref={contentRef} className="max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE0C2]/60 border border-[#FFD6A6] text-[11px] sm:text-xs font-mono tracking-widest uppercase mb-4 sm:mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#8FBF7A] animate-ping" /> Get in touch
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            Have an idea?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9A46F] via-[#8FBF7A] to-[#4B4B4B]">
              Let&apos;s build something meaningful.
            </span>
          </h2>

          <p className="mt-4 sm:mt-6 text-base sm:text-xl md:text-2xl text-[#8D857E] max-w-xl mx-auto leading-relaxed">
            Open to thoughtful product collaborations, technical partnerships, engineering roles, and discussions on building the next generation of digital products.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-mono text-[#8D857E]">
            <MapPin className="w-4 h-4 text-[#8FBF7A]" />
            <span>Indore, Madhya Pradesh, India</span>
          </div>

          {/* Contact Action & Dedicated Social Media Links */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="mailto:anmolmalviya4328@gmail.com"
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#FFE0C2] text-[#4B4B4B] font-semibold text-sm sm:text-base hover:bg-[#FFD6A6] transition-all duration-300 shadow-[0_8px_25px_rgba(255,214,166,0.5)] group border border-[#FFD6A6]"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Say Hello</span>
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="https://github.com/Anmol-Malviya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile (Anmol-Malviya)"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-3.5 sm:py-4 rounded-full bg-[#FFF5EA] border border-[#E6E2DC] hover:border-[#8FBF7A] text-[#4B4B4B] font-medium text-sm sm:text-base transition-all duration-300 shadow-sm hover:shadow"
            >
              <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#8D857E]" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/anmol-malviya/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile (anmol-malviya)"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-3.5 sm:py-4 rounded-full bg-[#FFF5EA] border border-[#E6E2DC] hover:border-[#8FBF7A] text-[#4B4B4B] font-medium text-sm sm:text-base transition-all duration-300 shadow-sm hover:shadow"
            >
              <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#8D857E]" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-3.5 sm:py-4 rounded-full bg-[#FFF5EA] border border-[#E6E2DC] hover:border-[#8FBF7A] text-[#4B4B4B] font-medium text-sm sm:text-base transition-all duration-300 shadow-sm hover:shadow"
            >
              <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#8D857E]" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Footer info & Navigation */}
        <div className="pt-10 sm:pt-16 mt-10 sm:mt-16 border-t border-[#E6E2DC] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#8D857E] font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="font-semibold text-[#4B4B4B]">© 2026 Anmol Malviya.</span>
            <span className="hidden sm:inline text-[#C8BEB5]">•</span>
            <span>All rights reserved.</span>
            <span className="hidden sm:inline text-[#C8BEB5]">•</span>
            <span>Indore, India</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Anmol-Malviya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-[#4B4B4B] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/anmol-malviya/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-[#4B4B4B] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="hover:text-[#4B4B4B] transition-colors"
            >
              Instagram
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF5EA] border border-[#E6E2DC] hover:border-[#8FBF7A] text-[#8D857E] hover:text-[#4B4B4B] transition-colors duration-200 cursor-pointer"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#8FBF7A]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}