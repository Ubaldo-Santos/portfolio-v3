import {
  KONAMI_STICKER_COUNT_CAP,
  KONAMI_STICKER_DISPLAY_SCALE,
  KONAMI_STICKER_FALL_MS,
} from "@/lib/konami-config";

export type BoardSticker = {
  id: string;
  url: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  zIndex: number;
  duration: number;
};

type GridSlot = {
  col: number;
  row: number;
};

export type BoardGrid = {
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
  baseStickerSize: number;
  count: number;
};

function randomBetween(min: number, max: number) {
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  return lo + Math.random() * (hi - lo);
}

function shuffle<T>(items: T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j]!, array[i]!];
  }
  return array;
}

let boardGrid: BoardGrid | null = null;
let shuffledSlots: GridSlot[] | null = null;

export function getBoardViewport() {
  return {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
  };
}

export function computeBoardGrid(): BoardGrid {
  const { w, h } = getBoardViewport();
  const minDim = Math.min(w, h);
  const baseStickerSize = minDim * 0.16 * KONAMI_STICKER_DISPLAY_SCALE;
  const pitch = baseStickerSize * 0.9;

  const cols = Math.max(3, Math.floor(w / pitch));
  const rows = Math.max(3, Math.floor(h / pitch));
  const count = Math.min(KONAMI_STICKER_COUNT_CAP, cols * rows);

  return {
    cols,
    rows,
    cellW: w / cols,
    cellH: h / rows,
    baseStickerSize,
    count,
  };
}

function buildGridSlots(grid: BoardGrid): GridSlot[] {
  const slots: GridSlot[] = [];
  for (let row = 0; row < grid.rows; row++) {
    for (let col = 0; col < grid.cols; col++) {
      slots.push({ col, row });
    }
  }
  return shuffle(slots).slice(0, grid.count);
}

export function initBoardLayout(): BoardGrid {
  boardGrid = computeBoardGrid();
  shuffledSlots = buildGridSlots(boardGrid);
  return boardGrid;
}

export function clearBoardLayout() {
  boardGrid = null;
  shuffledSlots = null;
}

export function getBoardStickerCount(): number {
  return boardGrid?.count ?? initBoardLayout().count;
}

export function stickerPadding(size: number) {
  return size * 0.14 + 8;
}

export function clampStickerPosition(x: number, y: number, size: number) {
  const { w, h } = getBoardViewport();
  const pad = stickerPadding(size);
  const maxX = Math.max(pad, w - size - pad);
  const maxY = Math.max(pad, h - size - pad);
  return {
    x: Math.max(pad, Math.min(x, maxX)),
    y: Math.max(pad, Math.min(y, maxY)),
  };
}

export function layoutSingleSticker(index: number): Omit<BoardSticker, "id" | "url"> {
  if (!boardGrid || !shuffledSlots) initBoardLayout();

  const grid = boardGrid!;
  const slot = shuffledSlots![index];
  if (!slot) {
    throw new Error(`No grid slot for sticker index ${index}`);
  }

  const size = grid.baseStickerSize * randomBetween(0.94, 1.04);
  const insetX = Math.max(0, (grid.cellW - size) / 2);
  const insetY = Math.max(0, (grid.cellH - size) / 2);
  const jitterX = randomBetween(0, insetX * 0.4);
  const jitterY = randomBetween(0, insetY * 0.4);
  const { x, y } = clampStickerPosition(
    slot.col * grid.cellW + insetX * 0.25 + jitterX,
    slot.row * grid.cellH + insetY * 0.25 + jitterY,
    size,
  );

  return {
    x,
    y,
    size,
    rotation: randomBetween(-16, 16),
    zIndex: index + 1,
    duration: KONAMI_STICKER_FALL_MS,
  };
}
