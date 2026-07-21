"use client";

import { useEffect, useState } from "react";
import WavyBackground from "@/components/WavyBackground";

// Below this width the animated canvas is swapped for a static SVG. The canvas
// repaints (and clears its bitmap) on every resize event, which flickers while
// the viewport width is being dragged in DevTools' responsive mode. A static
// SVG only gets transform-scaled on resize — it never clears or repaints — so
// it cannot flicker. (On real phones the width never changes, so the canvas is
// fine there; this swap just makes the narrow layout bullet-proof either way.)
const WAVY_MIN_WIDTH = 480;

// Same "sum of sines" wave the canvas uses, sampled once at t=0 to bake a
// static path. Drawn in a 1000×1000 viewBox that gets stretched to fill.
const wave = (x: number, i: number) =>
  Math.sin(x * 0.0016 + i * 1.3) * 0.5 +
  Math.sin(x * 0.0037 + i * 2.1) * 0.28 +
  Math.sin(x * 0.0009 + i * 0.7) * 0.22;

const RIBBONS = 7;
const AMP = 80;

const ribbonPath = (i: number) => {
  const baseY = 1000 * (0.12 + (0.76 * i) / (RIBBONS - 1));
  let d = "";
  for (let x = -40; x <= 1040; x += 20) {
    const y = Math.round((wave(x, i) * AMP + baseY) * 100) / 100;
    d += (x === -40 ? "M" : "L") + x + " " + y + " ";
  }
  return d.trim();
};

function StaticWaves() {
  return (
    <svg
      aria-hidden
      className="fixed inset-x-0 top-0 w-full h-[100lvh] pointer-events-none z-0"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="wavy-static-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <g filter="url(#wavy-static-blur)">
        {Array.from({ length: RIBBONS }, (_, i) => (
          <path
            key={i}
            d={ribbonPath(i)}
            fill="none"
            stroke="rgb(var(--tint))"
            strokeWidth={20}
            strokeLinecap="round"
            // brightest at the top ribbon, fading toward the bottom — mirrors
            // the canvas palette. Uses --tint so it adapts to light/dark.
            strokeOpacity={0.24 - (i / RIBBONS) * 0.16}
          />
        ))}
      </g>
    </svg>
  );
}

export default function ResponsiveBackground() {
  // Default to the wide (canvas) branch so SSR and the first client render
  // agree; correct to the static branch after mount if the viewport is narrow.
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${WAVY_MIN_WIDTH}px)`);
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return wide ? <WavyBackground /> : <StaticWaves />;
}
