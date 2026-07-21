"use client";

import { socials, contactEmail } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { MovingBorderButton } from "@/components/MovingBorderButton";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/lib/i18n";

export default function Contact() {
  const { t, lang } = useI18n();
  return (
    <section
      id="contact"
      className="relative z-10 max-w-[1120px] mx-auto px-6 pt-20 pb-[90px] scroll-mt-[110px]"
    >
      <div className="relative overflow-hidden px-8 py-[clamp(44px,7vw,90px)] rounded-[32px] border border-[rgb(var(--tint)/0.1)] bg-gradient-to-br from-[rgb(var(--tint)/0.06)] to-[rgb(var(--tint)/0.015)] text-center">
        <div
          className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full pointer-events-none blur-[20px] animate-em-pulse-slow"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--tint)/0.12) 0%, rgb(var(--tint)/0) 60%)",
          }}
        />
        <div className="relative">
          <TextAnimate
            as="p"
            by="character"
            animation="blurInUp"
            once
            key={`eyebrow-${lang}`}
            className="text-sm tracking-[0.14em] uppercase text-[var(--c-muted)] mb-[22px]"
          >
            {t.contact.eyebrow}
          </TextAnimate>
          <Reveal>
            <h2 className="text-[clamp(34px,6vw,66px)] font-bold tracking-[-0.035em] leading-[1.05]">
              {t.contact.headingPre}{" "}
              <span className="font-serif italic font-medium text-[var(--c-fg-2)]">
                {t.contact.togetherWord}
              </span>
            </h2>
          </Reveal>
          <TextAnimate
            key={`para-${lang}`}
            as="p"
            by="word"
            animation="blurInUp"
            once
            className="mx-auto mt-[22px] max-w-[44ch] text-base leading-[1.65] text-[var(--c-muted)]"
          >
            {t.contact.paragraph}
          </TextAnimate>
          <Reveal delayMs={120} className="flex flex-wrap gap-[14px] justify-center mt-[38px]">
            <MovingBorderButton
              href={`mailto:${contactEmail}?subject=${encodeURIComponent(
                t.contact.mailSubject
              )}`}
              innerClassName="px-[30px]"
            >
              {t.contact.talk}
            </MovingBorderButton>
            <MovingBorderButton
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
              innerClassName="px-[30px] bg-secondary font-medium text-secondary-foreground group-hover:bg-secondary/80"
            >
              {t.contact.cv}
            </MovingBorderButton>
          </Reveal>
          <Reveal delayMs={220} className="flex flex-wrap gap-3 justify-center mt-[34px]">
            {socials.map((s) => (
              <Button
                key={s.label}
                asChild
                variant="outline"
                className="h-auto rounded-full gap-2 px-[18px] py-[10px] border-[rgb(var(--tint)/0.08)] bg-[rgb(var(--tint)/0.02)] text-sm font-normal text-[var(--c-fg-2)] transition-colors duration-200 hover:bg-[rgb(var(--tint)/0.07)] hover:text-[var(--c-fg)]"
              >
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--c-muted)]" />
                  {s.label}
                </a>
              </Button>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
