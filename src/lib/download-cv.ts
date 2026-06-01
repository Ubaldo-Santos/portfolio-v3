// Downloads the CV as a PDF. Targets the #cv-article element on the /cv route.
// If not present (user clicked from another page), navigates to /cv first.

export async function downloadCv(filename = "ubaldo-santos-paton-cv.pdf") {
  const target = document.getElementById("cv-article");
  if (!target) {
    // Fallback: navigate to /cv where the article exists
    window.location.href = "/cv";
    return;
  }

  // Dynamic import to keep main bundle small
  const html2pdf = (await import("html2pdf.js")).default;

  await html2pdf()
    .set({
      margin: [10, 10, 12, 10],
      filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    } as never)
    .from(target)
    .save();
}
