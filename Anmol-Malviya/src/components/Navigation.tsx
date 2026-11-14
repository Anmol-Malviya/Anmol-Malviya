"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 60);

      const sections = ["contact", "journey", "projects", "cinematic", "home"];
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

  const navLinks = [
    { href: "#home", label: "Home", active: activeSection === "home" || activeSection === "cinematic" },
    { href: "#projects", label: "Projects", active: activeSection === "projects" },
    { href: "#journey", label: "Journey", active: activeSection === "journey" },
    { href: "#contact", label: "Contact", active: activeSection === "contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out flex items-center justify-between ${
          isScrolled
            ? "py-3 px-4 sm:px-8 md:px-12 bg-[#FFFCF8]/90 backdrop-blur-xl border-b border-[#E6E2DC] shadow-[0_4px_20px_rgba(75,75,75,0.06)]"
            : "py-4 sm:py-6 md:py-8 px-4 sm:px-8 md:px-14 bg-gradient-to-b from-black/40 via-black/15 to-transparent"
        }`}
      >
        {/* Brand / Logo */}
        <Link
          href="#home"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-1.5 group cursor-pointer z-50"
        >
          <span
            className={`text-lg sm:text-xl md:text-2xl font-bold tracking-tight transition-all duration-300 ${
              isScrolled
                ? "text-[#4B4B4B]"
                : "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
            }`}
          >
            Anmol Malviya
          </span>
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#8FBF7A] inline-block shadow-[0_0_10px_rgba(143,191,122,0.8)] animate-pulse" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[15px] font-normal tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative transition-colors duration-200 pb-1 ${
                link.active
                  ? isScrolled
                    ? "text-[#4B4B4B] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8FBF7A] after:rounded-full after:shadow-[0_0_8px_#8FBF7A]"
                    : "text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8FBF7A] after:rounded-full after:shadow-[0_0_8px_#8FBF7A]"
                  : isScrolled
                  ? "text-[#8D857E] hover:text-[#4B4B4B]"
                  : "text-white/85 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className={`p-2 rounded-xl transition-all ${
              isScrolled
                ? "text-[#4B4B4B] bg-[#F4EFE6]/80 hover:bg-[#EAE4D9]"
                : "text-white bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20"
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 stroke-[2.2]" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2.2]" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop & Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Dark Dim Backdrop */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Floating Mobile Card Menu */}
        <div
          className={`absolute top-[68px] left-4 right-4 bg-[#FFFCF8] rounded-2xl border border-[#E6E2DC] shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-5 transition-all duration-300 transform ${
            isMobileMenuOpen ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"
          }`}
        >
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  link.active
                    ? "bg-[#8FBF7A]/15 text-[#325224] font-semibold"
                    : "text-[#4B4B4B] hover:bg-[#F5EFE6]"
                }`}
              >
                <span>{link.label}</span>
                {link.active && (
                  <span className="w-2 h-2 rounded-full bg-[#8FBF7A] shadow-[0_0_8px_#8FBF7A]" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
