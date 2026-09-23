export type Experience = {
  org: string;
  href?: string;
  title: string;
  type?: string; // "Internship" | "Part-time" | ...
  location?: string;
  logoUrl?: string;
  start: string;
  end?: string; // undefined => "Present"
  bullets: string[];
};

export type ProjectLink = {
  type: "Source" | "Live" | "Video" | "Website";
  href: string;
};

export type Project = {
  title: string;
  href: string;
  dates: string;
  active?: boolean;
  award?: string; // ribbon on the card
  description: string; // markdown, 2 to 4 sentences
  technologies: string[];
  links: ProjectLink[];
  video?: string;
  poster?: string;
  image?: string;
};

export type Hackathon = {
  kind: "hackathon" | "bounty";
  title: string;
  dates: string;
  sortKey: string; // "2025-12" for sorting
  location?: string;
  description?: string;
  win?: string; // "Winner" | "1st place" | "2nd place" | "3rd place overall" ...
  prize?: string; // "$1,500"
  image?: string; // logo; monogram fallback
  links: { title: string; href: string; icon: "github" | "globe" | "youtube" }[];
};

export type SkillGroup = {
  label: string;
  items: { name: string; icon?: React.ComponentType<{ className?: string }> }[];
};

export type Education = {
  school: string;
  href: string;
  degree: string;
  details?: string;
  logoUrl?: string;
  start: string;
  end: string;
};

export type RecognitionItem = {
  text: string;
  href?: string;
};

export type RecognitionGroup = {
  label: string;
  icon: string; // lucide icon name mapped in component
  items: RecognitionItem[];
};

export type Social = {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  navbar: boolean;
  track?: string;
};

export type NavItem = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  newTab?: boolean;
};

export type Resume = {
  name: string;
  initials: string;
  url: string;
  location: string;
  locationLink: string;
  avatarUrl: string;
  email: string;
  openToWork: string;
  resumeHref: string;
  description: string;
  seoDescription: string;
  summary: string;
  navbar: NavItem[];
  contact: {
    email: string;
    social: Record<string, Social>;
  };
  work: Experience[];
  leadership: Experience[];
  education: Education[];
  skills: SkillGroup[];
  projects: Project[];
  hackathons: Hackathon[];
  recognition: RecognitionGroup[];
};
