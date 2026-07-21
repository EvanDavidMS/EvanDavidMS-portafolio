"use client";

import { useScrollState } from "@/hooks/useScrollState";
import { Button } from "@/components/ui/button";
import { getLenis } from "@/lib/lenis";

export default function BackToTop() {
  const { showTop } = useScrollState();

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={toTop}
      aria-label="Volver arriba"
      variant="outline"
      className={`fixed right-[26px] bottom-[26px] z-[60] h-12 w-12 rounded-full border-[rgb(var(--tint)/0.12)] bg-[rgb(var(--c-surf-rgb)/0.6)] backdrop-blur-xl text-[var(--c-fg)] text-lg shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgb(var(--tint)/0.08)] transition-all duration-300 hover:bg-[rgb(var(--tint)/0.1)] hover:-translate-y-0.5 ${
        showTop
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      ↑
    </Button>
  );
}
