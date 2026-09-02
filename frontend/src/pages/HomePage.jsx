import { useState } from "react";
import { Link } from "react-router-dom";
import items from "../data/items.json";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [qualityFilter, setQualityFilter] = useState("all");

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesQuality =
      qualityFilter === "all" ||
      item.quality === Number(qualityFilter);

    return matchesSearch && matchesQuality;
  });

  return (
    <div
      style={{
        background: "#563224",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
        position: "relative",
      }}
    >
      <img
        src="/images/isaac.gif"
        alt="Dancing Isaac"
        style={{
          position: "absolute",
          top: "15px",
          right: "80px",
          width: "120px",
          zIndex: 1000,
          opacity: 1,
        }}
      />

      <h1
        style={{
          textAlign: "center",
          fontSize: "4rem",
          color: "#d4af37",
        }}
      >
        THE ISAAC ORACLE
      </h1>

      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "12px",
          margin: "0 auto",
          display: "block",
          borderRadius: "8px",
          border: "1px solid #444",
          background: "#222",
          color: "white",
          fontSize: "16px",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {["all", "4", "3", "2", "1", "0"].map((quality) => (
          <button
            key={quality}
            onClick={() => setQualityFilter(quality)}
            style={{
              padding: "10px 14px",
              background:
                qualityFilter === quality
                  ? "#d4af37"
                  : "#222",
              color:
                qualityFilter === quality
                  ? "black"
                  : "white",
              border: "1px solid #444",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {quality === "all" ? "All" : `Q${quality}`}
          </button>
        ))}
      </div>

      <p
        style={{
          textAlign: "center",
          color: "#d4af37",
          marginBottom: "30px",
        }}
      >
        Showing {filteredItems.length} Items
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        {filteredItems.map((item) => (
          <Link
            key={item.id}
            to={`/item/${item.id}`}
            style={{
              width: "180px",
              height: "80px",

              background: "#222",
              color: "white",

              border: "2px solid #444",
              borderRadius: "12px",

              textDecoration: "none",

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "#d4af37",
                fontSize: "1.2rem",
              }}
            >
              {item.name}
            </h3>

            <p
              style={{
                margin: 0,
                marginTop: "5px",
                color: "#bbb",
                fontSize: "0.8rem",
              }}
            >
              Quality {item.quality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;