import { useEffect, useRef, useState } from "react";
import {
  applyCustomCursorCssVars,
  clearCustomCursorCssVars,
  customCursorConfig,
  stepCursorSpring,
} from "@/lib/custom-cursor-config";

type Ripple = { id: number; x: number; y: number };

export const CUSTOM_CURSOR_MEDIA = customCursorConfig.media;

function cursorTransform(x: number, y: number) {
  return `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
}

export function CustomCursor() {
  const cfg = customCursorConfig;
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef(0);
  const hoveringRef = useRef(false);
  const pressedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia(cfg.media);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [cfg.media]);

  useEffect(() => {
    if (!enabled) return;

    applyCustomCursorCssVars(cfg);

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0,
      vx = 0,
      vy = 0,
      raf = 0,
      ringSynced = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!ringSynced) {
        rx = mx;
        ry = my;
        ringSynced = true;
      }
      if (dotRef.current) dotRef.current.style.transform = cursorTransform(mx, my);
    };

    const tick = () => {
      const lag = cfg.ring.lag;
      const spring = pressedRef.current
        ? {
            stiffness: lag.pressStiffness,
            damping: lag.pressDamping,
            maxVelocityPx: lag.maxVelocityPx,
          }
        : hoveringRef.current
          ? {
              stiffness: lag.hoverStiffness,
              damping: lag.damping,
              maxVelocityPx: lag.maxVelocityPx,
            }
          : {
              stiffness: lag.stiffness,
              damping: lag.damping,
              maxVelocityPx: lag.maxVelocityPx,
            };

      ({ rx, ry, vx, vy } = stepCursorSpring(mx, my, rx, ry, vx, vy, spring));

      if (ringRef.current) {
        ringRef.current.style.transform = cursorTransform(rx, ry);
      }
      raf = requestAnimationFrame(tick);
    };

    const isInteractive = (el: Element | null) =>
      (el as HTMLElement | null)?.closest?.(
        'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]',
      ) as HTMLElement | null;

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) {
        hoveringRef.current = true;
        setHovering(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) {
        hoveringRef.current = false;
        setHovering(false);
      }
    };
    const onDown = (e: MouseEvent) => {
      pressedRef.current = true;
      setPressed(true);
      const id = ++rippleIdRef.current;
      setRipples((rs) => [...rs, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((rs) => rs.filter((r) => r.id !== id));
      }, cfg.ripple.durationMs);
    };
    const onUp = () => {
      pressedRef.current = false;
      setPressed(false);
    };

    const setVisible = (visible: boolean) => {
      const dotOpacity = visible ? cfg.dot.opacity : 0;
      const ringOpacity = visible
        ? hovering
          ? cfg.ring.opacity.hover
          : cfg.ring.opacity.idle
        : cfg.ring.opacity.hidden;
      if (dotRef.current) dotRef.current.style.opacity = String(dotOpacity);
      if (ringRef.current) ringRef.current.style.opacity = String(ringOpacity);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.documentElement.classList.add("has-custom-cursor");
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
      clearCustomCursorCssVars();
    };
  }, [cfg, enabled]);

  useEffect(() => {
    if (!enabled || !ringRef.current) return;
    ringRef.current.style.opacity = String(
      hovering ? cfg.ring.opacity.hover : cfg.ring.opacity.idle,
    );
  }, [cfg.ring.opacity.hover, cfg.ring.opacity.idle, enabled, hovering]);

  if (!enabled) return null;

  const ringSize = pressed
    ? cfg.ring.sizePx.pressed
    : hovering
      ? cfg.ring.sizePx.hover
      : cfg.ring.sizePx.idle;

  return (
    <div className="custom-cursor-layer no-print pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      <div ref={dotRef} className="custom-cursor-dot fixed left-0 top-0 rounded-full" />
      <div
        ref={ringRef}
        className="custom-cursor-ring fixed left-0 top-0 rounded-full"
        style={{
          width: ringSize,
          height: ringSize,
          opacity: hovering ? cfg.ring.opacity.hover : cfg.ring.opacity.idle,
        }}
      />
      {ripples.map((r) => (
        <span
          key={r.id}
          className="cursor-ripple fixed left-0 top-0 rounded-full"
          style={{
            transform: cursorTransform(r.x, r.y),
          }}
        />
      ))}
    </div>
  );
}
