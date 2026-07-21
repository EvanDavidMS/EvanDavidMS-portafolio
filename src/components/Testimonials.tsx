import { Quote } from "lucide-react";

import { testimonials, type Testimonial } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/magicui/marquee";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Highlighter } from "@/components/magicui/highlighter";

const half = Math.ceil(testimonials.length / 2);
const rowA = testimonials.slice(0, half);
const rowB = testimonials.slice(half);

function TestimonialCard({ t }: { t: Testimonial }) {
  const initial = t.author.trim().charAt(0).toUpperCase();
  return (
    <figure className="flex w-[340px] shrink-0 flex-col justify-between gap-4 rounded-2xl border border-[rgb(var(--tint)/0.08)] bg-[rgb(var(--tint)/0.02)] p-5">
      <div>
        <Quote
          className="mb-2.5 h-5 w-5 text-[rgb(var(--tint)/0.22)]"
          aria-hidden
        />
        <blockquote className="text-[13.5px] leading-[1.6] text-[var(--c-fg-2)]">
          {t.quote}
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[rgb(var(--tint)/0.12)] bg-[rgb(var(--tint)/0.05)] text-[13px] font-semibold text-[var(--c-fg)]"
        >
          {initial}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-[13px] font-semibold text-[var(--c-fg)]">
            {t.author}
          </span>
          <span className="truncate text-[11.5px] text-[var(--c-muted)]">
            {t.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative z-10 max-w-[1120px] mx-auto px-6 py-[70px] scroll-mt-[110px]"
    >
      <div className="flex items-center gap-[14px] mb-6">
        <TextAnimate
          as="span"
          by="character"
          animation="blurInUp"
          once
          className="text-[13px] font-semibold tracking-[0.18em] text-[var(--c-muted)] uppercase"
        >
          04 — Testimonios
        </TextAnimate>
        <Separator className="flex-1" />
      </div>

      <h3 className="mb-9 max-w-[38ch] text-[clamp(22px,2.6vw,30px)] font-semibold leading-[1.28] tracking-[-0.02em]">
        Lo que dicen quienes ya{" "}
        <Highlighter
          action="underline"
          color="#8f8f8f"
          strokeWidth={2}
          iterations={2}
          padding={1}
          isView
        >
          <span className="font-serif italic font-medium text-[var(--c-fg-2)]">
            confiaron
          </span>
        </Highlighter>
        .
      </h3>

      <Reveal>
        {/* two rows scrolling in opposite directions, faded at both edges */}
        <div className="relative [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <Marquee pauseOnHover className="[--duration:44s] [--gap:1.25rem]">
            {rowA.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </Marquee>
          <Marquee
            reverse
            pauseOnHover
            className="mt-5 [--duration:52s] [--gap:1.25rem]"
          >
            {rowB.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
}
