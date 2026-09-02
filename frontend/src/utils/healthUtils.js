export function formatHalfHeartUnits(units) {
  return `${units / 2}`;
}

export function incrementHalfHeart(units) {
  return Math.max(0, units) + 1;
}

export function decrementHalfHeart(units) {
  return Math.max(0, units - 1);
}

export function incrementWholeHeart(units) {
  return Math.max(0, units) + 1;
}

export function decrementWholeHeart(units) {
  return Math.max(0, units - 1);
}

export function renderHalfHeartSequence(units) {
  return Array.from({ length: Math.ceil(Math.max(0, units) / 2) }, (_, index) =>
    index < Math.floor(units / 2) ? "full" : "half"
  );
}

export function addBoneHeart(boneHearts) {
  return [...boneHearts, "empty"];
}

export function removeBoneHeart(boneHearts, index) {
  return boneHearts.filter((_, boneIndex) => boneIndex !== index);
}

export function cycleBoneHeartState(boneHearts, index) {
  const nextState = { empty: "half", half: "full", full: "empty" };

  return boneHearts.map((state, boneIndex) =>
    boneIndex === index ? nextState[state] : state
  );
}

export function hasConfiguredHealth(health) {
  return [
    health.redHeartHalfUnits,
    health.soulHeartHalfUnits,
    health.blackHeartHalfUnits,
    health.brokenHearts,
    health.eternalHearts,
    health.goldenHearts,
    health.rottenHearts,
  ].some((value) => value > 0) || health.boneHearts.length > 0;
}

export function createHealthSummary(health) {
  const summary = [];

  if (health.redHeartHalfUnits > 0) {
    summary.push(`Red Hearts: ${formatHalfHeartUnits(health.redHeartHalfUnits)}`);
  }
  if (health.soulHeartHalfUnits > 0) {
    summary.push(`Soul Hearts: ${formatHalfHeartUnits(health.soulHeartHalfUnits)}`);
  }
  if (health.blackHeartHalfUnits > 0) {
    summary.push(`Black Hearts: ${formatHalfHeartUnits(health.blackHeartHalfUnits)}`);
  }
  if (health.brokenHearts > 0) summary.push(`Broken Hearts: ${health.brokenHearts}`);
  if (health.eternalHearts > 0) summary.push(`Eternal Hearts: ${health.eternalHearts}`);
  if (health.goldenHearts > 0) summary.push(`Golden Hearts: ${health.goldenHearts}`);
  if (health.rottenHearts > 0) summary.push(`Rotten Hearts: ${health.rottenHearts}`);
  if (health.boneHearts.length > 0) {
    summary.push(`Bone Hearts: ${health.boneHearts.join(", ")}`);
  }

  return summary;
}
