import { Link, useParams } from "react-router-dom";

import items from "../data/items.json";
import synergies from "../data/synergies.json";

function ItemPage() {
  const { itemId } = useParams();

  const selectedItem = items.find(
    (item) => item.id === itemId
  );

  const itemSynergies = synergies.filter((synergy) =>
    synergy.items.includes(itemId)
  );

  if (!selectedItem) {
    return (
      <div>
        <h1>Item not found</h1>

        <Link to="/">Back</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#563224",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <Link
        to="/"
        style={{
          color: "#d4af37",
        }}
      >
        ← Back
      </Link>

      <h1>{selectedItem.name}</h1>

      <p>
        <strong>ID:</strong> {selectedItem.id}
      </p>

      <p>
        <strong>Quality:</strong> {selectedItem.quality}
      </p>

      {selectedItem.description && (
        <p>{selectedItem.description}</p>
      )}

      <h2>Known Synergies</h2>

      {itemSynergies.length === 0 && (
        <p>No documented synergies yet.</p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        {itemSynergies.map((synergy) => (
          <div
            key={synergy.id}
            style={{
              background: "#333",
              padding: "15px",
              borderRadius: "10px",
              width: "250px",
            }}
          >
            <p>
              <strong>{synergy.type}</strong>
            </p>

            <p>{synergy.description}</p>

            <p>
              Related Items:
            </p>

            <ul>
              {synergy.items
                .filter(
                  (id) => id !== itemId
                )
                .map((id) => {
                  const relatedItem = items.find(
                    (item) => item.id === id
                  );

                  return (
                    <li key={id}>
                      {relatedItem
                        ? relatedItem.name
                        : id}
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemPage;