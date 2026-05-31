import { useEffect, useRef, useState } from "react";

/**
 * Editorial-style custom cursor: a small dot + a larger ring that lags behind.
 * Expands on hover over interactive elements. Hidden on touch / coarse pointers.
 *
 * Interactive elements are detected via tag (a, button, [role=button], input, etc.)
 * or by adding `data-cursor="hover"` (label optional via `data-cursor-label`).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const isInteractive = (el: Element | null): HTMLElement | null => {
      if (!el) return null;
      const target = (el as HTMLElement).closest?.(
        'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]',
      );
      return (target as HTMLElement) ?? null;
    };

    const onOver = (e: MouseEvent) => {
      const target = isInteractive(e.target as Element);
      if (target) {
        setHovering(true);
        setLabel(target.dataset.cursorLabel ?? null);
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = isInteractive(e.target as Element);
      if (target) {
        setHovering(false);
        setLabel(null);
      }
    };
    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);

    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="no-print pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 size-1.5 rounded-full bg-foreground mix-blend-difference"
        style={{ transition: "opacity 200ms" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-foreground mix-blend-difference"
        style={{
          width: hovering ? (label ? 72 : 40) : 28,
          height: hovering ? (label ? 72 : 40) : 28,
          transition:
            "width 250ms cubic-bezier(.4,0,.2,1), height 250ms cubic-bezier(.4,0,.2,1), opacity 200ms, background-color 200ms",
          backgroundColor: hovering && !label ? "var(--foreground)" : "transparent",
        }}
      >
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
