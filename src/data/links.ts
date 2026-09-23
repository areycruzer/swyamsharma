export const LINKS = {
  resume: {
    label: "Resume",
    href: "https://drive.google.com/file/d/1h9Ht6w4Zc3t6vb9T7j4qnAOc7zs7IrgM/view",
  },
  github: {
    label: "GitHub",
    href: "https://github.com/areycruzer",
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/areyswyam/",
  },
} as const;

export type LinkSlug = keyof typeof LINKS;
