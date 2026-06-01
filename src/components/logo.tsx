// Custom monogram logo for Ubaldo Santos.
// Stacked "u" + "s" letterforms inside a soft squircle, with a lime accent dot.

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Squircle frame */}
      <path
        d="M20 1.5C30.5 1.5 38.5 9.5 38.5 20S30.5 38.5 20 38.5 1.5 30.5 1.5 20 9.5 1.5 20 1.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.45"
      />
      {/* u */}
      <path
        d="M10.5 13.5v9c0 2.49 2.01 4.5 4.5 4.5s4.5-2.01 4.5-4.5v-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* s */}
      <path
        d="M29.5 15c-.83-1.2-2.4-1.7-3.9-1.4-1.6.32-2.6 1.5-2.6 2.9 0 1.4 1.1 2.3 2.9 2.7l1.3.3c1.8.4 2.9 1.3 2.9 2.7 0 1.7-1.5 3-3.6 3-1.7 0-3.1-.7-3.8-1.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* lime accent dot */}
      <circle cx="32.5" cy="11" r="2.2" fill="var(--accent)" />
    </svg>
  );
}
