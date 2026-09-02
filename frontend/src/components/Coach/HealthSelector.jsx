import HeartImage from "./HeartImage";
import {
  addBoneHeart,
  cycleBoneHeartState,
  decrementHalfHeart,
  decrementWholeHeart,
  incrementHalfHeart,
  incrementWholeHeart,
  removeBoneHeart,
  renderHalfHeartSequence,
} from "../../utils/healthUtils";
import { createHealthSummary, hasConfiguredHealth } from "../../utils/healthUtils";

const heartAssets = {
  red: ["/images/hearts/red-heart-full.png", "/images/hearts/red-heart-half.png"],
  soul: ["/images/hearts/soul-heart-full.png", "/images/hearts/soul-heart-half.png"],
  black: ["/images/hearts/black-heart-full.png", "/images/hearts/black-heart-full.png"],
  broken: "/images/hearts/broken-heart.png",
  eternal: "/images/hearts/eternal-heart.png",
  golden: "/images/hearts/golden-heart.png",
  rotten: "/images/hearts/rotten-heart.png",
  bone: "/images/hearts/bone-heart-empty.png",
};

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

  return (
    <section style={cardStyle}>
      <h2 style={headingStyle}>Health Configuration</h2>
      <HalfHeartGroup
        label="Red Hearts"
        units={health.redHeartHalfUnits}
        assets={heartAssets.red}
        onChange={(amount) => updateHalfHeart("redHeartHalfUnits", amount)}
      />
      <HalfHeartGroup
        label="Soul Hearts"
        units={health.soulHeartHalfUnits}
        assets={heartAssets.soul}
        onChange={(amount) => updateHalfHeart("soulHeartHalfUnits", amount)}
      />
      <HalfHeartGroup
        label="Black Hearts"
        units={health.blackHeartHalfUnits}
        assets={heartAssets.black}
        onChange={(amount) => updateHalfHeart("blackHeartHalfUnits", amount)}
      />
      <WholeHeartGroup label="Broken Hearts" icon="broken" value={health.brokenHearts} onChange={(amount) => updateWholeHeart("brokenHearts", amount)} />
      <WholeHeartGroup label="Eternal Hearts" icon="eternal" value={health.eternalHearts} onChange={(amount) => updateWholeHeart("eternalHearts", amount)} />
      <WholeHeartGroup label="Golden Hearts" icon="golden" value={health.goldenHearts} onChange={(amount) => updateWholeHeart("goldenHearts", amount)} />
      <WholeHeartGroup label="Rotten Hearts" icon="rotten" value={health.rottenHearts} onChange={(amount) => updateWholeHeart("rottenHearts", amount)} />

      <div style={groupStyle}>
        <h3 style={subheadingStyle}>Bone Hearts</h3>
        <div style={heartRowStyle}>
          {health.boneHearts.map((state, index) => (
            <div key={`${state}-${index}`} style={boneStyle}>
              <button
                type="button"
                title={`Cycle bone heart ${index + 1}`}
                aria-label={`Cycle bone heart ${index + 1}, currently ${state}`}
                onClick={() => setHealth((currentHealth) => ({
                  ...currentHealth,
                  boneHearts: cycleBoneHeartState(currentHealth.boneHearts, index),
                }))}
                style={iconButtonStyle}
              >
                <HeartImage src={heartAssets.bone} alt={`Bone heart ${state}`} fallbackLabel={state} size={42} />
                <span style={{ ...boneFillStyle, width: state === "full" ? "28px" : state === "half" ? "14px" : "0" }} />
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
        <button
          type="button"
          onClick={() => setHealth((currentHealth) => ({ ...currentHealth, boneHearts: addBoneHeart(currentHealth.boneHearts) }))}
          title="Add bone heart"
          style={buttonStyle}
        >
          Add Bone Heart
        </button>
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
      </div>
    </section>
  );
}

function HalfHeartGroup({ label, units, assets, onChange }) {
  return (
    <div style={groupStyle}>
      <h3 style={subheadingStyle}>{label}</h3>
      <div style={controlRowStyle}>
        <div style={heartRowStyle}>
          {renderHalfHeartSequence(units).map((state, index) => (
            <button type="button" key={`${state}-${index}`} onClick={() => onChange(-2)} aria-label={`Remove ${label} heart`} title="Remove heart" style={iconButtonStyle}>
              <HeartImage src={state === "half" ? assets[1] : assets[0]} alt={`${label} ${state}`} fallbackLabel={state} size={38} />
            </button>
          ))}
          <button type="button" onClick={() => onChange(1)} aria-label={`Add half ${label}`} title="Add half heart" style={iconButtonStyle}>
            <HeartImage src={assets[1]} alt={`Add ${label}`} fallbackLabel="heart" size={38} />
          </button>
        </div>
      </div>
      <span style={{ color: "#bbb" }}>{units / 2} hearts</span>
    </div>
  );
}

function WholeHeartGroup({ label, icon, value, onChange }) {
  return (
    <div style={groupStyle}>
      <h3 style={subheadingStyle}>{label}</h3>
      <div style={controlRowStyle}>
        <div style={heartRowStyle}>
          {Array.from({ length: value }, (_, index) => (
            <button type="button" key={index} onClick={() => onChange(-1)} aria-label={`Remove ${label} heart`} title="Remove heart" style={iconButtonStyle}>
              <HeartImage src={heartAssets[icon]} alt={label} fallbackLabel={label.split(" ")[0]} size={38} />
            </button>
          ))}
          <button type="button" onClick={() => onChange(1)} aria-label={`Add ${label}`} title="Add heart" style={iconButtonStyle}>
            <HeartImage src={heartAssets[icon]} alt={`Add ${label}`} fallbackLabel="heart" size={38} />
          </button>
        </div>
      </div>
      <span style={{ color: "#bbb" }}>{value} hearts</span>
    </div>
  );
}

const cardStyle = { background: "#222", border: "1px solid #444", borderRadius: "12px", padding: "20px" };
const headingStyle = { color: "#d4af37", marginTop: 0 };
const subheadingStyle = { color: "#d4af37", margin: "0 0 8px" };
const groupStyle = { padding: "12px 0", borderBottom: "1px solid #444" };
const controlRowStyle = { display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" };
const heartRowStyle = { display: "flex", flexWrap: "wrap", gap: "4px", alignItems: "center", minHeight: "44px" };
const buttonStyle = { padding: "7px 12px", border: "1px solid #666", borderRadius: "6px", background: "#d4af37", color: "#171717", fontWeight: "bold", cursor: "pointer" };
const iconButtonStyle = { position: "relative", border: 0, background: "transparent", padding: "0 2px", cursor: "pointer" };
const boneStyle = { position: "relative", display: "flex", alignItems: "flex-start" };
const boneFillStyle = { position: "absolute", left: "7px", bottom: "8px", height: "5px", background: "#d96b6b", pointerEvents: "none" };
const removeStyle = { border: 0, background: "transparent", color: "#e58b8b", cursor: "pointer" };

export default HealthSelector;
