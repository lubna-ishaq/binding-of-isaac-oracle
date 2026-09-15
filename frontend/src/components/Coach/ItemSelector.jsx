import { useState } from "react";

function ItemSelector({ items, loading = false, selectedItems, onAddItem }) {
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
    <section className="card">
      <h2 className="card-title">Choose Items</h2>
      <p className="muted">
        Add items from the Isaac database to your build.
      </p>
      <input
        type="search"
        className="coach-search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder={loading ? "Loading items..." : "Search an item..."}
        aria-label="Search an item to add"
        disabled={loading}
      />
      {searchTerm.trim() && (
        <div className="coach-results">
          {availableItems.slice(0, 12).map((item) => (
            <button
              key={item.id}
              type="button"
              className="coach-result"
              onClick={() => handleAddItem(item)}
            >
              {item.name} <span className="quality-tag">Q{item.quality}</span>
            </button>
          ))}
          {availableItems.length === 0 && (
            <p className="hint">No matching items.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default ItemSelector;
