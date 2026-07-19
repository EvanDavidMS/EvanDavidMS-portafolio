"use client";

import { useScrollState } from "@/hooks/useScrollState";
import { Button } from "@/components/ui/button";

export default function BackToTop() {
  const { showTop } = useScrollState();

  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      variant="outline"
      className={`fixed right-[26px] bottom-[26px] z-[60] h-12 w-12 rounded-full border-white/[0.12] bg-[rgba(20,20,20,0.6)] backdrop-blur-xl text-[#F5F5F5] text-lg shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 ${
        showTop
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      ↑
    </Button>
  );
}
