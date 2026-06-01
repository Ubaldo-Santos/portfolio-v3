// Downloads the CV as a PDF. Targets the #cv-article element on the /cv route.
// If not present (user clicked from another page), navigates to /cv first.

// html2canvas cannot parse oklch() from Tailwind v4 stylesheets.
// We briefly switch to print-like styles, inline computed rgb layout values, then
// strip stylesheets in the clone so html2canvas only sees inline hex/rgb styles.

const EXPORT_CLASS = "cv-exporting";

// Font family is set via clone stylesheet — skip here to avoid inlining Inter from screen styles.
const INLINE_PROPS = [
  "color",
  "backgroundColor",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "lineHeight",
  "letterSpacing",
  "textTransform",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "display",
  "flexDirection",
  "flexWrap",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "alignItems",
  "justifyContent",
  "alignSelf",
  "gap",
  "columnGap",
  "rowGap",
  "borderTopWidth",
  "borderTopStyle",
  "borderTopColor",
  "borderBottomWidth",
  "borderBottomStyle",
  "borderBottomColor",
  "listStyleType",
  "listStylePosition",
  "maxWidth",
  "width",
  "textAlign",
  "whiteSpace",
] as const;

const CLONE_FONT_STYLES = `
  #cv-article,
  #cv-article *:not(.font-mono) {
    font-family: Georgia, "Times New Roman", serif;
  }
  #cv-article .font-mono {
    font-family: "JetBrains Mono", ui-monospace, monospace;
  }
  .cv-block {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  h1, h2, h3 {
    page-break-after: avoid;
  }
`;

function toKebab(prop: string) {
  return prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

function inlineExportStyles(root: HTMLElement): () => void {
  const snapshots: { el: HTMLElement; style: string | null }[] = [];
  const nodes = [root, ...root.querySelectorAll<HTMLElement>("*")];

  for (const el of nodes) {
    snapshots.push({ el, style: el.getAttribute("style") });
    const computed = getComputedStyle(el);
    const parts: string[] = [];

    for (const prop of INLINE_PROPS) {
      const cssProp = toKebab(prop);
      const value = computed.getPropertyValue(cssProp);
      if (!value || value === "none" || value === "auto" || value === "normal") continue;
      if (value.includes("oklch")) continue;
      parts.push(`${cssProp}:${value}`);
    }

    if (parts.length > 0) {
      el.setAttribute("style", parts.join(";"));
    }
  }

  return () => {
    for (const { el, style } of snapshots) {
      if (style === null) el.removeAttribute("style");
      else el.setAttribute("style", style);
    }
  };
}

function preparePdfClone(doc: Document) {
  doc.documentElement.classList.remove("dark", EXPORT_CLASS);
  doc.querySelectorAll('link[rel="stylesheet"], style').forEach((el) => el.remove());

  const style = doc.createElement("style");
  style.textContent = CLONE_FONT_STYLES;
  doc.head.appendChild(style);

  doc.documentElement.style.background = "#ffffff";
  doc.body.style.background = "#ffffff";
  doc.body.style.margin = "0";
  doc.body.style.padding = "0";
}

export async function downloadCv(filename = "ubaldo-santos-paton-cv.pdf") {
  const target = document.getElementById("cv-article");
  if (!target) {
    window.location.href = "/cv";
    return;
  }

  await document.fonts.ready;

  document.documentElement.classList.add(EXPORT_CLASS);
  void target.offsetHeight;

  const restoreStyles = inlineExportStyles(target);
  const html2pdf = (await import("html2pdf.js")).default;

  try {
    await html2pdf()
      .set({
        margin: [10, 10, 12, 10],
        filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          windowWidth: 688,
          onclone: preparePdfClone,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      })
      .from(target)
      .save();
  } finally {
    restoreStyles();
    document.documentElement.classList.remove(EXPORT_CLASS);
  }
}
