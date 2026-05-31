import { useTranslation } from "react-i18next";
import { cv } from "@/data/cv";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="no-print border-t border-hairline bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-3">
          <span className="font-display text-xl text-foreground">Ubaldo Santos</span>
          <span aria-hidden>·</span>
          <span className="font-mono text-xs uppercase tracking-wider">© {year}</span>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {cv.basics.profiles.map((p) => (
            <a key={p.network} href={p.url} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
              {p.network}
            </a>
          ))}
          <a href={`mailto:${cv.basics.email}`} className="hover:text-foreground transition-colors">
            {cv.basics.email}
          </a>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-widest">{t("footer.builtWith")}</div>
      </div>
    </footer>
  );
}
