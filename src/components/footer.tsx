import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/logo";
import { cv } from "@/data/cv";
import { siteStack } from "@/data/site";
import { currentLang } from "@/lib/format";

function FooterKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
      {children}
    </div>
  );
}

function FooterLink({
  href,
  label,
  detail,
  external,
}: {
  href: string;
  label: string;
  detail?: string;
  external?: boolean;
}) {
  const className =
    "group flex items-center justify-between gap-3 rounded-xl border border-transparent px-2 py-2 transition-colors hover:border-hairline hover:bg-background/60";

  const content = (
    <>
      <span className="min-w-0">
        <span className="block text-sm text-foreground">{label}</span>
        {detail ? (
          <span className="block truncate font-mono text-[11px] text-muted-foreground">{detail}</span>
        ) : null}
      </span>
      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      {content}
    </a>
  );
}

export function Footer() {
  const { t, i18n } = useTranslation();
  const lang = currentLang(i18n.language);
  const year = new Date().getFullYear();

  return (
    <footer className="no-print border-t border-hairline bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Brand */}
          <div className="space-y-5">
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

            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {cv.basics.label[lang]}
            </p>

            <div className="space-y-1 font-mono text-xs text-muted-foreground">
              <p>{cv.basics.location[lang]}</p>
              <p className="text-muted-foreground/80">© {year}</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <FooterKicker>{t("footer.contactLabel")}</FooterKicker>
            <div className="mt-3 flex flex-col">
              {cv.basics.profiles.map((p) => (
                <FooterLink
                  key={p.network}
                  href={p.url}
                  label={p.network}
                  detail={`@${p.username}`}
                  external
                />
              ))}
              <FooterLink
                href={`mailto:${cv.basics.email}`}
                label={t("contact.email")}
                detail={cv.basics.email}
              />
            </div>
          </div>

          {/* Site stack */}
          <div className="space-y-4">
            <FooterKicker>{t("footer.stackLabel")}</FooterKicker>
            <p className="text-sm leading-relaxed text-muted-foreground">{t("footer.stackSummary")}</p>
            <div className="flex flex-wrap gap-2">
              {siteStack.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-hairline bg-background px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
