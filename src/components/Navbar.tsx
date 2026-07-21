"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { navItems, socials } from "@/lib/data";
import { useScrollState } from "@/hooks/useScrollState";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { LangToggle } from "@/components/LangToggle";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Navbar() {
  const { active, progress } = useScrollState();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  // Left→right stagger for the nav's contents: each element reveals with a
  // small fade+slide, timed to sweep across the bar as the pill drops in. The
  // base (~1.7s) lines up with the pill's drop; step 0.06s per item.
  const sweep = (i: number) => ({
    animationDelay: `${(1.7 + i * 0.06).toFixed(2)}s`,
  });

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav className="animate-em-nav fixed top-[22px] left-1/2 -translate-x-1/2 z-50 w-[min(1120px,calc(100%-24px))] sm:w-[min(1120px,calc(100%-32px))] flex items-center justify-between gap-2 sm:gap-3 py-2 pl-2 pr-2 sm:pl-3 rounded-full border border-[rgb(var(--tint)/0.08)] bg-[rgb(var(--c-surf-rgb)/0.6)] backdrop-blur-lg backdrop-saturate-150 shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgb(var(--tint)/0.06)]">
        {/* reading progress line */}
        <div className="absolute left-3 right-3 bottom-[3px] h-[2px] rounded-full overflow-hidden pointer-events-none">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[rgb(var(--tint)/0.15)] to-[rgb(var(--tint)/0.8)] transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* left: logo cluster */}
        <a
          href="#top"
          style={sweep(0)}
          className="animate-em-nav-item flex items-center gap-2 min-[380px]:gap-[11px] px-1 min-[380px]:px-1.5 py-1 rounded-full shrink-0"
        >
          <span className="relative grid place-items-center w-9 h-9 overflow-hidden rounded-xl border border-[rgb(var(--tint)/0.14)] bg-white shadow-[inset_0_1px_0_rgba(0,0,0,0.06)] shrink-0">
            <Image
              src="/logo/Logo-Dark.png"
              alt="Logo Evan Morales"
              width={30}
              height={30}
              className="object-contain"
            />
          </span>
          <span className="hidden min-[380px]:flex flex-col gap-[3px] leading-[1.15]">
            <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-[var(--c-fg)] whitespace-nowrap">
              Evan Morales
            </span>
            <span className="text-[10.5px] tracking-[0.1em] uppercase text-[var(--c-faint)] whitespace-nowrap">
              {t.nav.role}
            </span>
          </span>
        </a>

        {/* center: nav with sliding active highlight */}
        <div className="hidden md:flex items-center gap-px p-[3px] rounded-full border border-[rgb(var(--tint)/0.06)] bg-[rgb(var(--tint)/0.02)] shrink-0">
          {navItems.map((item, idx) => {
            const on = item.id === active;
            return (
              <a
                key={item.id}
                href={item.href}
                style={sweep(1 + idx)}
                className={`animate-em-nav-item group relative inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-colors duration-250 ease-out ${
                  on
                    ? "text-[var(--c-bg)] bg-[var(--c-fg)]"
                    : "text-[var(--c-muted)] bg-transparent hover:bg-[rgb(var(--tint)/0.06)] hover:text-[var(--c-fg)]"
                }`}
              >
                <span
                  className={`w-[5px] h-[5px] rounded-full transition-all duration-250 ${
                    on ? "bg-[var(--c-bg)]" : "bg-[rgb(var(--tint)/0.18)]"
                  }`}
                />
                {t.nav.items[item.id]}
              </a>
            );
          })}
        </div>

        {/* right: status + CTA + mobile menu toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                style={sweep(6)}
                className="animate-em-nav-item hidden sm:grid place-items-center w-8 h-8 rounded-full border border-[rgb(var(--tint)/0.1)] bg-[rgb(var(--tint)/0.02)] shrink-0"
              >
                <span className="w-[7px] h-[7px] rounded-full bg-[var(--c-fg)] shadow-[0_0_9px_rgb(var(--tint)/0.85)] animate-em-pulse-fast" />
              </span>
            </TooltipTrigger>
            <TooltipContent>{t.nav.available}</TooltipContent>
          </Tooltip>
          <LangToggle className="animate-em-nav-item shrink-0" style={sweep(7)} />
          <AnimatedThemeToggler
            duration={500}
            aria-label={t.nav.themeLabel}
            style={sweep(8)}
            className="animate-em-nav-item grid place-items-center w-9 h-9 rounded-full border border-[rgb(var(--tint)/0.1)] bg-[rgb(var(--tint)/0.02)] text-[var(--c-fg-2)] transition-colors hover:text-[var(--c-fg)] hover:bg-[rgb(var(--tint)/0.06)] shrink-0 [&_svg]:size-[16px]"
          />
          <Button
            asChild
            style={sweep(9)}
            className="animate-em-nav-item hidden md:inline-flex h-auto rounded-full px-5 py-[11px] gap-2 text-[13.5px] font-semibold border border-[rgb(var(--tint)/0.25)] whitespace-nowrap shadow-[0_4px_18px_rgb(var(--tint)/0.14)] transition-all duration-300 hover:-translate-y-px hover:bg-primary hover:shadow-[0_8px_26px_rgb(var(--tint)/0.28)]"
          >
            <a href="#contact">
              {t.nav.cta}
              <span className="grid place-items-center w-[18px] h-[18px] rounded-full bg-[var(--c-bg)] text-[var(--c-fg)] text-[11px]">
                →
              </span>
            </a>
          </Button>

          {/* mobile toggle — hamburger morphs into an X */}
          <button
            type="button"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            style={sweep(10)}
            className={cn(
              "animate-em-nav-item md:hidden relative grid place-items-center w-9 h-9 rounded-full border transition-colors duration-300",
              open
                ? "border-[rgb(var(--tint)/0.2)] bg-[rgb(var(--tint)/0.08)] text-[var(--c-fg)]"
                : "border-[rgb(var(--tint)/0.1)] bg-[rgb(var(--tint)/0.02)] text-[var(--c-fg-2)] hover:text-[var(--c-fg)] hover:bg-[rgb(var(--tint)/0.06)]"
            )}
          >
            <span
              className={cn(
                "absolute h-[1.6px] w-[17px] rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                open ? "rotate-45" : "-translate-y-[4px]"
              )}
            />
            <span
              className={cn(
                "absolute h-[1.6px] w-[17px] rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                open ? "-rotate-45" : "translate-y-[4px]"
              )}
            />
          </button>
        </div>
      </nav>

      {/* ===== Mobile menu overlay ===== */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        {/* dimmed, blurred backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-[rgb(var(--c-bg-rgb)/0.55)] backdrop-blur-md transition-opacity duration-500 ease-out",
            open ? "opacity-100" : "opacity-0"
          )}
        />

        {/* floating panel, aligned under the nav pill */}
        <div
          id="mobile-menu"
          className={cn(
            "absolute top-[84px] left-4 right-4 origin-top overflow-hidden rounded-[28px] border border-[rgb(var(--tint)/0.1)] bg-[rgb(var(--c-surf-rgb)/0.85)] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_24px_70px_-12px_rgba(0,0,0,0.65),inset_0_1px_0_rgb(var(--tint)/0.08)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-3 scale-[0.97]"
          )}
        >
          {/* soft top sheen */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[rgb(var(--tint)/0.05)] to-transparent" />

          <div className="relative p-3">
            {/* header row */}
            <div className="flex items-center justify-between px-3 pt-1.5 pb-3">
              <span className="text-[10.5px] font-medium tracking-[0.18em] uppercase text-[var(--c-faint)]">
                {t.nav.navigation}
              </span>
              <span className="flex items-center gap-1.5 text-[10.5px] tracking-[0.06em] uppercase text-[var(--c-muted)]">
                <span className="w-[6px] h-[6px] rounded-full bg-[var(--c-fg)] shadow-[0_0_8px_rgb(var(--tint)/0.85)] animate-em-pulse-fast" />
                {t.nav.availableShort}
              </span>
            </div>

            {/* nav items */}
            <nav className="flex flex-col">
              {navItems.map((item, i) => {
                const on = item.id === active;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    style={{
                      transitionDelay: open ? `${140 + i * 55}ms` : "0ms",
                    }}
                    className={cn(
                      "group relative flex items-center gap-3.5 rounded-2xl px-3.5 py-3 transition-all duration-500 ease-out",
                      open
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2",
                      on
                        ? "bg-[rgb(var(--tint)/0.07)]"
                        : "hover:bg-[rgb(var(--tint)/0.04)]"
                    )}
                  >
                    {/* active accent bar */}
                    <span
                      className={cn(
                        "absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full bg-[var(--c-fg)] transition-all duration-300",
                        on ? "h-5 opacity-100" : "h-0 opacity-0"
                      )}
                    />
                    <span
                      className={cn(
                        "font-serif text-[13px] tabular-nums transition-colors duration-300",
                        on ? "text-[var(--c-fg)]" : "text-[var(--c-faint)]"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-[17px] font-medium tracking-[-0.01em] transition-colors duration-300",
                        on
                          ? "text-[var(--c-fg)]"
                          : "text-[var(--c-muted)] group-hover:text-[var(--c-fg)]"
                      )}
                    >
                      {t.nav.items[item.id]}
                    </span>
                    <ArrowUpRight
                      size={17}
                      className={cn(
                        "transition-all duration-300",
                        on
                          ? "text-[var(--c-fg)] opacity-100"
                          : "text-[var(--c-faint)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                      )}
                    />
                  </a>
                );
              })}
            </nav>

            {/* divider */}
            <div className="my-3 h-px bg-[rgb(var(--tint)/0.08)]" />

            {/* CTA */}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? "460ms" : "0ms" }}
              className={cn(
                "flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-[15px] font-semibold bg-[var(--c-fg)] text-[var(--c-bg)] shadow-[0_8px_26px_rgb(var(--tint)/0.22)] transition-all duration-500 ease-out active:scale-[0.98]",
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
            >
              {t.nav.cta}
              <span className="grid place-items-center w-[20px] h-[20px] rounded-full bg-[var(--c-bg)] text-[var(--c-fg)] text-[12px]">
                →
              </span>
            </a>

            {/* socials */}
            <div
              style={{ transitionDelay: open ? "520ms" : "0ms" }}
              className={cn(
                "mt-3 flex items-center justify-center gap-1 transition-all duration-500 ease-out",
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-3 py-1.5 text-[12px] font-medium tracking-[0.02em] text-[var(--c-muted)] transition-colors hover:text-[var(--c-fg)] hover:bg-[rgb(var(--tint)/0.05)]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
