import { Link } from "react-router-dom";
import { useState } from "react";

import ItemImage from "../components/ItemImage";
import items from "../data/items.generated.json";

function getQualityColor(quality) {
  const colors = {
    4: "#d4af37",
    3: "#70b77e",
    2: "#5aa9d6",
    1: "#a9a9a9",
    0: "#d96b6b",
  };

  return colors[quality] || "#d4af37";
}

function CompareCard({ item }) {
  return (
    <article
      style={{
        flex: "1 1 280px",
        maxWidth: "420px",
        background: "#222",
        border: "2px solid #444",
        borderRadius: "12px",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <ItemImage item={item} size={120} />
      <h2 style={{ color: "#fff", margin: "16px 0 12px" }}>
        {item.name}
      </h2>
      <p
        style={{
          display: "inline-block",
          background: getQualityColor(item.quality),
          color: item.quality >= 3 ? "black" : "white",
          borderRadius: "8px",
          padding: "6px 12px",
          fontWeight: "bold",
        }}
      >
        Quality {item.quality}
      </p>
      <p style={{ color: "#d4af37", fontWeight: "bold", textTransform: "capitalize" }}>
        {item.type}
      </p>
      <p style={{ fontStyle: "italic", minHeight: "28px" }}>
        "{item.quote}"
      </p>
      <div
        style={{
          marginTop: "20px",
          paddingTop: "18px",
          borderTop: "1px solid #444",
          lineHeight: "1.6",
        }}
      >
        {item.description || "No description available."}
      </div>
    </article>
  );
}

function ComparePage() {
  const [firstItemId, setFirstItemId] = useState(items[0]?.id || "");
  const [secondItemId, setSecondItemId] = useState(items[1]?.id || "");

  const firstItem = items.find((item) => item.id === firstItemId) || items[0];
  const secondItem =
    items.find((item) => item.id === secondItemId) || items[1] || items[0];

  return (
    <main
      style={{
        background: "#563224",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <Link to="/" style={{ color: "#d4af37" }}>
        ← Back
      </Link>

      <h1
        style={{
          textAlign: "center",
          color: "#d4af37",
          margin: "32px 0",
        }}
      >
        COMPARE ITEMS
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "36px",
        }}
      >
        <label>
          Item A
          <select
            value={firstItemId}
            onChange={(event) => setFirstItemId(event.target.value)}
            style={{
              display: "block",
              marginTop: "8px",
              padding: "10px",
              minWidth: "220px",
              borderRadius: "8px",
            }}
          >
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Item B
          <select
            value={secondItemId}
            onChange={(event) => setSecondItemId(event.target.value)}
            style={{
              display: "block",
              marginTop: "8px",
              padding: "10px",
              minWidth: "220px",
              borderRadius: "8px",
            }}
          >
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <CompareCard item={firstItem} />
        <div
          style={{
            alignSelf: "center",
            color: "#d4af37",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          VS
        </div>
        <CompareCard item={secondItem} />
      </div>
    </main>
  );
}

export default ComparePage;
