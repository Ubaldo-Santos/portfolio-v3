import { describe, expect, it } from "bun:test";

import { seoBreadcrumbs } from "./seo";

describe("seoBreadcrumbs", () => {
  it("uses localized nav labels when lang is provided", () => {
    const es = seoBreadcrumbs("experience", "es");
    const ca = seoBreadcrumbs("experience", "ca");
    const en = seoBreadcrumbs("experience", "en");

    expect(es[0].name).toBe("Inicio");
    expect(es[1].name).toBe("Experiencia");

    expect(ca[0].name).toBe("Inici");
    expect(ca[1].name).toBe("Experiència");

    expect(en[0].name).toBe("Home");
    expect(en[1].name).toBe("Experience");
  });

  it("includes home and page paths", () => {
    const crumbs = seoBreadcrumbs("projects", "en");
    expect(crumbs).toEqual([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
    ]);
  });
});
