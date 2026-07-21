import { cn } from "@/lib/utils";

/**
 * Aceternity-style "Spotlight" — a soft, angled beam of light that eases into
 * place once on load. Rendered as a blurred radial-gradient blob rather than
 * the original heavy SVG, tuned subtle + monochrome so it layers over the
 * ConstellationBackground without competing with it. Pure CSS (`emSpotlight`
 * keyframe); the position/rotation/scale all live in the keyframe, so don't add
 * Tailwind transform classes on top. Place inside a `relative` + clipped parent.
 */
export function Spotlight({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-em-spotlight pointer-events-none absolute left-[18%] top-0 h-[130%] w-[55%] rounded-full blur-[42px]",
        className
      )}
      style={{
        background:
          "radial-gradient(ellipse at center, rgb(var(--tint)/0.10) 0%, rgb(var(--tint)/0.045) 38%, rgb(var(--tint)/0) 72%)",
      }}
    />
  );
}
