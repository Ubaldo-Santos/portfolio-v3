import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { pageEase, pageMotion, pageMotionReduced } from "@/lib/motion";

/**
 * Page transition keyed by pathname: fade, lift and soft de-blur on enter.
 * Scrolls to top on route change. Skips the first render to avoid hydration flicker.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    // Instant scroll avoids shared-layout (nav pill) measuring wrong positions mid-scroll.
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, mounted]);

  if (!mounted) return <>{children}</>;

  const variants = reduced ? pageMotionReduced : pageMotion;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={reduced ? { duration: 0.15 } : pageEase}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
