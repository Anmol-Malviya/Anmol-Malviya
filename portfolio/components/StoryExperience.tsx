"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const chapters = [
  { kicker: "THE BEGINNING · 01", title: "Every big idea\nstarts somewhere.", accent: "somewhere.", body: "I’m Anmol Malviya — a developer, curious problem-solver, and aspiring founder. This is the story of turning curiosity into things people can use.", tag: "CURIOUS BY DEFAULT" },
  { kicker: "THE DEVELOPER · 02", title: "Learning how\nthings work.", accent: "things work.", body: "From computer science fundamentals to full-stack engineering, I enjoy understanding systems and building the pieces that bring an idea to life.", tag: "ENGINEERING · EXPERIMENTATION" },
  { kicker: "THE BUILDER · 03", title: "Ideas deserve\nto be shipped.", accent: "to be shipped.", body: "I build across AI, cybersecurity, accessibility, data, and product experiences — learning from every prototype, iteration, and release.", tag: "BUILD · TEST · IMPROVE" },
  { kicker: "THE TEAM PLAYER · 04", title: "Good products\ncome from people.", accent: "come from people.", body: "At AV Technologies (AdhritVerse), I work across product planning, engineering execution, and collaboration as a Project Manager and Senior Developer.", tag: "LEADERSHIP · EXECUTION" },
  { kicker: "THE FOUNDER · 05", title: "The next chapter\nis ours to build.", accent: "is ours to build.", body: "My ambition is to create a multi-product technology company — starting with focused products that solve real problems, earn trust, and grow with their users.", tag: "THINK BIG · START FOCUSED" }
];

function StoryObject({ progress }: { progress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const shards = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const p = progress.current;
    const targetY = p * Math.PI * 2.1;
    if (group.current) {
      group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 2.8);
      group.current.rotation.x = Math.sin(p * Math.PI * 2) * 0.18 + Math.sin(state.clock.elapsedTime * .22) * .04;
      const scale = 1 + Math.sin(p * Math.PI) * .17;
      group.current.scale.setScalar(scale);
      group.current.position.y = Math.sin(p * Math.PI * 2) * .24;
    }
    if (orbit.current) {
      orbit.current.rotation.z = state.clock.elapsedTime * .13 + p * 2.2;
      orbit.current.rotation.x = .75 + Math.sin(p * Math.PI) * .4;
    }
    if (shards.current) {
      shards.current.rotation.y = -p * 2.5 + state.clock.elapsedTime * .08;
      shards.current.rotation.x = p * .7;
    }
  });
  return <group>
    <group ref={group}>
      <Float speed={1.1} rotationIntensity={.12} floatIntensity={.2}>
        <mesh>
          <icosahedronGeometry args={[1.05, 5]}/>
          <MeshDistortMaterial color="#a8c9df" roughness={.24} metalness={.72} distort={.2} speed={1.15}/>
        </mesh>
        <mesh scale={1.012}>
          <icosahedronGeometry args={[1.05, 3]}/>
          <meshBasicMaterial color="#428db7" wireframe transparent opacity={.28}/>
        </mesh>
      </Float>
      <mesh ref={orbit} rotation={[.9,.2,.1]}>
        <torusGeometry args={[1.55,.012,12,160]}/>
        <meshStandardMaterial color="#398fb4" metalness={.65} roughness={.28}/>
      </mesh>
      <mesh rotation={[1.3,.8,.2]}>
        <torusGeometry args={[1.83,.006,8,160]}/>
        <meshBasicMaterial color="#9bc9df" transparent opacity={.7}/>
      </mesh>
      <mesh position={[1.36,.68,.1]}>
        <sphereGeometry args={[.075,24,24]}/>
        <meshBasicMaterial color="#ffffff"/>
      </mesh>
    </group>
    <group ref={shards}>
      {Array.from({length:8},(_,i)=><mesh key={i} position={[Math.cos(i*Math.PI/4)*2.05,Math.sin(i*Math.PI/4)*1.45,Math.sin(i*2)*.35]} rotation={[i*.4,i*.7,0]} scale={.12+(i%3)*.035}>
        <octahedronGeometry args={[1,0]}/>
        <meshStandardMaterial color={i%2?"#b9d7e8":"#d8e9f3"} metalness={.5} roughness={.3}/>
      </mesh>)}
    </group>
  </group>;
}

function Scene({ progress }: { progress: React.MutableRefObject<number> }) {
  return <Canvas camera={{position:[0,0,5.6],fov:38}} dpr={[1,1.5]} gl={{alpha:true,antialias:true}}>
    <ambientLight intensity={1.1}/>
    <directionalLight position={[3,4,5]} intensity={2.4} color="#ffffff"/>
    <pointLight position={[-3,-2,3]} intensity={18} color="#8dc9e9"/>
    <pointLight position={[2,2,-3]} intensity={9} color="#b8d9ef"/>
    <Stars radius={45} depth={22} count={550} factor={1.1} saturation={0} fade speed={.15}/>
    <StoryObject progress={progress}/>
  </Canvas>;
}

