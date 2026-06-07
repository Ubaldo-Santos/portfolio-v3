import { useTranslation } from "react-i18next";
import { cv } from "@/data/cv";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="no-print border-t border-hairline bg-surface">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 text-sm text-muted-foreground sm:grid-cols-3 sm:items-center sm:px-8">
        <div className="flex items-center gap-3">
          <span className="font-display text-xl text-foreground">Ubaldo Santos Patón</span>
          <span aria-hidden>·</span>
          <span className="font-mono text-xs uppercase tracking-wider">© {year}</span>
        </div>
        <div className="flex flex-wrap justify-start gap-x-5 gap-y-2 sm:justify-center">
          {cv.basics.profiles.map((p) => (
            <a
              key={p.network}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {p.network}
            </a>
          ))}
          <a href={`mailto:${cv.basics.email}`} className="transition-colors hover:text-foreground">
            {cv.basics.email}
          </a>
        </div>
        <div className="text-left sm:text-right">
          <div className="font-mono text-[11px] uppercase tracking-widest">
            {t("footer.builtWith")}
          </div>
        </div>
      </div>
    </footer>
  );
}
