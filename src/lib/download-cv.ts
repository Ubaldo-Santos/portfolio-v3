/**
 * Direct PDF download of the CV from the rendered `#cv-article` element.
 * Uses html2pdf.js (jspdf + html2canvas) dynamically so the bundle stays small.
 */
export async function downloadCv(
  filename = "ubaldo-santos-paton-cv.pdf",
): Promise<void> {
  const element = document.getElementById("cv-article");
  if (!element) return;

  // Dynamic import keeps html2pdf out of the initial bundle.
  const mod = await import("html2pdf.js");
  const html2pdf = (mod.default ?? mod) as (
    el?: HTMLElement,
  ) => {
    set: (opts: Record<string, unknown>) => ReturnType<typeof html2pdf>;
    from: (el: HTMLElement) => ReturnType<typeof html2pdf>;
    save: () => Promise<void>;
  };

  await html2pdf()
    .set({
      margin: 0,
      filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    })
    .from(element)
    .save();
}
