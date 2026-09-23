import { Icons } from "@/components/icons";
import { HomeIcon, FileTextIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import type { Resume, Hackathon } from "@/data/types";

// Hackathons declared first so the win count is available in DATA.
const hackathons: Hackathon[] = [
  {
    kind: "hackathon",
    title: "HackHydra (HydraDB)",
    dates: "2026",
    sortKey: "2026-01",
    win: "3rd place overall",
    prize: "$1,500",
    description:
      "Built substrate-friction with Jayati Ahuja: a gate that only lets AI coding agents skip tests when the code graph has earned it (measured recall of at least 0.95).",
    links: [
      {
        title: "Source",
        href: "https://github.com/areycruzer/substrate-friction",
        icon: "github",
      },
      {
        title: "Website",
        href: "https://areycruzer.github.io/substrate-friction",
        icon: "globe",
      },
    ],
  },
  {
    kind: "hackathon",
    title: "Smart India Hackathon 2025",
    dates: "Dec 2025",
    sortKey: "2025-12",
    win: "Winner",
    description:
      "Lead developer on the winning team, building a platform for India's millet (Shree Anna) value chain.",
    links: [
      {
        title: "Source",
        href: "https://github.com/areycruzer/ShreeAnnaMobile",
        icon: "github",
      },
    ],
  },
  {
    kind: "hackathon",
    title: "Monad Blitz Delhi",
    dates: "2025",
    sortKey: "2025-11",
    location: "Delhi",
    links: [],
  },
  {
    kind: "bounty",
    title: "LazorKit Bounty, Superteam Vietnam",
    dates: "Dec 2025",
    sortKey: "2025-12-b",
    location: "Online",
    description:
      "A Solana starter template with passkey-native smart wallets.",
    links: [
      {
        title: "Live",
        href: "https://lazorkit-starter-hero.vercel.app",
        icon: "globe",
      },
      {
        title: "Source",
        href: "https://github.com/areycruzer/lazorkit-starter-hero",
        icon: "github",
      },
    ],
  },
  {
    kind: "hackathon",
    title: "Ride Hack 2025",
    dates: "2025",
    sortKey: "2025-10",
    description:
      "Built Kwik, AI-assisted call handling for India's 112 emergency line.",
    links: [
      {
        title: "Source",
        href: "https://github.com/areycruzer/Kwik",
        icon: "github",
      },
      {
        title: "Video",
        href: "https://www.youtube.com/watch?v=Ka1ObWIoYsI",
        icon: "youtube",
      },
    ],
  },
  {
    kind: "hackathon",
    title: "KIET AI Hackathon",
    dates: "2025",
    sortKey: "2025-09",
    win: "1st place",
    description:
      "Built DreamSpace, an agentic interior-design assistant on CrewAI and AutoGen.",
    links: [
      {
        title: "Video",
        href: "https://www.youtube.com/watch?v=bx4HNeQsdbE",
        icon: "youtube",
      },
    ],
  },
  {
    kind: "hackathon",
    title: "HashHacks 7.0",
    dates: "2025",
    sortKey: "2025-08",
    win: "1st place",
    links: [],
  },
  {
    kind: "hackathon",
    title: "Hack2Hustle",
    dates: "2025",
    sortKey: "2025-07",
    win: "2nd place",
    links: [],
  },
  {
    kind: "hackathon",
    title: "Nexathon",
    dates: "2025",
    sortKey: "2025-04",
    win: "2nd place",
    links: [],
  },
];

export const HACKATHON_WINS = hackathons.filter(
  (h) => h.kind === "hackathon" && Boolean(h.win)
).length;

const heroDescription = `Final-year B.Tech CSE student building full-stack and agentic AI products. ${HACKATHON_WINS}x hackathon winner, including Smart India Hackathon 2025. Based in Noida, India.`;

export const DATA: Resume = {
  name: "Swyam Sharma",
  initials: "SS",
  url: "https://swyamsharma.vercel.app",
  location: "Noida, India",
  locationLink: "https://www.google.com/maps/place/Noida",
  avatarUrl: "/me.jpg",
  email: "swyam7@gmail.com",
  openToWork:
    "Open to SWE, Full-Stack and AI Engineer roles (India or remote)",
  resumeHref: "/resume",
  description: heroDescription,
  seoDescription: `${heroDescription} Open to SWE, Full-Stack and AI Engineer roles in India or remote.`,
  summary: `I'm a final-year Computer Science student at VIPS-TC (GGSIPU) who likes turning rough ideas into working products: web apps, voice and LLM agents, automation, and security tooling. Most days I work in React and TypeScript, Node.js and Express, Python, and SQL or MongoDB, with LangChain, CrewAI, AutoGen and the Gemini and OpenAI APIs on the AI side.

As an intern I shipped React (TypeScript) front-ends and Node.js APIs, and automated ISO 27001-aligned digital-forensics workflows. Outside work I built [Kwik](#projects), AI-assisted call handling for India's 112 emergency line, won [Smart India Hackathon 2025](#hackathons), and co-founded [CyberCIA Forge](#leadership), a 500+ member engineering community.

Online I go by Cruzer. When I'm not racing a hackathon deadline, I'm usually sending [pull requests to Kubernetes tooling](#recognition) or hunting bugs in bounty programs.`,
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    {
      href: "/resume?src=dock",
      icon: FileTextIcon,
      label: "Resume",
      newTab: true,
    },
  ],
  contact: {
    email: "swyam7@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "/go/github?src=dock",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "/go/linkedin?src=dock",
        icon: Icons.linkedin,
        navbar: true,
      },
      Email: {
        name: "Email",
        url: "mailto:swyam7@gmail.com",
        icon: Icons.email,
        navbar: true,
        track: "email_click",
      },
    },
  },
  work: [
    {
      org: "RevSage.ai",
      title: "Software Engineer",
      start: "Jul 2026",
      bullets: [],
    },
    {
      org: "Enreach Solutions",
      href: undefined,
      title: "Digital Forensic Examiner Intern",
      type: "Internship",
      location: "New Delhi",
      start: "Sep 2025",
      end: "Mar 2026",
      bullets: [
        "Built Python automation that cut evidence-extraction turnaround by ~40% across 15+ client audits on TB-scale datasets.",
        "Kept 100% chain-of-custody compliance with ISO 27001-aligned acquisition and logging protocols.",
        "Supported digital-forensics casework for government and enterprise clients, using AI tooling on internal scripts with critical review of every output.",
      ],
    },
    {
      org: "Digital Dreams Innovation Trust",
      href: undefined,
      title: "Full-Stack Developer Intern",
      type: "Internship",
      location: "Remote / Delhi",
      start: "Jul 2025",
      end: "Sep 2025",
      bullets: [
        "Owned end-to-end delivery of 5+ React (TypeScript) front-ends and 3 Node.js/Express REST modules on MongoDB.",
        "Reached Lighthouse Performance 95+ through architecture refactors and lazy-loaded data fetching.",
        "Wrote technical design notes and tested PRs in an agile Git code-review workflow, turning stakeholder requirements into frontend and backend work.",
      ],
    },
    {
      org: "Haryana Police",
      title: "Cyber Security Intern",
      type: "Internship",
      location: "Gurugram",
      start: "Jun 2025",
      end: "Jul 2025",
      bullets: [],
    },
    {
      org: "Inblue",
      title: "Sustainability Advisor",
      location: "India",
      start: "Jun 2024",
      end: "Jul 2024",
      bullets: [],
    },
  ],
  leadership: [
    {
      org: "CyberCIA Forge",
      title: "Co-founder & Technical Lead",
      type: "Part-time",
      start: "Sep 2025",
      bullets: [
        "Grew an engineering community to 500+ members.",
        "Ran workshops on REST APIs, CI/CD and full-stack AI pipelines.",
      ],
    },
    {
      org: "Career Development Centre, VIPS-TC",
      title: "Core Member",
      type: "Student body",
      start: "Jan 2025",
      end: "Dec 2025",
      bullets: [
        "Helped run workshops, mentoring and industry-engagement events for students.",
      ],
    },
  ],
  education: [
    {
      school: "VIPS-TC, Guru Gobind Singh Indraprastha University",
      href: "https://www.ipu.ac.in",
      degree: "B.Tech, Computer Science and Engineering",
      details:
        "CGPA 8.9/10 | Coursework: Data Structures and Algorithms, OOP, DBMS, Operating Systems, Computer Networks",
      start: "Aug 2023",
      end: "May 2027 (expected)",
    },
  ],
  skills: [
    {
      label: "Languages",
      items: [
        { name: "TypeScript", icon: Typescript },
        { name: "JavaScript" },
        { name: "Python", icon: Python },
        { name: "SQL" },
        { name: "C/C++" },
      ],
    },
    {
      label: "Frontend",
      items: [
        { name: "React", icon: ReactLight },
        { name: "Next.js", icon: NextjsIconDark },
        { name: "Vite" },
        { name: "Tailwind CSS" },
        { name: "shadcn/ui" },
      ],
    },
    {
      label: "Backend & Data",
      items: [
        { name: "Node.js", icon: Nodejs },
        { name: "Express" },
        { name: "REST APIs" },
        { name: "MongoDB" },
        { name: "MySQL" },
        { name: "Firebase" },
        { name: "Supabase" },
      ],
    },
    {
      label: "AI & Agents",
      items: [
        { name: "LangChain" },
        { name: "CrewAI" },
        { name: "AutoGen" },
        { name: "Gemini API" },
        { name: "OpenAI API" },
        { name: "n8n" },
      ],
    },
    {
      label: "Security",
      items: [
        { name: "Digital Forensics" },
        { name: "ISO 27001" },
        { name: "OSINT" },
        { name: "Kali Linux" },
      ],
    },
    {
      label: "Tooling",
      items: [
        { name: "Git" },
        { name: "GitHub Actions" },
        { name: "CI/CD" },
        { name: "Vercel" },
        { name: "Render" },
      ],
    },
  ],
  projects: [
    {
      title: "Kwik",
      href: "https://github.com/areycruzer/Kwik",
      dates: "2025",
      award: "Ride Hack 2025",
      description:
        "AI-assisted call handling for India's 112 Emergency Response Support System. Kwik screens out blank and non-emergency calls, handles callers in several Indian languages, grades severity and puts incidents on a map for dispatchers. The Live link opens [Kwik 112](https://github.com/areycruzer/kwik112-assemblyai), the latest iteration, where the AI can raise severity but never lower it.",
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "Node.js",
        "Express",
        "WebSockets",
        "Gemini API",
        "Leaflet",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/areycruzer/Kwik",
        },
        {
          type: "Live",
          href: "https://kwik112-assemblyai.vercel.app",
        },
        {
          type: "Video",
          href: "https://www.youtube.com/watch?v=Ka1ObWIoYsI",
        },
      ],
    },
    {
      title: "Shree Anna",
      href: "https://github.com/areycruzer/ShreeAnnaMobile",
      dates: "2025",
      award: "Winner, Smart India Hackathon 2025",
      description:
        "A mobile platform for India's millet (Shree Anna) value chain that connects farmers, FPOs, self-help groups and consumers, with role-based flows for batch tracking, traceability and market access. I was lead developer on the team that won Smart India Hackathon 2025.",
      technologies: [
        "React Native",
        "Expo",
        "TypeScript",
        "Node.js",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/areycruzer/ShreeAnnaMobile",
        },
      ],
    },
    {
      title: "DreamSpace",
      href: "https://www.youtube.com/watch?v=bx4HNeQsdbE",
      dates: "2025",
      award: "1st place, KIET AI Hackathon",
      description:
        "An agentic interior-design assistant: a multi-agent pipeline built on CrewAI and AutoGen, behind a React UI. Built with a team of four.",
      technologies: ["CrewAI", "AutoGen", "Python", "React"],
      links: [
        {
          type: "Video",
          href: "https://www.youtube.com/watch?v=bx4HNeQsdbE",
        },
      ],
    },
    {
      title: "substrate-friction",
      href: "https://areycruzer.github.io/substrate-friction",
      dates: "2026",
      award: "3rd place overall, HackHydra ($1,500)",
      description:
        "A CI gate that lets AI coding agents skip tests only when the code graph has earned it. On 172 labelled SWE-bench instances across 7 repos, type-resolved call graphs reached just 0.419 recall of the guarding test against a 0.95 bar, so the gate tells you to run the full suite. Built with [Jayati Ahuja](https://github.com/JAYATIAHUJA) on HydraDB.",
      technologies: [
        "Python",
        "HydraDB",
        "Pyright",
        "GitHub Actions",
      ],
      links: [
        {
          type: "Website",
          href: "https://areycruzer.github.io/substrate-friction",
        },
        {
          type: "Source",
          href: "https://github.com/areycruzer/substrate-friction",
        },
        {
          type: "Video",
          href: "https://www.youtube.com/watch?v=5RH1bvMIUKo",
        },
      ],
    },
    {
      title: "DishEdit",
      href: "https://github.com/areycruzer/DishEdit",
      dates: "2026",
      description:
        "An iOS app that makes food customisation direct: tap the ingredient you mean to remove it or add a restaurant-approved extra, preview the change, and send the kitchen an unambiguous order. Built with Vansh Nagpal and Shray Dobhal.",
      technologies: ["Swift", "SwiftUI", "iOS"],
      links: [
        {
          type: "Source",
          href: "https://github.com/areycruzer/DishEdit",
        },
        {
          type: "Video",
          href: "https://youtube.com/shorts/_dE1RKzX3zs",
        },
      ],
    },
    {
      title: "SkinAI",
      href: "https://github.com/areycruzer/clinikally-skinai",
      dates: "2026",
      description:
        "An agentic skincare assistant. An adaptive decision-tree agent plans each reply, pulls context from multi-source RAG on Weaviate, streams answers over WebSockets and can assess a skin photo with Gemini 2.5 Flash. Self-hosted with Docker and Caddy.",
      technologies: [
        "Python",
        "FastAPI",
        "WebSockets",
        "Gemini API",
        "Weaviate",
        "DSPy",
        "Docker",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/areycruzer/clinikally-skinai",
        },
        {
          type: "Video",
          href: "https://youtu.be/EaOpcie9nKY",
        },
      ],
    },
  ],
  hackathons,
  recognition: [
    {
      label: "Publication",
      icon: "BookOpen",
      items: [
        {
          text: 'Co-author, "Green Computing Strategies", in Green Computational Intelligence (Wiley, 2025)',
          href: "https://onlinelibrary.wiley.com/doi/book/10.1002/9781394383658",
        },
      ],
    },
    {
      label: "Open Source",
      icon: "GitPullRequest",
      items: [
        {
          text: "Headlamp (Kubernetes SIG UI): added TCPRoute and UDPRoute views for Gateway API",
          href: "https://github.com/kubernetes-sigs/headlamp/pull/7002",
        },
        {
          text: "Agent Orchestrator: sidebar feedback report flow; fail fast when tmux is missing",
          href: "https://github.com/Untrivial-ai/agent-orchestrator/pull/2348",
        },
        {
          text: "ReverbCode: surfaced the real session branch in the UI; sanitised CI logs before PTY paste",
          href: "https://github.com/aoagents/ReverbCode/pull/358",
        },
        {
          text: "awesome-phone-call-agents: emergency-intake practice call",
          href: "https://github.com/CALLE-AI/awesome-phone-call-agents/pull/458",
        },
      ],
    },
    {
      label: "Security Research",
      icon: "ShieldCheck",
      items: [
        {
          text: "$2,000+ in bug bounties across axon-ivy, hunter.io and Reown",
        },
      ],
    },
    {
      label: "Incubation",
      icon: "Rocket",
      items: [],
    },
    {
      label: "Certifications",
      icon: "Award",
      items: [
        {
          text: "ISO/IEC 27001 Information Security Associate (SkillFront)",
        },
        {
          text: "Introduction to Cybersecurity (Cisco)",
        },
      ],
    },
  ],
};
