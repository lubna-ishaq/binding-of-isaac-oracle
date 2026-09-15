import { describe, expect, it } from "vitest";

import items from "../../data/items.generated.json";
import { getItemImageUrl } from "../itemImages";

describe("getItemImageUrl", () => {
  it("resolves wiki-relative paths", () => {
    expect(getItemImageUrl({ imageSource: "/images/a.png" })).toBe(
      "https://bindingofisaacrebirth.wiki.gg/images/a.png"
    );
  });

  it("keeps absolute URLs and handles protocol-relative ones", () => {
    expect(getItemImageUrl({ imageSource: "https://x.test/a.png" })).toBe("https://x.test/a.png");
    expect(getItemImageUrl({ imageSource: "//x.test/a.png" })).toBe("https://x.test/a.png");
  });

  it("falls back to the local image path", () => {
    expect(getItemImageUrl({ image: "/images/items/a.png" })).toBe("/images/items/a.png");
    expect(getItemImageUrl(null)).toBe("");
  });
});

describe("generated item data", () => {
  it("contains unique, valid items", () => {
    const ids = new Set(items.map((item) => item.id));

    expect(items.length).toBeGreaterThan(700);
    expect(ids.size).toBe(items.length);

    for (const item of items) {
      expect(["active", "passive"]).toContain(item.type);
      expect([0, 1, 2, 3, 4]).toContain(item.quality);
      expect(item.name).toBeTruthy();
    }
  });
});
