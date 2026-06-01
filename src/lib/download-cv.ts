// Downloads the CV as a PDF. Targets the #cv-article element on the /cv route.
// Renders a clean print layout in an isolated iframe (no Tailwind / oklch) before capture.

const MARGIN_MM = 14;
const CONTENT_WIDTH_MM = 210 - MARGIN_MM * 2; // A4 minus @page margins
const CONTENT_WIDTH_PX = Math.round((CONTENT_WIDTH_MM * 96) / 25.4);

const CV_PDF_CSS = `
  *, *::before, *::after { box-sizing: border-box; }

  html, body {
    margin: 0;
    padding: 0;
    background: #ffffff;
    color: #000000;
    width: ${CONTENT_WIDTH_PX}px;
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
  }

  #cv-article h1 {
    font-size: 22pt;
    font-weight: 600;
    line-height: 1.2;
    margin: 0;
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
  }

  #cv-article section h2 {
    font-size: 10pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin: 0 0 12px;
  }

  #cv-article h3 {
    font-size: 11pt;
    font-weight: 600;
    line-height: 1.3;
    margin: 0;
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
  }

  #cv-article ul li {
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
    font-family: ui-monospace, "JetBrains Mono", monospace;
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
  #cv-article .mt-2 { margin-top: 8px; }
  #cv-article .mt-3 { margin-top: 12px; }
  #cv-article .pl-5 { padding-left: 20px; }
  #cv-article .leading-relaxed { line-height: 1.625; }
  #cv-article .last\\:mb-0:last-child { margin-bottom: 0; }
  #cv-article .space-y-0\\.5 > * + * { margin-top: 2px; }
  #cv-article .space-y-1 > * + * { margin-top: 4px; }
`;

function buildPdfDocument(html: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<style>${CV_PDF_CSS}</style>
</head>
<body>${html}</body>
</html>`;
}

async function captureArticleCanvas(article: HTMLElement) {
  const html2canvas = (await import("html2canvas")).default;
  const width = article.scrollWidth;
  const height = article.scrollHeight;

  return html2canvas(article, {
    scale: 2,
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

async function saveCanvasAsPdf(canvas: HTMLCanvasElement, filename: string) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const innerWidth = pageWidth - MARGIN_MM * 2;
  const innerHeight = pageHeight - MARGIN_MM * 2;

  const pxFullHeight = canvas.height;
  const pxPageHeight = Math.floor(canvas.width * (innerHeight / innerWidth));
  const nPages = Math.ceil(pxFullHeight / pxPageHeight);

  const pageCanvas = document.createElement("canvas");
  const pageCtx = pageCanvas.getContext("2d");
  if (!pageCtx) throw new Error("Canvas not supported");

  pageCanvas.width = canvas.width;

  for (let page = 0; page < nPages; page++) {
    const isLast = page === nPages - 1;
    const sliceHeight =
      isLast && pxFullHeight % pxPageHeight !== 0 ? pxFullHeight % pxPageHeight : pxPageHeight;

    pageCanvas.height = sliceHeight;
    pageCtx.fillStyle = "#ffffff";
    pageCtx.fillRect(0, 0, pageCanvas.width, sliceHeight);
    pageCtx.drawImage(
      canvas,
      0,
      page * pxPageHeight,
      canvas.width,
      sliceHeight,
      0,
      0,
      canvas.width,
      sliceHeight,
    );

    if (page > 0) pdf.addPage();

    const sliceHeightMm = sliceHeight * (innerWidth / canvas.width);
    const imgData = pageCanvas.toDataURL("image/jpeg", 0.98);
    pdf.addImage(imgData, "JPEG", MARGIN_MM, MARGIN_MM, innerWidth, sliceHeightMm);
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
  iframe.style.cssText = [
    "position:fixed",
    "left:0",
    "top:0",
    "width:0",
    "height:0",
    "border:0",
    "visibility:hidden",
    "pointer-events:none",
  ].join(";");
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  if (!doc) throw new Error("Could not create PDF frame");

  doc.open();
  doc.write(buildPdfDocument(target.outerHTML));
  doc.close();

  try {
    const article = doc.getElementById("cv-article");
    if (!article) throw new Error("CV article missing in PDF frame");

    await doc.fonts.ready;
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

    const canvas = await captureArticleCanvas(article);

    const contentRatio = article.scrollWidth / (canvas.width / 2);
    if (contentRatio < 0.9) {
      throw new Error(`PDF capture width mismatch (${contentRatio.toFixed(2)})`);
    }

    await saveCanvasAsPdf(canvas, filename);
  } finally {
    iframe.remove();
  }
}
