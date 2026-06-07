type CatApiImage = {
  id: string;
  url: string;
};

/** Breed-catalog images live on cdn2 — avoids legacy Tumblr URLs with content warnings */
const CAT_API_RANDOM =
  "https://api.thecatapi.com/v1/images/search?size=small&mime_types=jpg&format=json&order=RANDOM&has_breeds=1";

export function isAllowedCatUrl(url: string): boolean {
  return Boolean(url) && url.includes("cdn2.thecatapi.com") && !/tumblr/i.test(url);
}

export function preloadImage(url: string, timeoutMs = 6000): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    const timer = window.setTimeout(() => {
      img.src = "";
      resolve(false);
    }, timeoutMs);

    img.onload = () => {
      window.clearTimeout(timer);
      resolve(true);
    };
    img.onerror = () => {
      window.clearTimeout(timer);
      resolve(false);
    };
    img.src = url;
  });
}

async function searchCatImages(limit: number, page = 0): Promise<CatApiImage[]> {
  const response = await fetch(`${CAT_API_RANDOM}&limit=${limit}&page=${page}`);
  if (!response.ok) throw new Error(`Cat API ${response.status}`);
  return (await response.json()) as CatApiImage[];
}

function collectAllowedUrls(images: CatApiImage[], into: Set<string>) {
  for (const img of images) {
    if (img.url && isAllowedCatUrl(img.url)) into.add(img.url);
  }
}

export async function fetchCatImageUrls(count: number): Promise<string[]> {
  const unique = new Set<string>();
  let page = 0;

  while (unique.size < count && page < 12) {
    const batch = await searchCatImages(Math.min(100, count + 20), page);
    collectAllowedUrls(batch, unique);
    if (batch.length === 0) break;
    page++;
  }

  return [...unique].slice(0, count);
}

export async function fetchRandomCatUrl(): Promise<string | null> {
  try {
    for (let attempt = 0; attempt < 8; attempt++) {
      const data = await searchCatImages(10, attempt);
      const match = data.find((img) => isAllowedCatUrl(img.url));
      if (match?.url) return match.url;
    }
    return null;
  } catch {
    return null;
  }
}
