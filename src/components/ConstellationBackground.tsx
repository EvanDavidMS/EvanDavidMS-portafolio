"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  z: number;
};

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let W = 0;
    let H = 0;
    let pts: Point[] = [];
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let raf = 0;

    const resize = () => {
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(72, Math.round((W * H) / 20000));
      pts = [];
      for (let i = 0; i < target; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.6 + 0.6,
          z: Math.random() * 0.8 + 0.2,
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    resize();

    const R = 150;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      const px = (mouse.x - W / 2) / W;
      const py = (mouse.y - H / 2) / H;
      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;
        const ox = p.x - px * 26 * p.z;
        const oy = p.y - py * 26 * p.z;
        const dx = ox - mouse.x;
        const dy = oy - mouse.y;
        const d = Math.hypot(dx, dy);
        const near = d < R;
        ctx.beginPath();
        ctx.arc(ox, oy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = near
          ? `rgba(255,255,255,${0.35 + (1 - d / R) * 0.5})`
          : "rgba(255,255,255,0.22)";
        ctx.fill();
        if (near) {
          ctx.beginPath();
          ctx.moveTo(ox, oy);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255,255,255,${(1 - d / R) * 0.16})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        const ax = a.x - px * 26 * a.z;
        const ay = a.y - py * 26 * a.z;
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const bx = b.x - px * 26 * b.z;
          const by = b.y - py * 26 * b.z;
          const dx = ax - bx;
          const dy = ay - by;
          const d2 = dx * dx + dy * dy;
          if (d2 < 13000) {
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d2 / 13000) * 0.07})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* grain texture */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-5 mix-blend-screen"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')",
        }}
      />

      {/* ambient glows */}
      <div
        className="fixed -top-[12%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none z-0 blur-[30px] animate-em-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 62%)",
        }}
      />
      <div
        className="fixed -bottom-[15%] -left-[8%] w-[640px] h-[640px] rounded-full pointer-events-none z-0 blur-[28px] animate-em-drift"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0) 66%)",
        }}
      />
      <div
        className="fixed top-[40%] -right-[10%] w-[560px] h-[560px] rounded-full pointer-events-none z-0 blur-[28px] animate-em-drift-reverse"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 68%)",
        }}
      />

      {/* animated constellation field */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
    </>
  );
}
