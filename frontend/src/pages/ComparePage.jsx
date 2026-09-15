import { useState } from "react";
import { Link } from "react-router-dom";

import ItemImage from "../components/ItemImage";
import { useItems } from "../data/useItems";
import "./ComparePage.css";

const QUALITY_COLORS = {
  4: "#d4af37",
  3: "#70b77e",
  2: "#5aa9d6",
  1: "#a9a9a9",
  0: "#d96b6b",
};

function CompareCard({ item }) {
  return (
    <article className="compare-card">
      <ItemImage item={item} size={120} />
      <h2>{item.name}</h2>
      <p
        className={`compare-card__quality ${item.quality >= 3 ? "is-high" : ""}`}
        style={{ background: QUALITY_COLORS[item.quality] ?? QUALITY_COLORS[4] }}
      >
        Quality {item.quality}
      </p>
      <p className="compare-card__type">{item.type}</p>
      <p className="compare-card__quote">"{item.quote}"</p>
      <div className="compare-card__description">
        {item.description || "No description available."}
      </div>
    </article>
  );
}

function ItemPicker({ label, items, value, onChange }) {
  return (
    <label>
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function ComparePage() {
  const items = useItems();
  const [firstItemId, setFirstItemId] = useState("");
  const [secondItemId, setSecondItemId] = useState("");

  if (!items) {
    return (
      <main className="page">
        <p className="loading">Loading items...</p>
      </main>
    );
  }

  // until something is picked, the first two items are compared
  const firstItem = items.find((item) => item.id === firstItemId) ?? items[0];
  const secondItem = items.find((item) => item.id === secondItemId) ?? items[1] ?? items[0];

  return (
    <main className="page">
      <Link to="/" className="back-link">
        ← Back
      </Link>

      <h1 className="page-heading">COMPARE ITEMS</h1>

      <div className="compare-pickers">
        <ItemPicker label="Item A" items={items} value={firstItem.id} onChange={setFirstItemId} />
        <ItemPicker label="Item B" items={items} value={secondItem.id} onChange={setSecondItemId} />
      </div>

      <div className="compare-cards">
        <CompareCard item={firstItem} />
        <div className="compare-vs">VS</div>
        <CompareCard item={secondItem} />
      </div>
    </main>
  );
}

export default ComparePage;
