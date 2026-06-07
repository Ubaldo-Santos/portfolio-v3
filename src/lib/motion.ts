export const easeOut = [0.22, 1, 0.36, 1] as const;

export const springSnappy = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.85,
} as const;

export const pageEase = {
  duration: 0.42,
  ease: easeOut,
} as const;

export const revealEase = {
  duration: 0.58,
  ease: easeOut,
} as const;

export const pageMotion = {
  initial: { opacity: 0, y: 16, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -12, filter: "blur(6px)" },
} as const;

export const pageMotionReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

export const staggerContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
} as const;

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: revealEase,
  },
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: revealEase,
  },
} as const;
