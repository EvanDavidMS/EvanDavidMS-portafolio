import type { ComponentType } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiCss,
  SiFramer,
  SiFigma,
  SiNodedotjs,
  SiPostgresql,
  SiGraphql,
  SiGit,
  SiGithub,
  SiVercel,
} from "@icons-pack/react-simple-icons";

export const navItems = [
  { id: "top", href: "#top", label: "Inicio" },
  { id: "about", href: "#about", label: "Sobre mí" },
  { id: "skills", href: "#skills", label: "Skills" },
  { id: "projects", href: "#projects", label: "Proyectos" },
  { id: "contact", href: "#contact", label: "Contacto" },
] as const;

type SkillIcon = ComponentType<{
  size?: number;
  color?: string;
  className?: string;
}>;

export type SkillItem = {
  name: string;
  icon: SkillIcon;
  /** literal Tailwind class so it can be statically scanned, e.g. "group-hover:text-[#61DAFB]" */
  hoverText: string;
};

export const skillGroups: { title: string; desc: string; items: SkillItem[] }[] = [
  {
    title: "Frontend",
    desc: "UI, animación, a11y",
    items: [
      { name: "React", icon: SiReact, hoverText: "group-hover:text-[#61DAFB]" },
      { name: "Next.js", icon: SiNextdotjs, hoverText: "group-hover:text-white" },
      { name: "TypeScript", icon: SiTypescript, hoverText: "group-hover:text-[#3178C6]" },
      { name: "Tailwind CSS", icon: SiTailwindcss, hoverText: "group-hover:text-[#38BDF8]" },
      { name: "CSS", icon: SiCss, hoverText: "group-hover:text-[#1572B6]" },
      { name: "Framer Motion", icon: SiFramer, hoverText: "group-hover:text-[#0055FF]" },
      { name: "Figma", icon: SiFigma, hoverText: "group-hover:text-[#F24E1E]" },
    ],
  },
  {
    title: "Backend",
    desc: "APIs, DB, auth",
    items: [
      { name: "Node.js", icon: SiNodedotjs, hoverText: "group-hover:text-[#339933]" },
      { name: "PostgreSQL", icon: SiPostgresql, hoverText: "group-hover:text-[#4169E1]" },
      { name: "GraphQL", icon: SiGraphql, hoverText: "group-hover:text-[#E10098]" },
    ],
  },
  {
    title: "DevX",
    desc: "CI/CD, testing",
    items: [
      { name: "Git", icon: SiGit, hoverText: "group-hover:text-[#F05032]" },
      { name: "GitHub", icon: SiGithub, hoverText: "group-hover:text-white" },
      { name: "Vercel", icon: SiVercel, hoverText: "group-hover:text-white" },
    ],
  },
];

export const projects = [
  {
    title: "Restaurant NioCat",
    category: "SaaS",
    desc: "Sistema operativo y administrativo integral (SaaS) diseñado para optimizar restaurantes.",
    image: "/projects/niocat-restaurante.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Supabase", "Framer Motion"],
    href: "https://niocat-restaurante.vercel.app/",
  },
  {
    title: "Fundación Renciende",
    category: "Web Platform",
    desc: "Plataforma integral de recaudación de fondos y gestión transparente de beneficiarios.",
    image: "/projects/renciendeweb.jpeg",
    tech: ["Next.js", "Supabase", "Tailwind CSS", "PayPal API", "Resend"],
    href: "https://fundacion-renciende.vercel.app/",
  },
  {
    title: "Barber Premium",
    category: "SaaS",
    desc: "Sistema avanzado de gestión y automatización diseñado para barberías exclusivas.",
    image: "/projects/barberpremium.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    href: "https://niocat-barberpremium.vercel.app/",
  },
  {
    title: "NioOS Terminal",
    category: "Web OS",
    desc: "Simulador avanzado de entorno de escritorio interactivo ejecutado nativamente sobre el navegador web.",
    image: "/projects/nioOSweb.jpeg",
    tech: ["Next.js", "React", "TypeScript", "Framer Motion"],
    href: "https://nioos.vercel.app/",
  },
  {
    title: "NioCat Web Engine",
    category: "Corporate",
    desc: "Estructura digital de la agencia enfocada en la presentación de servicios de software premium.",
    image: "/projects/niocatweb.jpeg",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://niocatweb.vercel.app/",
  },
  {
    title: "David Morales Portfolio",
    category: "Creative Portfolio",
    desc: "Portafolio de diseño interactivo de alta gama basado en una estética oscura premium.",
    image: "/projects/blackmeatweb.jpeg",
    tech: ["Next.js", "React", "Tailwind CSS"],
    href: "https://david-morales-black-meat.vercel.app/",
  },
  {
    title: "Fer Portfolio",
    category: "Creative Portfolio",
    desc: "Espacio digital interactivo diseñado a medida para exhibir proyectos creativos.",
    image: "/projects/fernandaportafolioweb.jpeg",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    href: "https://fersita-portafolio.vercel.app/",
  },
  {
    title: "Mi Urólogo Torreón",
    category: "Medical Landing Page",
    desc: "Plataforma web médica enfocada en la conversión de pacientes y agendamiento de citas.",
    image: "/projects/miurologotorreon.jpeg",
    tech: ["Next.js", "Tailwind CSS", "React"],
    href: "https://miurologotorreon.com/",
  },
  {
    title: "NioCat Nails & Aesthetics",
    category: "Landing Page",
    desc: "Sitio web corporativo y catálogo digital premium para un salón de manicura y estética.",
    image: "/projects/niocat-unas.jpeg",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    href: "https://niocat-unas.vercel.app/",
  },
  {
    title: "Moto Service Laguna",
    category: "Landing Page",
    desc: "Sitio web corporativo para un centro especializado en mantenimiento de motocicletas.",
    image: "/projects/motoservicelaguna.jpeg",
    tech: ["Next.js", "Tailwind CSS", "React"],
    href: "https://motoservicelaguna.com/",
  },
  {
    title: "Barbería Demian",
    category: "SaaS",
    desc: "Aplicación web premium para la gestión automatizada de citas y control de agenda.",
    image: "/projects/barberdemianweb.jpeg",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Supabase"],
    href: "https://barberia-demian.vercel.app/",
  },
];

export const socials = ["LinkedIn", "GitHub", "X / Twitter", "Dribbble"];
