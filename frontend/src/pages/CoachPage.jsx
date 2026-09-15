import { useState } from "react";
import { Link } from "react-router-dom";

import items from "../data/items.generated.json";
import BuildSummary from "../components/Coach/BuildSummary";
import CoachChat from "../components/Coach/CoachChat";
import HealthSelector from "../components/Coach/HealthSelector";
import ItemSelector from "../components/Coach/ItemSelector";
import ScreenshotUploader from "../components/Coach/ScreenshotUploader";
import { createHealthSummary, hasConfiguredHealth } from "../utils/healthUtils";

const initialHealth = {
  redHeartHalfUnits: 0,
  soulHeartHalfUnits: 0,
  blackHeartHalfUnits: 0,
  brokenHearts: 0,
  eternalHearts: 0,
  goldenHearts: 0,
  rottenHearts: 0,
  boneHearts: [],
};

function detectItems() {
  return [];
}

function analyzeScreenshot() {
  return detectItems();
}

function generateAdvice(question, buildItems, health) {
  const isaacTerms = /isaac|item|synerg|build|character|boss|mod|stat|health|damage/i;

  if (!isaacTerms.test(question)) {
    return {
      strengths: "I can only help with The Binding of Isaac.",
      risks: "",
      nextFocus: "",
      healthSummary: [],
    };
  }

  if (buildItems.length === 0) {
    return {
      strengths: "No build items selected yet.",
      risks: "The build cannot be evaluated without items.",
      nextFocus: "Upload a screenshot or select items from the database.",
      healthSummary: createHealthSummary(health),
    };
  }

  return {
    strengths: `${buildItems.length} item(s) are ready for analysis.`,
    risks: "This is a mocked analysis and does not detect stats or synergies yet.",
    nextFocus: "Prioritize the stat your build is currently missing.",
    healthSummary: createHealthSummary(health),
  };
}

function CoachPage() {
  const [screenshot, setScreenshot] = useState(null);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [buildItems, setBuildItems] = useState([]);
  const [health, setHealth] = useState(initialHealth);
  const [inputMode, setInputMode] = useState("items");

  function handleScreenshotChange(file) {
    setScreenshot(file);

    const detectedItems = file ? analyzeScreenshot(file, items) : [];

    setBuildItems((currentItems) => [
      ...currentItems,
      ...detectedItems.filter(
        (detectedItem) =>
          !currentItems.some((item) => item.id === detectedItem.id)
      ),
    ]);
  }

  function handleAddItem(item) {
    setBuildItems((currentItems) => [...currentItems, item]);
  }

  function handleRemoveItem(itemId) {
    setBuildItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  }

  function handleAnalyze() {
    setResponse(generateAdvice(question, buildItems, health));
  }

  return (
    <main
      style={{
        background: "#563224",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <Link to="/" style={{ color: "#d4af37" }}>
        ← Back
      </Link>

      <h1
        style={{
          textAlign: "center",
          color: "#d4af37",
          margin: "32px 0",
        }}
      >
        ISAAC AI COACH
      </h1>

      <p className="preview-banner" role="note">
        Preview: the build input and health system work, but the analysis
        below is still a placeholder. Real synergy detection and screenshot
        recognition are in development.
      </p>

      <div style={tabContainerStyle} role="tablist" aria-label="Build input">
        {[
          ["items", "Choose Items"],
          ["screenshot", "Upload Screenshot"],
        ].map(([mode, label]) => (
          <button
            key={mode}
            type="button"
            role="tab"
            aria-selected={inputMode === mode}
            onClick={() => setInputMode(mode)}
            style={{
              ...tabStyle,
              background: inputMode === mode ? "#d4af37" : "#222",
              color: inputMode === mode ? "#171717" : "white",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "20px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {inputMode === "screenshot" ? (
          <ScreenshotUploader
            screenshot={screenshot}
            onScreenshotChange={handleScreenshotChange}
          />
        ) : (
          <ItemSelector
            items={items}
            selectedItems={buildItems}
            onAddItem={handleAddItem}
          />
        )}
        <HealthSelector health={health} setHealth={setHealth} />
        <BuildSummary
          buildItems={buildItems}
          onRemoveItem={handleRemoveItem}
        />
        <CoachChat
          question={question}
          onQuestionChange={setQuestion}
          onAnalyze={handleAnalyze}
          response={response}
          canAnalyze={
            question.trim().length > 0 &&
            buildItems.length > 0 &&
            hasConfiguredHealth(health)
          }
        />
      </div>
    </main>
  );
}

const tabContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "8px",
  marginBottom: "20px",
};

const tabStyle = {
  padding: "10px 16px",
  border: "1px solid #444",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default CoachPage;
