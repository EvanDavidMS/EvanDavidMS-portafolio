import type { ComponentType } from "react";
import type { Loc } from "@/lib/i18n";
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
  { id: "top", href: "#top" },
  { id: "about", href: "#about" },
  { id: "skills", href: "#skills" },
  { id: "projects", href: "#projects" },
  { id: "contact", href: "#contact" },
] as const;

export type NavId = (typeof navItems)[number]["id"];

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
  challenge: Loc;
  /** Qué hiciste — viñetas concretas de tu trabajo. */
  work: Loc[];
  /** Resultados — idealmente con números reales (ventas, tiempo, conversión). */
  results: Loc[];
  /** Testimonio del cliente (opcional). */
  testimonial?: { quote: Loc; author: string; role: Loc };
};

export type Project = {
  title: string;
  category: string;
  desc: Loc;
  image: string;
  tech: string[];
  href: string;
  /**
   * Caso de estudio opcional. Los proyectos sin `study` igual abren el modal
   * (muestran imagen, descripción, stack y "Ver en vivo").
   *
   * Los tres primeros proyectos tienen un `study` completo (reto → qué hice →
   * resultado → testimonio). Para destacar otro proyecto, copiá el mismo patrón.
   */
  study?: CaseStudy;
};

export const projects: Project[] = [
  {
    title: "Salón de Belleza AMARA",
    category: "Belleza",
    desc: {
      es: "Sitio para salón de belleza con catálogo de servicios, portafolio visual y contacto directo para agendar citas.",
      en: "A beauty salon site with a services catalogue, visual portfolio and direct contact for booking appointments.",
    },
    image: "/projects/amara.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    href: "https://niocat-amara.vercel.app/",
  },
  {
    title: "Barbería Casa Navaja",
    category: "Belleza",
    desc: {
      es: "Sitio para barbería clásica en Madrid con tarifas transparentes, perfiles del equipo y reserva de cita en línea con confirmación por WhatsApp.",
      en: "A site for a classic Madrid barbershop with transparent pricing, team profiles and online booking confirmed over WhatsApp.",
    },
    image: "/projects/casanavaja.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    href: "https://niocat-casanavaja.vercel.app/",
  },
  {
    title: "HappyDog",
    category: "Veterinaria",
    desc: {
      es: "Sitio para clínica veterinaria con agendado de citas en línea, historia clínica por paciente y urgencias disponibles las 24 horas.",
      en: "A veterinary clinic site with online appointment booking, per-patient medical records and 24/7 emergency access.",
    },
    image: "/projects/happydog.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    href: "https://niocat-happydog.vercel.app/",
  },
  {
    title: "Fundación Renciende",
    category: "Causa social",
    desc: {
      es: "Plataforma para recaudar fondos y administrar beneficiarios de forma transparente, con donativos y reportes 100% digitales.",
      en: "A platform to raise funds and manage beneficiaries transparently, with fully digital donations and reporting.",
    },
    image: "/projects/renciendeweb.jpeg",
    tech: ["Next.js", "Supabase", "Tailwind CSS", "PayPal API", "Resend"],
    href: "https://fundacion-renciende.vercel.app/",
    study: {
      challenge: {
        es: "La fundación necesitaba recibir donaciones en línea y mostrar de forma transparente a dónde iba cada aporte, sin depender de procesos manuales.",
        en: "The foundation needed to receive donations online and transparently show where every contribution went, without relying on manual processes.",
      },
      work: [
        {
          es: "Integré pagos con la API de PayPal y confirmaciones automáticas por correo con Resend.",
          en: "Integrated payments with the PayPal API and automatic email confirmations via Resend.",
        },
        {
          es: "Panel para gestionar beneficiarios y campañas de recaudación.",
          en: "Dashboard to manage beneficiaries and fundraising campaigns.",
        },
        {
          es: "Front público enfocado en confianza y conversión de donantes.",
          en: "Public front focused on trust and donor conversion.",
        },
      ],
      results: [
        {
          es: "100% de los donativos digitalizados, de punta a punta.",
          en: "100% of donations digitized, end to end.",
        },
        {
          es: "Gestión transparente de beneficiarios y campañas.",
          en: "Transparent management of beneficiaries and campaigns.",
        },
        {
          es: "Comprobantes por correo sin intervención manual.",
          en: "Email receipts with no manual intervention.",
        },
      ],
      testimonial: {
        quote: {
          es: "Ahora recibimos donativos en línea y cada persona ve a dónde va su aporte. Nos dio una imagen mucho más profesional y confiable.",
          en: "We now receive donations online and each person sees where their contribution goes. It gave us a far more professional, trustworthy image.",
        },
        author: "Andrea Irenez",
        role: {
          es: "Directora · Fundación Renciende",
          en: "Director · Fundación Renciende",
        },
      },
    },
  },
  {
    title: "BarberPremium",
    category: "Belleza",
    desc: {
      es: "Gestión y automatización para barberías: citas en tiempo real, control de inventario y fidelización de clientes en un solo panel.",
      en: "Management and automation for barbershops: real-time appointments, inventory control and client loyalty in a single dashboard.",
    },
    image: "/projects/barberpremium.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    href: "https://niocat-barberpremium.vercel.app/",
    study: {
      challenge: {
        es: "La barbería perdía tiempo (y citas) coordinando la agenda por WhatsApp, sin un lugar único para reservar ni recordatorios automáticos.",
        en: "The barbershop lost time (and appointments) coordinating the schedule over WhatsApp, with no single place to book and no automatic reminders.",
      },
      work: [
        {
          es: "Construí el sistema de reservas y gestión de agenda con Next.js y Supabase.",
          en: "Built the booking and schedule-management system with Next.js and Supabase.",
        },
        {
          es: "Automaticé confirmaciones, control de inventario y el flujo de citas por barbero.",
          en: "Automated confirmations, inventory control and the per-barber appointment flow.",
        },
        {
          es: "Interfaz premium alineada a la marca del negocio.",
          en: "Premium interface aligned with the shop's brand.",
        },
      ],
      results: [
        {
          es: "Agenda 100% automatizada, sin registro manual de citas.",
          en: "100% automated scheduling, with no manual appointment logging.",
        },
        {
          es: "Menos huecos y cancelaciones de última hora.",
          en: "Fewer gaps and last-minute cancellations.",
        },
        {
          es: "Agenda clara por barbero y por día.",
          en: "Clear schedule per barber and per day.",
        },
      ],
      testimonial: {
        quote: {
          es: "Dejamos de perder citas por el desorden del WhatsApp. Los clientes reservan solos y la agenda siempre está clara. Trabajo impecable.",
          en: "We stopped losing appointments to the WhatsApp mess. Clients book on their own and the schedule is always clear. Impeccable work.",
        },
        author: "Jonas Sebastian",
        role: {
          es: "Dueño · BarberPremium",
          en: "Owner · BarberPremium",
        },
      },
    },
  },
  {
    title: "David Morales Portfolio",
    category: "Portafolio",
    desc: {
      es: "Portafolio de diseño de alta gama con estética oscura y minimalista, pensado para mostrar marca personal con impacto inmediato.",
      en: "A high-end design portfolio with a dark, minimal aesthetic, built to showcase a personal brand with immediate impact.",
    },
    image: "/projects/blackmeatweb.jpeg",
    tech: ["Next.js", "React", "Tailwind CSS"],
    href: "https://david-morales-black-meat.vercel.app/",
  },
  {
    title: "Mi Urólogo Torreón",
    category: "Salud",
    desc: {
      es: "Landing médica pensada para convertir visitantes en pacientes, con agendado directo y posicionamiento local en Google.",
      en: "A medical landing page built to turn visitors into patients, with direct booking and local Google ranking.",
    },
    image: "/projects/miurologotorreon.jpeg",
    tech: ["Next.js", "Tailwind CSS", "React"],
    href: "https://miurologotorreon.com/",
  },
  {
    title: "NioCat Nails & Aesthetics",
    category: "Belleza",
    desc: {
      es: "Sitio elegante para un salón de belleza, con catálogo de trabajos y todos sus canales de contacto centralizados.",
      en: "An elegant site for a beauty salon, with a work catalogue and every contact channel in one place.",
    },
    image: "/projects/niocat-unas.jpeg",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    href: "https://niocat-unas.vercel.app/",
  },
  {
    title: "Moto Service Laguna",
    category: "Automotriz",
    desc: {
      es: "Sitio corporativo para un taller de motos: servicios, marcas y contacto directo por WhatsApp en un solo lugar.",
      en: "A corporate site for a motorcycle workshop: services, brands and direct WhatsApp contact all in one place.",
    },
    image: "/projects/motoservicelaguna.jpeg",
    tech: ["Next.js", "Tailwind CSS", "React"],
    href: "https://motoservicelaguna.com/",
  },
];

