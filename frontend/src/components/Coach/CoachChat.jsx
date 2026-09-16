import { STATS } from "../../utils/coachAnalysis";

function AnswerList({ title, entries }) {
  return (
    <>
      <h4>{title}</h4>
      <ul className="coach-answer__list">
        {entries.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ul>
    </>
  );
}

function CoachChat({ question, onQuestionChange, onAnalyze, response, canAnalyze }) {
  return (
    <section className="card">
      <h2 className="card-title">Ask the Isaac Coach</h2>
      <textarea
        className="field coach-question"
        value={question}
        onChange={(event) => onQuestionChange(event.target.value)}
        placeholder="Your question (answers to questions are coming soon)"
        aria-label="Question for the coach"
        rows="3"
      />
      <button
        type="button"
        className="gold-button coach-analyze"
        onClick={onAnalyze}
        disabled={!canAnalyze}
      >
        Analyze build
      </button>
      {!canAnalyze && (
        <p className="hint">Add at least one item and some health first.</p>
      )}
      {response && (
        <div className="coach-answer">
          <h3>Analysis</h3>

          <table className="stat-table">
            <tbody>
              {STATS.map(([key, label]) => (
                <tr key={key}>
                  <th scope="row">{label}</th>
                  <td className={response.totals[key] > 0 ? "is-up" : response.totals[key] < 0 ? "is-down" : ""}>
                    {response.totals[key] > 0 ? "+" : ""}
                    {response.totals[key]}
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row">Damage multiplier</th>
                <td className={response.damageMultiplier > 1 ? "is-up" : ""}>x{response.damageMultiplier}</td>
              </tr>
            </tbody>
          </table>

          <AnswerList title="Strengths" entries={response.strengths} />
          <AnswerList title="Risks" entries={response.risks} />
          <AnswerList title="Next Focus" entries={response.nextFocus} />

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
