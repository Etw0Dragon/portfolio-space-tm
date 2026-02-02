import { FaGithub, FaLinkedin } from "react-icons/fa";

export const NAV_LINKS = [
  {
    title: "Accueil",
    link: "/",
  },
] as const;

export const SOCIALS = [
  {
    name: "GitHub",
    icon: FaGithub,
    link: "https://github.com/Etw0Dragon",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    link: "https://linkedin.com/in/tom-moreau-392690332",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/Etw0Dragon/portfolio-space-tm",
};
