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
    title: "Restaurant NioCat",
    category: "SaaS",
    desc: {
      es: "Sistema operativo y administrativo integral (SaaS) diseñado para optimizar restaurantes.",
      en: "All-in-one operating and admin system (SaaS) built to streamline restaurants.",
    },
    image: "/projects/niocat-restaurante.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Supabase", "Framer Motion"],
    href: "https://niocat-restaurante.vercel.app/",
    study: {
      challenge: {
        es: "El restaurante llevaba pedidos, mesas e inventario en papel y hojas de cálculo dispersas: errores frecuentes, doble captura y cero visibilidad de las ventas en tiempo real.",
        en: "The restaurant managed orders, tables and inventory on paper and scattered spreadsheets: frequent mistakes, double data entry and zero real-time visibility into sales.",
      },
      work: [
        {
          es: "Diseñé y construí el SaaS completo, del frontend al backend, con Next.js y Supabase.",
          en: "Designed and built the full SaaS, front to back, with Next.js and Supabase.",
        },
        {
          es: "Módulos de pedidos, control de mesas, inventario y reportes en tiempo real.",
          en: "Modules for orders, table management, inventory and real-time reporting.",
        },
        {
          es: "Accesos por rol (mesero, cocina, administración) con actualizaciones en vivo.",
          en: "Role-based access (waiter, kitchen, admin) with live updates.",
        },
      ],
      results: [
        {
          es: "Operación 100% digital, sin papel ni doble captura.",
          en: "100% digital operation, no paper or double entry.",
        },
        {
          es: "Reportes de ventas e inventario al instante.",
          en: "Instant sales and inventory reports.",
        },
        {
          es: "Menos errores en la toma de pedidos.",
          en: "Fewer errors when taking orders.",
        },
      ],
      testimonial: {
        quote: {
          es: "Pasamos del cuaderno a un sistema que controla todo el restaurante desde el celular. Evan entendió cómo trabajamos y lo dejó funcionando sin complicaciones.",
          en: "We went from a notebook to a system that runs the whole restaurant from a phone. Evan understood how we work and got it running with zero hassle.",
        },
        author: "Ricardo Salazar",
        role: {
          es: "Gerente · Restaurant NioCat",
          en: "Manager · Restaurant NioCat",
        },
      },
    },
  },
  {
    title: "Fundación Renciende",
    category: "Web Platform",
    desc: {
      es: "Plataforma integral de recaudación de fondos y gestión transparente de beneficiarios.",
      en: "End-to-end fundraising platform with transparent beneficiary management.",
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
          es: "Donaciones en línea automatizadas de punta a punta.",
          en: "Fully automated online donations, end to end.",
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
        author: "Mariana Fuentes",
        role: {
          es: "Directora · Fundación Renciende",
          en: "Director · Fundación Renciende",
        },
      },
    },
  },
  {
    title: "Barber Premium",
    category: "SaaS",
    desc: {
      es: "Sistema avanzado de gestión y automatización diseñado para barberías exclusivas.",
      en: "Advanced management and automation system built for premium barbershops.",
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
          es: "Automaticé confirmaciones y el flujo de citas por barbero.",
          en: "Automated confirmations and the per-barber appointment flow.",
        },
        {
          es: "Interfaz premium alineada a la marca del negocio.",
          en: "Premium interface aligned with the shop's brand.",
        },
      ],
      results: [
        {
          es: "Reservas centralizadas en un solo lugar.",
          en: "Bookings centralized in one place.",
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
        author: "Diego Herrera",
        role: {
          es: "Dueño · Barber Premium",
          en: "Owner · Barber Premium",
        },
      },
    },
  },
  {
    title: "NioOS Terminal",
    category: "Web OS",
    desc: {
      es: "Simulador avanzado de entorno de escritorio interactivo ejecutado nativamente sobre el navegador web.",
      en: "Advanced interactive desktop-environment simulator running natively in the browser.",
    },
    image: "/projects/nioOSweb.jpeg",
    tech: ["Next.js", "React", "TypeScript", "Framer Motion"],
    href: "https://nioos.vercel.app/",
  },
  {
    title: "NioCat Web Engine",
    category: "Corporate",
    desc: {
      es: "Estructura digital de la agencia enfocada en la presentación de servicios de software premium.",
      en: "The agency's digital home, focused on presenting premium software services.",
    },
    image: "/projects/niocatweb.jpeg",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://niocatweb.vercel.app/",
  },
  {
    title: "David Morales Portfolio",
    category: "Creative Portfolio",
    desc: {
      es: "Portafolio de diseño interactivo de alta gama basado en una estética oscura premium.",
      en: "High-end interactive design portfolio built around a premium dark aesthetic.",
    },
    image: "/projects/blackmeatweb.jpeg",
    tech: ["Next.js", "React", "Tailwind CSS"],
    href: "https://david-morales-black-meat.vercel.app/",
  },
  {
    title: "Fer Portfolio",
    category: "Creative Portfolio",
    desc: {
      es: "Espacio digital interactivo diseñado a medida para exhibir proyectos creativos.",
      en: "A bespoke interactive digital space to showcase creative projects.",
    },
    image: "/projects/fernandaportafolioweb.jpeg",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    href: "https://fersita-portafolio.vercel.app/",
  },
  {
    title: "Mi Urólogo Torreón",
    category: "Medical Landing Page",
    desc: {
      es: "Plataforma web médica enfocada en la conversión de pacientes y agendamiento de citas.",
      en: "Medical web platform focused on patient conversion and appointment booking.",
    },
    image: "/projects/miurologotorreon.jpeg",
    tech: ["Next.js", "Tailwind CSS", "React"],
    href: "https://miurologotorreon.com/",
  },
  {
    title: "NioCat Nails & Aesthetics",
    category: "Landing Page",
    desc: {
      es: "Sitio web corporativo y catálogo digital premium para un salón de manicura y estética.",
      en: "Corporate website and premium digital catalog for a nail and aesthetics salon.",
    },
    image: "/projects/niocat-unas.jpeg",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    href: "https://niocat-unas.vercel.app/",
  },
  {
    title: "Moto Service Laguna",
    category: "Landing Page",
    desc: {
      es: "Sitio web corporativo para un centro especializado en mantenimiento de motocicletas.",
      en: "Corporate website for a specialized motorcycle-maintenance center.",
    },
    image: "/projects/motoservicelaguna.jpeg",
    tech: ["Next.js", "Tailwind CSS", "React"],
    href: "https://motoservicelaguna.com/",
  },
  {
    title: "Barbería Demian",
    category: "SaaS",
    desc: {
      es: "Aplicación web premium para la gestión automatizada de citas y control de agenda.",
      en: "Premium web app for automated appointment management and schedule control.",
    },
    image: "/projects/barberdemianweb.jpeg",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Supabase"],
    href: "https://barberia-demian.vercel.app/",
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
    author: "Ricardo Salazar",
    role: { es: "Gerente · Restaurant NioCat", en: "Manager · Restaurant NioCat" },
  },
  {
    quote: {
      es: "Ahora recibimos donativos en línea y cada persona ve a dónde va su aporte. Nos dio una imagen mucho más profesional y confiable.",
      en: "We now receive donations online and each person sees where their contribution goes. It gave us a far more professional, trustworthy image.",
    },
    author: "Mariana Fuentes",
    role: { es: "Directora · Fundación Renciende", en: "Director · Fundación Renciende" },
  },
  {
    quote: {
      es: "Dejamos de perder citas por el desorden del WhatsApp. Los clientes reservan solos y la agenda siempre está clara. Trabajo impecable.",
      en: "We stopped losing appointments to the WhatsApp mess. Clients book on their own and the schedule is always clear. Impeccable work.",
    },
    author: "Diego Herrera",
    role: { es: "Dueño · Barber Premium", en: "Owner · Barber Premium" },
  },
  {
    quote: {
      es: "El sitio nos dio presencia seria en la Laguna. Cumplió tiempos, propuso ideas y siempre estuvo al pendiente de cada detalle.",
      en: "The site gave us a serious presence in the region. He met deadlines, proposed ideas and stayed on top of every detail.",
    },
    author: "Gerardo Ramírez",
    role: { es: "Gerente · Moto Service Laguna", en: "Manager · Moto Service Laguna" },
  },
  {
    quote: {
      es: "Quedó justo como lo imaginaba: elegante y fácil de usar. Mis clientas me dicen que la página se ve preciosa. Súper recomendado.",
      en: "It turned out exactly as I imagined: elegant and easy to use. My clients tell me the site looks gorgeous. Highly recommended.",
    },
    author: "Alejandra Ríos",
    role: { es: "Fundadora · NioCat Nails", en: "Founder · NioCat Nails" },
  },
  {
    quote: {
      es: "Desde que tenemos la página llegan más pacientes que agendan solos. Profesional, claro y siempre disponible para dudas.",
      en: "Since we launched the site, more patients arrive and book on their own. Professional, clear and always available for questions.",
    },
    author: "Dr. Fernando Castro",
    role: { es: "Cliente · Mi Urólogo Torreón", en: "Client · Mi Urólogo Torreón" },
  },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/evan-morales/" },
  { label: "GitHub", href: "https://github.com/EvanDavidMS" },
  { label: "Instagram", href: "https://www.instagram.com/evn.me_/" },
] as const;

export const contactEmail = "evandavidms@gmail.com";
