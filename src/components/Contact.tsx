import { socials } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 max-w-[1120px] mx-auto px-6 pt-20 pb-[90px] scroll-mt-[110px]"
    >
      <div className="relative overflow-hidden px-8 py-[clamp(44px,7vw,90px)] rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.015] text-center">
        <div
          className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full pointer-events-none blur-[20px] animate-em-pulse-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%)",
          }}
        />
        <div className="relative">
          <p className="text-sm tracking-[0.14em] uppercase text-[#8A8A8A] mb-[22px]">
            04 — Contacto
          </p>
          <h2 className="text-[clamp(34px,6vw,66px)] font-bold tracking-[-0.035em] leading-[1.05]">
            Trabajemos{" "}
            <span className="font-serif italic font-medium text-[#CFCFCF]">
              juntos.
            </span>
          </h2>
          <p className="mx-auto mt-[22px] max-w-[44ch] text-base leading-[1.65] text-[#8A8A8A]">
            ¿Tienes una idea o un producto en mente? Escríbeme y lo
            construimos.
          </p>
          <div className="flex flex-wrap gap-[14px] justify-center mt-[38px]">
            <Button
              asChild
              className="h-auto rounded-full px-[30px] py-[15px] text-[15px] font-semibold border border-white/25 shadow-[0_8px_30px_rgba(255,255,255,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-[0_12px_40px_rgba(255,255,255,0.22)]"
            >
              <a href="mailto:hola@evanmorales.dev">Hablemos →</a>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="h-auto rounded-full px-[30px] py-[15px] text-[15px] font-medium bg-white/[0.04] border border-white/[0.12] transition-colors duration-300 hover:bg-white/[0.08]"
            >
              <a href="#">Descargar CV</a>
            </Button>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-[34px]">
            {socials.map((s) => (
              <Button
                key={s}
                asChild
                variant="outline"
                className="h-auto rounded-full gap-2 px-[18px] py-[10px] border-white/[0.08] bg-white/[0.02] text-sm font-normal text-[#C9C9C9] transition-colors duration-200 hover:bg-white/[0.07] hover:text-white"
              >
                <a href="#">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A8A8A]" />
                  {s}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
