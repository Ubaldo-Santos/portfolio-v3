import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const SEQ = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

/**
 * Easter egg: the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) launches a celebratory
 * burst of accent-colored ripples across the viewport, briefly inverts the
 * page, and shakes the title. Fully accessible — respects prefers-reduced-motion.
 */
export function EasterEgg() {
  const { t } = useTranslation();

  useEffect(() => {
    let idx = 0;

    const trigger = () => {
      const html = document.documentElement;
      if (html.classList.contains("konami-celebrate")) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      html.classList.add("konami-celebrate");
      window.setTimeout(() => html.classList.remove("konami-celebrate"), 2200);

      toast.success(t("easter.unlocked"), {
        description: "↑ ↑ ↓ ↓ ← → ← → B A",
        duration: 4000,
      });

      if (reduced) return;

      // Burst of ripples from random points along the viewport
      const layer = document.createElement("div");
      layer.className = "konami-layer";
      document.body.appendChild(layer);

      const points = 14;
      for (let i = 0; i < points; i++) {
        const r = document.createElement("span");
        r.className = "konami-burst";
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        r.style.left = `${x}px`;
        r.style.top = `${y}px`;
        r.style.animationDelay = `${Math.random() * 350}ms`;
        layer.appendChild(r);
      }

      window.setTimeout(() => layer.remove(), 2400);
    };

    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      const expected = SEQ[idx];
      if (k === expected || (expected.length === 1 && k.toLowerCase() === expected)) {
        idx++;
        if (idx === SEQ.length) {
          idx = 0;
          trigger();
        }
      } else {
        idx = k === SEQ[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [t]);

  return null;
}
