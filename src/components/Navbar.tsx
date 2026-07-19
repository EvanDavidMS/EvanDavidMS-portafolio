"use client";

import { navItems } from "@/lib/data";
import { useScrollState } from "@/hooks/useScrollState";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Navbar() {
  const { active, progress } = useScrollState();

  return (
    <nav className="fixed top-[22px] left-1/2 -translate-x-1/2 z-50 w-[min(1120px,calc(100%-32px))] flex items-center justify-between gap-3 py-2 pl-3 pr-2 rounded-full border border-white/[0.08] bg-[rgba(18,18,18,0.6)] backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]">
      {/* reading progress line */}
      <div className="absolute left-3 right-3 bottom-[3px] h-[2px] rounded-full overflow-hidden pointer-events-none">
        <div
          className="h-full rounded-full bg-gradient-to-r from-white/[0.15] to-white/80 transition-[width] duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* left: logo cluster */}
      <a
        href="#top"
        className="flex items-center gap-[11px] px-1.5 py-1 rounded-full shrink-0"
      >
        <span className="relative grid place-items-center w-9 h-9 rounded-xl border border-white/[0.14] bg-gradient-to-br from-white/[0.16] to-white/[0.02] font-extrabold text-[15px] tracking-[-0.04em] text-[#F5F5F5] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
          EM
        </span>
        <span className="flex flex-col gap-[3px] leading-[1.15]">
          <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-[#F5F5F5] whitespace-nowrap">
            Evan Morales
          </span>
          <span className="text-[10.5px] tracking-[0.1em] uppercase text-[#7A7A7A] whitespace-nowrap">
            Full-Stack Dev
          </span>
        </span>
      </a>

      {/* center: nav with sliding active highlight */}
      <div className="hidden md:flex items-center gap-px p-[3px] rounded-full border border-white/[0.06] bg-white/[0.02] shrink-0">
        {navItems.map((item) => {
          const on = item.id === active;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`group relative inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-colors duration-250 ease-out ${
                on
                  ? "text-[#0A0A0A] bg-[#F5F5F5]"
                  : "text-[#8A8A8A] bg-transparent hover:bg-white/[0.06] hover:text-[#F5F5F5]"
              }`}
            >
              <span
                className={`w-[5px] h-[5px] rounded-full transition-all duration-250 ${
                  on ? "bg-[#0A0A0A]" : "bg-white/[0.18]"
                }`}
              />
              {item.label}
            </a>
          );
        })}
      </div>

      {/* right: status + CTA */}
      <div className="flex items-center gap-2.5 shrink-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="grid place-items-center w-8 h-8 rounded-full border border-white/10 bg-white/[0.02] shrink-0">
              <span className="w-[7px] h-[7px] rounded-full bg-[#F5F5F5] shadow-[0_0_9px_rgba(255,255,255,0.85)] animate-em-pulse-fast" />
            </span>
          </TooltipTrigger>
          <TooltipContent>Disponible para proyectos</TooltipContent>
        </Tooltip>
        <Button
          asChild
          className="h-auto rounded-full px-5 py-[11px] gap-2 text-[13.5px] font-semibold border border-white/25 whitespace-nowrap shadow-[0_4px_18px_rgba(255,255,255,0.14)] transition-all duration-300 hover:-translate-y-px hover:bg-primary hover:shadow-[0_8px_26px_rgba(255,255,255,0.28)]"
        >
          <a href="#contact">
            Contactar
            <span className="grid place-items-center w-[18px] h-[18px] rounded-full bg-[#0A0A0A] text-[#F5F5F5] text-[11px]">
              →
            </span>
          </a>
        </Button>
      </div>
    </nav>
  );
}
