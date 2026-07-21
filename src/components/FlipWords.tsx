"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Aceternity-style "Flip Words" — cycles through a list of words, each new word
 * easing in with a fade + de-blur + slight rise. Remounting the inner span via
 * `key` re-triggers the CSS `emFlipIn` entrance, so no framer-motion is needed.
 * The word swap is disabled (shows the first word) under
 * `prefers-reduced-motion` via the CSS utility.
 */
export function FlipWords({
  words,
  interval = 3000,
  className,
}: {
  words: string[];
  /** Milliseconds each word stays before flipping to the next. */
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(
      () => setI((prev) => (prev + 1) % words.length),
      interval
    );
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="relative inline-flex">
      <span key={i} className={cn("animate-em-flip", className)}>
        {words[i]}
      </span>
    </span>
  );
}
