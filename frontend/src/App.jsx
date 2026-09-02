// Import React's useState hook
import { useState } from "react";

// Import item data from JSON
import items from "./data/items.json";

// Import synergy data from JSON
import synergies from "./data/synergies.json";

function App() {
  // Store the currently selected item
  const [selectedItem, setSelectedItem] = useState(null);

  // Find all synergies that contain the selected item
  const itemSynergies = selectedItem
    ? synergies.filter((synergy) =>
        synergy.items.includes(selectedItem.id)
      )
    : [];

  return (
    <div
      style={{
        background: "#563224",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      {/* Main page title */}
      <h1
        style={{
          fontSize: "4rem",
          color: "#d4af37",
          textShadow: "0 0 20px rgba(212,175,55,0.6)",
          textAlign: "center",
        }}
      >
        ISAAC ORACLE
      </h1>

      {/* Item button container */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Create one button for every item */}
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedItem(item)}
            style={{
              padding: "10px",
              background: "#222",
              color: "white",
              border: "1px solid #444",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Show selected item information */}
      {selectedItem && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#222",
            borderRadius: "10px",
          }}
        >
          {/* Item title */}
          <h2>{selectedItem.name}</h2>

          {/* Item ID */}
          <p>
            <strong>ID:</strong> {selectedItem.id}
          </p>

          {/* Item quality */}
          <p>
            <strong>Quality:</strong> {selectedItem.quality}
          </p>

          {/* Optional description */}
          {selectedItem.description && (
            <p>{selectedItem.description}</p>
          )}

          <h3>Known Synergies</h3>

          {/* Synergy cards */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            {itemSynergies.map((synergy) => {
              // Get all related items except the selected item
              const relatedItems = synergy.items.filter(
                (itemId) => itemId !== selectedItem.id
              );

              return (
                <div
                  key={synergy.id}
                  style={{
                    background: "#333",
                    padding: "15px",
                    borderRadius: "10px",
                    width: "250px",
                    border:
                      synergy.type === "positive"
                        ? "2px solid lightgreen"
                        : "2px solid orange",
                  }}
                >
                  {/* Synergy type */}
                  <p
                    style={{
                      color:
                        synergy.type === "positive"
                          ? "lightgreen"
                          : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {synergy.type}
                  </p>

                  {/* Related items */}
                  <p>
                    <strong>Items:</strong>
                  </p>

                  <ul>
                    {relatedItems.map((itemId) => (
                      <li key={itemId}>{itemId}</li>
                    ))}
                  </ul>

                  {/* Description */}
                  <p>{synergy.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;