"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let done = false;
    const check = () => {
      if (done || !ref.current) return;
      // reveal once the element's top crosses ~65% down the viewport (same
      // "needs a bit more scroll" feel as the -35% bottom margin elsewhere).
      if (ref.current.getBoundingClientRect().top < window.innerHeight * 0.65) {
        done = true;
        setShown(true);
        window.removeEventListener("scroll", check);
      }
    };

    // Runs on mount (covers initial load + restored scroll) and on every scroll
    // until revealed — so nothing can get stuck invisible after a fast jump,
    // reload-mid-page, End key, or anchor navigation.
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <div
      ref={ref}
      style={shown ? { animationDelay: `${delayMs}ms` } : undefined}
      className={cn(
        !shown && "opacity-0",
        shown &&
          "animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-700 ease-out",
        className
      )}
    >
      {children}
    </div>
  );
}
