// Import React's useState hook
import { useState } from "react";

// Import item data from JSON
import items from "./data/items.json";

// Import synergy data from JSON
import synergies from "./data/synergies.json";

function App() {
  // Store the currently selected item
  const [selectedItem, setSelectedItem] = useState(null);

  // Find every synergy whose item list contains the current item
  const itemSynergies = synergies.filter((synergy) =>
    synergy.items.includes(itemId)
  );
  ``
  // Get all connected items except the currently selected item
  const relatedItemIds = synergy.items.filter(
    (relatedItemId) => relatedItemId !== itemId
  );

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
        }}
      >
        ISAAC SYNERGY GRAPH
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

      {/* Show item details only when an item is selected */}
      {selectedItem && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#222",
            borderRadius: "10px",
          }}
        >
          {/* Selected item information */}
          <h2>{selectedItem.name}</h2>

          <p>
            <strong>ID:</strong> {selectedItem.id}
          </p>

          <p>
            <strong>Quality:</strong> {selectedItem.quality}
          </p>

          {/* Synergy section */}
          <h3>Synergies</h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            {itemSynergies.map((synergy, index) => (
              <div
                key={index}
                style={{
                  background: "#333",
                  padding: "15px",
                  borderRadius: "10px",
                  width: "220px",
                  border: "1px solid #555",
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

                {/* Synergy connection */}
                <p>
                  {synergy.source} ↔ {synergy.target}
                </p>

                {/* Synergy description */}
                <p>{synergy.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;