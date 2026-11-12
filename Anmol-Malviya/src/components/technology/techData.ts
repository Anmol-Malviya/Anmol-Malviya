export interface TechStackCategory {
  id: string;
  num: string;
  title: string;
  tagline: string;
  iconName: string;
  color: string;
  tools: {
    name: string;
    iconSvg: string;
    bg?: string;
    textColor?: string;
  }[];
  usedInProjects: {
    name: string;
    url?: string;
    isExternal?: boolean;
  }[];
}

export const TECHNOLOGY_CATEGORIES: TechStackCategory[] = [
  {
    id: "frontend",
    num: "01",
    title: "Frontend",
    tagline: "Building interactive, accessible, and high-performance user experiences.",
    iconName: "react",
    color: "#0284C7",
    tools: [
      {
        name: "React.js",
        iconSvg: `<svg viewBox="0 0 115.3 100" fill="#00D8FF"><ellipse cx="57.65" cy="50" rx="14.8" ry="49.5" transform="matrix(0.5 -0.866 0.866 0.5 -14.41 68.83)"/><ellipse cx="57.65" cy="50" rx="14.8" ry="49.5" transform="matrix(0.5 0.866 -0.866 0.5 72.06 -24.41)"/><ellipse cx="57.65" cy="50" rx="14.8" ry="49.5" transform="matrix(1 0 0 1 0 0)"/><circle cx="57.65" cy="50" r="10.8"/></svg>`,
      },
      {
        name: "Next.js",
        iconSvg: `<svg viewBox="0 0 180 180" fill="none"><circle cx="90" cy="90" r="90" fill="#000"/><path d="M149.5 160.5L74.8 54.5H54.5V125.5H68.8V74.8L136.2 165.2C140.9 163.9 145.4 162.3 149.5 160.5Z" fill="#FFF"/><path d="M115.5 54.5H129.8V125.5H115.5V54.5Z" fill="#FFF"/></svg>`,
      },
      {
        name: "TypeScript",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#3178C6" d="M0 0h128v128H0z"/><path fill="#FFF" d="M68.5 79.7c1.7 3.5 4.3 6.4 7.7 8.5 3.4 2.1 7.6 3.2 12.5 3.2 3.8 0 7.2-.7 10-2.1 2.8-1.4 4.8-3.4 6.2-6 1.4-2.6 2-5.5 2-8.8 0-3.3-.8-6.1-2.3-8.4-1.5-2.3-3.8-4.2-6.8-5.8-3-1.6-6.8-3-11.4-4.2-4.6-1.2-8.5-2.6-11.8-4.1-3.3-1.5-6-3.4-8-5.7-2-2.3-3-5.2-3-8.8 0-3.7 1-7 3.1-9.9 2.1-2.9 5.1-5.1 9-6.7 3.9-1.6 8.5-2.4 13.8-2.4 6 0 11.2 1.1 15.6 3.4 4.4 2.3 7.8 5.6 10.2 10l-11.8 7.3c-1.5-2.7-3.4-4.7-5.9-6-2.5-1.3-5.4-1.9-8.7-1.9-3.2 0-5.9.6-8.2 1.8-2.3 1.2-3.5 3.1-3.5 5.7 0 2.1.8 3.8 2.3 5.1 1.5 1.3 3.6 2.4 6.4 3.4 2.8 1 6.2 2 10.3 3 5.1 1.2 9.5 2.7 13.1 4.5 3.6 1.8 6.5 4.1 8.6 6.8 2.1 2.7 3.2 6 3.2 10 0 4.1-1.1 7.8-3.3 11-2.2 3.2-5.4 5.7-9.6 7.5-4.2 1.8-9.2 2.7-15.1 2.7-7.4 0-13.8-1.4-19.1-4.2-5.3-2.8-9.4-7-12.2-12.6l12.3-7.2zM43.9 33.7v69.6H30.4V33.7H6.7V21.6H67.6v12.1H43.9z"/></svg>`,
      },
      {
        name: "JavaScript",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#F7DF1E" d="M0 0h128v128H0z"/><path fill="#000" d="M67.3 93.6c2.4 4.3 5.8 7.9 10.1 10.6 4.3 2.7 9.4 4.1 15.3 4.1 4.6 0 8.7-.9 12.3-2.6 3.6-1.7 6.4-4.2 8.3-7.5 1.9-3.3 2.9-7.1 2.9-11.4 0-4.3-.9-8-2.7-11-1.8-3-4.5-5.5-8.2-7.5-3.7-2-8.3-3.8-13.9-5.4-5.6-1.6-10.2-3.3-13.8-5.1-3.6-1.8-6.4-4-8.4-6.6-2-2.6-3-5.8-3-9.6 0-4.3 1.2-8.1 3.7-11.4 2.5-3.3 6-5.8 10.5-7.5 4.5-1.7 9.8-2.6 15.9-2.6 6.7 0 12.6 1.3 17.7 3.8 5.1 2.5 9 6.2 11.7 11.1l-13.6 8.5c-1.7-3.1-3.9-5.4-6.6-6.9-2.7-1.5-6-2.2-9.9-2.2-3.6 0-6.6.7-9 2-2.4 1.3-3.6 3.3-3.6 6 0 2.2.8 4 2.4 5.4 1.6 1.4 3.9 2.6 6.9 3.6 3 1 6.8 2.1 11.4 3.3 5.8 1.5 10.7 3.2 14.7 5.1 4 1.9 7.2 4.4 9.5 7.4 2.3 3 3.5 6.7 3.5 11.1 0 4.6-1.3 8.7-3.9 12.3-2.6 3.6-6.2 6.4-10.8 8.4-4.6 2-10.1 3-16.5 3-8.3 0-15.5-1.6-21.6-4.9-6.1-3.3-10.7-8-13.8-14.1l14.2-8.6zM24.7 90.7c2.1 3.5 5 6.2 8.6 8.1 3.6 1.9 7.9 2.9 12.9 2.9 4.1 0 7.7-.6 10.8-1.8 3.1-1.2 5.5-3 7.2-5.4 1.7-2.4 2.5-5.3 2.5-8.7V21.6H53.1v64.2c0 2.2-.6 3.9-1.8 5-1.2 1.1-2.9 1.7-5.1 1.7-2.7 0-5-.7-6.9-2.1-1.9-1.4-3.3-3.4-4.2-6l-10.4 6.3z"/></svg>`,
      },
      {
        name: "Tailwind CSS",
        iconSvg: `<svg viewBox="0 0 100 60" fill="#06B6D4"><path d="M50 15c-10 0-16.3 5-18.8 15 3.8-5 8.8-6.9 15-5.6 3.6.7 6.1 3.3 9 6.2C59.8 35.3 65.2 40 75 40c10 0 16.3-5 18.8-15-3.8 5-8.8 6.9-15 5.6-3.6-.7-6.1-3.3-9-6.2C65.2 19.7 59.8 15 50 15zM25 35c-10 0-16.3 5-18.8 15 3.8-5 8.8-6.9 15-5.6 3.6.7 6.1 3.3 9 6.2C34.8 55.3 40.2 60 50 60c10 0 16.3-5 18.8-15-3.8 5-8.8 6.9-15 5.6-3.6-.7-6.1-3.3-9-6.2C40.2 39.7 34.8 35 25 35z"/></svg>`,
      },
      {
        name: "HTML5",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#E34F26" d="M19.2 114.7L8.7 0h110.6l-10.5 114.7L64 128z"/><path fill="#EF652A" d="M64 118.2l37.2-10.3 8.8-98.7H64z"/><path fill="#FFF" d="M64 48.9H47.1l-1.2-13.4H64V22.2H32.4l3.5 39.9H64zm0 39.8l-.2.1-15.6-4.2-1-11.2H33.8l1.9 21.9 28.3 7.8.2-.1z"/><path fill="#EEE" d="M63.8 62.1h16.2l-1.5 17-14.7 4v13.8l28.3-7.8 3.5-39.9H63.8zM63.8 22.2v13.3h31.8l1.2-13.3z"/></svg>`,
      },
      {
        name: "CSS3",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#1572B6" d="M19.2 114.7L8.7 0h110.6l-10.5 114.7L64 128z"/><path fill="#33A9DC" d="M64 118.2l37.2-10.3 8.8-98.7H64z"/><path fill="#FFF" d="M64 48.9H47.1l-1.2-13.4H64V22.2H32.4l3.5 39.9H64zm0 39.8l-.2.1-15.6-4.2-1-11.2H33.8l1.9 21.9 28.3 7.8.2-.1z"/><path fill="#EEE" d="M63.8 62.1h16.2l-1.5 17-14.7 4v13.8l28.3-7.8 3.5-39.9H63.8zM63.8 22.2v13.3h31.8l1.2-13.3z"/></svg>`,
      },
    ],
    usedInProjects: [
      { name: "Hotel ERP (HMS-X)", url: "https://hmsx-three.vercel.app", isExternal: true },
      { name: "Portfolio", url: "#home" },
      { name: "VyorAI", url: "https://vyorai.com", isExternal: true },
    ],
  },
  {
    id: "backend",
    num: "02",
    title: "Backend",
    tagline: "Architecting resilient, type-safe APIs, microservices, and concurrency systems.",
    iconName: "nodejs",
    color: "#16A34A",
    tools: [
      {
        name: "Node.js",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#339933" d="M64 12.8L12.8 42.3v59L64 130.8l51.2-29.5v-59L64 12.8z"/><path fill="#FFF" d="M64 32.5l34.2 19.8v39.5L64 111.5 29.8 91.8V52.3L64 32.5z"/></svg>`,
      },
      {
        name: "Express.js",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#000" d="M128 64c0 35.3-28.7 64-64 64S0 99.3 0 64 28.7 0 64 0s64 28.7 64 64z"/><path fill="#FFF" d="M38 78c-4-4-6-10-6-17s2-13 6-17c4-4 9-6 16-6 6 0 11 2 15 5l-5 8c-3-2-6-3-10-3-4 0-7 1-9 4-2 2-3 6-3 10s1 8 3 10c2 3 5 4 9 4 4 0 7-1 10-3l5 8c-4 3-9 5-15 5-7 0-12-2-16-6zm46 6h-11l15-28h-14v-9h25v7l-15 28z"/></svg>`,
      },
      {
        name: "REST APIs",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#263A50" strokeWidth="2"><path d="M4 17l6-6-6-6M12 19h8"/></svg>`,
      },
      {
        name: "Python",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#3776AB" d="M63.5 0C32.8 0 34.7 13.3 34.7 13.3l.1 13.8h29.5v4.2H23.1S0 28.8 0 63.8c0 35 20.2 33.8 20.2 33.8h12.1v-17s-.7-20.2 19.8-20.2h29.2s19.1-.3 19.1-18.7V13.3S102.7 0 63.5 0zM47.2 9.8c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z"/><path fill="#FFD43B" d="M64.5 128c30.7 0 28.8-13.3 28.8-13.3l-.1-13.8H63.7v-4.2h41.2s23.1 2.5 23.1-32.5c0-35-20.2-33.8-20.2-33.8h-12.1v17s.7 20.2-19.8 20.2H46.7s-19.1.3-19.1 18.7v28.4s-2.3 13.3 36.9 13.3zm16.3-9.8c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/></svg>`,
      },
    ],
    usedInProjects: [
      { name: "Hotel ERP (HMS-X)", url: "https://hmsx-three.vercel.app", isExternal: true },
      { name: "MAILTRACE AI", url: "https://github.com/Anmol-Malviya", isExternal: true },
      { name: "PEN-LLM", url: "https://github.com/Anmol-Malviya", isExternal: true },
    ],
  },
  {
    id: "database",
    num: "03",
    title: "Database",
    tagline: "High-integrity relational schemas, document stores, and in-memory caches.",
    iconName: "database",
    color: "#2563EB",
    tools: [
      {
        name: "MongoDB",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#47A248" d="M64 0C64 0 35.8 42.6 35.8 77.2c0 24.3 14.1 40.5 28.2 50.8 14.1-10.3 28.2-26.5 28.2-50.8C92.2 42.6 64 0 64 0z"/><path fill="#499D4A" d="M64 0v128c14.1-10.3 28.2-26.5 28.2-50.8C92.2 42.6 64 0 64 0z"/><path fill="#FFF" d="M64 12.8s-1.8 1.9-3.9 6.2c-7.9 16.3-14.7 34.4-14.7 54.3 0 20.3 11.2 35.3 18.6 42.9V12.8z"/></svg>`,
      },
      {
        name: "PostgreSQL",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#336791" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm25.6 96.6c-4.3 1.1-9.2 1.8-14.5 1.8-13.8 0-21.9-6.4-21.9-17.7 0-14.1 12.5-22.1 32.9-22.1h3.5v-3.7c0-5.7-4.1-9.3-12.2-9.3-6.4 0-13.3 2.1-18.1 5.3l-3.3-8.6c6.2-4.1 14.9-6.4 23.9-6.4 14.9 0 22.3 8.1 22.3 21.6v27.9c0 4.1.8 7.5 2.1 10.3l-4.7.9z"/></svg>`,
      },
      {
        name: "Prisma",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#2D3748" d="M64 0L6.4 100.8 64 128l57.6-27.2L64 0z"/><path fill="#FFF" d="M64 24.5L25.3 92.2 64 110.5l38.7-18.3L64 24.5z"/></svg>`,
      },
      {
        name: "Supabase",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#3ECF8E" d="M72.2 0L6.4 83.2h55.4L45.4 128l65.8-83.2H55.8L72.2 0z"/></svg>`,
      },
      {
        name: "Redis",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#DC382D" d="M117.8 74.2L64 99.8 10.2 74.2 0 79l64 30.4 64-30.4-10.2-4.8zM117.8 93.4L64 119 10.2 93.4 0 98.2l64 30.4 64-30.4-10.2-4.8zM64 0L0 30.4l64 30.4 64-30.4L64 0z"/></svg>`,
      },
    ],
    usedInProjects: [
      { name: "Hotel ERP (HMS-X)", url: "https://hmsx-three.vercel.app", isExternal: true },
      { name: "Developer Marketplace", url: "https://github.com/Anmol-Malviya", isExternal: true },
      { name: "AI Interviewer", url: "https://github.com/Anmol-Malviya", isExternal: true },
    ],
  },
  {
    id: "ai-automation",
    num: "04",
    title: "AI & Automation",
    tagline: "Autonomous multi-agent swarms, Gemini LLM integrations, and generative AI pipelines.",
    iconName: "sparkles",
    color: "#7C3AED",
    tools: [
      {
        name: "Gemini API",
        iconSvg: `<svg viewBox="0 0 24 24" fill="#8B5CF6"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>`,
      },
      {
        name: "LLMs",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2"><circle cx="12" cy="12" r="3"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><circle cx="5" cy="18" r="2"/><path d="M12 9V6M12 15v3M10 10.5L6.5 7.5M14 10.5l3.5-3M10 13.5l-3.5 3M14 13.5l3.5 3"/></svg>`,
      },
      {
        name: "AI Agents",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 16h.01M16 16h.01"/></svg>`,
      },
      {
        name: "AI Integrations",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
      },
      {
        name: "Automation",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
      },
    ],
    usedInProjects: [
      { name: "AI Interviewer", url: "https://github.com/Anmol-Malviya", isExternal: true },
      { name: "VyorAI", url: "https://vyorai.com", isExternal: true },
      { name: "PEN-LLM", url: "https://github.com/Anmol-Malviya", isExternal: true },
    ],
  },
  {
    id: "creative-dev",
    num: "05",
    title: "Creative Development",
    tagline: "Immersive 3D graphics, procedural WebGL shaders, and physics-driven micro-interactions.",
    iconName: "cube",
    color: "#C59B62",
    tools: [
      {
        name: "GSAP",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#0AE448" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm19.2 89.6L64 76.8l-19.2 12.8 5.1-22.4L32 52.8l23-.3L64 32l9 20.5 23 .3-17.9 14.4 5.1 22.4z"/></svg>`,
      },
      {
        name: "Three.js",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#000" d="M64 0L6.4 100.8 121.6 100.8z"/><path fill="#FFF" d="M64 38.4L32 94.4h64z"/></svg>`,
      },
      {
        name: "WebGL",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#990000" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm32 89.6L44.8 70.4V38.4L96 57.6v32zM32 57.6l25.6-9.6 25.6 9.6-25.6 9.6L32 57.6z"/></svg>`,
      },
      {
        name: "Framer Motion",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#0055FF" d="M0 0h128v64H64zM0 64h64l64 64H0zM64 64h64L64 128z"/></svg>`,
      },
      {
        name: "Motion One",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#C59B62" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
      },
    ],
    usedInProjects: [
      { name: "Personal Portfolio", url: "#home" },
      { name: "AdhritVerse Agency", url: "https://github.com/Anmol-Malviya", isExternal: true },
      { name: "Developer Marketplace", url: "https://github.com/Anmol-Malviya", isExternal: true },
    ],
  },
  {
    id: "cloud-devops",
    num: "06",
    title: "Cloud & DevOps",
    tagline: "Automated CI/CD pipelines, container orchestration, and serverless edge delivery.",
    iconName: "cloud",
    color: "#263A50",
    tools: [
      {
        name: "Git",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#F05032" d="M125.7 57.9L70.1 2.3c-3.1-3.1-8.1-3.1-11.2 0L47.5 13.7l14.2 14.2c3.3-1.1 7.2-.3 9.8 2.3 2.6 2.6 3.4 6.5 2.3 9.8l13.7 13.7c3.3-1.1 7.2-.3 9.8 2.3 3.7 3.7 3.7 9.8 0 13.5-3.7 3.7-9.8 3.7-13.5 0-2.8-2.8-3.5-7-2-10.4L64.5 46.4v35.8c1 .5 2 1.3 2.7 2.1 3.7 3.7 3.7 9.8 0 13.5-3.7 3.7-9.8 3.7-13.5 0-3.7-3.7-3.7-9.8 0-13.5.9-.9 2-1.6 3.2-2.1V46c-1.2-.5-2.3-1.2-3.2-2.1-2.8-2.8-3.5-7-2-10.4L37.8 19.4 2.3 54.9c-3.1 3.1-3.1 8.1 0 11.2l55.6 55.6c3.1 3.1 8.1 3.1 11.2 0l56.6-56.6c3.1-3.1 3.1-8.1 0-11.2z"/></svg>`,
      },
      {
        name: "GitHub",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#181717" d="M64 0C28.7 0 0 28.7 0 64c0 28.3 18.3 52.3 43.8 60.8 3.2.6 4.4-1.4 4.4-3.1v-10.8c-17.8 3.9-21.6-8.6-21.6-8.6-2.9-7.4-7.1-9.4-7.1-9.4-5.8-4 .4-3.9.4-3.9 6.4.5 9.8 6.6 9.8 6.6 5.7 9.8 15 7 18.6 5.3.6-4.1 2.2-7 4-8.6-14.2-1.6-29.2-7.1-29.2-31.6 0-7 2.5-12.7 6.6-17.2-.7-1.6-2.9-8.1.6-17 0 0 5.4-1.7 17.6 6.6 5.1-1.4 10.6-2.1 16-2.1s10.9.7 16 2.1c12.2-8.3 17.6-6.6 17.6-6.6 3.5 8.9 1.3 15.4.6 17 4.1 4.5 6.6 10.2 6.6 17.2 0 24.6-15 30-29.3 31.6 2.3 2 4.3 5.9 4.3 11.9v17.6c0 1.7 1.2 3.7 4.4 3.1C109.7 116.3 128 92.3 128 64c0-35.3-28.7-64-64-64z"/></svg>`,
      },
      {
        name: "Vercel",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#000" d="M64 0l64 128H0z"/></svg>`,
      },
      {
        name: "AWS",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#232F3E" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0z"/><path fill="#FF9900" d="M38.4 83.2c16 8.5 35.2 8.5 51.2 0 1.5-.8 3.3.4 2.8 2-3.8 11.6-14.9 18.6-28.4 18.6-13.5 0-24.6-7-28.4-18.6-.5-1.6 1.3-2.8 2.8-2z"/></svg>`,
      },
      {
        name: "Docker",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#2496ED" d="M125.7 54.4c-1.3-.9-9.1-5.9-20.9-2.9-.6-6.5-5.1-12.3-10.4-15.6l-5.6-3.4-3.5 5.5c-4.4 7-4.1 15.6-3.5 20.3-3.2 1.8-8.2 3.6-14.7 3.6H3.6C1.6 62 0 63.6 0 65.6c0 13.9 4.6 27.2 13 38 12 15.3 30.6 24.4 51 24.4 38.6 0 70.3-25.2 78.5-62.8 3.5-.4 9.8-2.2 12.3-10.8zM24.8 55.4h11.7v11.7H24.8V55.4zm16.4 0h11.7v11.7H41.2V55.4zm16.4 0h11.7v11.7H57.6V55.4zm-32.8-16.4h11.7v11.7H24.8V39zm16.4 0h11.7v11.7H41.2V39zm16.4 0h11.7v11.7H57.6V39zm16.4 0h11.7v11.7H74V39zm-32.8-16.4h11.7v11.7H41.2V22.6zm16.4 0h11.7v11.7H57.6V22.6z"/></svg>`,
      },
      {
        name: "VS Code",
        iconSvg: `<svg viewBox="0 0 128 128"><path fill="#007ACC" d="M96 0L28.8 62.4 0 40v48l28.8-22.4L96 128l32-16V16L96 0zm0 32l-33.6 32L96 96V32z"/></svg>`,
      },
    ],
    usedInProjects: [
      { name: "Hotel ERP (HMS-X)", url: "https://hmsx-three.vercel.app", isExternal: true },
      { name: "Portfolio", url: "#home" },
      { name: "AdhritVerse Agency", url: "https://github.com/Anmol-Malviya", isExternal: true },
    ],
  },
];

