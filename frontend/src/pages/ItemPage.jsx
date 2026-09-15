import { Link, useParams } from "react-router-dom";

import ItemImage from "../components/ItemImage";
import items from "../data/items.generated.json";

function ItemPage() {
  const { itemId } = useParams();

  const selectedItem = items.find(
    (item) => item.id === itemId
  );

  if (!selectedItem) {
    return (
      <main style={{ minHeight: "100vh", padding: "20px" }}>
        <h1 className="page-title">Item not found</h1>

        <p style={{ margin: "20px 0" }}>
          There is no item with the ID "{itemId}".
        </p>

        <Link to="/">← Back to all items</Link>
      </main>
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

      <ItemImage
        item={selectedItem}
        size={120}
        style={{ display: "flex", margin: "30px auto 10px" }}
      />

      <h1
        style={{
          textAlign: "center",
          fontSize: "clamp(2.2rem, 7vw, 4rem)",
          color: "#fff",
          margin: "0 0 34px",
        }}
      >
        {selectedItem.name}
      </h1>

      <div
        style={{
          background: "#d4af37",
          color: "black",
          padding: "6px 12px",
          borderRadius: "8px",
          display: "block",
          width: "fit-content",
          margin: "0 auto 20px",
          fontSize: "0.9rem",
          fontWeight: "bold",
        }}
      >
        Quality {selectedItem.quality}
      </div>

      {selectedItem.description && (
         <div
        style={{
            background: "#222",
            padding: "20px",
            borderRadius: "12px",
            maxWidth: "700px",
            margin: "0 auto",
            marginTop: "20px",
            lineHeight: "1.8",
        }}
        >
        <h2
            style={{
            color: "#d4af37",
            marginTop: 0,
            }}
        >
            Description
        </h2>

        <p>{selectedItem.description}</p>
        </div>

      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
          maxWidth: "700px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            flex: "1 1 240px",
            background: "#222",
            borderRadius: "12px",
            padding: "18px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              color: "#d4af37",
              margin: "0 0 10px",
            }}
          >
            Quote
          </h3>

          <p
            style={{
              fontStyle: "italic",
            }}
          >
            "{selectedItem.quote}"
          </p>
        </div>

        <div
          style={{
            flex: "1 1 240px",
            background: "#222",
            borderRadius: "12px",
            padding: "18px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              color: "#d4af37",
              margin: "0 0 10px",
            }}
          >
            Type
          </h3>

          <p style={{ textTransform: "capitalize" }}>{selectedItem.type}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;