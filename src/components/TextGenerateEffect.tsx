import { cn } from "@/lib/utils";

export type TextSegment = {
  /** The text of this segment. Split into words unless `whole` is set. */
  text: string;
  /** Classes applied to each word span of this segment (e.g. italic accent). */
  className?: string;
  /** Animate the whole segment as one unit instead of word-by-word — keeps
   *  continuous underlines/decorations intact on styled phrases. */
  whole?: boolean;
};

/**
 * Aceternity-style "Text Generate Effect" — each word fades in and de-blurs on
 * load, one after another. Accepts rich `segments` (not a plain string) so the
 * heading can keep its italic/underlined accents while still staggering. Pure
 * CSS (`emWordIn` keyframe + per-word `animation-delay`, see `globals.css`); no
 * client JS. Collapses to instant text under `prefers-reduced-motion`.
 *
 * Renders a fragment of inline spans — drop it directly inside a heading so the
 * heading's own typography styles still apply.
 */
export function TextGenerateEffect({
  segments,
  stagger = 0.12,
  delay = 0,
  className,
}: {
  segments: TextSegment[];
  /** Seconds between each word's entrance. */
  stagger?: number;
  /** Seconds to wait before the first word starts. */
  delay?: number;
  className?: string;
}) {
  let idx = 0;
  return (
    <>
      {segments.map((seg, si) => {
        const units = seg.whole ? [seg.text] : seg.text.split(" ");
        return units.map((unit, ui) => {
          const wordDelay = delay + idx * stagger;
          idx++;
          return (
            <span
              key={`${si}-${ui}`}
              className={cn("animate-em-word", seg.className, className)}
              style={{ animationDelay: `${wordDelay}s` }}
            >
              {unit}{" "}
            </span>
          );
        });
      })}
    </>
  );
}
