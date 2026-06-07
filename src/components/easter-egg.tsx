import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { KonamiCatRain } from "@/components/konami-cat-rain";
import { createKonamiKeyHandler, flashKonamiCelebrate } from "@/lib/konami-code";
/**
 * Easter egg: Konami code (↑ ↑ ↓ ↓ ← → ← → B A) triggers a brief shimmer,
 * a toast, and a draggable cat-photo board overlay.
 */
export function EasterEgg() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  openRef.current = open;

  useEffect(() => {
    const onKey = createKonamiKeyHandler(() => {
      if (openRef.current) return;

      flashKonamiCelebrate();
      toast.success(t("easter.unlocked"), {
        description: t("easter.konamiCode"),
        duration: 4000,
      });
      setOpen(true);
    });

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [t]);

  if (!open) return null;

  return <KonamiCatRain onDismiss={() => setOpen(false)} />;
}
