"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

/** A value that has both language variants. Use `pick(value, lang)` to resolve. */
export type Loc = { es: string; en: string };

export function pick(value: Loc, lang: Lang): string {
  return value[lang];
}

/**
 * Every user-visible UI string, keyed by section. Content that lives in
 * `data.ts` (projects / testimonials) is localized there with `Loc` objects.
 */
export const dict = {
  es: {
    nav: {
      items: {
        top: "Inicio",
        about: "Sobre mí",
        skills: "Skills",
        projects: "Proyectos",
        contact: "Contacto",
      },
      role: "Full-Stack Dev",
      available: "Disponible para proyectos",
      cta: "Contactar",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      navigation: "Navegación",
      availableShort: "Disponible",
      themeLabel: "Cambiar tema",
      langLabel: "Cambiar idioma",
    },
    hero: {
      badge: "Disponible para nuevos proyectos",
      intro: "Hola, soy Evan Morales — Desarrollador",
      flip: ["Frontend", "Full-Stack", "de producto", "de interfaces"],
      headingSegments: [
        { text: "Construyo interfaces" },
        { text: "limpias", accent: true },
        { text: "y experiencias que" },
        { text: "se sienten bien.", accent: true },
      ],
      subtitle:
        "Diseño y desarrollo productos digitales de principio a fin: rápidos, accesibles y cuidados hasta el último pixel.",
      talk: "Hablemos →",
      cv: "Descargar CV",
    },
    about: {
      eyebrow: "01 — Sobre mí",
      meta: "Evan Morales — Frontend / Full-Stack Developer · Torreón, Coahuila · Remoto en todo México",
      think1: "Pienso en",
      detailsWord: "detalles",
      think2: ", construyo para",
      scaleWord: "escala",
      bio: "Más de 3 años creando productos web modernos. Diseño con intención, escribo código tipado y limpio, y persigo el performance en cada detalle — del pixel al deploy.",
      stats: [
        { value: "10+", label: "Proyectos" },
        { value: "5", label: "Apps live" },
        { value: "3+", label: "Años exp." },
        { value: "100%", label: "Entregados" },
      ],
      dogCaption: "Y este es mi perrito llamado Nash",
    },
    skills: {
      eyebrow: "02 — Skills & Stack",
      heading1: "Herramientas con las que desarrollo en",
      productionWord: "producción",
      features: {
        techName: "Tecnologías",
        techDesc: "Todo el stack con el que construyo — de la UI al deploy.",
        techCta: "Ver proyectos",
        availName: "Disponible",
        availDesc: "Para nuevos proyectos · Torreón, Coahuila / remoto en todo México.",
        availCta: "Escríbeme",
        online: "En línea",
        devxName: "DevX",
        devxDesc: "CI/CD, testing y control de versiones.",
        devxCta: "Ver proyectos",
      },
      philosophyLabel: "Filosofía",
      philo1: "Del primer trazo al",
      deployWord: "deploy",
      philo2: ": construyo productos completos, cuidados",
      lastPixelWord: "hasta el último pixel",
    },
    projects: {
      eyebrow: "03 — Proyectos destacados",
      all: "Todos",
      viewCase: "Ver caso →",
      viewCaseAria: "Ver caso de estudio:",
    },
    testimonials: {
      eyebrow: "04 — Testimonios",
      headingPre: "Lo que dicen quienes ya",
      trustedWord: "confiaron",
      headingPost: ".",
    },
    contact: {
      eyebrow: "05 — Contacto",
      headingPre: "Trabajemos",
      togetherWord: "juntos.",
      paragraph: "¿Tienes una idea o un producto en mente? Escríbeme y lo construimos.",
      talk: "Hablemos →",
      cv: "Descargar CV",
      mailSubject: "Hola Evan 👋",
    },
    footer: {
      links: {
        about: "Sobre mí",
        skills: "Skills",
        projects: "Proyectos",
        contact: "Contacto",
      },
      rights: "© 2026 Evan Morales",
    },
    modal: {
      challenge: "El reto",
      work: "Qué hice",
      result: "Resultado",
      stack: "Stack",
      viewLive: "Ver en vivo",
      close: "Cerrar",
    },
    backToTop: "Volver arriba",
  },
  en: {
    nav: {
      items: {
        top: "Home",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",
      },
      role: "Full-Stack Dev",
      available: "Available for projects",
      cta: "Get in touch",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      navigation: "Navigation",
      availableShort: "Available",
      themeLabel: "Toggle theme",
      langLabel: "Switch language",
    },
    hero: {
      badge: "Available for new projects",
      intro: "Hi, I'm Evan Morales — Developer",
      flip: ["Frontend", "Full-Stack", "product", "interface"],
      headingSegments: [
        { text: "I build" },
        { text: "clean", accent: true },
        { text: "interfaces and experiences that" },
        { text: "feel right.", accent: true },
      ],
      subtitle:
        "I design and develop digital products end to end: fast, accessible and crafted down to the last pixel.",
      talk: "Let's talk →",
      cv: "Download CV",
    },
    about: {
      eyebrow: "01 — About",
      meta: "Evan Morales — Frontend / Full-Stack Developer · Torreón, Coahuila · Remote across Mexico",
      think1: "I think in",
      detailsWord: "details",
      think2: ", I build for",
      scaleWord: "scale",
      bio: "3+ years building modern web products. I design with intent, write clean typed code, and chase performance in every detail — from the pixel to the deploy.",
      stats: [
        { value: "10+", label: "Projects" },
        { value: "5", label: "Live apps" },
        { value: "3+", label: "Years exp." },
        { value: "100%", label: "Delivered" },
      ],
      dogCaption: "And this is my dog, Nash",
    },
    skills: {
      eyebrow: "02 — Skills & Stack",
      heading1: "Tools I build with in",
      productionWord: "production",
      features: {
        techName: "Technologies",
        techDesc: "The full stack I build with — from UI to deploy.",
        techCta: "View projects",
        availName: "Available",
        availDesc: "For new projects · Torreón, Coahuila / remote across Mexico.",
        availCta: "Message me",
        online: "Online",
        devxName: "DevX",
        devxDesc: "CI/CD, testing and version control.",
        devxCta: "View projects",
      },
      philosophyLabel: "Philosophy",
      philo1: "From the first stroke to the",
      deployWord: "deploy",
      philo2: ": I build complete products, cared for",
      lastPixelWord: "down to the last pixel",
    },
    projects: {
      eyebrow: "03 — Featured projects",
      all: "All",
      viewCase: "View case →",
      viewCaseAria: "View case study:",
    },
    testimonials: {
      eyebrow: "04 — Testimonials",
      headingPre: "What the people who already",
      trustedWord: "trusted me",
      headingPost: " say.",
    },
    contact: {
      eyebrow: "05 — Contact",
      headingPre: "Let's work",
      togetherWord: "together.",
      paragraph: "Have an idea or a product in mind? Write to me and we'll build it.",
      talk: "Let's talk →",
      cv: "Download CV",
      mailSubject: "Hi Evan 👋",
    },
    footer: {
      links: {
        about: "About",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",
      },
      rights: "© 2026 Evan Morales",
    },
    modal: {
      challenge: "The challenge",
      work: "What I did",
      result: "Results",
      stack: "Stack",
      viewLive: "View live",
      close: "Close",
    },
    backToTop: "Back to top",
  },
} as const;

export type Dict = (typeof dict)[Lang];

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Dict;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  // Always start on "es" so server and first client render match (no hydration
  // mismatch). The stored preference is read after mount.
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    // Read the stored preference after hydration. Starting from "es" on both
    // server and first client render keeps the markup identical (no hydration
    // mismatch); this reconciles to the saved language once mounted.
    try {
      const stored = localStorage.getItem("lang");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "en" || stored === "es") setLangState(stored);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  const toggle = () => setLang(lang === "es" ? "en" : "es");

  return (
    <I18nContext.Provider value={{ lang, setLang, toggle, t: dict[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
