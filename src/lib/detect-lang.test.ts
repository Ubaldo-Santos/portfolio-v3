import { describe, expect, it } from "bun:test";

import { detectLangFromRequest, parseLangCookie } from "./detect-lang";
import { renderErrorPage } from "./error-page";

describe("parseLangCookie", () => {
  it("parses a supported lang from cookie header", () => {
    expect(parseLangCookie("lang=ca; path=/")).toBe("ca");
    expect(parseLangCookie("foo=bar; lang=en")).toBe("en");
  });

  it("returns null for missing or unsupported lang", () => {
    expect(parseLangCookie("")).toBeNull();
    expect(parseLangCookie("lang=fr")).toBeNull();
    expect(parseLangCookie("language=es")).toBeNull();
  });
});

describe("detectLangFromRequest", () => {
  it("prefers lang cookie over Accept-Language", () => {
    const request = new Request("https://example.com/", {
      headers: {
        cookie: "lang=en",
        "accept-language": "ca,es;q=0.9",
      },
    });
    expect(detectLangFromRequest(request)).toBe("en");
  });

  it("falls back to Accept-Language when cookie is absent", () => {
    const request = new Request("https://example.com/", {
      headers: { "accept-language": "ca-ES,es;q=0.8" },
    });
    expect(detectLangFromRequest(request)).toBe("ca");
  });
});

describe("renderErrorPage", () => {
  it("renders localized catastrophic error HTML", () => {
    const html = renderErrorPage("en");
    expect(html).toContain('<html lang="en">');
    expect(html).toContain("This page didn't load");
    expect(html).not.toContain("Esta página no se ha cargado");
  });
});
