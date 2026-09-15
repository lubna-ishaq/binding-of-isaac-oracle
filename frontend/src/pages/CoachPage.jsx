import { useState } from "react";
import { Link } from "react-router-dom";

import BuildSummary from "../components/Coach/BuildSummary";
import CoachChat from "../components/Coach/CoachChat";
import HealthSelector from "../components/Coach/HealthSelector";
import ItemSelector from "../components/Coach/ItemSelector";
import ScreenshotUploader from "../components/Coach/ScreenshotUploader";
import { useItems } from "../data/useItems";
import { createHealthSummary, hasConfiguredHealth } from "../utils/healthUtils";
import "./CoachPage.css";

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
  const items = useItems();
  const [screenshot, setScreenshot] = useState(null);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [buildItems, setBuildItems] = useState([]);
  const [health, setHealth] = useState(initialHealth);
  const [inputMode, setInputMode] = useState("items");

  function handleScreenshotChange(file) {
    setScreenshot(file);

    const detectedItems = file && items ? analyzeScreenshot(file, items) : [];

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
    <main className="page">
      <Link to="/" className="back-link">
        ← Back
      </Link>

      <h1 className="page-heading">ISAAC AI COACH</h1>

      <p className="preview-banner" role="note">
        Preview: the build input and health system work, but the analysis
        below is still a placeholder. Real synergy detection and screenshot
        recognition are in development.
      </p>

      <div className="coach-tabs" role="tablist" aria-label="Build input">
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
            className={`toggle-button coach-tab ${inputMode === mode ? "is-active" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="coach-grid">
        {inputMode === "screenshot" ? (
          <ScreenshotUploader
            screenshot={screenshot}
            onScreenshotChange={handleScreenshotChange}
          />
        ) : (
          <ItemSelector
            items={items ?? []}
            loading={!items}
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

export default CoachPage;
