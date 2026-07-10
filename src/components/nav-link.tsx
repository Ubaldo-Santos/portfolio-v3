import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { springSnappy } from "@/lib/motion";

type NavLinkProps = {
  to: string;
  label: string;
  onClick?: () => void;
  className?: string;
  mobile?: boolean;
  /** Sliding pill — desktop only; never enable on mobile menu items. */
  animated?: boolean;
};

function useIsActive(to: string) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

const activePillClass =
  "pointer-events-none absolute inset-0 rounded-full border border-hairline bg-surface shadow-[0_1px_0_rgba(0,0,0,0.03)]";

export function NavLink({ to, label, onClick, className, mobile, animated = false }: NavLinkProps) {
  const isActive = useIsActive(to);
  const reduced = useReducedMotion();
  const showAnimatedPill = animated && isActive && !reduced;
  const showStaticPill = !mobile && isActive && !showAnimatedPill;

  return (
    <Link
      to={to}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/15",
        mobile
          ? cn(
              "rounded-lg px-3 py-3 text-base",
              isActive
                ? "font-medium text-foreground"
                : "text-muted-foreground hover:bg-surface/60 hover:text-foreground",
            )
          : cn(
              "rounded-full px-3 py-1.5 text-sm",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            ),
        className,
      )}
    >
      {showAnimatedPill ? (
        <motion.span
          layoutId="main-nav-indicator"
          layoutScroll={false}
          className={activePillClass}
          transition={springSnappy}
        />
      ) : showStaticPill ? (
        <span className={activePillClass} />
      ) : null}
      <span className="relative z-10">{label}</span>
    </Link>
  );
}
