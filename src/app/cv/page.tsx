"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Printer } from "lucide-react";

/**
 * Print-optimized CV. Two pages (Spanish then English), one language per A4
 * page. Standalone light design (ignores the site's dark theme) so it prints
 * clean and reads well in ATS. Open /cv and use "Guardar como PDF".
 *
 * ✎ Editá el contenido en los objetos `es` / `en` de abajo.
 */

const contact = {
  name: "Evan David Morales Serrano",
  location: "Torreón, Coahuila, México · Remoto en todo México",
  phone: "+52 871 645 8362",
  email: "evandavidms@gmail.com",
  web: "evnbox.com",
  github: "github.com/EvanDavidMS",
  linkedin: "linkedin.com/in/evan-morales",
  credly: "credly.com/users/evan-david-morales-serrano",
};

const skillsGroups = (labels: [string, string, string]) => [
  {
    label: labels[0],
    items: "React · Next.js · TypeScript · Tailwind CSS · Framer Motion",
  },
  {
    label: labels[1],
    items: "Supabase · Node.js · PostgreSQL · GraphQL · APIs (PayPal, Resend)",
  },
  {
    label: labels[2],
    items: "Git · GitHub · Vercel · AWS (Cloud Foundations/Operations) · Figma",
  },
];

const certs = [
  "AWS Academy Graduate — Cloud Foundations & Cloud Operations (AWS)",
  "Web Development Fundamentals (IBM SkillsBuild)",
  "Python Essentials 1 · Introduction to Data Science (Cisco)",
  "Desarrollo Full Stack · Fundamentos de DevOps (Tecmilenio)",
];

const es = {
  role: "Desarrollador Full-Stack — Next.js & Supabase",
  labels: {
    profile: "Perfil",
    skills: "Habilidades técnicas",
    projects: "Proyectos destacados",
    achievements: "Logros",
    education: "Educación",
    certs: "Certificaciones",
    languages: "Idiomas",
  },
  summary:
    "Desarrollador Full-Stack enfocado en Next.js y Supabase. Construyo productos web reales —SaaS, plataformas con pagos y landing pages— cuidados de la interfaz al despliegue. En formación como Ingeniero en Desarrollo de Software y 1.er lugar en Interhalcones 2023 (Tecmilenio) resolviendo un reto real de empresa. Certificado por AWS, IBM y Cisco.",
  skills: skillsGroups(["Frontend", "Backend y Datos", "Herramientas y Cloud"]),
  projects: [
    {
      title: "Restaurant NioCat",
      desc: "SaaS integral para restaurantes: pedidos, mesas, inventario y reportes en tiempo real.",
      tech: "Next.js · React · Supabase",
    },
    {
      title: "Fundación Renciende",
      desc: "Plataforma de recaudación con pagos en línea (PayPal) y gestión de beneficiarios.",
      tech: "Next.js · Supabase · PayPal API · Resend",
    },
    {
      title: "Barber Premium",
      desc: "SaaS de reservas y automatización de agenda para barberías.",
      tech: "Next.js · Supabase",
    },
    {
      title: "NioOS Terminal",
      desc: "Simulador de entorno de escritorio interactivo ejecutado en el navegador.",
      tech: "Next.js · TypeScript · Framer Motion",
    },
  ],
  achievements: [
    "1.er lugar — Interhalcones 2023, Universidad Tecmilenio. Competencia inter-campus para resolver una problemática real de una empresa, superando a equipos de distintas áreas.",
  ],
  education: [
    {
      title: "Ingeniería en Desarrollo de Software",
      place: "Universidad Tecmilenio — Torreón, Coahuila",
      note: "En curso",
    },
  ],
  certsNote: "+18 insignias verificables en Credly",
  languages: [
    "Español — Nativo",
    "Inglés — B1 (certificado), en fortalecimiento",
  ],
};

const en = {
  role: "Full-Stack Developer — Next.js & Supabase",
  labels: {
    profile: "Profile",
    skills: "Technical skills",
    projects: "Featured projects",
    achievements: "Achievements",
    education: "Education",
    certs: "Certifications",
    languages: "Languages",
  },
  summary:
    "Full-Stack Developer focused on Next.js and Supabase. I build real web products —SaaS, payment platforms and landing pages— crafted from UI to deployment. Software Engineering student and 1st place at Interhalcones 2023 (Tecmilenio), solving a real company challenge. Certified by AWS, IBM and Cisco.",
  skills: skillsGroups(["Frontend", "Backend & Data", "Tools & Cloud"]),
  projects: [
    {
      title: "Restaurant NioCat",
      desc: "All-in-one SaaS for restaurants: orders, tables, inventory and real-time reports.",
      tech: "Next.js · React · Supabase",
    },
    {
      title: "Fundación Renciende",
      desc: "Fundraising platform with online payments (PayPal) and beneficiary management.",
      tech: "Next.js · Supabase · PayPal API · Resend",
    },
    {
      title: "Barber Premium",
      desc: "Booking and scheduling-automation SaaS for barbershops.",
      tech: "Next.js · Supabase",
    },
    {
      title: "NioOS Terminal",
      desc: "Interactive desktop-environment simulator running in the browser.",
      tech: "Next.js · TypeScript · Framer Motion",
    },
  ],
  achievements: [
    "1st place — Interhalcones 2023, Universidad Tecmilenio. Inter-campus competition to solve a real company problem, beating teams from different fields.",
  ],
  education: [
    {
      title: "B.Eng. in Software Engineering",
      place: "Universidad Tecmilenio — Torreón, Coahuila",
      note: "In progress",
    },
  ],
  certsNote: "+18 verifiable badges on Credly",
  languages: ["Spanish — Native", "English — B1 (certified), improving"],
};

