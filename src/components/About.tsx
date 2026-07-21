"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/Reveal";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Highlighter } from "@/components/magicui/highlighter";
import { useI18n } from "@/lib/i18n";

export default function About() {
  const { t, lang } = useI18n();
  const stats = t.about.stats;

  return (
    <section
      id="about"
      className="relative z-10 max-w-[1120px] mx-auto px-6 py-[70px] scroll-mt-[110px]"
    >
      <div className="flex items-center gap-[14px] mb-14">
        <TextAnimate
          key={`eyebrow-${lang}`}
          as="span"
          by="character"
          animation="blurInUp"
          once
          className="text-[13px] font-semibold tracking-[0.18em] text-[var(--c-muted)] uppercase"
        >
          {t.about.eyebrow}
        </TextAnimate>
        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 lg:gap-[72px] items-center">
        {/* portrait + dog */}
        <div className="mx-auto w-full max-w-[340px] lg:mx-0">
          <Reveal className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border border-[rgb(var(--tint)/0.1)] hidden sm:block" />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[rgb(var(--tint)/0.1)] bg-[var(--c-surf)]">
              <Image
                src="/me/Evan.jpg"
                alt="Evan Morales"
                fill
                sizes="(min-width: 1024px) 340px, 320px"
                className="object-cover"
                priority
              />
              {/* subtle bottom gradient so the badge stays legible over the photo */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none bg-gradient-to-t from-[rgb(var(--c-bg-rgb)/0.7)] to-transparent" />
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-[7px] px-3 py-[7px] rounded-full border border-[rgb(var(--tint)/0.1)] bg-[rgb(var(--c-bg-rgb)/0.6)] backdrop-blur-sm text-[11px] text-[var(--c-fg-2)]">
                <span className="w-[6px] h-[6px] rounded-full bg-[var(--c-fg)] shadow-[0_0_8px_rgb(var(--tint)/0.8)] animate-em-pulse-fast" />
                {t.nav.availableShort}
              </span>
            </div>
          </Reveal>

          {/* Nash — small photo with a hand-drawn arrow + caption.
              NOTE: reemplaza /me/nash.svg por la foto real de Nash (ej. nash.jpg)
              y actualiza el `src` de abajo. */}
          <Reveal
            delayMs={220}
            className="relative mt-9 flex items-center justify-center gap-3 pl-2"
          >
            {/* caption */}
            <p className="max-w-[130px] text-right font-serif text-[14px] italic leading-[1.35] text-[var(--c-muted)]">
              {t.about.dogCaption}
            </p>

            {/* curved hand-drawn arrow from caption → photo */}
            <svg
              width="52"
              height="46"
              viewBox="0 0 52 46"
              fill="none"
              aria-hidden
              className="shrink-0 -mt-1 text-[rgb(var(--tint)/0.45)]"
            >
              <path
                d="M2 8c14 3 27 12 34 27"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M28 38l8 0-1-9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

            {/* photo */}
            <span className="relative block h-[104px] w-[104px] shrink-0 -rotate-3 overflow-hidden rounded-2xl border border-[rgb(var(--tint)/0.12)] bg-[var(--c-surf)] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:rotate-0">
              <Image
                src="/Dog/Nash.jpeg"
                alt="Nash, el perro de Evan"
                fill
                sizes="104px"
                // unoptimized so the local .svg placeholder renders (Next's image
                // optimizer blocks SVG). Al usar una foto real (jpg/png) podés
                // quitar esta línea para recuperar la optimización.
                unoptimized
                className="object-cover"
              />
            </span>
          </Reveal>
        </div>

        {/* statement + bio */}
        <Reveal delayMs={120} className="min-w-0">
          <TextAnimate
            key={`meta-${lang}`}
            as="p"
            by="word"
            animation="fadeIn"
            once
            className="text-[14px] text-[var(--c-muted)] mb-5"
          >
            {t.about.meta}
          </TextAnimate>
          <h2 className="text-[clamp(28px,4.4vw,52px)] font-semibold tracking-[-0.03em] leading-[1.12] mb-7 max-w-[16ch]">
            {t.about.think1}{" "}
            <Highlighter
              key={`d-${lang}`}
              action="underline"
              color="#8f8f8f"
              strokeWidth={2}
              iterations={2}
              padding={1}
              isView
            >
              <span className="font-serif italic font-medium text-[var(--c-fg)]">
                {t.about.detailsWord}
              </span>
            </Highlighter>
            {t.about.think2}{" "}
            <Highlighter
              key={`s-${lang}`}
              action="underline"
              color="#8f8f8f"
              strokeWidth={2}
              iterations={2}
              padding={1}
              isView
            >
              <span className="font-serif italic font-medium text-[var(--c-fg)]">
                {t.about.scaleWord}
              </span>
            </Highlighter>
            .
          </h2>
          <TextAnimate
            key={`bio-${lang}`}
            as="p"
            by="word"
            animation="blurInUp"
            once
            className="text-[16px] leading-[1.85] text-[var(--c-muted)] max-w-[58ch] mb-12"
          >
            {t.about.bio}
          </TextAnimate>

          <div className="flex flex-wrap items-center gap-x-9 gap-y-5">
            {stats.map((s, i) => (
              <Fragment key={s.label}>
                <div>
                  <div className="text-[clamp(28px,3.2vw,40px)] font-extrabold tracking-[-0.03em] leading-none">
                    {s.value}
                  </div>
                  <div className="text-[12.5px] text-[var(--c-muted)] mt-2">
                    {s.label}
                  </div>
                </div>
                {i < stats.length - 1 && (
                  <Separator orientation="vertical" className="h-10" />
                )}
              </Fragment>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
