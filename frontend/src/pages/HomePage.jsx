import { Link } from "react-router-dom";
import items from "../data/items.json";

function HomePage() {
  return (
    <div
      style={{
        background: "#563224",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "4rem",
          color: "#d4af37",
        }}
      >
        THE ISAAC ORACLE
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/item/${item.id}`}
            style={{
              padding: "10px",
              background: "#222",
              color: "white",
              border: "1px solid #444",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;