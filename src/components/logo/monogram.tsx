import { cn } from "@/lib/utils";

type MonogramProps = {
  className?: string;
};

/**
 * Geometric monogram for Ubaldo Santos. Squircle frame with two stacked
 * italic serif letters and a single accent dot. Drawn in `currentColor` so
 * it inherits any text-token applied to the parent — no hardcoded colors.
 */
export function Monogram({ className }: MonogramProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      role="img"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.7"
      />
      {/* Italic serif lowercase "us" — set in Fraunces italic via inherited font */}
      <text
        x="20"
        y="26.5"
        textAnchor="middle"
        fontFamily="Fraunces, ui-serif, Georgia, serif"
        fontStyle="italic"
        fontWeight="400"
        fontSize="20"
        letterSpacing="-0.04em"
        fill="currentColor"
      >
        us
      </text>
      {/* Accent dot — lime as a *punto*, not a fill */}
      <circle
        cx="32"
        cy="8"
        r="2"
        fill="var(--accent)"
      />
    </svg>
  );
}
