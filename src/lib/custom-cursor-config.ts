/**
 * Custom cursor tuning — edit here to change feel without touching component logic.
 */
export const customCursorConfig = {
  media: "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)",

  dot: {
    sizePx: 5,
    fadeMs: 150,
    opacity: 1,
  },

  ring: {
    sizePx: { idle: 32, hover: 52, pressed: 14 },
    opacity: { idle: 0.5, hover: 0.72, hidden: 0 },
    borderWidthPx: 1.5,
    sizeTransitionMs: 220,
    sizeEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    /** Ring trails the dot — lower stiffness = more lag. */
    lag: {
      stiffness: 0.085,
      damping: 0.8,
      hoverStiffness: 0.13,
      pressStiffness: 0.2,
      pressDamping: 0.72,
      maxVelocityPx: 22,
    },
  },

  ripple: {
    durationMs: 620,
    startSizePx: 12,
    endSizePx: 128,
  },
} as const;

export type CustomCursorConfig = typeof customCursorConfig;

export function applyCustomCursorCssVars(
  cfg: CustomCursorConfig = customCursorConfig,
  root: HTMLElement = document.documentElement,
) {
  const s = root.style;
  s.setProperty("--cursor-dot-size", `${cfg.dot.sizePx}px`);
  s.setProperty("--cursor-dot-fade-ms", `${cfg.dot.fadeMs}ms`);
  s.setProperty("--cursor-ring-border", `${cfg.ring.borderWidthPx}px`);
  s.setProperty("--cursor-ring-size-ms", `${cfg.ring.sizeTransitionMs}ms`);
  s.setProperty("--cursor-ring-size-ease", cfg.ring.sizeEase);
  s.setProperty("--cursor-ripple-duration", `${cfg.ripple.durationMs}ms`);
  s.setProperty("--cursor-ripple-start", `${cfg.ripple.startSizePx}px`);
  s.setProperty("--cursor-ripple-end", `${cfg.ripple.endSizePx}px`);
}

export function clearCustomCursorCssVars(root: HTMLElement = document.documentElement) {
  const keys = [
    "--cursor-dot-size",
    "--cursor-dot-fade-ms",
    "--cursor-ring-border",
    "--cursor-ring-size-ms",
    "--cursor-ring-size-ease",
    "--cursor-ripple-duration",
    "--cursor-ripple-start",
    "--cursor-ripple-end",
  ];
  for (const key of keys) root.style.removeProperty(key);
}

export function stepCursorSpring(
  mx: number,
  my: number,
  rx: number,
  ry: number,
  vx: number,
  vy: number,
  opts: { stiffness: number; damping: number; maxVelocityPx: number },
) {
  let nvx = (vx + (mx - rx) * opts.stiffness) * opts.damping;
  let nvy = (vy + (my - ry) * opts.stiffness) * opts.damping;
  const speed = Math.hypot(nvx, nvy);
  if (speed > opts.maxVelocityPx) {
    const scale = opts.maxVelocityPx / speed;
    nvx *= scale;
    nvy *= scale;
  }
  return { rx: rx + nvx, ry: ry + nvy, vx: nvx, vy: nvy };
}
