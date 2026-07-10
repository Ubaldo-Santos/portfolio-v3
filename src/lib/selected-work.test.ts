import { describe, expect, it } from "bun:test";

import { cv } from "@/data/cv";
import { cvPrintEducation, cvPrintProjects, cvPrintWork } from "@/lib/cv-print";
import { selectFeatured } from "@/lib/selected-work";

describe("selectFeatured", () => {
  it("returns only featured items when any are flagged", () => {
    const items = [
      { id: "a", featured: true },
      { id: "b" },
      { id: "c", featured: true },
      { id: "d" },
    ];
    expect(selectFeatured(items).map((i) => i.id)).toEqual(["a", "c"]);
  });

  it("falls back to the first N items when none are featured", () => {
    const items = [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }];
    expect(selectFeatured(items, 2).map((i) => i.id)).toEqual(["a", "b"]);
  });

  it("does not mutate the input array", () => {
    const items = [{ id: "a", featured: true }];
    const result = selectFeatured(items);
    expect(result).not.toBe(items);
    expect(items).toHaveLength(1);
  });
});

describe("cvPrint selectors", () => {
  it("prints only featured work roles", () => {
    const work = cvPrintWork();
    expect(work).toHaveLength(3);
    expect(work.every((w) => w.featured)).toBe(true);
    expect(work.some((w) => w.name === "Prime IT")).toBe(false);
  });

  it("prints only featured education entries", () => {
    expect(cvPrintEducation()).toHaveLength(2);
    expect(cvPrintEducation().every((e) => e.featured)).toBe(true);
    expect(cv.education).toHaveLength(4);
  });

  it("caps printable projects at two featured items", () => {
    expect(cvPrintProjects()).toHaveLength(2);
    expect(cvPrintProjects().every((p) => p.featured)).toBe(true);
  });
});
