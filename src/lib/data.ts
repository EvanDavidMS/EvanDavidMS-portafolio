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

/** Caso de estudio que se muestra en el modal al abrir un proyecto. */
export type CaseStudy = {
  /** El reto / contexto: qué problema tenía el cliente. */
  challenge: string;
  /** Qué hiciste — viñetas concretas de tu trabajo. */
  work: string[];
  /** Resultados — idealmente con números reales (ventas, tiempo, conversión). */
  results: string[];
  /** Testimonio del cliente (opcional). */
  testimonial?: { quote: string; author: string; role: string };
};

export type Project = {
  title: string;
  category: string;
  desc: string;
  image: string;
  tech: string[];
  href: string;
  /**
   * Caso de estudio opcional. Los proyectos sin `study` igual abren el modal
   * (muestran imagen, descripción, stack y "Ver en vivo").
   *
   * ⚠️ PLACEHOLDERS: los textos de `study` de abajo son EJEMPLOS. Reemplazá
   * `challenge`, `work`, `results` con lo real de cada proyecto y — sobre todo —
   * los `testimonial` con testimonios verdaderos antes de publicar. Copiá el
   * mismo patrón a los demás proyectos que quieras destacar.
   */
  study?: CaseStudy;
};

export const projects: Project[] = [
  {
    title: "Restaurant NioCat",
    category: "SaaS",
    desc: "Sistema operativo y administrativo integral (SaaS) diseñado para optimizar restaurantes.",
    image: "/projects/niocat-restaurante.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Supabase", "Framer Motion"],
    href: "https://niocat-restaurante.vercel.app/",
    study: {
      challenge:
        "El restaurante llevaba pedidos, mesas e inventario en papel y hojas de cálculo dispersas: errores frecuentes, doble captura y cero visibilidad de las ventas en tiempo real.",
      work: [
        "Diseñé y construí el SaaS completo, del frontend al backend, con Next.js y Supabase.",
        "Módulos de pedidos, control de mesas, inventario y reportes en tiempo real.",
        "Accesos por rol (mesero, cocina, administración) con actualizaciones en vivo.",
      ],
      results: [
        "Operación 100% digital, sin papel ni doble captura.",
        "Reportes de ventas e inventario al instante.",
        "Menos errores en la toma de pedidos.", // ← reemplazar por un número real si lo tenés (ej. "−40% de errores")
      ],
      testimonial: {
        quote:
          "«Escribe aquí el testimonio real del cliente sobre el proyecto.»",
        author: "Nombre del cliente",
        role: "Cargo · Restaurant NioCat",
      },
    },
  },
  {
    title: "Fundación Renciende",
    category: "Web Platform",
    desc: "Plataforma integral de recaudación de fondos y gestión transparente de beneficiarios.",
    image: "/projects/renciendeweb.jpeg",
    tech: ["Next.js", "Supabase", "Tailwind CSS", "PayPal API", "Resend"],
    href: "https://fundacion-renciende.vercel.app/",
    study: {
      challenge:
        "La fundación necesitaba recibir donaciones en línea y mostrar de forma transparente a dónde iba cada aporte, sin depender de procesos manuales.",
      work: [
        "Integré pagos con la API de PayPal y confirmaciones automáticas por correo con Resend.",
        "Panel para gestionar beneficiarios y campañas de recaudación.",
        "Front público enfocado en confianza y conversión de donantes.",
      ],
      results: [
        "Donaciones en línea automatizadas de punta a punta.",
        "Gestión transparente de beneficiarios y campañas.",
        "Comprobantes por correo sin intervención manual.",
      ],
      testimonial: {
        quote:
          "«Escribe aquí el testimonio real del cliente sobre el proyecto.»",
        author: "Nombre del cliente",
        role: "Cargo · Fundación Renciende",
      },
    },
  },
  {
    title: "Barber Premium",
    category: "SaaS",
    desc: "Sistema avanzado de gestión y automatización diseñado para barberías exclusivas.",
    image: "/projects/barberpremium.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    href: "https://niocat-barberpremium.vercel.app/",
    study: {
      challenge:
        "La barbería perdía tiempo (y citas) coordinando la agenda por WhatsApp, sin un lugar único para reservar ni recordatorios automáticos.",
      work: [
        "Construí el sistema de reservas y gestión de agenda con Next.js y Supabase.",
        "Automaticé confirmaciones y el flujo de citas por barbero.",
        "Interfaz premium alineada a la marca del negocio.",
      ],
      results: [
        "Reservas centralizadas en un solo lugar.",
        "Menos huecos y cancelaciones de última hora.",
        "Agenda clara por barbero y por día.",
      ],
      testimonial: {
        quote:
          "«Escribe aquí el testimonio real del cliente sobre el proyecto.»",
        author: "Nombre del cliente",
        role: "Dueño · Barber Premium",
      },
    },
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

export type Testimonial = {
  quote: string;
  author: string;
  /** cargo · empresa */
  role: string;
};

/**
 * ⚠️ PLACEHOLDERS: reemplazá estos con testimonios REALES de tus clientes
 * (idealmente de los negocios de NioCat). El avatar usa la inicial del nombre,
 * así que no necesitás foto. Podés dejar 4-6; el muro se rellena solo.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "«Escribí aquí lo que dijo tu cliente: cómo fue trabajar con vos y qué resultado obtuvo.»",
    author: "Nombre Apellido",
    role: "Dueño · Restaurant NioCat",
  },
  {
    quote:
      "«Un testimonio breve sobre tu comunicación, cumplimiento de tiempos y calidad de entrega.»",
    author: "Nombre Apellido",
    role: "Directora · Fundación Renciende",
  },
  {
    quote:
      "«Qué problema tenían antes y cómo tu solución lo cambió, en las palabras del cliente.»",
    author: "Nombre Apellido",
    role: "Dueño · Barber Premium",
  },
  {
    quote:
      "«El impacto en su negocio: más reservas, menos tiempo perdido, mejor imagen, etc.»",
    author: "Nombre Apellido",
    role: "Gerente · Moto Service Laguna",
  },
  {
    quote:
      "«Algo sobre el proceso: propuestas, iteraciones, atención al detalle y trato cercano.»",
    author: "Nombre Apellido",
    role: "Fundadora · NioCat Nails",
  },
  {
    quote:
      "«Una recomendación corta y directa que invite a otros a trabajar con vos.»",
    author: "Nombre Apellido",
    role: "Cliente · Landing médica",
  },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/evan-morales/" },
  { label: "GitHub", href: "https://github.com/EvanDavidMS" },
  { label: "Instagram", href: "https://www.instagram.com/evn.me_/" },
] as const;

export const contactEmail = "evandavidms@gmail.com";
