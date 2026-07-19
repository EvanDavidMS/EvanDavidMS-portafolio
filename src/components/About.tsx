import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/Reveal";

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
        <span className="text-[13px] font-semibold tracking-[0.18em] text-[#8A8A8A] uppercase">
          01 — Sobre mí
        </span>
        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 lg:gap-[72px] items-center">
        {/* portrait */}
        <Reveal className="relative mx-auto w-full max-w-[320px] lg:mx-0">
          <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border border-white/[0.1] hidden sm:block" />
          <div
            className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-[#0E0E0E] grid place-items-center"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 10px)",
            }}
          >
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#5A5A5A] uppercase">
              retrato
            </span>
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-[7px] px-3 py-[7px] rounded-full border border-white/10 bg-[rgba(10,10,10,0.6)] backdrop-blur-sm text-[11px] text-[#C9C9C9]">
              <span className="w-[6px] h-[6px] rounded-full bg-[#F5F5F5] shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-em-pulse-fast" />
              Disponible
            </span>
          </div>
        </Reveal>

        {/* statement + bio */}
        <Reveal delayMs={120} className="min-w-0">
          <p className="text-[14px] text-[#8A8A8A] mb-5">
            Evan Morales — Frontend / Full-Stack Developer
            <span className="text-[#5A5A5A]"> · </span>
            Ciudad de México · Remoto
          </p>
          <h2 className="text-[clamp(28px,4.4vw,52px)] font-semibold tracking-[-0.03em] leading-[1.12] mb-7 max-w-[16ch]">
            Pienso en{" "}
            <span className="font-serif italic font-medium text-white">
              detalles
            </span>
            , construyo para{" "}
            <span className="font-serif italic font-medium text-white">
              escala
            </span>
            .
          </h2>
          <p className="text-[16px] leading-[1.85] text-[#8A8A8A] max-w-[58ch] mb-12">
            Más de 3 años creando productos web modernos. Diseño con
            intención, escribo código tipado y limpio, y persigo el
            performance en cada detalle — del pixel al deploy.
          </p>

          <div className="flex flex-wrap items-center gap-x-9 gap-y-5">
            {stats.map((s, i) => (
              <Fragment key={s.label}>
                <div>
                  <div className="text-[clamp(28px,3.2vw,40px)] font-extrabold tracking-[-0.03em] leading-none">
                    {s.value}
                  </div>
                  <div className="text-[12.5px] text-[#8A8A8A] mt-2">
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
