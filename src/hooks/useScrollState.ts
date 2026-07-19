"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/lib/data";

type ScrollState = {
  active: string;
  progress: number;
  showTop: boolean;
};

export function useScrollState() {
  const [state, setState] = useState<ScrollState>({
    active: "top",
    progress: 0,
    showTop: false,
  });

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;

      let active = navItems[0].id as string;
      const mid = window.scrollY + window.innerHeight * 0.35;
      for (const n of navItems) {
        const el = document.getElementById(n.id);
        if (el && el.offsetTop <= mid) active = n.id;
      }

      const showTop = window.scrollY > 500;

      setState((prev) =>
        prev.progress === progress &&
        prev.active === active &&
        prev.showTop === showTop
          ? prev
          : { progress, active, showTop }
      );
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}
