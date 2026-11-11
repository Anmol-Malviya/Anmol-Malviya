"use client";


import dynamic from "next/dynamic";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, MoveUpRight, Sparkles } from "lucide-react";

const FounderScene = dynamic(() => import("../components/FounderScene"), { ssr: false });

const projects = [
  { n: "01", name: "AV-SAFE", type: "CYBERSECURITY / MULTI-PLATFORM", desc: "A threat-defense experience focused on helping people identify and respond to phishing risks.", stack: "Next.js · React · MongoDB · Kotlin", href: "https://github.com/Anmol-Malviya/AV-SAFE", color: "blue" },
  { n: "02", name: "SafeCodium", type: "AI / IOT SECURITY", desc: "Exploring AI-assisted firmware vulnerability detection, patch generation, and verification.", stack: "React · TypeScript · FastAPI · C/C++", href: "https://github.com/Anmol-Malviya/SafeCodium", color: "cyan" },
  { n: "03", name: "Voice-Expression", type: "ACCESSIBILITY / MULTIMODAL AI", desc: "A communication concept combining voice and gesture-based interaction.", stack: "Next.js · FastAPI · MediaPipe · WebSockets", href: "https://github.com/Anmol-Malviya/Voice-Expression", color: "violet" },
  { n: "04", name: "WeatherPulse", type: "DATA / ML", desc: "Weather intelligence powered by data aggregation and machine-learning experimentation.", stack: "Next.js · Python · FastAPI · XGBoost", href: "https://github.com/Anmol-Malviya/Whether-app", color: "amber" },
  { n: "05", name: "Dev Market", type: "MARKETPLACE / PRODUCT", desc: "A marketplace concept for discovering, sharing, and distributing developer-built digital products.", stack: "Next.js · React · Product design", href: "https://devmarket-three.vercel.app/", color: "cyan" },
  { n: "06", name: "AI Interviewer", type: "AI / EDTECH", desc: "An AI-assisted interview practice experience with question flows and skill-building features.", stack: "React · AI integration · Analytics", href: "https://raw-coder.vercel.app/", color: "violet" },
  { n: "07", name: "Deforestation Tracker", type: "DATA / VISUALIZATION", desc: "A project exploring environmental monitoring and visual communication of deforestation data.", stack: "Web · Data visualization", href: "https://deforastration.vercel.app/", color: "blue" },
  { n: "08", name: "LUX Store", type: "E-COMMERCE / DESIGN", desc: "An e-commerce experience focused on product presentation and storefront interaction.", stack: "Frontend · UI/UX", href: "https://luxe-vert-eta.vercel.app/", color: "amber" },
  { n: "09", name: "Video Editor", type: "CREATIVE TOOLING", desc: "A browser-based video editing product experiment.", stack: "Web · Video tooling", href: "https://ogeditor2.onrender.com/", color: "blue" }
];

