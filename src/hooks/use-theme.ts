import { useLayoutEffect, useState, useCallback, type MouseEvent } from "react";
import { flushSync } from "react-dom";

export type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyThemeToDom(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* ignore quota / private mode */
  }
}

function getRevealRadius(x: number, y: number) {
  const { innerWidth, innerHeight } = window;
  return Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
}

function canAnimateTheme(event?: MouseEvent<HTMLElement>) {
  return (
    typeof document !== "undefined" &&
    "startViewTransition" in document &&
    !!event &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useLayoutEffect(() => {
    applyThemeToDom(theme);
  }, [theme]);

  const toggle = useCallback((event?: MouseEvent<HTMLElement>) => {
    const updateTheme = () => {
      flushSync(() => {
        setTheme((current) => (current === "dark" ? "light" : "dark"));
      });
    };

    if (!canAnimateTheme(event)) {
      updateTheme();
      return;
    }

    const { clientX, clientY } = event!;
    const radius = getRevealRadius(clientX, clientY);
    const transition = document.startViewTransition(updateTheme);

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${clientX}px ${clientY}px)`,
              `circle(${radius}px at ${clientX}px ${clientY}px)`,
            ],
          },
          {
            duration: 650,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  }, []);

  return { theme, toggle, setTheme };
}
