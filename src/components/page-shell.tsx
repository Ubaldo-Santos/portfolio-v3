import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export const pageShellClass = "mx-auto max-w-6xl px-5 pt-6 pb-20 sm:px-8 sm:pt-10 sm:pb-28";

/** Gap between PageHeader and the first content block (contact, skills, CV hint, …). */
export const pageLeadClass = "mt-12";

/** PageShell bottom padding when full-bleed content follows (e.g. CV canvas). */
export const pageShellLeadGapClass = "pb-12 sm:pb-16";

/** Standalone bottom padding for pages whose shell ends before main content. */
export const pageBottomClass = "pb-20 sm:pb-28";

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
  const heading = title ?? t(PAGE_NAV_KEY[page]);

  const copy = (
    <div>
      <PageKicker page={page} />
      <h1 className={pageTitleClass}>{heading}</h1>
      {subtitle ? <p className="mt-4 max-w-xl text-lg text-muted-foreground">{subtitle}</p> : null}
      {hint ? <p className="mt-4 text-sm text-muted-foreground">{hint}</p> : null}
    </div>
  );

  if (actions) {
    return (
      <div className="flex flex-wrap items-start justify-between gap-6">
        {copy}
        <div>{actions}</div>
      </div>
    );
  }

  return copy;
}

export function PageHeader(props: PageHeaderProps) {
  return <PageHeaderBlock {...props} />;
}
