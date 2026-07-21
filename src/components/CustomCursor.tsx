"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor — a solid dot that tracks the pointer 1:1 plus a ring that
 * trails it with easing. The ring grows (and fills faintly) over interactive
 * elements and both compress on press. Rendered white under
 * `mix-blend-difference`, so it inverts against whatever is behind it and reads
 * in both light and dark themes. Disabled on touch/coarse pointers and under
 * prefers-reduced-motion, where the native cursor is left alone.
 */
const HOVER_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, summary, .cursor-pointer";

export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return; // touch / reduced-motion → keep native cursor

    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!root || !dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let shown = false;
    let running = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // the dot is glued to the pointer — set it every move for zero lag
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (!shown) {
        shown = true;
        root.style.opacity = "1";
      }
      const target = e.target as Element | null;
      const interactive = !!target?.closest?.(HOVER_SELECTOR);
      root.dataset.hover = interactive ? "true" : "false";
      startLoop();
    };

    const onDown = () => (root.dataset.down = "true");
    const onUp = () => (root.dataset.down = "false");
    const onLeave = () => (root.style.opacity = "0");
    const onEnter = () => {
      if (shown) root.style.opacity = "1";
    };

    const tick = () => {
      // ease the ring toward the pointer (higher = snappier)
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      // stop looping once the ring has caught up — no wasted frames while the
      // pointer is still; onMove restarts it.
      if (Math.abs(mx - rx) < 0.1 && Math.abs(my - ry) < 0.1) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    function startLoop() {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    startLoop();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="em-cursor pointer-events-none fixed inset-0 z-[9999] opacity-0 mix-blend-difference"
    >
      {/* trailing ring */}
      <div
        ref={ringRef}
        className="em-cursor-ring fixed left-0 top-0 grid place-items-center rounded-full border border-white/70"
      />
      {/* pointer dot */}
      <div
        ref={dotRef}
        className="em-cursor-dot fixed left-0 top-0 rounded-full bg-white"
      />
    </div>
  );
}
