function CoachChat({ question, onQuestionChange, onAnalyze, response, canAnalyze }) {
  return (
    <section style={cardStyle}>
      <h2 style={headingStyle}>Ask the Isaac Coach</h2>
      <textarea
        value={question}
        onChange={(event) => onQuestionChange(event.target.value)}
        placeholder="Ask something about your build..."
        rows="4"
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #444",
          background: "#171717",
          color: "white",
          resize: "vertical",
        }}
      />
      <button
        onClick={onAnalyze}
        disabled={!canAnalyze}
        style={{
          ...buttonStyle,
          opacity: canAnalyze ? 1 : 0.45,
          cursor: canAnalyze ? "pointer" : "not-allowed",
        }}
      >
        Analyze
      </button>
      {response && (
        <div style={{ marginTop: "20px", lineHeight: "1.6" }}>
          <h3 style={{ color: "#d4af37" }}>Analysis</h3>
          <h4>Strengths</h4>
          <p>{response.strengths}</p>
          <h4>Risks</h4>
          <p>{response.risks}</p>
          <h4>Next Focus</h4>
          <p>{response.nextFocus}</p>
          {response.healthSummary.length > 0 && (
            <>
              <h4>Health</h4>
              <p>{response.healthSummary.join(" | ")}</p>
            </>
          )}
        </div>
      )}
    </section>
  );
}

const cardStyle = {
  background: "#222",
  border: "1px solid #444",
  borderRadius: "12px",
  padding: "20px",
};

const headingStyle = {
  color: "#d4af37",
  marginTop: 0,
};

const buttonStyle = {
  marginTop: "12px",
  padding: "10px 16px",
  border: "0",
  borderRadius: "8px",
  background: "#d4af37",
  color: "#171717",
  fontWeight: "bold",
  cursor: "pointer",
};

export default CoachChat;
