import { describe, expect, it } from "bun:test";

import { selectFeaturedWork } from "./selected-work";

describe("selectFeaturedWork", () => {
  it("returns only featured items when any are flagged", () => {
    const items = [
      { id: "a", featured: true },
      { id: "b" },
      { id: "c", featured: true },
      { id: "d" },
    ];
    expect(selectFeaturedWork(items).map((i) => i.id)).toEqual(["a", "c"]);
  });

  it("falls back to the first N items when none are featured", () => {
    const items = [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }];
    expect(selectFeaturedWork(items, 2).map((i) => i.id)).toEqual(["a", "b"]);
  });

  it("does not mutate the input array", () => {
    const items = [{ id: "a", featured: true }];
    const result = selectFeaturedWork(items);
    expect(result).not.toBe(items);
    expect(items).toHaveLength(1);
  });
});
