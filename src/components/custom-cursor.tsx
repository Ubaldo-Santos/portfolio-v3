import { useEffect, useRef, useState } from "react";

type Ripple = { id: number; x: number; y: number };

/**
 * Subtle editorial cursor: small inverted dot + thin outline ring that lags.
 * On hover (links/buttons) the ring grows slightly. On click it emits a ripple
 * wave in the accent color from the click position.
 * Disabled on touch/coarse pointers.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0,
      raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };
    const tick = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const isInteractive = (el: Element | null) =>
      (el as HTMLElement | null)?.closest?.(
        'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]',
      ) as HTMLElement | null;

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) setHovering(false);
    };
    const onDown = (e: MouseEvent) => {
      setPressed(true);
      const id = ++rippleIdRef.current;
      setRipples((rs) => [...rs, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((rs) => rs.filter((r) => r.id !== id));
      }, 700);
    };
    const onUp = () => setPressed(false);
    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "0.6";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);
    document.documentElement.classList.add("has-custom-cursor");

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
    };
  }, []);

  if (!enabled) return null;

  const ringSize = pressed ? 18 : hovering ? 44 : 26;

  return (
    <div className="no-print pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 size-1.5 rounded-full bg-foreground mix-blend-difference"
        style={{ transition: "opacity 200ms" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full border border-foreground mix-blend-difference"
        style={{
          width: ringSize,
          height: ringSize,
          opacity: 0.6,
          transition:
            "width 180ms cubic-bezier(.4,0,.2,1), height 180ms cubic-bezier(.4,0,.2,1), opacity 180ms",
        }}
      />
      {ripples.map((r) => (
        <span
          key={r.id}
          className="cursor-ripple fixed left-0 top-0 rounded-full"
          style={{
            transform: `translate3d(${r.x}px, ${r.y}px, 0) translate(-50%, -50%)`,
          }}
        />
      ))}
    </div>
  );
}
