import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const SEQ = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

/**
 * Easter egg: Konami code toggles "lab" mode for 12 s.
 * Lab mode swaps the accent color to electric lime and tints the favicon dot.
 * Also unlockable by typing "lemur".
 */
export function EasterEgg() {
  const { t } = useTranslation();
  useEffect(() => {
    let idx = 0;
    let typedBuf = "";

    const trigger = () => {
      const html = document.documentElement;
      if (html.classList.contains("lab-mode")) return;
      html.classList.add("lab-mode");
      toast.success(t("easter.unlocked"), {
        description: "↑ ↑ ↓ ↓ ← → ← → B A",
        duration: 4000,
      });
      window.setTimeout(() => html.classList.remove("lab-mode"), 12000);
    };

    const onKey = (e: KeyboardEvent) => {
      // Konami
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
      // Typed phrase
      if (k.length === 1) {
        typedBuf = (typedBuf + k.toLowerCase()).slice(-5);
        if (typedBuf === "lemur") trigger();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [t]);
  return null;
}
