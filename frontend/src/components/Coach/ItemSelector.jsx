import { useState } from "react";

function ItemSelector({ items, selectedItems, onAddItem }) {
  const [searchTerm, setSearchTerm] = useState("");
  const availableItems = searchTerm.trim()
    ? items.filter(
        (item) =>
          !selectedItems.some((selectedItem) => selectedItem.id === item.id) &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  function handleAddItem(item) {
    onAddItem(item);
    setSearchTerm("");
  }

  return (
    <section style={cardStyle}>
      <h2 style={headingStyle}>Choose Items</h2>
      <p style={{ color: "#bbb" }}>
        Add items from the Isaac database to your build.
      </p>
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search an item..."
        aria-label="Search an item to add"
        style={selectStyle}
      />
      {searchTerm.trim() && (
        <div style={{ maxHeight: "220px", overflowY: "auto", marginTop: "12px" }}>
          {availableItems.slice(0, 12).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleAddItem(item)}
            style={itemButtonStyle}
          >
            {item.name} <span style={{ color: "#d4af37" }}>Q{item.quality}</span>
          </button>
          ))}
          {availableItems.length === 0 && (
            <p style={{ color: "#888" }}>No matching items.</p>
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

const selectStyle = {
  width: "100%",
  boxSizing: "border-box",
  marginTop: "16px",
  padding: "10px",
  borderRadius: "8px",
};

const itemButtonStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginBottom: "6px",
  border: "1px solid #444",
  borderRadius: "8px",
  background: "#171717",
  color: "white",
  textAlign: "left",
  cursor: "pointer",
};

export default ItemSelector;
