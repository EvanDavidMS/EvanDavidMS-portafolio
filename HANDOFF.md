# Handoff — Portafolio Evan Morales

Portafolio personal de Evan Morales (Frontend / Full-Stack Developer), construido en Next.js + Tailwind a partir de un diseño importado de Claude Design.

**Repo:** https://github.com/EvanDavidMS/EvanDavidMS-portafolio

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4**
- **shadcn/ui** — componentes Tailwind + Radix (`Button`, `Badge`, `Card`, `Separator`, `Tooltip`, `Accordion`). No se usa MUI: se decidió explícitamente no mezclar dos sistemas de estilos distintos (ver sección de decisiones).
- **@icons-pack/react-simple-icons** — iconos de marca reales (React, Next.js, TypeScript, Node.js, etc.) para la sección de Skills.
- Fuentes: **Poppins** (texto general) + **Playfair Display italic** (acentos editoriales), vía `next/font/google`.

## Origen del diseño

El diseño visual fue importado desde un proyecto de Claude Design (`claude.ai/design`, proyecto "Portafolio Evan Morales", archivo `Portfolio Evan Morales.dc.html`) usando la herramienta `DesignSync`. Ese archivo `.dc.html` es un formato propietario de Claude Design (HTML + bindings `{{ }}` + un bloque de lógica de componente); se tradujo a mano a componentes React/Tailwind reales, no se copió el HTML literal.

## Estructura del proyecto

```
src/
  app/
    layout.tsx        — fonts, metadata, TooltipProvider global
    globals.css        — theme tokens (paleta oscura), keyframes custom, tw-animate-css
    page.tsx            — compone todas las secciones
  components/
    ConstellationBackground.tsx  — canvas de partículas + glows ambientales (client)
    Navbar.tsx           — nav flotante, scroll progress, Tooltip de disponibilidad (client)
    Hero.tsx
    About.tsx            — split editorial: retrato + statement/bio + stats en línea
    Skills.tsx           — tiles con iconos de marca reales, agrupados por Frontend/Backend/DevX, con GlowingEffect
    GlowingEffect.tsx    — borde con glow que sigue el cursor (client), reutilizable
    Projects.tsx         — grid de proyectos reales (scrapeados de niocat.com/proyectos), efecto "Focus Cards" (client)
    Contact.tsx
    Footer.tsx
    BackToTop.tsx        — client
    Reveal.tsx           — wrapper de scroll-reveal (IntersectionObserver + tw-animate-css)
    ui/                  — componentes shadcn (button, badge, card, separator, tooltip, accordion)
  hooks/
    useScrollState.ts    — progreso de scroll, sección activa, visibilidad de BackToTop
  lib/
    data.ts              — navItems, skillGroups (icono + color de marca por tech), projects, socials
    utils.ts             — cn() (clsx + tailwind-merge)
public/
  projects/              — screenshots reales de los 11 proyectos (descargados de niocat.com)
```

## Contenido de "Proyectos"

Los 11 proyectos, categorías, stack técnico, imágenes y links "Visita la página" se obtuvieron scrapeando `https://niocat.com/proyectos` y cada página de detalle (botón "Ver sitio en vivo"). Las imágenes están guardadas localmente en `public/projects/` (no hotlink a niocat.com). Todo vive en `src/lib/data.ts` — para agregar/editar un proyecto solo hay que tocar ese array.

## Decisiones de diseño relevantes

