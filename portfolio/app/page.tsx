"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, MoveUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";

const FounderScene = dynamic(() => import("../components/FounderScene"), { ssr: false });

const projects = [
  { n: "01", name: "AV-SAFE", type: "CYBERSECURITY / MULTI-PLATFORM", desc: "A threat-defense experience focused on helping people identify and respond to phishing risks.", stack: "Next.js · React · MongoDB · Kotlin", href: "https://github.com/Anmol-Malviya/AV-SAFE", color: "blue" },
  { n: "02", name: "SafeCodium", type: "AI / IOT SECURITY", desc: "Exploring AI-assisted firmware vulnerability detection, patch generation, and verification.", stack: "React · TypeScript · FastAPI · C/C++", href: "https://github.com/Anmol-Malviya/SafeCodium", color: "cyan" },
  { n: "03", name: "Voice-Expression", type: "ACCESSIBILITY / MULTIMODAL AI", desc: "A communication concept combining voice and gesture-based interaction.", stack: "Next.js · FastAPI · MediaPipe · WebSockets", href: "https://github.com/Anmol-Malviya/Voice-Expression", color: "violet" },
  { n: "04", name: "WeatherPulse", type: "DATA / ML", desc: "Weather intelligence powered by data aggregation and machine-learning experimentation.", stack: "Next.js · Python · FastAPI · XGBoost", href: "https://github.com/Anmol-Malviya/Whether-app", color: "amber" }
];

export default function Home() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", { y: 28, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" });
      gsap.from(".project", { y: 34, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power2.out", scrollTrigger: undefined });
    }, root);
    return () => ctx.revert();
  }, []);

  return <main ref={root}>
    <nav className="nav shell">
      <a className="brand" href="#top"><span className="brand-mark">A<span>.</span></span><span>ANMOL MALVIYA<small>INDEPENDENT BUILDER</small></span></a>
      <div className="nav-links"><a href="#about">About</a><a href="#work">Selected work</a><a href="#approach">Approach</a><a className="nav-contact" href="mailto:hello@anmolmalviya.com">Let’s talk <ArrowUpRight size={14}/></a></div>
    </nav>

    <section className="hero shell" id="top">
      <div className="hero-copy">
        <div className="eyebrow reveal"><span className="pulse"/> INDIA · BUILDING FOR THE WORLD</div>
        <h1 className="reveal">Building products.<br/><em>Creating what’s next.</em></h1>
        <p className="hero-lead reveal">I’m Anmol — an aspiring founder and full-stack developer exploring the intersection of <b>AI, engineering, and real-world problems.</b></p>
        <div className="hero-actions reveal"><a className="button primary" href="#work">Explore selected work <ArrowUpRight size={16}/></a><a className="text-link" href="https://github.com/Anmol-Malviya" target="_blank" rel="noreferrer"><Github size={16}/> GitHub profile</a></div>
        <div className="hero-meta reveal"><span>01 / PRODUCT THINKING</span><span>02 / ENGINEERING</span><span>03 / EXECUTION</span></div>
      </div>
      <div className="scene-wrap"><FounderScene/><div className="scene-caption"><span>FIG. 01</span> IDEAS INTO ORBIT</div><div className="scene-coordinate">22° 43′ N<br/>75° 52′ E</div></div>
      <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={16}/></a>
    </section>

    <section className="intro-section" id="about"><div className="shell intro-grid">
      <div className="section-index">01 / ABOUT</div>
      <div><p className="big-statement reveal">I believe the best companies begin with a <span>real problem</span> — and the courage to build a better answer.</p>
      <div className="intro-bottom"><p>I’m interested in building a multi-product technology company: starting with focused products, learning from real users, and growing through trust and execution.</p><div className="role-card"><span className="mini-label">CURRENTLY</span><b>Project Manager</b><span>AV Technologies · AdhritVerse</span></div></div></div>
    </div></section>

    <section className="work-section shell" id="work"><div className="section-heading"><div><div className="section-index">02 / SELECTED WORK</div><h2>Experiments, ideas<br/> & <em>things in progress.</em></h2></div><p>A few projects that reflect the problems I’m curious about. Each one is a chance to learn, test, and make something useful.</p></div>
      <div className="project-grid">{projects.map(p => <a className={`project ${p.color}`} href={p.href} target="_blank" rel="noreferrer" key={p.n}><div className="project-top"><span>{p.n} / CASE STUDY</span><MoveUpRight size={18}/></div><div className="project-art"><div className="art-orbit"/><div className="art-core">{p.n}</div><div className="art-cross"/></div><div className="project-info"><span className="mini-label">{p.type}</span><h3>{p.name}</h3><p>{p.desc}</p><div className="project-foot"><span>{p.stack}</span><ArrowUpRight size={16}/></div></div></a>)}</div>
    </section>

    <section className="approach-section" id="approach"><div className="shell approach-grid"><div><div className="section-index">03 / HOW I THINK</div><h2>Founder mindset.<br/><em>Builder’s hands.</em></h2></div><div className="principles"><article><span>01</span><div><h3>Find the signal.</h3><p>Understand the user, the friction, and the problem worth solving before reaching for a solution.</p></div></article><article><span>02</span><div><h3>Build with intent.</h3><p>Turn the idea into a focused product with thoughtful UX and dependable engineering.</p></div></article><article><span>03</span><div><h3>Learn in the open.</h3><p>Ship, listen, measure, and improve. Progress comes from feedback, not assumptions.</p></div></article></div></div></section>

    <section className="contact-section shell"><div className="section-index">04 / THE NEXT CHAPTER</div><h2>Have a problem<br/>worth <em>building for?</em></h2><p>I’m always interested in meeting thoughtful founders, builders, and people working on meaningful ideas.</p><a className="button primary" href="mailto:hello@anmolmalviya.com">Start a conversation <ArrowUpRight size={16}/></a><div className="contact-orb"><Sparkles/></div></section>

    <footer className="footer shell"><a className="brand" href="#top"><span className="brand-mark">A<span>.</span></span><span>ANMOL MALVIYA<small>BUILD · LEARN · SHIP · REPEAT</small></span></a><div className="socials"><a href="https://github.com/Anmol-Malviya" aria-label="GitHub"><Github/></a><a href="https://www.linkedin.com/" aria-label="LinkedIn"><Linkedin/></a><a href="mailto:hello@anmolmalviya.com" aria-label="Email"><Mail/></a></div><span className="copyright">© {new Date().getFullYear()} ANMOL MALVIYA</span></footer>
  </main>;
}