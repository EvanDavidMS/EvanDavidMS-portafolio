"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

/**
 * Global smooth scrolling via Lenis. Eases wheel/trackpad scrolling and handles
 * in-page anchor links (`#section`) with an offset for the fixed navbar. Runs a
 * single rAF loop. Disabled under `prefers-reduced-motion` (native scroll).
 * Lenis drives the real document scroll, so window.scrollY / scroll events —
 * and thus the navbar progress + Reveal-on-scroll — keep working.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      // intercept `<a href="#...">` clicks. Lenis already honors the sections'
      // `scroll-mt-[110px]`, so no extra offset (it would double the nav gap).
      anchors: true,
    });
    setLenis(lenis);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
