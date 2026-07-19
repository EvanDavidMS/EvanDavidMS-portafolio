"use client";

import { useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="relative z-10 max-w-[1120px] mx-auto px-6 py-[70px] scroll-mt-[110px]"
    >
      <div className="flex items-center gap-[14px] mb-11">
        <span className="text-[13px] font-semibold tracking-[0.18em] text-[#8A8A8A] uppercase">
          03 — Proyectos destacados
        </span>
        <Separator className="flex-1" />
      </div>

      <div
        onMouseLeave={() => setHovered(null)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {projects.map((p, i) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(i)}
            className={cn(
              "group flex flex-col rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02] transition-all duration-300 ease-out",
              hovered === i && "border-white/20 -translate-y-1",
              hovered !== null &&
                hovered !== i &&
                "opacity-40 blur-[2px] scale-[0.98]"
            )}
          >
            <div className="relative aspect-[16/10] bg-[#0E0E0E] overflow-hidden">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 right-3 grid place-items-center w-8 h-8 rounded-lg border border-white/[0.12] bg-[rgba(10,10,10,0.5)] backdrop-blur-sm text-[13px]">
                ↗
              </span>
            </div>
            <div className="px-5 pt-4 pb-5 flex flex-col gap-1">
              <span className="text-[11px] tracking-[0.14em] uppercase text-[#8A8A8A]">
                {p.category}
              </span>
              <span className="text-[17px] font-semibold tracking-[-0.02em] text-[#F5F5F5]">
                {p.title}
              </span>
              <span className="text-[13px] leading-[1.55] text-[#8A8A8A] mt-1 line-clamp-2">
                {p.desc}
              </span>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {p.tech.slice(0, 3).map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="h-auto text-[11px] font-medium text-[#C9C9C9] border-white/[0.08] bg-white/[0.03] rounded-full px-2 py-1"
                  >
                    {t}
                  </Badge>
                ))}
                {p.tech.length > 3 && (
                  <Badge
                    variant="outline"
                    className="h-auto text-[11px] font-medium text-[#7A7A7A] border-white/[0.08] bg-white/[0.03] rounded-full px-2 py-1"
                  >
                    +{p.tech.length - 3}
                  </Badge>
                )}
              </div>
              <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#8A8A8A] mt-3 transition-colors duration-200 group-hover:text-white">
                Visita la página →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
