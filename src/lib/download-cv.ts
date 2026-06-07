// Downloads the CV as a PDF. Targets the #cv-article element on the /cv route.
// Renders a clean print layout in an isolated iframe (no Tailwind / oklch) before capture.

const MARGIN_MM = 14;
const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;
const CONTENT_WIDTH_MM = PAGE_WIDTH_MM - MARGIN_MM * 2;
const CONTENT_HEIGHT_MM = PAGE_HEIGHT_MM - MARGIN_MM * 2;
const CONTENT_WIDTH_PX = Math.round((CONTENT_WIDTH_MM * 96) / 25.4);
const CONTENT_HEIGHT_PX = Math.round((CONTENT_HEIGHT_MM * 96) / 25.4);
const CAPTURE_SCALE = 2;

const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap";

const CV_PDF_CSS = `
  *, *::before, *::after { box-sizing: border-box; }

  html, body {
    margin: 0;
    padding: 0;
    background: #ffffff;
    color: #000000;
    width: ${CONTENT_WIDTH_PX}px;
    overflow: visible;
  }

  body {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 10.5pt;
    line-height: 1.4;
  }

  #cv-article {
    width: ${CONTENT_WIDTH_PX}px;
    max-width: ${CONTENT_WIDTH_PX}px;
    margin: 0;
    padding: 0;
    background: #ffffff;
    color: #000000;
    overflow: visible;
  }

  #cv-article h1 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 22pt;
    font-weight: 600;
    line-height: 1.2;
    margin: 0;
    overflow: visible;
  }

  #cv-article header p {
    font-size: 11pt;
    margin: 4px 0 0;
  }

  #cv-article header > div {
    display: flex;
    flex-wrap: wrap;
    column-gap: 16px;
    row-gap: 4px;
    font-size: 10pt;
    margin-top: 12px;
  }

  #cv-article section {
    margin-top: 20px;
    padding-top: 8px;
    border-top: 1px solid rgba(0, 0, 0, 0.4);
    overflow: visible;
  }

  #cv-article section h2 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 10pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin: 0 0 12px;
    overflow: visible;
    line-height: 1.4;
  }

  #cv-article h3 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 11pt;
    font-weight: 600;
    line-height: 1.35;
    margin: 0;
    overflow: visible;
  }

  #cv-article > section:first-of-type > p {
    font-size: 10.5pt;
    line-height: 1.625;
    margin: 0;
  }

  #cv-article section > .cv-block {
    margin-bottom: 20px;
  }

  #cv-article section > .cv-block:last-child {
    margin-bottom: 0;
  }

  #cv-article .flex {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
  }

  #cv-article .inline-flex {
    display: inline-flex;
    align-items: baseline;
    gap: 4px;
  }

  #cv-article p {
    font-size: 10pt;
    margin: 4px 0 0;
  }

  #cv-article ul {
    font-size: 10pt;
    margin: 8px 0 0;
    padding-left: 20px;
    list-style-position: outside;
  }

  #cv-article ul li {
    display: list-item;
    margin-top: 2px;
  }

  #cv-article ul li + li {
    margin-top: 4px;
  }

  #cv-article .list-disc {
    list-style-type: disc;
  }

  #cv-article .font-mono,
  #cv-article .text-xs {
    font-family: "JetBrains Mono", ui-monospace, "SFMono-Regular", monospace;
    font-size: 9.5pt;
  }

  #cv-article .text-sm {
    font-size: 10pt;
  }

  #cv-article strong {
    font-weight: 700;
  }

  #cv-article .mb-5 { margin-bottom: 20px; }
  #cv-article .mb-3 { margin-bottom: 12px; }
  #cv-article .mb-2 { margin-bottom: 8px; }
  #cv-article .mt-1 { margin-top: 4px; }
  #cv-article .mt-1\\.5 { margin-top: 6px; }
  #cv-article .mt-2 { margin-top: 8px; }
  #cv-article .mt-3 { margin-top: 12px; }
  #cv-article .mt-5 { margin-top: 20px; }
  #cv-article .mt-8 { margin-top: 32px; }
  #cv-article .pt-2 { padding-top: 8px; }
  #cv-article .pt-4 { padding-top: 16px; }
  #cv-article .pl-5 { padding-left: 20px; }
  #cv-article .gap-2 { gap: 8px; }
  #cv-article .gap-x-4 { column-gap: 16px; }
  #cv-article .gap-y-1 { row-gap: 4px; }
  #cv-article .leading-relaxed { line-height: 1.625; }
  #cv-article .last\\:mb-0:last-child { margin-bottom: 0; }
  #cv-article .space-y-0\\.5 > * + * { margin-top: 2px; }
  #cv-article .space-y-1 > * + * { margin-top: 4px; }

  #pdf-viewport {
    width: ${CONTENT_WIDTH_PX}px;
    overflow: hidden;
    background: #ffffff;
  }
`;

