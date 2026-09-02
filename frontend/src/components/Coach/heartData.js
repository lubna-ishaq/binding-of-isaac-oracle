export const STATES_BY_TYPE = {
  red: ["full", "half", "empty"], bone: ["full", "half", "empty"], gold: ["full"],
  blended: ["full"], rotten: ["half"], soul: ["full", "half"], black: ["full", "half"],
  eternal: ["half"], broken: ["full"], holy: ["full"],
};

export function hasState(type, state) {
  return STATES_BY_TYPE[type]?.includes(state) ?? false;
}