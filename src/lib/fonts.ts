/** Self-hosted fallback families (see public/fonts and scripts/sync-fonts.mjs). */
export const FONT_FALLBACK = {
  display: "Lora",
  sans: "Inter",
  mono: "JetBrains Mono",
} as const;

export const FONT_FILES = {
  display: {
    normal: "/fonts/lora-latin-400-normal.woff2",
    italic: "/fonts/lora-latin-400-italic.woff2",
    bold: "/fonts/lora-latin-700-normal.woff2",
  },
  sans: {
    regular: "/fonts/inter-latin-400-normal.woff2",
    medium: "/fonts/inter-latin-500-normal.woff2",
    semibold: "/fonts/inter-latin-600-normal.woff2",
  },
  mono: {
    regular: "/fonts/jetbrains-mono-latin-400-normal.woff2",
    medium: "/fonts/jetbrains-mono-latin-500-normal.woff2",
  },
} as const;
