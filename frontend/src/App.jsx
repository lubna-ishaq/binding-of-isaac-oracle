// Import React's useState hook
import { useState } from "react";

// Import item data from dummy JSON
import items from "./data/items.json";

function App() {
  
  // Store the currently selected item
  // Starts as null because no item is selected
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div
      style={{
        background: "#563224",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
        
      }}
    >
      {/* Main title */}
      <h1
        style={{
          fontSize: "4rem",
          color: "#d4af37",
          textShadow: "0 0 20px rgba(212,175,55,0.6)",
        }}
      >
        ISAAC SYNERGIES GRAPH
      </h1>

      {/* Container for the item buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {/* Create one button for each item */}
        {items.map((item) => (
          <button
            key={item.id}

            // Store the clicked item in selectedItem
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

      {/* Only show this section if an item is selected */}
      {selectedItem && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#222",
            borderRadius: "10px",
          }}
        >
          <h2>{selectedItem.name}</h2>

          <p>
            <strong>ID:</strong> {selectedItem.id}
          </p>

          <p>
            <strong>Quality:</strong> {selectedItem.quality}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;