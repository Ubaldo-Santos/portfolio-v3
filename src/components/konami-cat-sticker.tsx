import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { animate, motion, useMotionValue, type PanInfo } from "motion/react";
import { fetchRandomCatUrl, preloadImage } from "@/lib/fetch-cat-images";
import { clampStickerPosition, type BoardSticker } from "@/lib/konami-cat-board";
import { easeOut } from "@/lib/motion";

type KonamiCatStickerProps = {
  sticker: BoardSticker;
  reduced: boolean;
  bringToFront: () => number;
  boardRef: RefObject<HTMLDivElement | null>;
};

export function KonamiCatSticker({
  sticker,
  reduced,
  bringToFront,
  boardRef,
}: KonamiCatStickerProps) {
  const [src, setSrc] = useState(sticker.url);
  const [retried, setRetried] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [canDrag, setCanDrag] = useState(false);
  const [zIndex, setZIndex] = useState(sticker.zIndex);
  const landedRef = useRef(false);
  const baseRotation = useRef(sticker.rotation);

  const x = useMotionValue(sticker.x);
  const y = useMotionValue(-sticker.size - 60);
  const rotate = useMotionValue(sticker.rotation - 8);
  const opacity = useMotionValue(0);

  const clampMotion = useCallback(() => {
    const clamped = clampStickerPosition(x.get(), y.get(), sticker.size);
    x.set(clamped.x);
    y.set(clamped.y);
  }, [sticker.size, x, y]);

  const raise = useCallback(() => {
    setZIndex(bringToFront());
  }, [bringToFront]);

  const startFall = useCallback(() => {
    if (landedRef.current) return;

    const target = clampStickerPosition(sticker.x, sticker.y, sticker.size);

    if (reduced) {
      y.set(target.y);
      x.set(target.x);
      rotate.set(sticker.rotation);
      opacity.set(1);
      landedRef.current = true;
      baseRotation.current = sticker.rotation;
      setCanDrag(true);
      return;
    }

    const opacityAnim = animate(opacity, 1, { duration: 0.2 });
    const xAnim = animate(x, target.x, { duration: sticker.duration, ease: easeOut });
    const yAnim = animate(y, target.y, { duration: sticker.duration, ease: easeOut });
    const rotateAnim = animate(rotate, sticker.rotation, {
      duration: sticker.duration,
      ease: easeOut,
    });

    void Promise.all([opacityAnim, xAnim, yAnim, rotateAnim]).then(() => {
      if (landedRef.current) return;
      landedRef.current = true;
      baseRotation.current = sticker.rotation;
      setCanDrag(true);
    });
  }, [sticker, reduced, x, y, rotate, opacity]);

  useEffect(() => {
    if (loaded) startFall();
  }, [loaded, startFall]);

  const handleError = async () => {
    if (retried) return;
    setRetried(true);

    const replacement = await fetchRandomCatUrl();
    if (!replacement || !(await preloadImage(replacement))) return;

    setLoaded(false);
    setSrc(replacement);
  };

  const handleDrag = (_event: PointerEvent, info: PanInfo) => {
    rotate.set(baseRotation.current + Math.max(-8, Math.min(8, info.offset.x * 0.04)));
    clampMotion();
  };

  const handleDragEnd = (_event: PointerEvent, info: PanInfo) => {
    clampMotion();
    const settleRotate = baseRotation.current + Math.max(-6, Math.min(6, info.offset.x * 0.025));
    baseRotation.current = settleRotate;
    animate(rotate, settleRotate, { type: "spring", stiffness: 260, damping: 26 });
  };

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden
      className="konami-cat-sticker"
      data-cursor="hover"
      drag={canDrag}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={boardRef}
      onLoad={() => setLoaded(true)}
      onError={handleError}
      onPointerDown={raise}
      onDragStart={raise}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        x,
        y,
        rotate,
        opacity,
        width: sticker.size,
        height: sticker.size,
        zIndex,
        visibility: loaded ? "visible" : "hidden",
      }}
    />
  );
}
