import { skillGroups } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/Reveal";
import { GlowingEffect } from "@/components/GlowingEffect";
import { cn } from "@/lib/utils";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative z-10 max-w-[1120px] mx-auto px-6 py-[70px] scroll-mt-[110px]"
    >
      <div className="flex items-center gap-[14px] mb-11">
        <span className="text-[13px] font-semibold tracking-[0.18em] text-[#8A8A8A] uppercase">
          02 — Skills & Stack
        </span>
        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[22px] items-stretch">
        <Reveal className="lg:col-span-1 min-w-0 relative overflow-hidden p-9 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.01] flex flex-col justify-between gap-6">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/[0.06] blur-3xl pointer-events-none" />
          <span className="relative grid place-items-center w-[46px] h-[46px] rounded-2xl border border-white/[0.12] bg-white/[0.04] text-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            ⌘
          </span>
          <div className="relative">
            <h3 className="text-[clamp(22px,2.6vw,28px)] font-semibold tracking-[-0.02em] leading-[1.25]">
              Herramientas con las que desarrollo en{" "}
              <span className="font-serif italic font-medium text-[#CFCFCF]">
                producción
              </span>
              .
            </h3>
            <p className="mt-[14px] text-[15px] leading-[1.65] text-[#8A8A8A]">
              Un stack moderno, tipado y probado en el mundo real.
            </p>
          </div>
        </Reveal>

        <Reveal
          delayMs={100}
          className="lg:col-span-2 min-w-0 p-[34px] rounded-3xl border border-white/[0.08] bg-white/[0.02]"
        >
          {skillGroups.map((group, gi) => (
            <div key={group.title}>
              {gi > 0 && <Separator className="my-7" />}
              <div className="flex items-baseline justify-between mb-4">
                <h4 className="text-[13px] font-semibold tracking-[0.1em] text-[#E4E4E4] uppercase">
                  {group.title}
                </h4>
                <span className="text-[12.5px] text-[#7A7A7A]">
                  {group.desc}
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="group relative inline-flex items-center gap-2.5 pl-2.5 pr-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.16] hover:bg-white/[0.06] hover:shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                    >
                      <GlowingEffect radius={90} />
                      <span className="relative grid place-items-center w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.07] shrink-0">
                        <Icon
                          size={15}
                          color="currentColor"
                          className={cn(
                            "text-[#9A9A9A] transition-colors duration-300",
                            item.hoverText
                          )}
                        />
                      </span>
                      <span className="relative text-[13.5px] font-medium text-[#E4E4E4]">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