export default function StoryExperience() {
  const track = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [progress,setProgress] = useState(0);
  const [active,setActive] = useState(0);
  useEffect(()=>{
    let frame=0;
    const update=()=>{
      if(frame) cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        if(!track.current) return;
        const rect=track.current.getBoundingClientRect();
        const total=track.current.offsetHeight-window.innerHeight;
        const p=Math.max(0,Math.min(1,-rect.top/Math.max(1,total)));
        progressRef.current=p;
        setProgress(p);
        setActive(Math.min(chapters.length-1,Math.floor(p*chapters.length)));
      });
    };
    update(); window.addEventListener("scroll",update,{passive:true}); window.addEventListener("resize",update);
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",update);window.removeEventListener("resize",update)};
  },[]);
  const current=chapters[active];
  return <main className="story-site">
    <header className="story-nav shell">
      <a className="story-brand" href="#top"><span>A<span>.</span></span><b>ANMOL MALVIYA<small>FOUNDER IN PROGRESS</small></b></a>
      <nav><a href="#story">The story</a><a href="#selected-work">Selected work</a><a href="#journey-end">Journey</a><a className="story-nav-cta" href="mailto:anmolcloud7@gmail.com">Let’s connect <ArrowUpRight size={14}/></a></nav>
    </header>
    <section className="story-hero shell" id="top">
      <div className="story-hero-copy"><span className="story-kicker"><i/> A PERSONAL JOURNEY IN BUILDING</span><h1>Curiosity<br/>is where <em>it begins.</em></h1><p>From writing my first lines of code to imagining products that move the world forward — this is my journey so far.</p><a href="#story" className="story-scroll">SCROLL TO EXPLORE <ArrowDown size={15}/></a></div>
      <div className="hero-orbit"><Scene progress={progressRef}/><span>AN IDEA IN MOTION · 001</span></div>
      <div className="hero-side-note">INDEPENDENT BUILDER<br/>INDORE · INDIA</div>
    </section>
    <section className="story-track" id="story" ref={track}>
      <div className="story-sticky">
        <div className="story-canvas"><Scene progress={progressRef}/><div className="canvas-grid"/></div>
        <div className="story-progress"><span>THE JOURNEY</span><div>{chapters.map((c,i)=><i key={c.kicker} className={i<=active?"done":""}/>)}</div><b>0{active+1} / 05</b></div>
        <div className="story-copy" key={active}>
          <span className="story-kicker">{current.kicker}</span>
          <h2>{current.title.split("\n").map((line,i)=><span key={i}>{line}{i===0?<br/>:null}</span>)}</h2>
          <p>{current.body}</p><small>{current.tag}</small>
        </div>
        <div className="story-counter">SCROLL TO TRANSFORM <span>{String(Math.round(progress*100)).padStart(2,"0")}%</span></div>
      </div>
    </section>
    <section className="story-work shell" id="selected-work">
      <div className="story-section-head"><span className="story-kicker">THE THINGS I’VE MADE · 06</span><h2>Ideas made<br/><em>tangible.</em></h2><p>Some experiments, products, and explorations from my journey. Each one taught me something worth carrying forward.</p></div>
      <div className="story-projects">
        {[["AV-SAFE","Cybersecurity","Threat defense across platforms.","https://github.com/Anmol-Malviya/AV-SAFE"],["SafeCodium","AI × IoT Security","AI-assisted firmware vulnerability detection.","https://github.com/Anmol-Malviya/SafeCodium"],["Voice-Expression","Accessibility","Multimodal communication experiments.","https://github.com/Anmol-Malviya/Voice-Expression"],["WeatherPulse","Data × ML","Weather intelligence and ML inference.","https://github.com/Anmol-Malviya/Whether-app"],["Dev Market","Marketplace","A place for developers to share digital products.","https://devmarket-three.vercel.app/"],["AI Interviewer","AI × EdTech","Practice, feedback, and interview preparation.","https://raw-coder.vercel.app/"]].map((p,i)=><a className="story-project" href={p[3]} target="_blank" rel="noreferrer" key={p[0]}><span>0{i+1} / {p[1]}</span><div className="story-project-art"><b>{String(i+1).padStart(2,"0")}</b><i/></div><h3>{p[0]} <ArrowUpRight size={17}/></h3><p>{p[2]}</p></a>)}
      </div>
    </section>
    <section className="story-credentials"><div className="shell credentials-grid"><div><span className="story-kicker">THE FOUNDATION · 07</span><h2>Built on learning.<br/><em>Shaped by doing.</em></h2></div><div className="credentials-list"><article><small>2025 — 2028</small><b>B.Tech · Computer Science & Engineering</b><p>PIEMR, Indore · IoT, Cybersecurity & Blockchain</p></article><article><small>2022 — 2025</small><b>Diploma · Computer Science Engineering</b><p>Government Polytechnic College, Itarsi · 7.8 CGPA</p></article><article><small>CURRENT</small><b>Project Manager & Senior Developer</b><p>AV Technologies · AdhritVerse</p></article><article><small>RECOGNITION</small><b>TechSprint · SIH · CyberThinker</b><p>Hackathons, team projects, and practical learning</p></article></div></div></section>
    <section className="story-ending shell" id="journey-end"><span className="story-kicker">THE NEXT CHAPTER · 08</span><h2>Still becoming.<br/><em>Still building.</em></h2><p>I’m looking to connect with founders, makers, and curious minds who want to turn meaningful ideas into real products.</p><a className="story-button" href="mailto:anmolcloud7@gmail.com">Let’s build something meaningful <ArrowUpRight size={17}/></a><div className="ending-orbit"><span>A.</span></div></section>
    <footer className="story-footer shell"><a className="story-brand" href="#top"><span>A<span>.</span></span><b>ANMOL MALVIYA<small>BUILD · LEARN · SHIP · REPEAT</small></b></a><div><a href="https://github.com/Anmol-Malviya" aria-label="GitHub"><Github/></a><a href="https://www.linkedin.com/" aria-label="LinkedIn"><Linkedin/></a><a href="mailto:anmolcloud7@gmail.com" aria-label="Email"><Mail/></a></div><small>© {new Date().getFullYear()} ANMOL MALVIYA</small></footer>
  </main>;
}
