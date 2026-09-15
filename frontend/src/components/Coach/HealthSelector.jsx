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
    <section className="card">
      <h2 className="card-title">Health Configuration</h2>
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

      <div className="heart-group">
        <h3>Bone Hearts</h3>
        <div className="heart-row">
          <button type="button" onClick={advanceBoneHearts} aria-label="Fill Bone Heart" title="Fill Bone Heart" className="heart-button heart-button--example">
            <PixelHeart type="bone" state="full" size={42} />
          </button>
          {health.boneHearts.map((state, index) => (
            <div key={`${state}-${index}`} className="bone-heart">
              <button
                type="button"
                title={`Cycle bone heart ${index + 1}`}
                aria-label={`Cycle bone heart ${index + 1}, currently ${state}`}
                onClick={advanceBoneHearts}
                className="heart-button"
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
                className="bone-heart__remove"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="health-summary">
        <h3>Health Summary</h3>
        {!hasConfiguredHealth(health) ? (
          <p className="muted">No health information configured.</p>
        ) : (
          <ul>
            {createHealthSummary(health).map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        )}
        <button type="button" onClick={() => setHealth(createEmptyHealth())} title="Reset health" className="gold-button reset-health">
          Reset Health
        </button>
      </div>
    </section>
  );
}

function HalfHeartGroup({ label, units, assets, onChange }) {
  const states = renderHalfHeartSequence(units);
  return (
    <div className="heart-group">
      <h3>{label}</h3>
      <div className="heart-controls">
        <div className="heart-row">
          <button type="button" onClick={() => onChange(1)} aria-label={`Fill ${label} heart`} title="Fill heart" className="heart-button heart-button--example">
            <PixelHeart type={assets} state="full" size={38} />
          </button>
          {states.map((state, index) => (
            <button type="button" key={`${state}-${index}`} onClick={() => onChange(1)} aria-label={`Fill ${label} heart`} title="Fill heart" className={`heart-button ${index === 0 ? "heart-button--first" : ""}`}>
              <PixelHeart type={assets} state={state} size={38} />
            </button>
          ))}
        </div>
        {units > 0 && (
          <button type="button" onClick={() => onChange(-1)} aria-label={`Remove half ${label} heart`} title="Remove half a heart" className="remove-button heart-minus">
            -
          </button>
        )}
      </div>
      <span className="muted">{units / 2} hearts</span>
    </div>
  );
}

function WholeHeartGroup({ label, icon, state = "full", value, onChange, fillOnClick = false }) {
  return (
    <div className="heart-group">
      <h3>{label}</h3>
      <div className="heart-controls">
        <div className="heart-row">
          <button type="button" onClick={() => onChange(1)} aria-label={`Fill ${label} heart`} title="Fill heart" className="heart-button heart-button--example">
            <HeartIcon type={icon} state={state} size={38} />
          </button>
          {Array.from({ length: value }, (_, index) => index).map((index) => (
            <button type="button" key={index} onClick={() => onChange(fillOnClick ? 1 : -1)} aria-label={`${fillOnClick ? "Fill" : "Remove"} ${label} heart`} title={`${fillOnClick ? "Fill" : "Remove"} heart`} className="heart-button">
              <HeartIcon type={icon} state={state} size={38} />
            </button>
          ))}
        </div>
      </div>
      <span className="muted">{value} hearts</span>
    </div>
  );
}

function HeartIcon({ type, state = "full", size }) {
  if (type === "gold") {
    return <span className="gold-heart" style={{ width: size, height: size }}>
      <PixelHeart type="red" size={size} />
      <PixelHeart type="gold" size={size} />
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

export default HealthSelector;
