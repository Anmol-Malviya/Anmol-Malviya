export interface JourneyMilestone {
  period: string;
  role: string;
  institution: string;
  details: string;
  highlight?: boolean;
  category: string;
  wagonNumber: string;
}

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    period: "2026",
    role: "IUCEE Student Project Competition",
    institution: "IUCEE Foundation",
    details: "Presenting innovative student engineering initiatives with peer feedback and academic-industry mentorship.",
    category: "Competition",
    wagonNumber: "CAR 01",
  },
  {
    period: "2025",
    role: "TECHSPRINT 2025 Winner",
    institution: "GDG on Campus • PIEMR",
    details: "Won first place at TECHSPRINT 2025 organized by Google Developer Groups on Campus PIEMR under tight sprint deadlines.",
    highlight: true,
    category: "Hackathon Victory",
    wagonNumber: "CAR 02",
  },
  {
    period: "2025",
    role: "Smart India Hackathon (SIH) 2025",
    institution: "Ministry of Education / AICTE",
    details: "Built MAILTRACE AI, an email threat detection and forensic intelligence platform for law enforcement use.",
    category: "National Hackathon",
    wagonNumber: "CAR 03",
  },
  {
    period: "2025 – 2028",
    role: "B.Tech • Computer Science",
    institution: "PIEMR, Indore",
    details: "Specialization in IoT + Cyber Security + Blockchain. Deepening knowledge in decentralized systems and scalable cloud architectures.",
    category: "Formal Degree",
    wagonNumber: "CAR 04",
  },
  {
    period: "Ongoing",
    role: "Project Manager & Senior Dev",
    institution: "AV Technologies (AdhritVerse)",
    details: "Leading project coordination, technical architecture, full-stack web development, and AI systems across active products.",
    highlight: true,
    category: "Leadership",
    wagonNumber: "CAR 05",
  },
  {
    period: "2022 – 2025",
    role: "Diploma • Computer Science",
    institution: "GPC Itarsi (MP Board)",
    details: "Graduated with 7.8 CGPA. Formed a strong engineering foundation in algorithms, computing principles, and networks.",
    category: "Diploma",
    wagonNumber: "CAR 06",
  },
  {
    period: "Continuous",
    role: "GDG Activities & Cloud Study Jams",
    institution: "Google Cloud Study Jam",
    details: "Active participant in community tech workshops, hands-on Google Cloud Study Jams, and developer learning sessions.",
    category: "Community",
    wagonNumber: "CAR 07",
  },
  {
    period: "Certified",
    role: "Infosys Springboard Certifications",
    institution: "Infosys Springboard",
    details: "Completed industry-curated technical certification tracks spanning software foundations, cloud concepts, and engineering.",
    category: "Certifications",
    wagonNumber: "CAR 08",
  },
];

