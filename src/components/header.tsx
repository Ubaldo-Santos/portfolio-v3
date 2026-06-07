import { useTranslation } from "react-i18next";
import { Link, useRouterState } from "@tanstack/react-router";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useTheme } from "@/hooks/use-theme";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SUPPORTED_LANGS, type Lang } from "@/i18n";
import { cn } from "@/lib/utils";
import { springSnappy } from "@/lib/motion";
import { BrandLogo } from "@/components/logo";
import { NavLink } from "@/components/nav-link";
import { NAV_ITEMS } from "@/lib/nav";

function LangSwitcher({
  currentLang,
  onChange,
  className,
  animated = false,
}: {
  currentLang: Lang;
  onChange: (lng: Lang) => void;
  className?: string;
  animated?: boolean;
}) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        "relative flex items-center gap-0.5 rounded-full border border-hairline bg-surface p-0.5 font-mono text-xs uppercase",
        className,
      )}
      role="group"
      aria-label={t("actions.language")}
    >
      {SUPPORTED_LANGS.map((lng) => {
        const active = currentLang === lng;
        const showAnimated = animated && active && !reduced;

        return (
          <button
            key={lng}
            type="button"
            onClick={() => onChange(lng)}
            className={cn(
              "relative rounded-full px-2.5 py-1 transition-colors",
              active ? "text-background" : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={active}
          >
            {showAnimated ? (
              <motion.span
                layoutId="lang-indicator"
                layoutScroll={false}
                className="pointer-events-none absolute inset-0 rounded-full bg-foreground"
                transition={springSnappy}
              />
            ) : active ? (
              <span className="pointer-events-none absolute inset-0 rounded-full bg-foreground" />
            ) : null}
            <span className="relative z-10">{lng}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Header() {
  const { t, i18n } = useTranslation();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const currentLang = (i18n.language?.slice(0, 2) as Lang) || "es";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-hairline bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-8">
        <Link to="/" className="group shrink-0" aria-label={t("a11y.homeLink")}>
          <BrandLogo
            variant="nav"
            iconClassName="transition-transform duration-300 group-hover:rotate-3"
          />
        </Link>

        <LayoutGroup id="desktop-nav">
          <nav
            className="hidden flex-1 items-center justify-center gap-0.5 md:flex"
            aria-label={t("a11y.mainNav")}
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                label={t(`nav.${item.key}`)}
                animated={isDesktop}
              />
            ))}
          </nav>
        </LayoutGroup>

        <div className="flex flex-1 shrink-0 items-center justify-end gap-1 md:flex-none">
          <LayoutGroup id="desktop-lang">
            <LangSwitcher
              currentLang={currentLang}
              onChange={(lng) => i18n.changeLanguage(lng)}
              className="hidden sm:flex"
              animated={isDesktop}
            />
          </LayoutGroup>

          <motion.button
            type="button"
            onClick={(event) => toggle(event)}
            aria-label={t("actions.toggleTheme")}
            className="rounded-full border border-hairline bg-surface p-2 text-muted-foreground transition-colors hover:text-foreground"
            whileHover={reduced ? undefined : { scale: 1.05 }}
            whileTap={reduced ? undefined : { scale: 0.95 }}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t("actions.closeMenu") : t("actions.openMenu")}
            aria-expanded={open}
            className="ml-1 rounded-full border border-hairline bg-surface p-2 text-muted-foreground md:hidden"
            whileHover={reduced ? undefined : { scale: 1.05 }}
            whileTap={reduced ? undefined : { scale: 0.95 }}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="overflow-hidden border-t border-hairline bg-background md:hidden"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={reduced ? undefined : { height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav
              className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8"
              aria-label={t("a11y.mobileNav")}
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={reduced ? false : { opacity: 0, x: -10 }}
                  animate={reduced ? undefined : { opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.04, duration: 0.3 }}
                >
                  <NavLink
                    to={item.to}
                    label={t(`nav.${item.key}`)}
                    mobile
                    animated={false}
                    onClick={() => setOpen(false)}
                  />
                </motion.div>
              ))}

              <motion.div
                className="mt-3 px-3 pb-2 sm:hidden"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.3 }}
              >
                <LangSwitcher
                  currentLang={currentLang}
                  onChange={(lng) => i18n.changeLanguage(lng)}
                  animated={false}
                />
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
