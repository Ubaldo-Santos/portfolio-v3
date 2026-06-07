import { Fragment } from "react";

function MarqueeStrip({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <div
      className={`flex shrink-0 items-center gap-8 whitespace-nowrap px-8 sm:gap-12 sm:px-12 ${className ?? ""}`}
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 ? (
            <span className="text-muted-foreground/50" aria-hidden>
              ·
            </span>
          ) : null}
          <span>{item}</span>
        </Fragment>
      ))}
    </div>
  );
}

type TechRibbonProps = {
  location: string;
  items: readonly string[];
  /** Accessible name for the scrolling strip (e.g. translated stack label). */
  label: string;
};

export function TechRibbon({ location, items, label }: TechRibbonProps) {
  const marqueeItems = [...items, location];

  return (
    <div
      className="relative z-10 h-11 shrink-0 overflow-hidden border-y border-hairline bg-surface/50 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:text-xs"
      role="marquee"
      aria-label={`${label} · ${location}`}
    >
      <div className="tech-marquee-mask pointer-events-none absolute inset-0 z-10" aria-hidden />
      <div className="flex h-full items-center overflow-hidden">
        <div className="tech-marquee-track flex items-center">
          <MarqueeStrip items={marqueeItems} />
          <MarqueeStrip items={marqueeItems} className="tech-marquee-clone" aria-hidden />
        </div>
      </div>
    </div>
  );
}
