import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

import { cv } from "@/data/cv";
import { translations } from "@/i18n/translations";
import {
  OG_IMAGE_VARIANTS,
  type OgSizeKey,
  type OgTheme,
  ogImageFilename,
  OG_SIZES,
} from "@/lib/og-sizes";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const OUT_DIR = path.join(ROOT, "public/og");
const LOGO_SVG = await Bun.file(path.join(ROOT, "public/code-sandbox.svg")).text();
const LOGO_PATH = LOGO_SVG.match(/d="([^"]+)"/)?.[1] ?? "";

const LANG = "es" as const;
const TECH_ITEMS = cv.skills.ribbon.slice(0, 8).join(" · ");
const SITE_LABEL = cv.basics.url.replace(/^https?:\/\//, "");

const PALETTE = {
  light: {
    background: "#FAFAF8",
    foreground: "#2D2A26",
    muted: "#6B6660",
    hairline: "#E0DDD8",
    accent: "rgba(200, 240, 50, 0.2)",
    accentSoft: "rgba(200, 240, 50, 0.08)",
    logo: "#2D2A26",
  },
  dark: {
    background: "#1F1E1C",
    foreground: "#F5F4F2",
    muted: "#A8A5A0",
    hairline: "#3A3835",
    accent: "rgba(200, 240, 50, 0.22)",
    accentSoft: "rgba(200, 240, 50, 0.1)",
    logo: "#F5F4F2",
  },
} as const;

type FontSet = Awaited<ReturnType<typeof loadFonts>>;

async function loadFonts() {
  const [inter, fraunces, frauncesItalic] = await Promise.all([
    fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.2.5/files/inter-latin-400-normal.woff",
    ).then((r) => r.arrayBuffer()),
    fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/fraunces@5.2.5/files/fraunces-latin-400-normal.woff",
    ).then((r) => r.arrayBuffer()),
    fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/fraunces@5.2.5/files/fraunces-latin-400-italic.woff",
    ).then((r) => r.arrayBuffer()),
  ]);

  return [
    { name: "Inter", data: inter, weight: 400, style: "normal" as const },
    { name: "Fraunces", data: fraunces, weight: 400, style: "normal" as const },
    { name: "Fraunces", data: frauncesItalic, weight: 400, style: "italic" as const },
  ];
}

function scaled(value: number, width: number, height: number) {
  const isSquare = height >= width * 0.95;
  const scale = Math.min(width / 1200, height / (isSquare ? 1200 : 630));
  return Math.round(value * scale);
}

function buildMarkup(width: number, height: number, theme: OgTheme, fonts: FontSet) {
  const colors = PALETTE[theme];
  const meta = translations[LANG].meta;
  const padX = scaled(48, width, height);
  const padY = scaled(40, width, height);
  const nameSize = scaled(96, width, height);
  const surnameSize = scaled(76, width, height);
  const leadSize = scaled(22, width, height);
  const detailSize = scaled(18, width, height);
  const techSize = scaled(11, width, height);
  const urlSize = scaled(13, width, height);
  const logoSize = scaled(72, width, height);

  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.background,
        color: colors.foreground,
        fontFamily: "Inter",
        position: "relative",
        overflow: "hidden",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: scaled(-120, width, height),
              right: scaled(-80, width, height),
              width: width * 0.55,
              height: width * 0.55,
              borderRadius: "50%",
              background: colors.accent,
              filter: "blur(80px)",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: scaled(-40, width, height),
              left: scaled(-100, width, height),
              width: width * 0.42,
              height: width * 0.42,
              borderRadius: "50%",
              background: colors.accentSoft,
              filter: "blur(70px)",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "relative",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              padding: `${padY}px ${padX}px`,
            },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", justifyContent: "flex-end" },
                  children: {
                    type: "svg",
                    props: {
                      width: logoSize,
                      height: logoSize,
                      viewBox: "0 0 1024 1024",
                      children: {
                        type: "path",
                        props: {
                          d: LOGO_PATH,
                          fill: colors.logo,
                        },
                      },
                    },
                  },
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flex: 1,
                    maxWidth: height >= width * 0.95 ? "100%" : "78%",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontFamily: "Fraunces",
                          fontSize: nameSize,
                          lineHeight: 0.88,
                          letterSpacing: "-0.02em",
                        },
                        children: cv.basics.givenName,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontFamily: "Fraunces",
                          fontStyle: "italic",
                          fontSize: surnameSize,
                          lineHeight: 0.88,
                          letterSpacing: "-0.015em",
                          color: colors.muted,
                        },
                        children: cv.basics.familyName,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          marginTop: scaled(28, width, height),
                          marginBottom: scaled(24, width, height),
                          height: 1,
                          width: "100%",
                          backgroundColor: colors.hairline,
                        },
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontFamily: "Fraunces",
                          fontSize: leadSize,
                          lineHeight: 1.35,
                          color: colors.foreground,
                        },
                        children: cv.basics.tagline.lead[LANG],
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          marginTop: scaled(12, width, height),
                          fontFamily: "Fraunces",
                          fontSize: detailSize,
                          lineHeight: 1.35,
                          color: colors.muted,
                        },
                        children: `${cv.basics.label[LANG]} · ${meta.siteName}`,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          marginTop: scaled(16, width, height),
                          fontSize: techSize,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: colors.muted,
                        },
                        children: TECH_ITEMS,
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", justifyContent: "flex-end" },
                  children: {
                    type: "div",
                    props: {
                      style: {
                        fontSize: urlSize,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: colors.muted,
                      },
                      children: SITE_LABEL,
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function renderPng(size: OgSizeKey, theme: OgTheme, fonts: FontSet) {
  const { width, height } = OG_SIZES[size];
  const markup = buildMarkup(width, height, theme, fonts);
  const svg = await satori(markup, { width, height, fonts });
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: width } });
  return resvg.render().asPng();
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const fonts = await loadFonts();
  const manifest: Array<Record<string, string | number>> = [];

  for (const { size, theme } of OG_IMAGE_VARIANTS) {
    const filename = ogImageFilename(size, theme);
    const outPath = path.join(OUT_DIR, filename);
    const png = await renderPng(size, theme, fonts);
    await writeFile(outPath, png);
    manifest.push({
      size,
      theme,
      width: OG_SIZES[size].width,
      height: OG_SIZES[size].height,
      filename,
    });
    console.log(`✓ ${filename}`);
  }

  await writeFile(path.join(OUT_DIR, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`\nWrote ${manifest.length} images → public/og/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
