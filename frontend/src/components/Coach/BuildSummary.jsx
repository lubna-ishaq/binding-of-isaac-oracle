import ItemImage from "../ItemImage";

function BuildSummary({ buildItems, onRemoveItem }) {
  return (
    <section style={cardStyle}>
      <h2 style={headingStyle}>Selected Build</h2>
      {buildItems.length === 0 ? (
        <p style={{ color: "#bbb" }}>No items selected yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {buildItems.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <ItemImage item={item} size={42} alt="" />
              <span style={{ flex: 1 }}>
                {item.name} <span style={{ color: "#d4af37" }}>Q{item.quality}</span>
              </span>
              <button
                type="button"
                onClick={() => onRemoveItem(item.id)}
                aria-label={`Remove ${item.name}`}
                style={removeButtonStyle}
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

const removeButtonStyle = {
  padding: "6px 8px",
  border: "1px solid #9b4b4b",
  borderRadius: "6px",
  background: "transparent",
  color: "#e58b8b",
  cursor: "pointer",
};

export default BuildSummary;
