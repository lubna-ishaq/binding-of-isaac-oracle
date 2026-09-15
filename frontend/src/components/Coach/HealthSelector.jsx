import PixelHeart from "./PixelHeart";
import {
  cycleBoneHeartState,
  decrementHalfHeart,
  decrementWholeHeart,
  incrementHalfHeart,
  incrementWholeHeart,
  removeBoneHeart,
  renderHalfHeartSequence,
  createHealthSummary,
  hasConfiguredHealth,
} from "../../utils/healthUtils";

function HealthSelector({ health, setHealth }) {
  function updateHalfHeart(key, amount) {
    setHealth((currentHealth) => ({
      ...currentHealth,
      [key]: amount > 0
        ? incrementHalfHeart(currentHealth[key])
        : decrementHalfHeart(currentHealth[key]),
    }));
  }

  function updateWholeHeart(key, amount) {
    setHealth((currentHealth) => ({
      ...currentHealth,
      [key]: amount > 0
        ? incrementWholeHeart(currentHealth[key])
        : decrementWholeHeart(currentHealth[key]),
    }));
  }

  function advanceBoneHearts() {
    setHealth((currentHealth) => {
      const activeIndex = currentHealth.boneHearts.findIndex((boneState) => boneState !== "full");
      const boneHearts = currentHealth.boneHearts.length === 0
        ? ["empty"]
        : activeIndex < 0
          ? [...currentHealth.boneHearts, "empty"]
          : cycleBoneHeartState(currentHealth.boneHearts, activeIndex);
      return { ...currentHealth, boneHearts };
    });
  }

  return (
    <section style={cardStyle}>
      <h2 style={headingStyle}>Health Configuration</h2>
      <HalfHeartGroup
        label="Red Hearts"
        units={health.redHeartHalfUnits}
        assets="red"
        onChange={(amount) => updateHalfHeart("redHeartHalfUnits", amount)}
      />
      <HalfHeartGroup
        label="Soul Hearts"
        units={health.soulHeartHalfUnits}
        assets="soul"
        onChange={(amount) => updateHalfHeart("soulHeartHalfUnits", amount)}
      />
      <HalfHeartGroup
        label="Black Hearts"
        units={health.blackHeartHalfUnits}
        assets="black"
        onChange={(amount) => updateHalfHeart("blackHeartHalfUnits", amount)}
      />
      <WholeHeartGroup label="Broken Hearts" icon="broken" value={health.brokenHearts} onChange={(amount) => updateWholeHeart("brokenHearts", amount)} />
      <WholeHeartGroup label="Eternal Hearts" icon="eternal" state="half" fillOnClick value={health.eternalHearts} onChange={(amount) => updateWholeHeart("eternalHearts", amount)} />
      <WholeHeartGroup label="Golden Hearts" icon="gold" value={health.goldenHearts} onChange={(amount) => updateWholeHeart("goldenHearts", amount)} />
      <WholeHeartGroup label="Rotten Hearts" icon="rotten" state="half" fillOnClick value={health.rottenHearts} onChange={(amount) => updateWholeHeart("rottenHearts", amount)} />

      <div style={groupStyle}>
        <h3 style={subheadingStyle}>Bone Hearts</h3>
        <div style={heartRowStyle}>
          <button type="button" onClick={advanceBoneHearts} aria-label="Fill Bone Heart" title="Fill Bone Heart" style={exampleButtonStyle}>
            <PixelHeart type="bone" state="full" size={42} />
          </button>
          {health.boneHearts.map((state, index) => (
            <div key={`${state}-${index}`} style={boneStyle}>
              <button
                type="button"
                title={`Cycle bone heart ${index + 1}`}
                aria-label={`Cycle bone heart ${index + 1}, currently ${state}`}
                onClick={advanceBoneHearts}
                style={iconButtonStyle}
              >
                <PixelHeart type="bone" state={state} size={42} />
              </button>
              <button
                type="button"
                title="Remove bone heart"
                aria-label={`Remove bone heart ${index + 1}`}
                onClick={() => setHealth((currentHealth) => ({
                  ...currentHealth,
                  boneHearts: removeBoneHeart(currentHealth.boneHearts, index),
                }))}
                style={removeStyle}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "18px" }}>
        <h3 style={subheadingStyle}>Health Summary</h3>
        {!hasConfiguredHealth(health) ? (
          <p style={{ color: "#bbb" }}>No health information configured.</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: "20px", color: "#ddd" }}>
            {createHealthSummary(health).map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        )}
        <button type="button" onClick={() => setHealth(createEmptyHealth())} title="Reset health" style={{ ...buttonStyle, marginTop: "14px" }}>
          Reset Health
        </button>
      </div>
    </section>
  );
}

