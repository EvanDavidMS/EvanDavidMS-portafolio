"use client";

import { MovingBorderButton } from "@/components/MovingBorderButton";
import { TextGenerateEffect } from "@/components/TextGenerateEffect";
import { FlipWords } from "@/components/FlipWords";
import { Spotlight } from "@/components/Spotlight";
import { useI18n } from "@/lib/i18n";

const accent =
  "font-serif italic font-medium text-[var(--c-fg)] underline decoration-2 underline-offset-[9px] decoration-[rgb(var(--tint)/0.28)] [text-shadow:0_0_26px_rgb(var(--tint)/0.4)]";

// Staggered entrance for the hero elements. fill-mode-both keeps them hidden
// during their delay (no flash), then they fade + slide up.
const enter =
  "animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700 ease-out";

export default function Hero() {
  const { t, lang } = useI18n();

  const segments = (
    t.hero.headingSegments as ReadonlyArray<{ text: string; accent?: boolean }>
  ).map((s) => ({
    text: s.text,
    className: s.accent ? accent : undefined,
    whole: s.accent || undefined,
  }));

  return (
    <header
      id="top"
      className="relative z-10 min-h-[100svh] max-w-[1120px] mx-auto px-6 pt-24 pb-10 flex flex-col items-center justify-center text-center"
    >
      {/* full-bleed light layer — spans the whole viewport width so the beam
          isn't clipped to the 1120px hero container */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-screen h-full overflow-hidden"
        style={{ opacity: "var(--spot-op, 1)" }}
      >
        <Spotlight />
      </div>

      <div
        style={{ animationDelay: "0.1s" }}
        className={`${enter} inline-flex items-center gap-[9px] px-[15px] py-[7px] rounded-full border border-[rgb(var(--tint)/0.08)] bg-[rgb(var(--tint)/0.03)] backdrop-blur-md text-[13px] text-[var(--c-muted)] mb-[26px]`}
      >
        <span className="w-[7px] h-[7px] rounded-full bg-[var(--c-fg)] shadow-[0_0_10px_rgb(var(--tint)/0.8)] animate-em-pulse-slow" />
        {t.hero.badge}
      </div>

      <p
        style={{ animationDelay: "0.25s" }}
        className={`${enter} text-[15px] text-[var(--c-muted)] font-normal mb-5`}
      >
        {t.hero.intro}{" "}
        <FlipWords
          key={lang}
          words={t.hero.flip as unknown as string[]}
          className="font-medium text-[var(--c-fg-2)]"
        />
      </p>

      <h1 className="font-bold text-[clamp(36px,5.6vw,76px)] leading-[1.04] tracking-[-0.035em] max-w-[15ch] text-balance [text-shadow:0_0_48px_rgb(var(--tint)/0.14)]">
        <TextGenerateEffect key={lang} stagger={0.17} delay={0.4} segments={segments} />
      </h1>

      <p
        style={{ animationDelay: "0.65s" }}
        className={`${enter} mt-6 max-w-[56ch] text-[clamp(15px,1.5vw,17px)] leading-[1.6] text-[var(--c-muted)]`}
      >
        {t.hero.subtitle}
      </p>

      <div
        style={{ animationDelay: "0.8s" }}
        className={`${enter} flex flex-wrap gap-[14px] justify-center mt-8`}
      >
        <MovingBorderButton href="#contact">{t.hero.talk}</MovingBorderButton>
        <MovingBorderButton
          href="/cv"
          target="_blank"
          rel="noopener noreferrer"
          innerClassName="bg-secondary font-medium text-secondary-foreground group-hover:bg-secondary/80"
        >
          {t.hero.cv}
        </MovingBorderButton>
      </div>
    </header>
  );
}
