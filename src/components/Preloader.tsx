"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Full-screen intro loader. Rendered in the initial HTML (covers the page from
 * first paint — no content flash). A count 0→100 fills while a light ring
 * sweeps the logo; then the curtain slides up to reveal the site. The page's
 * entrance animations are held (via the `is-loading` class + CSS) until the
 * curtain lifts, so the hero actually animates in on reveal. Home page only.
 */
export default function Preloader() {
  const [show, setShow] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [pct, setPct] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    // hold the page's entrance animations at frame 0 while loading
    root.classList.add("is-loading");
    window.scrollTo(0, 0);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 500 : 1300;
    const start = performance.now();
    let exitTimer = 0;
    let doneTimer = 0;

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out
      setPct(Math.round(eased * 100));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        exitTimer = window.setTimeout(() => {
          // release the entrance animations exactly as the curtain starts to lift
          root.classList.remove("is-loading");
          setExiting(true);
          doneTimer = window.setTimeout(() => setShow(false), 950);
        }, 200);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      root.classList.remove("is-loading");
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--c-bg)]",
        "transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
        exiting && "-translate-y-full opacity-0 motion-reduce:translate-y-0"
      )}
    >
      {/* logo with spinning light ring + soft glow */}
      <div className="relative">
        <div className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgb(var(--tint)/0.12),transparent_70%)] blur-2xl animate-em-pulse" />

        {/* rotating light frame (same conic sweep as the site's buttons) */}
        <div
          aria-hidden
          className="animate-em-spin absolute -inset-[3px] rounded-[21px] motion-reduce:hidden"
          style={
            {
              "--em-spin-duration": "3s",
              background:
                "conic-gradient(from var(--em-angle), rgb(var(--tint)/0.15) 0deg, rgb(var(--tint)/0.15) 250deg, rgb(var(--tint)/0.9) 300deg, rgb(var(--tint)) 320deg, rgb(var(--tint)/0.9) 340deg, rgb(var(--tint)/0.15) 360deg)",
            } as React.CSSProperties
          }
        />
        {/* static frame fallback for reduced motion */}
        <div
          aria-hidden
          className="absolute -inset-[3px] hidden rounded-[21px] bg-[rgb(var(--tint)/0.2)] motion-reduce:block"
        />

        <div className="relative grid h-[88px] w-[88px] place-items-center overflow-hidden rounded-[18px] border border-[rgb(var(--tint)/0.12)] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <Image
            src="/logo/Logo-Dark.png"
            alt="Logo Evan Morales"
            width={96}
            height={96}
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* name */}
      <div className="mt-7 text-center">
        <div className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--c-fg)]">
          Evan Morales
        </div>
        <div className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.2em] text-[var(--c-faint)]">
          Full-Stack Developer
        </div>
      </div>

      {/* progress */}
      <div className="mt-8 flex items-center gap-3">
        <div className="h-[2px] w-44 overflow-hidden rounded-full bg-[rgb(var(--tint)/0.12)]">
          <div
            className="h-full rounded-full bg-[var(--c-fg)] transition-[width] duration-100 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="w-9 text-right text-[11px] tabular-nums text-[var(--c-muted)]">
          {pct}%
        </span>
      </div>
    </div>
  );
}
