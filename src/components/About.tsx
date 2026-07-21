import { Fragment } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/Reveal";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Highlighter } from "@/components/magicui/highlighter";

const stats = [
  { value: "10+", label: "Proyectos" },
  { value: "5", label: "Apps live" },
  { value: "3+", label: "Años exp." },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 max-w-[1120px] mx-auto px-6 py-[70px] scroll-mt-[110px]"
    >
      <div className="flex items-center gap-[14px] mb-14">
        <TextAnimate
          as="span"
          by="character"
          animation="blurInUp"
          once
          className="text-[13px] font-semibold tracking-[0.18em] text-[var(--c-muted)] uppercase"
        >
          01 — Sobre mí
        </TextAnimate>
        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 lg:gap-[72px] items-center">
        {/* portrait */}
        <Reveal className="relative mx-auto w-full max-w-[320px] lg:mx-0">
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
              Disponible
            </span>
          </div>
        </Reveal>

        {/* statement + bio */}
        <Reveal delayMs={120} className="min-w-0">
          <TextAnimate
            as="p"
            by="word"
            animation="fadeIn"
            once
            className="text-[14px] text-[var(--c-muted)] mb-5"
          >
            Evan Morales — Frontend / Full-Stack Developer · Ciudad de México ·
            Remoto
          </TextAnimate>
          <h2 className="text-[clamp(28px,4.4vw,52px)] font-semibold tracking-[-0.03em] leading-[1.12] mb-7 max-w-[16ch]">
            Pienso en{" "}
            <Highlighter
              action="underline"
              color="#8f8f8f"
              strokeWidth={2}
              iterations={2}
              padding={1}
              isView
            >
              <span className="font-serif italic font-medium text-[var(--c-fg)]">
                detalles
              </span>
            </Highlighter>
            , construyo para{" "}
            <Highlighter
              action="underline"
              color="#8f8f8f"
              strokeWidth={2}
              iterations={2}
              padding={1}
              isView
            >
              <span className="font-serif italic font-medium text-[var(--c-fg)]">
                escala
              </span>
            </Highlighter>
            .
          </h2>
          <TextAnimate
            as="p"
            by="word"
            animation="blurInUp"
            once
            className="text-[16px] leading-[1.85] text-[var(--c-muted)] max-w-[58ch] mb-12"
          >
            Más de 3 años creando productos web modernos. Diseño con intención,
            escribo código tipado y limpio, y persigo el performance en cada
            detalle — del pixel al deploy.
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