- **Solo shadcn/ui, no MUI**: se preguntó explícitamente al usuario; shadcn/ui usa Tailwind + Radix (mismo sistema que ya tenía el proyecto) sin runtime de CSS-in-JS extra, mientras que MUI hubiera requerido Emotion y un theming paralelo. Se mantiene un solo sistema de estilos.
- **Tokens de shadcn re-mapeados** a la paleta exacta del diseño (`--background:#0A0A0A`, `--foreground:#F5F5F5`, `--border: rgba(255,255,255,.08)`, `--muted-foreground:#8A8A8A`, etc.) en `globals.css`, en vez de dejar los valores oklch por defecto — así cualquier componente shadcn nuevo hereda el look del sitio automáticamente.
- **"Sobre mí" se rediseñó por completo** (versión anterior: bio card + accordion "cómo trabajo" + code window + stats en cards + ilustraciones de globo/laptop). El usuario sintió que se veía "muy apilado" y que las ilustraciones no aportaban, así que se reemplazó por un split editorial simple: retrato grande (con marco offset detrás, puro CSS) a un lado, statement tipográfico grande + bio + stats en línea (separadas por `Separator` vertical, sin cards) al otro — mismo tono minimalista que el Hero. El contenido de "cómo trabajo" se integró como una frase dentro de la bio en vez de una lista/acordeón aparte.
- **Animaciones de scroll ("Sobre mí")**: `Reveal.tsx` sigue en uso — wrapper cliente que usa `IntersectionObserver` + las utilidades `animate-in fade-in slide-in-from-bottom-* fill-mode-forwards` de `tw-animate-css` (la librería de animación que trae shadcn) para que el retrato y el bloque de texto aparezcan con fade + slide al entrar en viewport. Ojo con el patrón: `fade-in` anima hacia la opacidad base del elemento, así que el estado "oculto" y el "animado" deben ser clases mutuamente excluyentes (no dejar `opacity-0` puesto a la vez que `animate-in`), si no la animación termina en opacidad 0.
- `Accordion` y `Card` (de shadcn) quedaron generados en `components/ui/` pero sin uso actual — se dejaron ahí por si se reutilizan en otra sección; no se importan en ningún componente ahora mismo.
- **Skills se rediseñó con iconos reales**: la lista plana de `techs` (strings) se reemplazó por `skillGroups` en `data.ts` — cada tecnología ahora tiene un componente de ícono de marca (`@icons-pack/react-simple-icons`) y una clase Tailwind literal `hoverText` (ej. `"group-hover:text-[#61DAFB]"`) para revelar el color de marca real al pasar el mouse. Los iconos se ven en gris neutro por defecto (consistente con el resto del sitio monocromático) y solo muestran su color al hacer hover — truco: el ícono recibe `color="currentColor"` y el color real se controla vía la clase `text-*` de Tailwind en el propio `<svg>`, así que el hover es 100% CSS, sin JS. Las tecnologías ahora están agrupadas por Frontend / Backend / DevX en vez de una lista plana + un bloque de texto redundante aparte.
  - Importante: las clases `group-hover:text-[#HEX]` deben escribirse como **string literal completo** en el código fuente (no construidas dinámicamente con template strings en runtime), porque Tailwind v4 escanea el texto de los archivos buscando nombres de clase completos — si se arma la clase con `` `group-hover:text-[${color}]` `` en runtime, Tailwind nunca la genera.
- Todo el sitio es **dark-only** (no hay toggle de tema); los tokens `:root` y `.dark` están sincronizados a propósito por si en el futuro se agrega un toggle.
- **Aceternity UI — evaluado, dos componentes implementados**: se revisaron los 117 componentes de https://ui.aceternity.com/components y se armó una shortlist de cuáles calzan con el tono editorial/monocromático del sitio vs. cuáles chocarían (ej. 3D Globe, Vortex/Wavy/Aurora backgrounds compiten con el `ConstellationBackground` propio; ASCII/glitch text no calzan con el tono). Ninguno es un paquete npm — son patrones que se adaptaron a mano (igual que con shadcn) sobre nuestros componentes reales:
  - **Focus Cards** en Proyectos: `Projects.tsx` es client component con `useState<number | null>` para el índice hovereado — al pasar el mouse sobre una card, las demás bajan a `opacity-40 blur-[2px] scale-[0.98]` mientras la activa se eleva (`-translate-y-1`, borde más claro).
  - **Glowing Effect** en Skills: `GlowingEffect.tsx` es un componente client reutilizable — se renderiza como hijo de cualquier contenedor con clases `relative group`, y en un `useEffect` engancha su propio listener `mousemove` al `parentElement` (sin necesitar props de coordinación) para mover un radial-gradient vía custom properties CSS (`--x`/`--y`). El "anillo" de brillo se logra con el truco de `mask-composite: exclude` sobre dos capas de máscara (`content-box` vs `border-box` con `padding: 1px`), y aparece/desaparece con `group-hover:opacity-100` (sin JS para el fade). Ya está en cada tile de tecnología en Skills; queda disponible para reusar en Proyectos u otras cards si se quiere.
  - Pendientes de esa shortlist, no implementados aún: **Card Spotlight / Glare Card** (barrido de brillo en hover de Proyectos), **Moving Border / Hover Border Gradient** (para los botones CTA "Hablemos →" / "Contactar"), **Text Generate Effect** (animación de entrada para el heading del Hero), **Infinite Moving Cards** (marquee opcional de logos, en Footer o entre secciones).

## Pendientes / ideas para continuar

1. El botón "Descargar CV" en Hero/Contact no tiene archivo real enlazado (`href="#"`).
2. El mailto de Contact usa `hola@evanmorales.dev` (placeholder) — confirmar email real.
3. Los links de redes sociales (LinkedIn, GitHub, X/Twitter, Dribbble) apuntan a `href="#"` — falta poner las URLs reales.
4. No hay analítica ni formulario de contacto real (todo es `mailto:` / links externos).
5. Se podría extender `Reveal` al resto de secciones (Projects/Contact) si se quiere más consistencia de animación en todo el sitio.
6. Resto de la shortlist de Aceternity (ver arriba) — implementar si se quiere seguir sumando micro-interacciones premium.

## Comandos

```bash
npm run dev      # desarrollo (Turbopack)
npm run build    # build de producción
npm run lint     # eslint
npx tsc --noEmit # type-check
```
