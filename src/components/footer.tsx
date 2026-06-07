import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { BrandLogo } from "@/components/logo";
import { cv } from "@/data/cv";
import { currentLang } from "@/lib/format";

export function Footer() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);
  const year = new Date().getFullYear();

  return (
    <footer className="no-print border-t border-hairline bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="group inline-flex"
            aria-label={t("a11y.homeLink")}
          >
            <BrandLogo
              variant="footer"
              iconClassName="transition-transform group-hover:rotate-3"
            />
          </Link>

          {/* Social links — inline, minimal */}
          <nav
            aria-label={t("footer.contactLabel")}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
          >
            {cv.basics.profiles.map((p) => (
              <a
                key={p.network}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {p.network}
              </a>
            ))}
            <a
              href={`mailto:${cv.basics.email}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("contact.email")}
            </a>
          </nav>
        </div>

        {/* Meta line */}
        <div className="mt-8 flex flex-col gap-2 border-t border-hairline pt-5 font-mono text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} · {cv.basics.location[lang]}</span>
          <span className="text-muted-foreground/70">{cv.basics.label[lang]}</span>
        </div>
      </div>
    </footer>
  );
}
