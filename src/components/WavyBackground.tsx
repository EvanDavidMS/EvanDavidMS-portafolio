"use client";

import { useEffect, useRef, useState } from "react";

// Ribbon palettes per theme (light ribbons read on the light bg, and vice versa)
const DARK_COLORS = [
  "#ffffff",
  "#e5e5e5",
  "#c9c9c9",
  "#a3a3a3",
  "#8a8a8a",
  "#6b6b6b",
  "#4d4d4d",
];
const LIGHT_COLORS = [
  "#dfe0e3",
  "#cccdd2",
  "#b3b5bc",
  "#999ca4",
  "#80838c",
  "#686b74",
  "#52555e",
];

/**
 * Aceternity-style "Wavy Background" — flowing ribbons drawn on a full-bleed
 * canvas (monochrome, dependency-free: wave = sum of sines). Theme-aware: swaps
 * the ribbon palette when the `dark` class on <html> toggles. Fades in on mount
 * so the lines don't pop. Pauses while the tab is hidden; freezes under
 * `prefers-reduced-motion`. Meant to REPLACE the particle field as the fixed
 * `z-0` background — don't run it alongside another animated canvas.
 */
export default function WavyBackground({
  waveWidth = 16,
  blur = 9,
  speed = 0.00184,
  waveOpacity = 0.34,
}: {
  waveWidth?: number;
  blur?: number;
  speed?: number;
  waveOpacity?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // track the active theme
  useEffect(() => {
    const read = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const colors = isDark ? DARK_COLORS : LIGHT_COLORS;
    // The whole canvas is heavily blurred (via CSS below), so rendering at 1x
    // device pixels is visually identical to 2x while drawing ~4x fewer pixels
    // per frame on retina screens — a big, invisible win for smoothness.
    const dpr = 1;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let W = 0;
    let H = 0;
    let raf = 0;
    let nt = 0;

    const wave = (x: number, i: number, t: number) =>
      Math.sin(x * 0.0016 + i * 1.3 + t) * 0.5 +
      Math.sin(x * 0.0037 + i * 2.1 - t * 1.3) * 0.28 +
      Math.sin(x * 0.0009 + i * 0.7 + t * 0.6) * 0.22;

    // dt = ms since the last painted frame; advancing nt by real elapsed time
    // (not a fixed step) keeps the waves moving at the same speed no matter the
    // frame rate — so capping to 30fps below doesn't slow them down.
    const render = (dt = 1000 / 60) => {
      nt += speed * (dt / (1000 / 60));
      ctx.clearRect(0, 0, W, H);
      // The blur is applied once by the GPU as a CSS filter on the <canvas>
      // element (see below) rather than per-frame via ctx.filter — the latter
      // re-runs an expensive CPU blur over the whole canvas every single frame.
      // Strokes are drawn crisp here; CSS softens the whole layer.
      ctx.globalAlpha = waveOpacity;
      // cap amplitude by width too, so on narrow (mobile) screens the ribbons
      // stay gentle instead of swinging past their spacing and tangling
      const amp = Math.min(H * 0.19, W * 0.14);
      for (let i = 0; i < colors.length; i++) {
        const baseY = H * (0.12 + (0.76 * i) / Math.max(1, colors.length - 1));
        ctx.beginPath();
        // canvas is rendered at half size and scaled 2x on screen (cheaper
        // blur), so halve the stroke and double the wave frequency (x*2) to
        // land back on the exact same on-screen result.
        ctx.lineWidth = waveWidth / 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = colors[i];
        for (let x = -20; x <= W + 20; x += 6) {
          const y = wave(x * 2, i, nt) * amp + baseY;
          if (x === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      // Skip if unchanged — mobile browsers fire resize when the URL bar
      // shows/hides; re-setting canvas.width clears it and re-lays-out the
      // waves, which reads as flicker/jitter. The canvas uses a stable 100lvh
      // height (below) so this guard early-returns on those scroll events.
      if (w === W && h === H) return;
      W = w;
      H = h;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Setting canvas.width above wipes the bitmap to transparent. The rAF
      // loop only repaints on the *next* frame, so while the width is changing
      // rapidly (dragging the viewport) the browser can paint the blank canvas
      // in that gap — the flicker. Repaint synchronously here so the canvas is
      // never left empty between a resize and the next animation frame.
      render();
    };

    // Cap to ~30fps. The blur is re-rasterized over the full-screen layer on
    // every repaint, so halving the repaint rate ~halves the GPU cost — and for
    // waves this slow, 30fps is indistinguishable from 60.
    const frameInterval = 1000 / 30;
    let lastPaint = 0;
    let lastTime = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) {
        lastTime = now;
        return;
      }
      if (now - lastPaint < frameInterval) return;
      const dt = Math.min(50, now - lastTime);
      lastPaint = now;
      lastTime = now;
      render(dt);
    };

    resize();
    // Observe the canvas box directly rather than listening to window "resize".
    // A ResizeObserver fires reliably whenever the element's rendered size
    // actually changes — including DevTools responsive-mode drags and
    // scrollbar-driven width changes — and reports the true box size, so the
    // waves always track the current viewport instead of getting stuck.
    // resize() repaints synchronously, so this keeps the canvas correct under
    // reduced motion too (where the rAF loop isn't running).
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    if (reduce) {
      render();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const showRaf = requestAnimationFrame(() => setVisible(true));

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(showRaf);
      ro.disconnect();
    };
  }, [isDark, waveWidth, blur, speed, waveOpacity]);

  return (
    <canvas
      ref={ref}
      // Rendered at half size then scaled 2x, so the GPU blur runs over a
      // quarter of the pixels (~4x cheaper). blur is halved here because the
      // scale doubles it back to `blur`px on screen.
      style={{
        filter: `blur(${blur / 2}px)`,
        transform: "scale(2)",
        transformOrigin: "0 0",
      }}
      className={`fixed left-0 top-0 h-[50lvh] w-[50vw] pointer-events-none z-0 transition-opacity duration-[1400ms] ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
