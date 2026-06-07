import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "motion/react";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const pageShellClass = "mx-auto max-w-6xl px-5 pt-6 pb-20 sm:px-8 sm:pt-10 sm:pb-28";

export const pageKickerClass =
  "font-mono text-[11px] uppercase tracking-widest text-muted-foreground";

export const pageTitleClass = "mt-2 font-display text-6xl sm:text-7xl";

export const PAGE_ROUTES = {
  home: "00",
  experience: "01",
  projects: "02",
  skills: "03",
  cv: "04",
  contact: "05",
} as const;

export type PageRouteKey = keyof typeof PAGE_ROUTES;

const PAGE_NAV_KEY: Record<PageRouteKey, `nav.${string}`> = {
  home: "nav.home",
  experience: "nav.experience",
  projects: "nav.projects",
  skills: "nav.skills",
  cv: "nav.cv",
  contact: "nav.contact",
};

/** Editorial index label — always `NN //` with optional trailing title. */
export function SectionIndex({ index, label }: { index: string; label?: ReactNode }) {
  return (
    <div className={pageKickerClass}>
      {index} //{label != null && label !== "" ? <> {label}</> : null}
    </div>
  );
}

export function PageKicker({ page }: { page: PageRouteKey }) {
  return <SectionIndex index={PAGE_ROUTES[page]} />;
}

export function PageShell({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn(pageShellClass, className)}>{children}</div>;
}

type PageHeaderProps = {
  page: PageRouteKey;
  /** Defaults to the same label as the navbar (`nav.*`). */
  title?: ReactNode;
  subtitle?: string;
  hint?: string;
  actions?: ReactNode;
};

export function PageHeaderBlock({ page, title, subtitle, hint, actions }: PageHeaderProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const heading = title ?? t(PAGE_NAV_KEY[page]);

  const copy = (
    <motion.div
      variants={reduced ? undefined : staggerContainer}
      initial={reduced ? false : "hidden"}
      animate={reduced ? undefined : "show"}
    >
      <motion.div variants={reduced ? undefined : staggerItem}>
        <PageKicker page={page} />
      </motion.div>
      <motion.h1 className={pageTitleClass} variants={reduced ? undefined : staggerItem}>
        {heading}
      </motion.h1>
      {subtitle ? (
        <motion.p
          className="mt-4 max-w-xl text-lg text-muted-foreground"
          variants={reduced ? undefined : staggerItem}
        >
          {subtitle}
        </motion.p>
      ) : null}
      {hint ? (
        <motion.p
          className="mt-4 text-sm text-muted-foreground"
          variants={reduced ? undefined : staggerItem}
        >
          {hint}
        </motion.p>
      ) : null}
    </motion.div>
  );

  if (actions) {
    return (
      <div className="flex flex-wrap items-start justify-between gap-6">
        {copy}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {actions}
        </motion.div>
      </div>
    );
  }

  return copy;
}

export function PageHeader(props: PageHeaderProps) {
  return <PageHeaderBlock {...props} />;
}
