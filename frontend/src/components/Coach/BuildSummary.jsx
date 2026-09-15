import ItemImage from "../ItemImage";

function BuildSummary({ buildItems, onRemoveItem }) {
  return (
    <section className="card">
      <h2 className="card-title">Selected Build</h2>
      {buildItems.length === 0 ? (
        <p className="muted">No items selected yet.</p>
      ) : (
        <ul className="build-list">
          {buildItems.map((item) => (
            <li key={item.id}>
              <ItemImage item={item} size={42} alt="" />
              <span className="build-list__name">
                {item.name} <span className="quality-tag">Q{item.quality}</span>
              </span>
              <button
                type="button"
                className="remove-button"
                onClick={() => onRemoveItem(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default BuildSummary;
