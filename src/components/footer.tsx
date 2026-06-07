import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { cv } from "@/data/cv";
import { NAV_ITEMS } from "@/lib/nav";

function FooterExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
      <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
    </a>
  );
}

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
                <Link
                  to={item.to}
                  className="inline-flex rounded-full border border-hairline bg-background/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground/15 hover:text-foreground"
                >
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
            <span className="mx-2 text-muted-foreground/30" aria-hidden>
              ·
            </span>
            <span className="text-muted-foreground/50">{t("easter.konamiCode")}</span>
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {cv.basics.profiles.map((p) => (
              <FooterExternalLink key={p.network} href={p.url}>
                {p.network}
              </FooterExternalLink>
            ))}
            <FooterExternalLink href={`mailto:${cv.basics.email}`}>
              {t("contact.email")}
            </FooterExternalLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
