import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Moon, Sun, Printer, Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";
import { SUPPORTED_LANGS, type Lang } from "@/i18n";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", key: "home" },
  { to: "/experience", key: "experience" },
  { to: "/projects", key: "projects" },
  { to: "/skills", key: "skills" },
  { to: "/contact", key: "contact" },
] as const;

export function Header() {
  const { t, i18n } = useTranslation();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const currentLang = (i18n.language?.slice(0, 2) as Lang) || "es";

  // Easter egg: click the accent dot 7 times to enable lab mode for 12 s.
  const clicksRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const onLogoDotClick = (e: React.MouseEvent) => {
    e.preventDefault();
    clicksRef.current += 1;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => (clicksRef.current = 0), 1500);
    if (clicksRef.current >= 7) {
      clicksRef.current = 0;
      document.documentElement.classList.add("lab-mode");
      toast.success(t("easter.unlocked"));
      window.setTimeout(() => document.documentElement.classList.remove("lab-mode"), 12000);
    }
  };

  return (
    <header className="no-print sticky top-0 z-50 border-b border-hairline bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-2 font-display text-2xl leading-none tracking-tight">
          <button
            type="button"
            onClick={onLogoDotClick}
            aria-label="Ubaldo"
            className="size-2 rounded-full bg-accent transition-transform group-hover:scale-125"
          />
          <span>Ubaldo</span>
          <span className="italic text-muted-foreground">Santos</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <div
            className="hidden items-center gap-0.5 rounded-full border border-hairline bg-surface p-0.5 font-mono text-xs uppercase sm:flex"
            role="group"
            aria-label={t("actions.language")}
          >
            {SUPPORTED_LANGS.map((lng) => (
              <button
                key={lng}
                onClick={() => i18n.changeLanguage(lng)}
                className={cn(
                  "rounded-full px-2.5 py-1 transition-colors",
                  currentLang === lng ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                )}
                aria-pressed={currentLang === lng}
              >
                {lng}
              </button>
            ))}
          </div>

          <button
            onClick={toggle}
            aria-label={t("actions.toggleTheme")}
            className="rounded-full border border-hairline bg-surface p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <Link
            to="/cv"
            className="ml-1 hidden items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-xs font-medium uppercase tracking-wider text-background transition-opacity hover:opacity-90 sm:inline-flex"
          >
            <Printer className="size-3.5" />
            {t("actions.printCv")}
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t("actions.closeMenu") : t("actions.openMenu")}
            aria-expanded={open}
            className="ml-1 rounded-full border border-hairline bg-surface p-2 text-muted-foreground md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-hairline bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base text-muted-foreground hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <Link
              to="/cv"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center gap-2 rounded-md bg-foreground px-3 py-3 text-base text-background"
            >
              <Printer className="size-4" />
              {t("actions.printCv")}
            </Link>
            <div className="mt-3 flex items-center gap-2 px-3 pb-2">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{t("actions.language")}</span>
              {SUPPORTED_LANGS.map((lng) => (
                <button
                  key={lng}
                  onClick={() => i18n.changeLanguage(lng)}
                  className={cn(
                    "rounded-full px-2.5 py-1 font-mono text-xs uppercase",
                    currentLang === lng ? "bg-foreground text-background" : "text-muted-foreground",
                  )}
                >
                  {lng}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
