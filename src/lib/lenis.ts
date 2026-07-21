import type Lenis from "lenis";

// Tiny module singleton so components (e.g. BackToTop) can reach the active
// Lenis instance without prop-drilling or context.
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;