function HalfHeartGroup({ label, units, assets, onChange }) {
  const states = renderHalfHeartSequence(units);
  return (
    <div style={groupStyle}>
      <h3 style={subheadingStyle}>{label}</h3>
      <div style={controlRowStyle}>
        <div style={heartRowStyle}>
          <button type="button" onClick={() => onChange(1)} aria-label={`Fill ${label} heart`} title="Fill heart" style={exampleButtonStyle}>
            <PixelHeart type={assets} state="full" size={38} />
          </button>
          {states.map((state, index) => (
            <button type="button" key={`${state}-${index}`} onClick={() => onChange(1)} aria-label={`Fill ${label} heart`} title="Fill heart" style={{ ...iconButtonStyle, marginLeft: index === 0 ? "8px" : 0 }}>
              <PixelHeart type={assets} state={state} size={38} />
            </button>
          ))}
        </div>
        {units > 0 && (
          <button type="button" onClick={() => onChange(-1)} aria-label={`Remove half ${label} heart`} title="Remove half a heart" style={minusButtonStyle}>
            -
          </button>
        )}
      </div>
      <span style={{ color: "#bbb" }}>{units / 2} hearts</span>
    </div>
  );
}

function WholeHeartGroup({ label, icon, state = "full", value, onChange, fillOnClick = false }) {
  return (
    <div style={groupStyle}>
      <h3 style={subheadingStyle}>{label}</h3>
      <div style={controlRowStyle}>
        <div style={heartRowStyle}>
          <button type="button" onClick={() => onChange(1)} aria-label={`Fill ${label} heart`} title="Fill heart" style={exampleButtonStyle}>
            <HeartIcon type={icon} state={state} size={38} />
          </button>
          {Array.from({ length: value }, (_, index) => index).map((index) => (
            <button type="button" key={index} onClick={() => onChange(fillOnClick ? 1 : -1)} aria-label={`${fillOnClick ? "Fill" : "Remove"} ${label} heart`} title={`${fillOnClick ? "Fill" : "Remove"} heart`} style={iconButtonStyle}>
              <HeartIcon type={icon} state={state} size={38} />
            </button>
          ))}
        </div>
      </div>
      <span style={{ color: "#bbb" }}>{value} hearts</span>
    </div>
  );
}

function HeartIcon({ type, state = "full", size }) {
  if (type === "gold") {
    return <span style={{ position: "relative", display: "inline-flex", width: size, height: size }}>
      <PixelHeart type="red" size={size} />
      <PixelHeart type="gold" size={size} style={{ position: "absolute", inset: 0 }} />
    </span>;
  }
  return <PixelHeart type={type} state={state} size={size} />;
}

function createEmptyHealth() {
  return {
    redHeartHalfUnits: 0,
    soulHeartHalfUnits: 0,
    blackHeartHalfUnits: 0,
    brokenHearts: 0,
    eternalHearts: 0,
    goldenHearts: 0,
    rottenHearts: 0,
    boneHearts: [],
  };
}

const cardStyle = { background: "#222", border: "1px solid #444", borderRadius: "12px", padding: "20px" };
const headingStyle = { color: "#d4af37", marginTop: 0 };
const subheadingStyle = { color: "#d4af37", margin: "0 0 8px" };
const groupStyle = { padding: "12px 0", borderBottom: "1px solid #444" };
const controlRowStyle = { display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" };
const heartRowStyle = { display: "flex", flexWrap: "wrap", gap: "4px", alignItems: "center", minHeight: "44px" };
const buttonStyle = { padding: "7px 12px", border: "1px solid #666", borderRadius: "6px", background: "#d4af37", color: "#171717", fontWeight: "bold", cursor: "pointer" };
const iconButtonStyle = { position: "relative", border: 0, background: "transparent", padding: "0 2px", cursor: "pointer" };
const exampleButtonStyle = {
  ...iconButtonStyle,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #d4af37",
  padding: "3px",
  borderRadius: "4px",
  marginRight: "6px",
  lineHeight: 0,
};
const minusButtonStyle = { padding: "2px 10px", border: "1px solid #9b4b4b", borderRadius: "6px", background: "transparent", color: "#e58b8b", fontWeight: "bold", cursor: "pointer" };
const boneStyle = { position: "relative", display: "flex", alignItems: "flex-start" };
const removeStyle = { border: 0, background: "transparent", color: "#e58b8b", cursor: "pointer" };

export default HealthSelector;
