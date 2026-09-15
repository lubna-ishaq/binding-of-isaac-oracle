function CoachChat({ question, onQuestionChange, onAnalyze, response, canAnalyze }) {
  return (
    <section className="card">
      <h2 className="card-title">Ask the Isaac Coach</h2>
      <textarea
        className="field coach-question"
        value={question}
        onChange={(event) => onQuestionChange(event.target.value)}
        placeholder="Ask something about your build..."
        aria-label="Question for the coach"
        rows="4"
      />
      <button
        type="button"
        className="gold-button coach-analyze"
        onClick={onAnalyze}
        disabled={!canAnalyze}
      >
        Analyze
      </button>
      {response && (
        <div className="coach-answer">
          <h3>Analysis</h3>
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

export default CoachChat;
