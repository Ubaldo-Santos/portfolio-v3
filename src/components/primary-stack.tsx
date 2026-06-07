import { cv } from "@/data/cv";
import { cn } from "@/lib/utils";

export function PrimaryStack({ className }: { className?: string }) {
  const { backend, frontend } = cv.skills.primaryStack;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-2xl sm:text-3xl",
        className,
      )}
    >
      {backend.map((item, i) => (
        <span key={item} className="inline-flex items-center gap-x-3">
          {i > 0 && <span className="text-muted-foreground/50">·</span>}
          <span>{item}</span>
        </span>
      ))}
      <span className="text-muted-foreground/30">/</span>
      {frontend.map((item, i) => (
        <span key={item} className="inline-flex items-center gap-x-3">
          {i > 0 && <span className="text-muted-foreground/50">·</span>}
          <span>{item}</span>
        </span>
      ))}
    </div>
  );
}
