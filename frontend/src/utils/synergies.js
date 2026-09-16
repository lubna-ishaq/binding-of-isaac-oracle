import synergies from "../data/synergies.json";

export function getSynergies() {
  return synergies;
}

// all known synergies that include this item
export function synergiesForItem(itemId) {
  return synergies.filter((synergy) => synergy.items.includes(itemId));
}

// synergies where every item is part of the build
export function synergiesInBuild(itemIds) {
  const ids = new Set(itemIds);
  return synergies.filter((synergy) => synergy.items.every((id) => ids.has(id)));
}
