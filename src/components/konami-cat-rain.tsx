import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { KonamiCatSticker } from "@/components/konami-cat-sticker";
import { useKonamiCatBoard } from "@/hooks/use-konami-cat-board";
import { KONAMI_BOARD_CLASS } from "@/lib/konami-config";

type KonamiCatRainProps = {
  onDismiss: () => void;
};

export function KonamiCatRain({ onDismiss }: KonamiCatRainProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const { boardRef, stickers, ready, bringToFront } = useKonamiCatBoard();

  useEffect(() => {
    const html = document.documentElement;
    const { body } = document;

    html.classList.add(KONAMI_BOARD_CLASS);
    body.style.overflow = "hidden";

    return () => {
      html.classList.remove(KONAMI_BOARD_CLASS);
      body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    closeRef.current?.focus({ preventScroll: true });
  }, [ready]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDismiss]);

  return (
    <div
      ref={boardRef}
      className="konami-cat-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={t("easter.boardLabel")}
    >
      <button
        ref={closeRef}
        type="button"
        className="konami-cat-close"
        onClick={onDismiss}
        aria-label={t("easter.close")}
      >
        <X className="size-5" strokeWidth={2.5} aria-hidden />
      </button>

      {!ready && (
        <p className="konami-cat-pill konami-cat-loading font-mono" aria-live="polite">
          {t("easter.loading")}
        </p>
      )}

      {stickers.map((sticker) => (
        <KonamiCatSticker
          key={sticker.id}
          sticker={sticker}
          reduced={!!reduced}
          bringToFront={bringToFront}
          boardRef={boardRef}
        />
      ))}

      {ready && <p className="konami-cat-pill konami-cat-hint font-mono">{t("easter.dragHint")}</p>}
    </div>
  );
}
