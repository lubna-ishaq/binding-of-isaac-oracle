import { synergiesInBuild } from "./synergies";

export const STATS = [
  ["damage", "Damage"],
  ["tears", "Tears"],
  ["range", "Range"],
  ["speed", "Speed"],
  ["shotSpeed", "Shot Speed"],
  ["luck", "Luck"],
];

const STAT_WORDS = {
  damage: "damage",
  tear: "tears",
  tears: "tears",
  range: "range",
  speed: "speed",
  "shot speed": "shotSpeed",
  luck: "luck",
};

const STAT_PATTERN = "(shot speed|damage|tears?|range|speed|luck)";

// "+0.7 tears", "-0.4 Tears", "+1 flat Damage"
const SIGNED_VALUE = new RegExp(`([+-]\\d+(?:\\.\\d+)?)\\s*(?:flat\\s+)?${STAT_PATTERN}\\b`, "gi");
// "Increases Damage by 0.5", "decreases speed by 0.1"
const WORDED_VALUE = new RegExp(`(increases|decreases)\\s+${STAT_PATTERN}\\s+by\\s+(\\d+(?:\\.\\d+)?)`, "gi");
// "x1.5 damage multiplier", "damage multiplier by ×1.5"
const MULTIPLIER = /(?:[x×]\s?(\d+(?:\.\d+)?)\s*damage)|(?:damage multiplier by\s*[x×]?\s?(\d+(?:\.\d+)?))/gi;

// some descriptions have no numbers, only words like "massive damage"
const TEXT_HINTS = [
  [/\b(massive|more|increased|high|extra|huge)\s+damage\b/i, "up", "more damage"],
  [/\b(less|reduced|lower)\s+damage\b/i, "down", "less damage"],
  [/(lower|decreased|reduced)\s+fire rate|fire rate is (greatly |slightly )?(decreased|reduced|lowered)/i, "down", "lower fire rate"],
  [/rapid succession|(higher|increased|faster)\s+fire rate/i, "up", "faster fire rate"],
];

const EFFECTS = [
  ["homing", /homing/i],
  ["flight", /\bflight\b|\bfly\b|\bflying\b/i],
  ["spectral", /spectral/i],
  ["piercing", /piercing/i],
];

export function statChangesFromDescription(description) {
  const changes = {};
  const add = (word, value) => {
    const stat = STAT_WORDS[word.toLowerCase()];
    changes[stat] = (changes[stat] ?? 0) + value;
  };

  for (const [, value, word] of description.matchAll(SIGNED_VALUE)) {
    add(word, Number(value));
  }

  for (const [, direction, word, value] of description.matchAll(WORDED_VALUE)) {
    add(word, direction.toLowerCase() === "increases" ? Number(value) : -Number(value));
  }

  let multiplier = 1;
  for (const [, first, second] of description.matchAll(MULTIPLIER)) {
    multiplier *= Number(first ?? second);
  }

  return { changes, multiplier };
}

function round(value) {
  return Math.round(value * 100) / 100;
}

function formatStat(key) {
  return STATS.find(([statKey]) => statKey === key)[1];
}

function totalHearts(health) {
  const halfUnits = health.redHeartHalfUnits + health.soulHeartHalfUnits + health.blackHeartHalfUnits;
  const boneHearts = health.boneHearts.filter((state) => state !== "empty").length;
  return halfUnits / 2 + boneHearts + health.rottenHearts * 0.5 + health.eternalHearts * 0.5;
}

export function analyzeBuild(buildItems, health) {
  const totals = Object.fromEntries(STATS.map(([key]) => [key, 0]));
  let damageMultiplier = 1;
  const effects = new Set();
  const textUps = [];
  const textDowns = [];

  for (const item of buildItems) {
    for (const [pattern, direction, label] of TEXT_HINTS) {
      if (pattern.test(item.description)) {
        (direction === "up" ? textUps : textDowns).push(`${item.name}: ${label}`);
      }
    }

    const { changes, multiplier } = statChangesFromDescription(item.description);

    for (const [stat, value] of Object.entries(changes)) {
      totals[stat] += value;
    }

    damageMultiplier *= multiplier;

    for (const [effect, pattern] of EFFECTS) {
      if (pattern.test(item.description)) {
        effects.add(effect);
      }
    }
  }

  for (const stat of Object.keys(totals)) {
    totals[stat] = round(totals[stat]);
  }

  const names = Object.fromEntries(buildItems.map((item) => [item.id, item.name]));
  const synergies = synergiesInBuild(buildItems.map((item) => item.id)).map((synergy) => ({
    ...synergy,
    label: synergy.items.map((id) => names[id]).join(" + "),
  }));

  const strengths = [];
  const risks = [];

  const ups = STATS.filter(([key]) => totals[key] > 0).map(([key]) => `${formatStat(key)} +${totals[key]}`);
  if (ups.length > 0) {
    strengths.push(`Stat ups: ${ups.join(", ")}.`);
  }

  if (damageMultiplier > 1) {
    strengths.push(`Damage multiplier: x${round(damageMultiplier)}.`);
  }

  if (textUps.length > 0) {
    strengths.push(`No exact numbers, but: ${textUps.join(", ")}.`);
  }

  if (effects.size > 0) {
    strengths.push(`Tear effects: ${[...effects].join(", ")}.`);
  }

  for (const synergy of synergies.filter((entry) => entry.type === "positive")) {
    strengths.push(`${synergy.label}: ${synergy.description}`);
  }

  const downs = STATS.filter(([key]) => totals[key] < 0).map(([key]) => `${formatStat(key)} ${totals[key]}`);
  if (downs.length > 0) {
    risks.push(`Stat downs: ${downs.join(", ")}.`);
  }

  if (textDowns.length > 0) {
    risks.push(`No exact numbers, but: ${textDowns.join(", ")}.`);
  }

  for (const synergy of synergies.filter((entry) => entry.type !== "positive")) {
    risks.push(`${synergy.label}: ${synergy.description}`);
  }

  const hearts = totalHearts(health);
  if (hearts <= 2) {
    risks.push(`Only ${hearts} heart(s) of health, so every hit hurts.`);
  }

  if (health.brokenHearts > 0) {
    risks.push(`${health.brokenHearts} broken heart(s) take up health slots.`);
  }

  const nextFocus = [];
  const missing = ["damage", "tears", "range", "speed"].filter((key) => totals[key] <= 0);

  const hasDamage = damageMultiplier > 1 || textUps.some((entry) => entry.endsWith("more damage"));

  if (missing.includes("damage") && !hasDamage) {
    nextFocus.push("Look for Damage ups, the build has no damage boost yet.");
  } else if (missing.includes("tears")) {
    nextFocus.push("Look for Tears ups to shoot faster.");
  } else if (missing.length > 0) {
    nextFocus.push(`Still missing: ${missing.map(formatStat).join(", ")}.`);
  }

  if (!effects.has("homing") && !effects.has("flight")) {
    nextFocus.push("Homing or flight would make the run a lot safer.");
  }

  if (hearts <= 2) {
    nextFocus.push("Pick up health before taking risky deals.");
  }

  if (strengths.length === 0) {
    strengths.push("No stat changes or known synergies found for these items yet.");
  }

  if (risks.length === 0) {
    risks.push("No obvious risks found.");
  }

  if (nextFocus.length === 0) {
    nextFocus.push("The build looks solid, keep an eye out for more synergies.");
  }

  return { totals, damageMultiplier: round(damageMultiplier), effects: [...effects], synergies, strengths, risks, nextFocus };
}
