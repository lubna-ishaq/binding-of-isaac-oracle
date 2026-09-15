export const QUALITY_FILTERS = ["all", "4", "3", "2", "1", "0"];

export const TYPE_FILTERS = [
  ["all", "All types"],
  ["active", "Active"],
  ["passive", "Passive"],
];

export function filterItems(items, { searchTerm = "", searchDescriptions = false, quality = "all", type = "all" }) {
  const search = searchTerm.trim().toLowerCase();

  return items.filter((item) => {
    const matchesSearch =
      !search ||
      item.name.toLowerCase().includes(search) ||
      (searchDescriptions && item.description.toLowerCase().includes(search));

    const matchesQuality = quality === "all" || item.quality === Number(quality);
    const matchesType = type === "all" || item.type === type;

    return matchesSearch && matchesQuality && matchesType;
  });
}

export function sortItems(items, sortMode) {
  const sorted = [...items];

  if (sortMode === "az") {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortMode === "za") {
    return sorted.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sortMode === "quality-high") {
    return sorted.sort((a, b) => (b.quality ?? -1) - (a.quality ?? -1));
  }

  if (sortMode === "quality-low") {
    return sorted.sort((a, b) => (a.quality ?? -1) - (b.quality ?? -1));
  }

  return sorted;
}