export type Testimonial = {
  quote: Loc;
  author: string;
  /** cargo · empresa */
  role: Loc;
};

/**
 * Testimonios de clientes de los proyectos (negocios de NioCat). El avatar usa
 * la inicial del nombre, así que no necesita foto. El muro se rellena solo.
 */
export const testimonials: Testimonial[] = [
  {
    quote: {
      es: "Pasamos del cuaderno a un sistema que controla todo el restaurante desde el celular. Evan entendió cómo trabajamos y lo dejó funcionando sin complicaciones.",
      en: "We went from a notebook to a system that runs the whole restaurant from a phone. Evan understood how we work and got it running with zero hassle.",
    },
    author: "Miguel Castañeda",
    role: { es: "Gerente · Restaurant NioCat", en: "Manager · Restaurant NioCat" },
  },
  {
    quote: {
      es: "Ahora recibimos donativos en línea y cada persona ve a dónde va su aporte. Nos dio una imagen mucho más profesional y confiable.",
      en: "We now receive donations online and each person sees where their contribution goes. It gave us a far more professional, trustworthy image.",
    },
    author: "Andrea Irenez",
    role: { es: "Directora · Fundación Renciende", en: "Director · Fundación Renciende" },
  },
  {
    quote: {
      es: "Dejamos de perder citas por el desorden del WhatsApp. Los clientes reservan solos y la agenda siempre está clara. Trabajo impecable.",
      en: "We stopped losing appointments to the WhatsApp mess. Clients book on their own and the schedule is always clear. Impeccable work.",
    },
    author: "Jonas Sebastian",
    role: { es: "Dueño · BarberPremium", en: "Owner · BarberPremium" },
  },
  {
    quote: {
      es: "El sitio nos dio presencia seria en la Laguna. Cumplió tiempos, propuso ideas y siempre estuvo al pendiente de cada detalle.",
      en: "The site gave us a serious presence in the region. He met deadlines, proposed ideas and stayed on top of every detail.",
    },
    author: "Fernanda Salazar",
    role: { es: "Gerente · Moto Service Laguna", en: "Manager · Moto Service Laguna" },
  },
  {
    quote: {
      es: "Quedó justo como lo imaginaba: elegante y fácil de usar. Mis clientas me dicen que la página se ve preciosa. Súper recomendado.",
      en: "It turned out exactly as I imagined: elegant and easy to use. My clients tell me the site looks gorgeous. Highly recommended.",
    },
    author: "Frida Delgadillo",
    role: { es: "Fundadora · NioCat Nails", en: "Founder · NioCat Nails" },
  },
  {
    quote: {
      es: "Desde que tenemos la página llegan más pacientes que agendan solos. Profesional, claro y siempre disponible para dudas.",
      en: "Since we launched the site, more patients arrive and book on their own. Professional, clear and always available for questions.",
    },
    author: "Miguel Castañeda",
    role: { es: "Cliente · Mi Urólogo Torreón", en: "Client · Mi Urólogo Torreón" },
  },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/evan-morales/" },
  { label: "GitHub", href: "https://github.com/EvanDavidMS" },
  { label: "Instagram", href: "https://www.instagram.com/evn.me_/" },
] as const;

export const contactEmail = "evandavidms@gmail.com";
