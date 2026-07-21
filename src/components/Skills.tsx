import { Layers, GitBranch, Zap, Compass } from "lucide-react";

import { skillGroups, type SkillItem } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/Reveal";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Highlighter } from "@/components/magicui/highlighter";
import { cn } from "@/lib/utils";

const devx = skillGroups.find((g) => g.title === "DevX")?.items ?? [];
const allSkills = skillGroups.flatMap((g) => g.items);
// interleave into 3 rows so each marquee row shows a different mix
const techRows = [0, 1, 2].map((r) => allSkills.filter((_, i) => i % 3 === r));

// shared "chrome" so the custom philosophy card matches the BentoCard surface
const cardChrome =
  "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-background dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]";

function SkillChip({ item }: { item: SkillItem }) {
  const Icon = item.icon;
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-[rgb(var(--tint)/0.08)] bg-[rgb(var(--tint)/0.05)] px-3.5 py-2.5">
      <Icon size={16} className={cn("shrink-0 text-[var(--c-muted)]", item.hoverText)} />
      <span className="whitespace-nowrap text-[13px] font-medium text-[var(--c-fg-2)]">
        {item.name}
      </span>
    </div>
  );
}

const features = [
  {
    Icon: Layers,
    name: "Tecnologías",
    description: "Todo el stack con el que construyo — de la UI al deploy.",
    href: "#projects",
    cta: "Ver proyectos",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-x-0 top-5 flex flex-col gap-2.5 [mask-image:linear-gradient(to_top,transparent_20%,#000_48%)]">
        {techRows.map((row, r) => (
          <Marquee
            key={r}
            pauseOnHover
            reverse={r % 2 === 1}
            className={cn(
              "py-0",
              r === 0 && "[--duration:30s]",
              r === 1 && "[--duration:24s]",
              r === 2 && "[--duration:34s]"
            )}
          >
            {row.map((item, i) => (
              <SkillChip key={`${item.name}-${i}`} item={item} />
            ))}
          </Marquee>
        ))}
      </div>
    ),
  },
  {
    Icon: Zap,
    name: "Disponible",
    description: "Para nuevos proyectos · CDMX / remoto.",
    href: "#contact",
    cta: "Escríbeme",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* soft ambient glow behind the radar */}
        <div className="absolute -top-12 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[rgb(var(--tint)/0.08)] blur-3xl animate-em-pulse-slow" />

        {/* radar / signal illustration */}
        <div className="absolute left-1/2 top-8 h-40 w-40 -translate-x-1/2">
          {/* static concentric rings */}
          <div className="absolute inset-0 rounded-full border border-[rgb(var(--tint)/0.18)]" />
          <div className="absolute inset-[22%] rounded-full border border-[rgb(var(--tint)/0.15)]" />
          <div className="absolute inset-[44%] rounded-full border border-[rgb(var(--tint)/0.12)]" />
          {/* expanding pings */}
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40 animate-em-ping" />
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400/25 animate-em-ping [animation-delay:1.4s]" />
          {/* live core */}
          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_16px_4px_#34d39988] animate-em-pulse-fast" />
        </div>

        {/* status pill */}
        <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-[rgb(var(--tint)/0.1)] bg-[rgb(var(--tint)/0.04)] px-3 py-1.5 text-[11px] font-medium text-[var(--c-muted)]">
          <span className="h-[7px] w-[7px] rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-em-pulse-fast" />
          En línea
        </div>
      </div>
    ),
  },
  {
    Icon: GitBranch,
    name: "DevX",
    description: "CI/CD, testing y control de versiones.",
    href: "#projects",
    cta: "Ver proyectos",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        vertical
        reverse
        pauseOnHover
        className="absolute inset-x-0 top-4 h-[120%] [--duration:22s] [--gap:0.75rem] [mask-image:linear-gradient(to_bottom,#000_0%,transparent_55%)]"
      >
        {devx.map((item) => (
          <SkillChip key={item.name} item={item} />
        ))}
      </Marquee>
    ),
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative z-10 max-w-[1120px] mx-auto px-6 py-[70px] scroll-mt-[110px]"
    >
      <div className="flex items-center gap-[14px] mb-6">
        <TextAnimate
          as="span"
          by="character"
          animation="blurInUp"
          once
          className="text-[13px] font-semibold tracking-[0.18em] text-[var(--c-muted)] uppercase"
        >
          02 — Skills & Stack
        </TextAnimate>
        <Separator className="flex-1" />
      </div>

      <h3 className="mb-9 max-w-[42ch] text-[clamp(22px,2.6vw,30px)] font-semibold leading-[1.28] tracking-[-0.02em]">
        Herramientas con las que desarrollo en{" "}
        <Highlighter
          action="underline"
          color="#8f8f8f"
          strokeWidth={2}
          iterations={2}
          padding={1}
          isView
        >
          <span className="font-serif italic font-medium text-[var(--c-fg-2)]">
            producción
          </span>
        </Highlighter>
        .
      </h3>

      <Reveal>
        <BentoGrid className="auto-rows-[19rem] gap-[18px]">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}

          {/* Filosofía — custom card (needs rich typography, not the string API) */}
          <div
            className={cn(
              "group relative col-span-3 flex flex-col justify-end overflow-hidden rounded-xl p-8 lg:col-span-2",
              cardChrome
            )}
          >
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[rgb(var(--tint)/0.05)] blur-3xl animate-em-pulse-slow" />
            <div className="relative mb-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--c-faint)]">
              <Compass className="h-4 w-4" />
              Filosofía
            </div>
            <p className="relative max-w-[27ch] text-[clamp(21px,2.5vw,29px)] font-semibold leading-[1.32] tracking-[-0.02em] text-[var(--c-fg-2)]">
              Del primer trazo al{" "}
              <span className="font-serif italic font-medium text-[var(--c-fg)]">
                deploy
              </span>
              : construyo productos completos, cuidados{" "}
              <Highlighter
                action="underline"
                color="#8f8f8f"
                strokeWidth={2}
                iterations={2}
                padding={1}
                isView
              >
                <span className="font-serif italic font-medium text-[var(--c-fg)]">
                  hasta el último pixel
                </span>
              </Highlighter>
              .
            </p>
          </div>
        </BentoGrid>
      </Reveal>
    </section>
  );
}
