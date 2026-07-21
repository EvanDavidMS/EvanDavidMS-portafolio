"use client";

import { useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Compact ES/EN segmented control. The active language sits on a filled pill
 * that slides between the two options.
 */
export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  const options: Lang[] = ["es", "en"];

  return (
    <div
      role="group"
      aria-label={t.nav.langLabel}
      className={cn(
        "relative grid grid-cols-2 items-center rounded-full border border-[rgb(var(--tint)/0.1)] bg-[rgb(var(--tint)/0.02)] p-[3px] text-[11px] font-semibold",
        className
      )}
    >
      {/* sliding highlight */}
      <span
        aria-hidden
        className="absolute top-[3px] bottom-[3px] left-[3px] w-[calc(50%-3px)] rounded-full bg-[var(--c-fg)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
        style={{ transform: lang === "en" ? "translateX(100%)" : "translateX(0)" }}
      />
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => setLang(o)}
          aria-pressed={lang === o}
          className={cn(
            "relative z-10 rounded-full px-2 py-[3px] uppercase tracking-[0.06em] transition-colors duration-200",
            lang === o
              ? "text-[var(--c-bg)]"
              : "text-[var(--c-muted)] hover:text-[var(--c-fg)]"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
