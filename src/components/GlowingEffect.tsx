"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Cursor-tracked glowing border. Render as a child of a `relative group`
 * container — it attaches its own mousemove listener to that parent (no
 * prop wiring needed) and fades in via `group-hover:opacity-100`.
 */
export function GlowingEffect({
  className,
  radius = 100,
}: {
  className?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const handleMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      el.style.setProperty(
        "--x",
        `${((e.clientX - rect.left) / rect.width) * 100}%`
      );
      el.style.setProperty(
        "--y",
        `${((e.clientY - rect.top) / rect.height) * 100}%`
      );
    };

    parent.addEventListener("mousemove", handleMove);
    return () => parent.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        className
      )}
      style={
        {
          background: `radial-gradient(${radius}px circle at var(--x, 50%) var(--y, 50%), rgb(var(--tint)/0.85), transparent 70%)`,
          padding: "1px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
    />
  );
}
