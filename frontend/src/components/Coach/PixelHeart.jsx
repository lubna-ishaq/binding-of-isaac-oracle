import { useState } from "react";
import { hasState, STATES_BY_TYPE } from "./heartData";

// eslint-disable-next-line react-refresh/only-export-components
export { hasState, STATES_BY_TYPE } from "./heartData";

const HEART_ROWS = ["  ####  ####  ", " ###### ###### ", "################", "################", "################", " ################", " ############## ", " ############## ", "  ############  ", "   ##########   ", "    ########    ", "     ######     ", "      ####      ", "       ##       "];
const CROSS_ROWS = ["      ####      ", "      ####      ", "      ####      ", "      ####      ", "################", "################", "################", "      ####      ", "      ####      ", "      ####      ", "      ####      ", "      ####      "];

const PALETTES = {
  red: ["#d02b3a", "#8f1524", "#ff7d88", "#1e0a0f"],
  bone: ["#e8e2cc", "#aaa184", "#fffaf0", "#2b2618"],
  gold: ["#f0c33c", "#b1802a", "#fff4b3", "#4a3405"],
  blended: ["#d02b3a", "#8f1524", "#ff7d88", "#1e0a0f"],
  rotten: ["#7f9a3a", "#4e6224", "#c3d97a", "#1b220f"],
  soul: ["#4f86e8", "#2f56a8", "#bfe0ff", "#101a33"],
  black: ["#5d4d80", "#332950", "#a996d6", "#120e1e"],
  eternal: ["#dfe9f2", "#a3b4c6", "#ffffff", "#27303c"],
  broken: ["#6b6b73", "#43434a", "#a9a9b3", "#15151a"],
  holy: ["#5aa0f0", "#2f63b8", "#d3e8ff", "#0f1f3d"],
};

function cellsFor(rows) {
  return rows.flatMap((row, y) => [...row].flatMap((cell, x) => cell === "#" ? [[x, y]] : []));
}

function PixelHeart({ type = "red", state, ratio, size = 32, interactive = false, onChange, style, className }) {
  const [localState, setLocalState] = useState(state ?? STATES_BY_TYPE[type]?.[0] ?? "full");
  const validStates = STATES_BY_TYPE[type] ?? STATES_BY_TYPE.red;
  const selectedState = state ?? (ratio == null ? localState : validStates[Math.round(Math.max(0, Math.min(1, ratio)) * (validStates.length - 1))]);

  if (!hasState(type, selectedState)) {
    return <svg width={size} height={size} viewBox="0 0 16 16" style={style} className={className} aria-hidden="true" />;
  }

  const palette = PALETTES[type] ?? PALETTES.red;
  const isCross = type === "holy";
  const rows = isCross ? CROSS_ROWS : HEART_ROWS;
  const cells = cellsFor(rows);
  const cellSet = new Set(cells.map(([x, y]) => `${x},${y}`));
  const half = selectedState === "half";
  const frame = type === "gold";
  const pixel = (x, y) => {
    if (half && x > 7) return palette[1];
    if (type === "blended" && x > 7) return "#4f86e8";
    if (y < 3 && x < 6) return palette[2];
    return palette[0];
  };
  const visible = frame || selectedState === "empty"
    ? cells.filter(([x, y]) => [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].some(([nx, ny]) => !cellSet.has(`${nx},${ny}`)))
    : cells;
  const activate = () => {
    if (!interactive) return;
    const next = validStates[(validStates.indexOf(selectedState) + 1) % validStates.length];
    setLocalState(next);
    onChange?.(next);
  };

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges" role="img"
      aria-label={`${type} ${selectedState}`} className={className} style={{ imageRendering: "pixelated", ...style }}
      onClick={activate} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); activate(); } }}
      tabIndex={interactive ? 0 : undefined}>
      {visible.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={frame ? palette[0] : selectedState === "empty" ? palette[3] : pixel(x, y)} />)}
      {type === "bone" && <><path d="M5 6h2M9 6h2M4 8h3M9 8h3M5 10h2M9 10h2" stroke={palette[1]} strokeWidth="1" /><path d="M8 5v7" stroke={palette[1]} strokeWidth="1" /></>}
      {type === "broken" && <path d="M7 4l2 2-2 2 2 2-2 2" stroke={palette[3]} strokeWidth="1" fill="none" />}
    </svg>
  );
}

export default PixelHeart;