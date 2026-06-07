import { useCallback, useEffect, useRef, useState } from "react";
import { fetchCatImageUrls, preloadImage } from "@/lib/fetch-cat-images";
import { KONAMI_DROP_INTERVAL_MS } from "@/lib/konami-config";
import {
  clearBoardLayout,
  initBoardLayout,
  layoutSingleSticker,
  type BoardSticker,
} from "@/lib/konami-cat-board";

export function useKonamiCatBoard() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [stickers, setStickers] = useState<BoardSticker[]>([]);
  const [ready, setReady] = useState(false);
  const stickerCount = useRef(0);
  const urlPool = useRef<string[]>([]);
  const spawnIndex = useRef(0);
  const spawnId = useRef(0);
  const zCounter = useRef(100);

  const bringToFront = useCallback(() => {
    zCounter.current += 1;
    return zCounter.current;
  }, []);

  useEffect(() => {
    let cancelled = false;

    const boot = async () => {
      const grid = initBoardLayout();
      stickerCount.current = grid.count;

      try {
        const urls = await fetchCatImageUrls(grid.count);
        if (cancelled) return;
        urlPool.current = urls;
      } catch {
        if (cancelled) return;
        urlPool.current = [];
      }

      setReady(true);
      void Promise.all(urlPool.current.map((url) => preloadImage(url)));
    };

    void boot();

    return () => {
      cancelled = true;
      clearBoardLayout();
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    const spawnNext = () => {
      const count = stickerCount.current;
      if (spawnIndex.current >= count) return;

      const index = spawnIndex.current;
      spawnIndex.current += 1;

      const url = urlPool.current[index];
      if (!url) return;

      const layout = layoutSingleSticker(index);
      setStickers((prev) => [
        ...prev,
        {
          id: `${index}-${spawnId.current++}`,
          url,
          ...layout,
        },
      ]);
    };

    spawnNext();

    const interval = window.setInterval(() => {
      if (spawnIndex.current >= stickerCount.current) {
        window.clearInterval(interval);
        return;
      }
      spawnNext();
    }, KONAMI_DROP_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [ready]);

  return {
    boardRef,
    stickers,
    ready,
    bringToFront,
  };
}
