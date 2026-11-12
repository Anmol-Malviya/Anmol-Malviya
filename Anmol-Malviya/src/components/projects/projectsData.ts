export interface ProjectItem {
  id: string;
  num: string;
  title: string;
  category: string;
  status: string;
  tagline: string;
  description: string;
  tech: string[];
  gradient: string;
  accent: string;
  borderColor: string;
  glowColor: string;
  demoUrl?: string;
  githubUrl?: string;
  contextNote?: string;
  theme: {
    bgGradient: [string, string];
    accentColor: string;
    badgeText: string;
    previewType: "code" | "analytics" | "map" | "hotel" | "marketplace" | "fashion" | "terminal" | "agency" | "portfolio";
  };
  stats?: { label: string; value: string }[];
  highlightMetric?: string;
}

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: "ai-interviewer",
    num: "01",
    title: "AI Interviewer",
    category: "AI / EDTECH",
    status: "Active Build",
    tagline: "Real-time Technical Simulation & Mastery Analytics",
    description:
      "Adaptive technical mock interview platform powered by Gemini API featuring conversational audio simulation, dynamic algorithmic questions, daily MCQ technical drills, and instant line-by-line feedback analytics.",
    tech: ["Next.js", "Gemini API", "React", "Node.js"],
    gradient: "from-[#2563EB]/20 via-[#38BDF8]/10 to-transparent",
    accent: "#38BDF8",
    borderColor: "rgba(56, 189, 248, 0.4)",
    glowColor: "rgba(56, 189, 248, 0.3)",
    contextNote: "PM Internship Scheme project • Linux 2.0 team",
    highlightMetric: "Gemini 1.5 Pro Engine",
    theme: {
      bgGradient: ["#0B1B3D", "#162D63"],
      accentColor: "#38BDF8",
      badgeText: "AI INTERVIEW SUITE",
      previewType: "analytics"
    },
    githubUrl: "https://github.com/Anmol-Malviya"
  },
  {
    id: "hotel-erp",
    num: "02",
    title: "Hotel ERP / HMS-X",
    category: "SAAS / HOSPITALITY",
    status: "Live & Open Source",
    tagline: "High-Performance Hospitality Booking & Operations Engine",
    description:
      "A production-grade hotel management suite with real-time reservation scheduling, dynamic room inventory synchronization, housekeeping telemetry, customer check-in portals, and multi-currency billing.",
    tech: ["Next.js", "React", "Tailwind CSS", "Node.js", "MongoDB"],
    gradient: "from-[#D9A46F]/25 via-[#FFE0C2]/15 to-transparent",
    accent: "#D9A46F",
    borderColor: "rgba(217, 164, 111, 0.45)",
    glowColor: "rgba(255, 224, 194, 0.4)",
    highlightMetric: "Production Deployed",
    theme: {
      bgGradient: ["#1F1A14", "#382D20"],
      accentColor: "#E5A96A",
      badgeText: "HOTEL OPS ENGINE",
      previewType: "hotel"
    },
    demoUrl: "https://hmsx-three.vercel.app",
    githubUrl: "https://github.com/Anmol-Malviya/anmol-malviya-hotel-erp"
  },
  {
    id: "mailtrace-ai",
    num: "03",
    title: "MAILTRACE AI",
    category: "CYBERSECURITY / SIH",
    status: "SIH 2025 Proposed Solution",
    tagline: "Forensic Geolocation & Phishing Threat Intelligence",
    description:
      "AI-driven email forensic analysis engine designed for law enforcement and threat investigators. Parses complex email headers, verifies SPF/DKIM/DMARC authenticity, traces multi-hop IP origins, and flags phishing campaigns.",
    tech: ["Cybersecurity", "Threat Detection", "Python", "Email Forensics"],
    gradient: "from-[#EF4444]/20 via-[#F97316]/10 to-transparent",
    accent: "#EF4444",
    borderColor: "rgba(239, 68, 68, 0.45)",
    glowColor: "rgba(239, 68, 68, 0.3)",
    contextNote: "Smart India Hackathon (SIH 2025) proposed solution",
    highlightMetric: "SIH 2025 Candidate",
    theme: {
      bgGradient: ["#240D11", "#42151B"],
      accentColor: "#F87171",
      badgeText: "THREAT INTELLIGENCE",
      previewType: "map"
    },
    githubUrl: "https://github.com/Anmol-Malviya"
  },
  {
    id: "dev-marketplace",
    num: "04",
    title: "Developer Marketplace",
    category: "MARKETPLACE / SAAS",
    status: "Platform Concept",
    tagline: "Curated Hub for Bespoke UI Artifacts & WebGL Assets",
    description:
      "A specialized creator platform allowing frontend engineers and shader artists to showcase, upload, license, and monetize UI design systems, Three.js shaders, and reusable software micro-modules.",
    tech: ["Next.js", "React", "Tailwind CSS", "Database Integration"],
    gradient: "from-[#8B5CF6]/20 via-[#6366F1]/10 to-transparent",
    accent: "#A78BFA",
    borderColor: "rgba(167, 139, 250, 0.45)",
    glowColor: "rgba(167, 139, 250, 0.35)",
    highlightMetric: "Royalty Distribution",
    theme: {
      bgGradient: ["#18122B", "#2D1E4A"],
      accentColor: "#C4B5FD",
      badgeText: "DIGITAL ASSETS",
      previewType: "marketplace"
    },
    githubUrl: "https://github.com/Anmol-Malviya"
  },
  {
    id: "vyorai",
    num: "05",
    title: "VyorAI",
    category: "AI / FASHION TECHNOLOGY",
    status: "Active Build",
    tagline: "Ultra-Realistic Garment Simulation & Digital Fitting",
    description:
      "Generative vision pipeline transforming digital commerce through high-fidelity garment drape simulation. Maps catalog apparel directly onto user body models with accurate fold dynamics, lighting, and texture scale.",
    tech: ["AI", "Computer Vision", "Next.js", "FastAPI"],
    gradient: "from-[#10B981]/20 via-[#059669]/10 to-transparent",
    accent: "#34D399",
    borderColor: "rgba(52, 211, 153, 0.45)",
    glowColor: "rgba(52, 211, 153, 0.3)",
    highlightMetric: "Neural Fit Engine",
    theme: {
      bgGradient: ["#0B241A", "#133E2E"],
      accentColor: "#34D399",
      badgeText: "VIRTUAL TRY-ON",
      previewType: "fashion"
    },
    demoUrl: "https://vyorai.com",
    githubUrl: "https://github.com/Anmol-Malviya"
  },
  {
    id: "pen-llm",
    num: "06",
    title: "PEN-LLM",
    category: "AI / DEVELOPER TOOLS",
    status: "Experimental Research",
    tagline: "Air-Gapped Local LLM Running from Bare USB Storage",
    description:
      "A self-bootstrapping, zero-install local intelligence runtime designed to execute offline quantized LLMs directly from USB storage drives across Linux workstations with strict cryptographic isolation.",
    tech: ["Python", "Local LLM", "Linux", "Edge AI"],
    gradient: "from-[#F59E0B]/20 via-[#D97706]/10 to-transparent",
    accent: "#FBBF24",
    borderColor: "rgba(251, 191, 36, 0.45)",
    glowColor: "rgba(251, 191, 36, 0.3)",
    highlightMetric: "100% Offline Air-Gapped",
    theme: {
      bgGradient: ["#241B08", "#3E2E10"],
      accentColor: "#FBBF24",
      badgeText: "LOCAL USB LLM",
      previewType: "terminal"
    },
    githubUrl: "https://github.com/Anmol-Malviya"
  },
  {
    id: "adhritverse",
    num: "07",
    title: "AdhritVerse",
    category: "DIGITAL PRODUCTS / AGENCY",
    status: "Client & Internal Builds",
    tagline: "High-Craft Web Systems & Spatial Agency Solutions",
    description:
      "The flagship digital software and product engineering agency brand delivering bespoke web platforms, high-conversion landing experiences, and performant multi-tenant applications for international clients.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    gradient: "from-[#64748B]/20 via-[#475569]/10 to-transparent",
    accent: "#94A3B8",
    borderColor: "rgba(148, 163, 184, 0.45)",
    glowColor: "rgba(148, 163, 184, 0.3)",
    highlightMetric: "AV Technologies Brand",
    theme: {
      bgGradient: ["#141923", "#222C3D"],
      accentColor: "#93C5FD",
      badgeText: "CREATIVE AGENCY",
      previewType: "agency"
    },
    githubUrl: "https://github.com/Anmol-Malviya"
  },
  {
    id: "personal-portfolio",
    num: "08",
    title: "Personal Portfolio",
    category: "CREATIVE ENGINEERING / 3D WEB",
    status: "Live Production",
    tagline: "Interactive 3D Portfolio & Spatial Architectural Gallery",
    description:
      "A next-generation developer portfolio crafted with Next.js 16, Three.js, React 19, and GSAP ScrollTrigger featuring synchronized 3D orbital showcases, custom audio synthesis realms, and Apple-grade typography.",
    tech: ["Next.js", "Three.js", "React", "GSAP"],
    gradient: "from-[#E2D7C5]/30 via-[#FAF4EB]/20 to-transparent",
    accent: "#D8C8AD",
    borderColor: "rgba(216, 200, 173, 0.55)",
    glowColor: "rgba(232, 225, 213, 0.4)",
    highlightMetric: "Next.js 16 & Three.js",
    theme: {
      bgGradient: ["#24211A", "#3D382D"],
      accentColor: "#F4E0C0",
      badgeText: "3D SPATIAL PORTFOLIO",
      previewType: "portfolio"
    },
    demoUrl: "https://github.com/Anmol-Malviya",
    githubUrl: "https://github.com/Anmol-Malviya"
  }
];
