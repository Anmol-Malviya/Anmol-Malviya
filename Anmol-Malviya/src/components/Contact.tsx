"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/SocialIcons";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        linksRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-[70vh] bg-[#FFF5EA] text-[#4B4B4B] flex flex-col justify-between p-8 sm:p-16 md:p-24 overflow-hidden border-t border-[#E6E2DC]"
    >
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#FFE0C2]/30 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl z-10">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8FBF7A] mb-4 block">
          Initiate Contact • Let&apos;s Build
        </span>
        <h2
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none mb-8"
        >
          Have an idea? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9A46F] via-[#8FBF7A] to-[#4B4B4B]">
            Let&apos;s build something meaningful.
          </span>
        </h2>
        <p className="text-lg sm:text-xl text-[#8D857E] max-w-xl font-normal leading-relaxed mb-12">
          Open to thoughtful collaborations, technology product building, and engineering challenges. Based in Indore, Madhya Pradesh, India.
        </p>

        <div ref={linksRef} className="flex flex-wrap gap-4 sm:gap-6 items-center">
          <a
            href="mailto:anmolmalviya4328@gmail.com"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#FFE0C2] text-[#4B4B4B] font-semibold hover:bg-[#FFD6A6] transition-all duration-300 shadow-sm border border-[#FFD6A6]"
          >
            <Mail className="w-5 h-5 text-[#8FBF7A]" />
            <span>anmolmalviya4328@gmail.com</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="https://github.com/Anmol-Malviya"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="group flex items-center gap-2 px-6 py-4 rounded-full bg-[#FFFCF8] border border-[#E6E2DC] hover:border-[#8FBF7A] transition-all duration-300"
          >
            <GithubIcon className="w-4 h-4 text-[#8D857E]" />
            <span>GitHub</span>
            <ArrowUpRight className="w-4 h-4 text-[#8D857E] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="https://www.linkedin.com/in/anmol-malviya/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="group flex items-center gap-2 px-6 py-4 rounded-full bg-[#FFFCF8] border border-[#E6E2DC] hover:border-[#8FBF7A] transition-all duration-300"
          >
            <LinkedinIcon className="w-4 h-4 text-[#8D857E]" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-4 h-4 text-[#8D857E] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className="group flex items-center gap-2 px-6 py-4 rounded-full bg-[#FFFCF8] border border-[#E6E2DC] hover:border-[#8FBF7A] transition-all duration-300"
          >
            <InstagramIcon className="w-4 h-4 text-[#8D857E]" />
            <span>Instagram</span>
            <ArrowUpRight className="w-4 h-4 text-[#8D857E] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-[#E6E2DC] flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-[#8D857E] gap-4 z-10">
        <span>© 2026 Anmol Malviya. Built with precision & curiosity.</span>
        <span>Indore, Madhya Pradesh, India</span>
      </div>
    </section>
  );
}