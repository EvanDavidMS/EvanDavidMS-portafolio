"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { projects, type Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/Reveal";
import { TextAnimate } from "@/components/magicui/text-animate";
import ProjectModal from "@/components/ProjectModal";
import { useI18n, pick, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * A project card combining two Aceternity patterns:
 *  - "Focus Cards" — driven by the parent's `hovered` index: the active card
 *    lifts while the others dim + blur + shrink.
 *  - "Comet Card" — the active card tilts in 3D toward the cursor with a soft
 *    glare. Rotation/glare are written to CSS vars (`--rx/--ry/--mx/--my`) on
 *    mousemove (no re-render); the lift/scale from Focus Cards are baked into
 *    the same `transform` string so both effects compose cleanly.
 */
function ProjectCard({
  p,
  i,
  hovered,
  setHovered,
  onOpen,
  lang,
  viewCase,
  viewCaseAria,
}: {
  p: Project;
  i: number;
  hovered: number | null;
  setHovered: (i: number | null) => void;
  onOpen: (p: Project) => void;
  lang: Lang;
  viewCase: string;
  viewCaseAria: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const isActive = hovered === i;
  const isDimmed = hovered !== null && hovered !== i;

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const max = 7; // deg
    el.style.setProperty("--ry", `${(px - 0.5) * 2 * max}deg`);
    el.style.setProperty("--rx", `${-(py - 0.5) * 2 * max}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    }
  };

  const ty = isActive ? "-4px" : "0px";
  const scale = isDimmed ? "0.98" : "1";

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onOpen(p)}
      aria-label={`${viewCaseAria} ${p.title}`}
      onMouseEnter={() => setHovered(i)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateY(${ty}) scale(${scale})`,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[rgb(var(--tint)/0.08)] bg-[rgb(var(--tint)/0.02)] text-left transition-all duration-300 ease-out will-change-transform",
        isActive && "border-[rgb(var(--tint)/0.2)]",
        isDimmed && "opacity-40 blur-[2px]"
      )}
    >
      <div className="relative aspect-[16/10] bg-[var(--c-surf)] overflow-hidden">
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 grid place-items-center w-8 h-8 rounded-lg border border-[rgb(var(--tint)/0.12)] bg-[rgb(var(--c-bg-rgb)/0.5)] backdrop-blur-sm text-[13px]">
          ↗
        </span>
      </div>
      <div className="px-5 pt-4 pb-5 flex flex-col gap-1">
        <span className="text-[11px] tracking-[0.14em] uppercase text-[var(--c-muted)]">
          {p.category}
        </span>
        <span className="text-[17px] font-semibold tracking-[-0.02em] text-[var(--c-fg)]">
          {p.title}
        </span>
        <span className="text-[13px] leading-[1.55] text-[var(--c-muted)] mt-1 line-clamp-2">
          {pick(p.desc, lang)}
        </span>
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {p.tech.slice(0, 3).map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="h-auto text-[11px] font-medium text-[var(--c-fg-2)] border-[rgb(var(--tint)/0.08)] bg-[rgb(var(--tint)/0.03)] rounded-full px-2 py-1"
            >
              {t}
            </Badge>
          ))}
          {p.tech.length > 3 && (
            <Badge
              variant="outline"
              className="h-auto text-[11px] font-medium text-[var(--c-faint)] border-[rgb(var(--tint)/0.08)] bg-[rgb(var(--tint)/0.03)] rounded-full px-2 py-1"
            >
              +{p.tech.length - 3}
            </Badge>
          )}
        </div>
        <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[var(--c-muted)] mt-3 transition-colors duration-200 group-hover:text-[var(--c-fg)]">
          {viewCase}
        </span>
      </div>

      {/* Comet glare — soft highlight that follows the cursor over the card */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx,50%) var(--my,50%), rgb(var(--tint)/0.10), transparent 70%)",
        }}
      />
    </button>
  );
}

const ALL = "__all__";
const categories = [
  ALL,
  ...Array.from(new Set(projects.map((p) => p.category))),
];

export default function Projects() {
  const { t, lang } = useI18n();
  const [hovered, setHovered] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>(ALL);
  const [selected, setSelected] = useState<Project | null>(null);

  const shown =
    filter === ALL ? projects : projects.filter((p) => p.category === filter);

  const selectFilter = (c: string) => {
    setFilter(c);
    setHovered(null);
  };

  return (
    <section
      id="projects"
      className="relative z-10 max-w-[1120px] mx-auto px-6 py-[70px] scroll-mt-[110px]"
    >
      <div className="flex items-center gap-[14px] mb-8">
        <TextAnimate
          as="span"
          by="character"
          animation="blurInUp"
          once
          key={`eyebrow-${lang}`}
          className="text-[13px] font-semibold tracking-[0.18em] text-[var(--c-muted)] uppercase"
        >
          {t.projects.eyebrow}
        </TextAnimate>
        <Separator className="flex-1" />
      </div>

      {/* category filter */}
      <Reveal className="flex flex-wrap gap-2 mb-9">
        {categories.map((c) => {
          const on = c === filter;
          return (
            <button
              key={c}
              type="button"
              onClick={() => selectFilter(c)}
              className={cn(
                "rounded-full px-4 py-2 text-[13px] font-medium border transition-colors duration-200",
                on
                  ? "bg-[var(--c-fg)] text-[var(--c-bg)] border-transparent"
                  : "border-[rgb(var(--tint)/0.1)] bg-[rgb(var(--tint)/0.02)] text-[var(--c-muted)] hover:text-[var(--c-fg)] hover:bg-[rgb(var(--tint)/0.06)]"
              )}
            >
              {c === ALL ? t.projects.all : c}
            </button>
          );
        })}
      </Reveal>

      <div
        onMouseLeave={() => setHovered(null)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {shown.map((p, i) => (
          <Reveal key={p.title} delayMs={(i % 3) * 90} className="h-full">
            <ProjectCard
              p={p}
              i={i}
              hovered={hovered}
              setHovered={setHovered}
              onOpen={setSelected}
              lang={lang}
              viewCase={t.projects.viewCase}
              viewCaseAria={t.projects.viewCaseAria}
            />
          </Reveal>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
