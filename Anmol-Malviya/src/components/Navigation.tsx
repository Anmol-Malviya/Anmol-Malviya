"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 80);

      const sections = ["contact", "workspace", "journey", "every-realm", "projects", "technology", "cinematic", "home"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex items-center justify-between ${
        isScrolled
          ? "py-3.5 px-6 sm:px-12 bg-[#FFFCF8]/80 backdrop-blur-xl border-b border-[#E6E2DC] shadow-[0_10px_30px_rgba(75,75,75,0.06)]"
          : "py-8 px-8 sm:px-14 md:px-20 bg-transparent"
      }`}
    >
      {/* Brand / Logo */}
      <Link href="#home" className="flex items-center gap-1.5 group cursor-pointer">
        <span
          className={`text-xl sm:text-2xl font-bold tracking-tight transition-all duration-300 group-hover:opacity-80 ${
            isScrolled ? "text-[#4B4B4B]" : "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
          }`}
        >
          Anmol Malviya
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#8FBF7A] inline-block shadow-[0_0_12px_rgba(143,191,122,0.6)] animate-pulse" />
      </Link>

      {/* Nav Links */}
      <nav className="flex items-center gap-6 sm:gap-9 text-[15px] sm:text-base font-normal tracking-wide">
        <Link
          href="#home"
          className={`relative transition-colors duration-200 pb-1 ${
            activeSection === "home" || activeSection === "cinematic"
              ? isScrolled
                ? "text-[#4B4B4B] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8FBF7A] after:rounded-full after:shadow-[0_0_8px_#8FBF7A]"
                : "text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8FBF7A] after:rounded-full after:shadow-[0_0_8px_#8FBF7A]"
              : isScrolled
              ? "text-[#8D857E] hover:text-[#4B4B4B]"
              : "text-white/80 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          }`}
        >
          Home
        </Link>
        <Link
          href="#projects"
          className={`relative transition-colors duration-200 pb-1 ${
            activeSection === "projects"
              ? isScrolled
                ? "text-[#4B4B4B] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8FBF7A] after:rounded-full after:shadow-[0_0_8px_#8FBF7A]"
                : "text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8FBF7A] after:rounded-full after:shadow-[0_0_8px_#8FBF7A]"
              : isScrolled
              ? "text-[#8D857E] hover:text-[#4B4B4B]"
              : "text-white/80 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          }`}
        >
          Projects
        </Link>
        <Link
          href="#every-realm"
          className={`relative transition-colors duration-200 pb-1 ${
            activeSection === "every-realm"
              ? isScrolled
                ? "text-[#4B4B4B] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8FBF7A] after:rounded-full after:shadow-[0_0_8px_#8FBF7A]"
                : "text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8FBF7A] after:rounded-full after:shadow-[0_0_8px_#8FBF7A]"
              : isScrolled
              ? "text-[#8D857E] hover:text-[#4B4B4B]"
              : "text-white/80 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          }`}
        >
          Realms
        </Link>
        <Link
          href="#journey"
          className={`relative transition-colors duration-200 pb-1 ${
            activeSection === "journey" || activeSection === "technology" || activeSection === "workspace"
              ? isScrolled
                ? "text-[#4B4B4B] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8FBF7A] after:rounded-full after:shadow-[0_0_8px_#8FBF7A]"
                : "text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8FBF7A] after:rounded-full after:shadow-[0_0_8px_#8FBF7A]"
              : isScrolled
              ? "text-[#8D857E] hover:text-[#4B4B4B]"
              : "text-white/80 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          }`}
        >
          About
        </Link>
        <Link
          href="#contact"
          className={`relative transition-colors duration-200 pb-1 ${
            activeSection === "contact"
              ? isScrolled
                ? "text-[#4B4B4B] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8FBF7A] after:rounded-full after:shadow-[0_0_8px_#8FBF7A]"
                : "text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8FBF7A] after:rounded-full after:shadow-[0_0_8px_#8FBF7A]"
              : isScrolled
              ? "text-[#8D857E] hover:text-[#4B4B4B]"
              : "text-white/80 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          }`}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}

