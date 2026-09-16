import { describe, expect, it } from "vitest";

import items from "../../data/items.generated.json";
import synergies from "../../data/synergies.json";
import { analyzeBuild, statChangesFromDescription } from "../coachAnalysis";
import { synergiesForItem, synergiesInBuild } from "../synergies";

const byName = (name) => items.find((item) => item.name === name);

const health = {
  redHeartHalfUnits: 6,
  soulHeartHalfUnits: 0,
  blackHeartHalfUnits: 0,
  brokenHearts: 0,
  eternalHearts: 0,
  goldenHearts: 0,
  rottenHearts: 0,
  boneHearts: [],
};

describe("statChangesFromDescription", () => {
  it("reads signed values", () => {
    expect(statChangesFromDescription("+0.7 tears.").changes).toEqual({ tears: 0.7 });
    expect(statChangesFromDescription("-0.25 Shot Speed, and +4.125 Range").changes).toEqual({
      shotSpeed: -0.25,
      range: 4.125,
    });
  });

  it("reads worded values and multipliers", () => {
    const result = statChangesFromDescription("Increases Damage by 0.5, and increases damage multiplier by ×1.5.");
    expect(result.changes).toEqual({ damage: 0.5 });
    expect(result.multiplier).toBe(1.5);
    expect(statChangesFromDescription("x2.3 Damage multiplier, +1 flat Damage").multiplier).toBe(2.3);
  });
});

describe("synergy data", () => {
  it("only uses existing item ids", () => {
    const ids = new Set(items.map((item) => item.id));
    const synergyIds = new Set();

    for (const synergy of synergies) {
      expect(synergy.items.length).toBeGreaterThanOrEqual(2);
      expect(["positive", "negative", "neutral"]).toContain(synergy.type);
      expect(synergy.description).toBeTruthy();
      synergy.items.forEach((id) => expect(ids.has(id)).toBe(true));
      expect(synergyIds.has(synergy.id)).toBe(false);
      synergyIds.add(synergy.id);
    }
  });

  it("finds synergies for an item and a build", () => {
    const brimstone = byName("Brimstone");
    const innerEye = byName("The Inner Eye");

    expect(synergiesForItem(brimstone.id).length).toBeGreaterThan(5);
    expect(synergiesInBuild([brimstone.id, innerEye.id]).map((synergy) => synergy.id)).toContain(
      "brimstone-the-inner-eye"
    );
  });
});

describe("analyzeBuild", () => {
  it("sums stats and lists synergies", () => {
    const result = analyzeBuild([byName("Sacred Heart"), byName("The Sad Onion"), byName("Spoon Bender")], health);

    expect(result.totals.tears).toBeCloseTo(0.3);
    expect(result.totals.damage).toBe(1);
    expect(result.damageMultiplier).toBe(2.3);
    expect(result.effects).toContain("homing");
    expect(result.strengths.join(" ")).toContain("Damage multiplier: x2.3");
  });

  it("uses word hints when a description has no numbers", () => {
    const result = analyzeBuild([byName("Polyphemus"), byName("The Inner Eye")], health);

    expect(result.strengths.join(" ")).toContain("Polyphemus: more damage");
    expect(result.risks.join(" ")).toContain("Polyphemus: lower fire rate");
    expect(result.risks.join(" ")).toContain("The Inner Eye: lower fire rate");
  });

  it("warns about negative synergies and low health", () => {
    const result = analyzeBuild([byName("Ipecac"), byName("Technology")], { ...health, redHeartHalfUnits: 2 });

    expect(result.risks.join(" ")).toContain("Ipecac + Technology");
    expect(result.risks.join(" ")).toContain("Only 1 heart(s)");
  });
});