interface UnitBox {
  top: number;
  bottom: number;
}

function buildPdfDocument(html: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="${GOOGLE_FONTS_URL}" />
<style>${CV_PDF_CSS}</style>
</head>
<body>${html}</body>
</html>`;
}

function unitBox(el: HTMLElement, articleTop: number): UnitBox {
  return {
    top: el.offsetTop - articleTop,
    bottom: el.offsetTop + el.offsetHeight - articleTop,
  };
}

/** Unbreakable layout units — keep section titles with their first entry when compact. */
function getUnbreakableUnits(article: HTMLElement, pageHeight: number): UnitBox[] {
  const articleTop = article.offsetTop;
  const units: UnitBox[] = [];

  const header = article.querySelector("header");
  if (header instanceof HTMLElement) {
    units.push(unitBox(header, articleTop));
  }

  for (const section of article.querySelectorAll("section")) {
    if (!(section instanceof HTMLElement)) continue;

    const innerBlocks = section.querySelectorAll(":scope > .cv-block");
    if (innerBlocks.length === 0) {
      units.push(unitBox(section, articleTop));
      continue;
    }

    const first = innerBlocks[0] as HTMLElement;
    const sectionTop = section.offsetTop - articleTop;
    const firstBottom = first.offsetTop + first.offsetHeight - articleTop;
    const titleBlockHeight = firstBottom - sectionTop;

    if (titleBlockHeight <= pageHeight * 0.45) {
      units.push({ top: sectionTop, bottom: firstBottom });
      for (let i = 1; i < innerBlocks.length; i++) {
        units.push(unitBox(innerBlocks[i] as HTMLElement, articleTop));
      }
    } else {
      const h2 = section.querySelector(":scope > h2");
      if (h2 instanceof HTMLElement) {
        units.push(unitBox(h2, articleTop));
      }
      for (const block of innerBlocks) {
        units.push(unitBox(block as HTMLElement, articleTop));
      }
    }
  }

  return units.sort((a, b) => a.top - b.top);
}

/** Page break offsets (px) aligned to block boundaries when possible. */
function computePageBreaks(totalHeight: number, units: UnitBox[], pageHeight: number): number[] {
  const breaks = [0];
  let pageStart = 0;
  const maxPageOverflow = pageHeight * 0.15;
  const minUsedBeforeBreak = pageHeight * 0.2;

  while (pageStart < totalHeight - 1) {
    let pageEnd = Math.min(pageStart + pageHeight, totalHeight);

    if (pageEnd >= totalHeight) {
      breaks.push(totalHeight);
      break;
    }

    const splitUnit = units.find((u) => u.top < pageEnd && u.bottom > pageEnd);
    if (splitUnit) {
      const unitHeight = splitUnit.bottom - splitUnit.top;
      const spill = splitUnit.bottom - pageEnd;

      if (unitHeight <= pageHeight) {
        if (spill > 0 && spill <= maxPageOverflow) {
          pageEnd = splitUnit.bottom;
        } else if (splitUnit.top - pageStart >= minUsedBeforeBreak) {
          pageEnd = splitUnit.top;
        } else {
          pageEnd = Math.min(splitUnit.bottom, pageStart + pageHeight + maxPageOverflow);
        }
      }
    }

    if (pageEnd <= pageStart) {
      pageEnd = Math.min(pageStart + pageHeight, totalHeight);
    }

    pageStart = pageEnd;
    breaks.push(pageStart);
  }

  return breaks;
}

async function loadPdfFonts(doc: Document) {
  const loads = [
    doc.fonts.load("400 10.5pt Georgia"),
    doc.fonts.load("600 22pt Georgia"),
    doc.fonts.load("700 10pt Georgia"),
    doc.fonts.load('400 9.5pt "JetBrains Mono"'),
  ];
  await Promise.allSettled(loads);
  await doc.fonts.ready;
}

async function captureViewport(
  viewport: HTMLElement,
  width: number,
  height: number,
): Promise<HTMLCanvasElement> {
  const html2canvas = (await import("html2canvas")).default;
  return html2canvas(viewport, {
    scale: CAPTURE_SCALE,
    backgroundColor: "#ffffff",
    useCORS: true,
    width,
    height,
    windowWidth: width,
    windowHeight: height,
    scrollX: 0,
    scrollY: 0,
  });
}

async function savePaginatedPdf(article: HTMLElement, viewport: HTMLElement, filename: string) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

  const totalHeight = article.scrollHeight;
  const units = getUnbreakableUnits(article, CONTENT_HEIGHT_PX);
  const breaks = computePageBreaks(totalHeight, units, CONTENT_HEIGHT_PX);

  for (let i = 0; i < breaks.length - 1; i++) {
    const offsetY = breaks[i];
    const sliceHeight = breaks[i + 1] - breaks[i];

    article.style.transform = `translateY(-${offsetY}px)`;
    viewport.style.height = `${sliceHeight}px`;

    const canvas = await captureViewport(viewport, CONTENT_WIDTH_PX, sliceHeight);

    if (i > 0) pdf.addPage();

    const imgData = canvas.toDataURL("image/png");
    const sliceHeightMm = sliceHeight * (CONTENT_WIDTH_MM / CONTENT_WIDTH_PX);
    pdf.addImage(imgData, "PNG", MARGIN_MM, MARGIN_MM, CONTENT_WIDTH_MM, sliceHeightMm);
  }

  pdf.save(filename);
}

export async function downloadCv(filename = "ubaldo-santos-paton-cv.pdf") {
  const target = document.getElementById("cv-article");
  if (!target) {
    window.location.href = "/cv";
    return;
  }

  await document.fonts.ready;

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.srcdoc = buildPdfDocument(target.outerHTML);
  iframe.style.cssText = [
    "position:fixed",
    "left:0",
    "top:0",
    `width:${CONTENT_WIDTH_PX}px`,
    "border:0",
    "visibility:hidden",
    "pointer-events:none",
    "z-index:-1",
  ].join(";");
  document.body.appendChild(iframe);

  await new Promise<void>((resolve, reject) => {
    iframe.onload = () => resolve();
    iframe.onerror = () => reject(new Error("Could not load PDF frame"));
  });

  const doc = iframe.contentDocument;
  if (!doc) throw new Error("Could not create PDF frame");

  try {
    const article = doc.getElementById("cv-article");
    if (!article) throw new Error("CV article missing in PDF frame");

    await loadPdfFonts(doc);
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

    const viewport = doc.createElement("div");
    viewport.id = "pdf-viewport";
    doc.body.insertBefore(viewport, article);
    viewport.appendChild(article);

    iframe.style.height = `${article.scrollHeight}px`;

    await savePaginatedPdf(article, viewport, filename);
  } finally {
    iframe.remove();
  }
}
