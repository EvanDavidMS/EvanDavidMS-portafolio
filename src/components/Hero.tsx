import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <header
      id="top"
      className="relative z-10 min-h-[100svh] max-w-[1120px] mx-auto px-6 pt-24 pb-10 flex flex-col items-center justify-center text-center"
    >
      <div className="inline-flex items-center gap-[9px] px-[15px] py-[7px] rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md text-[13px] text-[#8A8A8A] mb-[26px]">
        <span className="w-[7px] h-[7px] rounded-full bg-[#F5F5F5] shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-em-pulse-slow" />
        Disponible para nuevos proyectos
      </div>

      <p className="text-[15px] text-[#8A8A8A] font-normal mb-5">
        Hola, soy Evan Morales — Desarrollador Frontend / Full&nbsp;Stack
      </p>

      <h1 className="font-bold text-[clamp(36px,5.6vw,76px)] leading-[1.04] tracking-[-0.035em] max-w-[15ch] text-balance [text-shadow:0_0_48px_rgba(255,255,255,0.14)]">
        Construyo interfaces{" "}
        <span className="font-serif italic font-medium text-white underline decoration-2 underline-offset-[9px] decoration-white/[0.28] [text-shadow:0_0_26px_rgba(255,255,255,0.4)]">
          limpias
        </span>{" "}
        y experiencias que{" "}
        <span className="font-serif italic font-medium text-white underline decoration-2 underline-offset-[9px] decoration-white/[0.28] [text-shadow:0_0_26px_rgba(255,255,255,0.4)]">
          se sienten bien.
        </span>
      </h1>

      <p className="mt-6 max-w-[56ch] text-[clamp(15px,1.5vw,17px)] leading-[1.6] text-[#8A8A8A]">
        Diseño y desarrollo productos digitales de principio a fin: rápidos,
        accesibles y cuidados hasta el último pixel.
      </p>

      <div className="flex flex-wrap gap-[14px] justify-center mt-8">
        <Button
          asChild
          className="h-auto rounded-full px-7 py-[15px] text-[15px] font-semibold border border-white/25 shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)]"
        >
          <a href="#contact">Hablemos →</a>
        </Button>
        <Button
          asChild
          variant="secondary"
          className="h-auto rounded-full px-7 py-[15px] text-[15px] font-medium bg-white/[0.04] border border-white/[0.12] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-0.5"
        >
          <a href="#">Descargar CV</a>
        </Button>
      </div>
    </header>
  );
}
