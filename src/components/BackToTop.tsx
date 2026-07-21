"use client";

import { ArrowUp } from "lucide-react";
import { useScrollState } from "@/hooks/useScrollState";
import { useI18n } from "@/lib/i18n";
import { getLenis } from "@/lib/lenis";

const R = 21;
const CIRC = 2 * Math.PI * R;

export default function BackToTop() {
  const { showTop, progress } = useScrollState();
  const { t } = useI18n();

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={toTop}
      aria-label={t.backToTop}
      title={t.backToTop}
      className={`group fixed right-[26px] bottom-[26px] z-[60] grid h-12 w-12 place-items-center rounded-full border border-[rgb(var(--tint)/0.12)] bg-[rgb(var(--c-surf-rgb)/0.6)] text-[var(--c-fg)] shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgb(var(--tint)/0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgb(var(--tint)/0.1)] ${
        showTop
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      {/* scroll-progress ring */}
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 48 48"
        aria-hidden
      >
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="rgb(var(--tint)/0.12)"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="var(--c-fg)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - progress / 100)}
          className="transition-[stroke-dashoffset] duration-150 ease-linear"
        />
      </svg>

      {/* twin arrows that slide upward on hover (the top one exits, the bottom
          one takes its place) */}
      <span className="relative flex h-4 w-4 flex-col items-center overflow-hidden">
        <ArrowUp
          size={16}
          className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-5"
        />
        <ArrowUp
          size={16}
          className="absolute top-5 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-5"
        />
      </span>
    </button>
  );
}
