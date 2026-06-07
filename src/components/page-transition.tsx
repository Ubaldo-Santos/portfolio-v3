import { useEffect, type ReactNode } from "react";
import { Outlet, useMatch, useMatches, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { pageEase, pageMotion, pageMotionReduced } from "@/lib/motion";

/** Root wrapper for each route — must be the direct child of AnimatePresence (via Outlet key). */
export function MotionPage({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const variants = reduced ? pageMotionReduced : pageMotion;

  return (
    <motion.div
      className="w-full"
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={reduced ? { duration: 0.15 } : pageEase}
    >
      {children}
    </motion.div>
  );
}

/**
 * Page transition keyed by route match id (TanStack Router + Motion pattern).
 * Outlet must be the direct child of AnimatePresence so exit keeps the old page frozen.
 */
export function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const matches = useMatches();
  const match = useMatch({ strict: false });
  const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1;
  const nextMatch = matches[nextMatchIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait" initial={false}>
        <Outlet key={nextMatch?.id ?? pathname} />
      </AnimatePresence>
    </div>
  );
}
