import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { cv } from "@/data/cv";
import { NAV_ITEMS } from "@/lib/nav";
import { ArrowLink, chipBase, focusRing, kickerMd } from "@/components/editorial";
import { cn } from "@/lib/utils";

const navPillClass = cn(
  chipBase,
  kickerMd,
  "px-3 py-1.5 bg-background/80 transition-colors hover:border-foreground/15 hover:text-foreground",
  focusRing,
);

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="no-print border-t border-hairline bg-surface/50">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-9">
        <nav aria-label={t("a11y.footerNav")}>
          <ul className="flex flex-wrap gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={navPillClass}>
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {t("footer.stackSummary")}
        </p>

        <div className="mt-6 h-px bg-hairline" />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-muted-foreground">
            © {year} <span className="text-foreground/80">{cv.basics.name}</span>
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {cv.basics.profiles.map((p) => (
              <ArrowLink key={p.network} href={p.url} className={kickerMd}>
                {p.network}
              </ArrowLink>
            ))}
            <ArrowLink href={`mailto:${cv.basics.email}`} className={kickerMd}>
              {t("contact.email")}
            </ArrowLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
