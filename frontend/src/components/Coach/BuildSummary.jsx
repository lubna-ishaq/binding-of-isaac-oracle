function BuildSummary({ buildItems, onRemoveItem }) {
  return (
    <section style={cardStyle}>
      <h2 style={headingStyle}>Selected Build</h2>
      {buildItems.length === 0 ? (
        <p style={{ color: "#bbb" }}>No items detected yet.</p>
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
              <img
                src={getImageUrl(item)}
                alt=""
                style={{ width: "42px", height: "42px", objectFit: "contain" }}
              />
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

function getImageUrl(item) {
  return item.imageSource?.startsWith("/")
    ? `https://bindingofisaacrebirth.wiki.gg${item.imageSource}`
    : item.imageSource || item.image;
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
