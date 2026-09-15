import { describe, expect, it } from "vitest";

import {
  addBoneHeart,
  createHealthSummary,
  cycleBoneHeartState,
  decrementHalfHeart,
  formatHalfHeartUnits,
  hasConfiguredHealth,
  incrementHalfHeart,
  removeBoneHeart,
  renderHalfHeartSequence,
} from "../healthUtils";

const emptyHealth = {
  redHeartHalfUnits: 0,
  soulHeartHalfUnits: 0,
  blackHeartHalfUnits: 0,
  brokenHearts: 0,
  eternalHearts: 0,
  goldenHearts: 0,
  rottenHearts: 0,
  boneHearts: [],
};

describe("half heart units", () => {
  it("formats half units as hearts", () => {
    expect(formatHalfHeartUnits(3)).toBe("1.5");
  });

  it("never goes below zero", () => {
    expect(decrementHalfHeart(0)).toBe(0);
    expect(incrementHalfHeart(-2)).toBe(1);
  });

  it("renders full and half hearts in order", () => {
    expect(renderHalfHeartSequence(0)).toEqual([]);
    expect(renderHalfHeartSequence(3)).toEqual(["full", "half"]);
    expect(renderHalfHeartSequence(4)).toEqual(["full", "full"]);
  });
});

describe("bone hearts", () => {
  it("cycles empty -> half -> full -> empty", () => {
    let hearts = addBoneHeart([]);
    expect(hearts).toEqual(["empty"]);
    hearts = cycleBoneHeartState(hearts, 0);
    expect(hearts).toEqual(["half"]);
    hearts = cycleBoneHeartState(hearts, 0);
    expect(hearts).toEqual(["full"]);
    hearts = cycleBoneHeartState(hearts, 0);
    expect(hearts).toEqual(["empty"]);
  });

  it("removes only the selected heart", () => {
    expect(removeBoneHeart(["full", "half", "empty"], 1)).toEqual(["full", "empty"]);
  });
});

describe("health summary", () => {
  it("reports no health for an empty configuration", () => {
    expect(hasConfiguredHealth(emptyHealth)).toBe(false);
    expect(createHealthSummary(emptyHealth)).toEqual([]);
  });

  it("lists every configured heart type", () => {
    const health = {
      ...emptyHealth,
      redHeartHalfUnits: 5,
      goldenHearts: 1,
      boneHearts: ["full"],
    };

    expect(hasConfiguredHealth(health)).toBe(true);
    expect(createHealthSummary(health)).toEqual([
      "Red Hearts: 2.5",
      "Golden Hearts: 1",
      "Bone Hearts: full",
    ]);
  });
});