export default function Home() {
  return <main>
    <nav className="nav shell">
      <a className="brand" href="#top"><span className="brand-mark">A<span>.</span></span><span>ANMOL MALVIYA<small>INDEPENDENT BUILDER</small></span></a>
      <div className="nav-links"><a href="#about">About</a><a href="#work">Selected work</a><a href="#approach">Approach</a><a href="#journey">Journey</a><a className="nav-contact" href="mailto:anmolcloud7@gmail.com">Let’s talk <ArrowUpRight size={14}/></a></div>
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

    <section className="work-section shell" id="work"><div className="section-heading"><div><div className="section-index">02 / SELECTED WORK</div><h2>Experiments, ideas<br/> & <em>things in progress.</em></h2></div><p>A few projects that reflect the problems I’m curious about. Each one is a chance to learn, test, and make something useful.</p></div><div className="work-note"><span className="work-note-dot"/> A selection of explorations — open a project to explore its repository.</div>
      <div className="project-grid">{projects.map(p => <a className={`project ${p.color}`} href={p.href} target="_blank" rel="noreferrer" key={p.n}><div className="project-top"><span>{p.n} / CASE STUDY</span><MoveUpRight size={18}/></div><div className="project-art"><div className="art-orbit"/><div className="art-core">{p.n}</div><div className="art-cross"/></div><div className="project-info"><span className="mini-label">{p.type}</span><h3>{p.name}</h3><p>{p.desc}</p><div className="project-foot"><span>{p.stack}</span><span className="project-cta">VIEW REPOSITORY <ArrowUpRight size={15}/></span></div></div></a>)}</div>
    </section>

    <section className="approach-section" id="approach"><div className="shell approach-grid"><div><div className="section-index">03 / HOW I THINK</div><h2>Founder mindset.<br/><em>Builder’s hands.</em></h2></div><div className="principles"><article><span>01</span><div><h3>Find the signal.</h3><p>Understand the user, the friction, and the problem worth solving before reaching for a solution.</p></div></article><article><span>02</span><div><h3>Build with intent.</h3><p>Turn the idea into a focused product with thoughtful UX and dependable engineering.</p></div></article><article><span>03</span><div><h3>Learn in the open.</h3><p>Ship, listen, measure, and improve. Progress comes from feedback, not assumptions.</p></div></article></div></div></section>


    <section className="journey-section shell" id="journey">
      <div className="section-heading"><div><div className="section-index">04 / JOURNEY</div><h2>Learning by doing.<br/><em>Growing by building.</em></h2></div><p>My path so far — from computer science fundamentals to shipping products, collaborating with teams, and exploring entrepreneurship.</p></div>
      <div className="journey-grid">
        <div className="journey-column"><span className="mini-label">EDUCATION</span>
          <article className="journey-item"><span className="journey-date">2025 — 2028</span><h3>B.Tech · Computer Science & Engineering</h3><p>Prestige Institute of Engineering Management & Research, Indore</p><small>Focus: IoT, Cybersecurity & Blockchain</small></article>
          <article className="journey-item"><span className="journey-date">2022 — 2025</span><h3>Diploma · Computer Science Engineering</h3><p>Government Polytechnic College, Itarsi</p><small>MP Board · 7.8 CGPA</small></article>
        </div>
        <div className="journey-column"><span className="mini-label">EXPERIENCE & LEADERSHIP</span>
          <article className="journey-item"><span className="journey-date">CURRENT</span><h3>Project Manager & Senior Developer</h3><p>AV Technologies · AdhritVerse</p><small>Product planning, engineering execution, and team coordination</small></article>
          <article className="journey-item"><span className="journey-date">PREVIOUS PORTFOLIO</span><h3>Developer Intern · VyorAI</h3><p>AI-driven workflows, automation, prototyping, and product development</p></article>
          <article className="journey-item"><span className="journey-date">PRACTICAL EXPERIENCE</span><h3>Data Science Intern · EventDhara</h3><p>Data analysis, predictive modelling, and visualization workflows</p></article>
          <article className="journey-item"><span className="journey-date">2025</span><h3>Field Tech Executive · Kamarta Robotics</h3><p>Networking, hardware troubleshooting, and system maintenance</p></article>
        </div>
      </div>
    </section>

    <section className="recognition-section"><div className="shell recognition-grid">
      <div><div className="section-index">05 / RECOGNITION</div><h2>Curiosity deserves<br/><em>to be put to work.</em></h2><p>Hackathons, workshops, and learning milestones that have shaped how I approach technology and collaboration.</p></div>
      <div className="recognition-list">
        <article><span>01</span><div><b>CyberThinker Competition</b><small>1st place / Top Scorer · GFG Student Chapter PIEMR × SafeClicks</small></div></article>
        <article><span>02</span><div><b>TechSprint 2025</b><small>Hackathon · GDGoC PIEMR</small></div></article>
        <article><span>03</span><div><b>SIH 2025</b><small>Smart India Hackathon participation</small></div></article>
        <article><span>04</span><div><b>Kriyeta 5.0 & Symbiosis Skill Hackathon</b><small>Hackathon participation and collaborative builds</small></div></article>
        <article><span>05</span><div><b>Cyber Security Excellence Program</b><small>MPSSDEGB & IIT Jodhpur TISC · 2025</small></div></article>
        <article><span>06</span><div><b>Prompt Engineering Workshop</b><small>Neurons School of Innovation & AI</small></div></article>
        <article><span>07</span><div><b>UNXT Soft Skill Program</b><small>UNNATI Foundation · 165 hours · 2024</small></div></article>
      </div>
    </div></section>

    <section className="contact-section shell"><div className="section-index">06 / THE NEXT CHAPTER</div><h2>Have a problem<br/>worth <em>building for?</em></h2><p>I’m always interested in meeting thoughtful founders, builders, and people working on meaningful ideas.</p><a className="button primary" href="mailto:anmolcloud7@gmail.com">Start a conversation <ArrowUpRight size={16}/></a><div className="contact-orb"><Sparkles/></div></section>

    <footer className="footer shell"><a className="brand" href="#top"><span className="brand-mark">A<span>.</span></span><span>ANMOL MALVIYA<small>BUILD · LEARN · SHIP · REPEAT</small></span></a><div className="socials"><a href="https://github.com/Anmol-Malviya" aria-label="GitHub"><Github/></a><a href="https://www.linkedin.com/" aria-label="LinkedIn"><Linkedin/></a><a href="mailto:anmolcloud7@gmail.com" aria-label="Email"><Mail/></a></div><span className="copyright">© {new Date().getFullYear()} ANMOL MALVIYA</span></footer>
  </main>;
}