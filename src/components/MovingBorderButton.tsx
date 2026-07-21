import { cn } from "@/lib/utils";

/**
 * Aceternity-style "Moving Border" CTA — a bright light sweeps forever around
 * a 1.5px frame. At rest the frame matches the site's standard
 * `rgba(255,255,255,0.25)` border, so it reads identically to a static button
 * until the glint travels around; the primary fill covers the center so the
 * light only shows on the frame. Pure CSS (`@property --em-angle` spin +
 * `conic-gradient`, see `globals.css`) — no client JS, no animation loop. When
 * `prefers-reduced-motion` is set, the sweep is hidden and a static frame
 * takes over.
 *
 * Renders an anchor; pass any extra classes for the outer pill (layout, shadow).
 */
export function MovingBorderButton({
  href,
  children,
  duration = 5,
  className,
  innerClassName,
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  /** Seconds for one full revolution of the light. */
  duration?: number;
  className?: string;
  innerClassName?: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "group relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-[0_8px_30px_rgb(var(--tint)/0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgb(var(--tint)/0.2)]",
        className
      )}
    >
      {/* Rotating light frame */}
      <span
        aria-hidden
        className="animate-em-spin absolute inset-0 rounded-full motion-reduce:hidden"
        style={
          {
            "--em-spin-duration": `${duration}s`,
            background:
              "conic-gradient(from var(--em-angle), rgb(var(--tint)/0.22) 0deg, rgb(var(--tint)/0.22) 250deg, rgb(var(--tint)/0.9) 300deg, rgb(var(--tint)) 320deg, rgb(var(--tint)/0.9) 340deg, rgb(var(--tint)/0.22) 360deg)",
          } as React.CSSProperties
        }
      />
      {/* Static frame fallback when motion is reduced */}
      <span
        aria-hidden
        className="absolute inset-0 hidden rounded-full bg-[rgb(var(--tint)/0.2)] motion-reduce:block"
      />
      {/* Opaque content pill — covers the center so only the frame lights up */}
      <span
        className={cn(
          "relative inline-flex items-center rounded-full bg-primary px-7 py-[15px] text-[15px] font-semibold text-primary-foreground transition-colors duration-300 group-hover:bg-primary/90",
          innerClassName
        )}
      >
        {children}
      </span>
    </a>
  );
}