type CV = typeof es;

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 border-b border-neutral-200 pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-900">
      {children}
    </h2>
  );
}

function CVPage({ data, lang }: { data: CV; lang: "es" | "en" }) {
  return (
    <article className="cv-page mx-auto flex w-[210mm] max-w-full flex-col gap-5 bg-white px-[16mm] py-[14mm] text-neutral-800">
      {/* header */}
      <header className="border-b-2 border-neutral-900 pb-4">
        <h1 className="text-[26px] font-extrabold leading-none tracking-[-0.02em] text-neutral-900">
          {contact.name}
        </h1>
        <p className="mt-1.5 text-[13.5px] font-medium text-neutral-600">
          {data.role}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-neutral-600">
          <span>{contact.location}</span>
          <span className="text-neutral-300">|</span>
          <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
          <span className="text-neutral-300">|</span>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <span className="text-neutral-300">|</span>
          <a href={`https://${contact.web}`}>{contact.web}</a>
          <span className="text-neutral-300">|</span>
          <a href={`https://${contact.github}`}>{contact.github}</a>
          <span className="text-neutral-300">|</span>
          <a href={`https://${contact.linkedin}`}>{contact.linkedin}</a>
        </div>
      </header>

      {/* profile */}
      <section>
        <Heading>{data.labels.profile}</Heading>
        <p className="text-[12.5px] leading-[1.55] text-neutral-700">
          {data.summary}
        </p>
      </section>

      {/* skills */}
      <section>
        <Heading>{data.labels.skills}</Heading>
        <ul className="flex flex-col gap-1">
          {data.skills.map((g) => (
            <li key={g.label} className="text-[12px] text-neutral-700">
              <span className="font-semibold text-neutral-900">{g.label}: </span>
              {g.items}
            </li>
          ))}
        </ul>
      </section>

      {/* projects */}
      <section>
        <Heading>{data.labels.projects}</Heading>
        <ul className="flex flex-col gap-2">
          {data.projects.map((p) => (
            <li key={p.title}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[12.5px] font-bold text-neutral-900">
                  {p.title}
                </span>
                <span className="shrink-0 text-[10.5px] text-neutral-500">
                  {p.tech}
                </span>
              </div>
              <p className="text-[12px] leading-[1.45] text-neutral-700">
                {p.desc}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* achievements */}
      <section>
        <Heading>{data.labels.achievements}</Heading>
        <ul className="flex flex-col gap-1">
          {data.achievements.map((a, i) => (
            <li
              key={i}
              className="flex gap-2 text-[12px] leading-[1.5] text-neutral-700"
            >
              <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-neutral-900" />
              {a}
            </li>
          ))}
        </ul>
      </section>

      {/* education */}
      <section>
        <Heading>{data.labels.education}</Heading>
        {data.education.map((e) => (
          <div key={e.title} className="flex items-baseline justify-between gap-3">
            <div>
              <span className="text-[12.5px] font-bold text-neutral-900">
                {e.title}
              </span>
              <span className="text-[12px] text-neutral-700"> — {e.place}</span>
            </div>
            <span className="shrink-0 text-[11px] italic text-neutral-500">
              {e.note}
            </span>
          </div>
        ))}
      </section>

      {/* certifications */}
      <section>
        <Heading>{data.labels.certs}</Heading>
        <ul className="flex flex-col gap-0.5">
          {certs.map((c, i) => (
            <li
              key={i}
              className="flex gap-2 text-[12px] leading-[1.45] text-neutral-700"
            >
              <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-1 text-[11px] text-neutral-500">
          {data.certsNote} —{" "}
          <a href={`https://${contact.credly}`} className="underline">
            {contact.credly}
          </a>
        </p>
      </section>

      {/* languages */}
      <section>
        <Heading>{data.labels.languages}</Heading>
        <p className="text-[12px] text-neutral-700">
          {data.languages.join("   ·   ")}
        </p>
      </section>

      <p className="mt-auto pt-2 text-center text-[9px] uppercase tracking-[0.2em] text-neutral-300">
        {lang === "es"
          ? "Continúa en inglés →"
          : "Evan David Morales Serrano"}
      </p>
    </article>
  );
}

export default function CVRoute() {
  useEffect(() => {
    const prev = document.title;
    document.title = "CV — Evan David Morales Serrano";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 py-8 [font-family:var(--font-poppins),sans-serif]">
      <style>{`
        /* links read as normal CV text (no default blue/underline) */
        .cv-page a { color: inherit; text-decoration: none; }
        .cv-page a.underline, .cv-page a:hover { text-decoration: underline; }
        @media print {
          @page { size: A4; margin: 0; }
          html, body { background: #fff !important; }
          .no-print { display: none !important; }
          .cv-page { page-break-after: always; box-shadow: none !important; margin: 0 !important; }
          .cv-page:last-child { page-break-after: auto; }
        }
      `}</style>

      <div className="no-print mx-auto mb-6 flex w-[210mm] max-w-full items-center justify-between px-4">
        <Link
          href="/"
          className="text-[13px] font-medium text-neutral-500 hover:text-neutral-900"
        >
          ← Volver al portafolio
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          <Printer size={15} />
          Guardar como PDF
        </button>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="w-[210mm] max-w-full shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
          <CVPage data={es} lang="es" />
        </div>
        <div className="w-[210mm] max-w-full shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
          <CVPage data={en} lang="en" />
        </div>
      </div>
    </div>
  );
}
