import { useState } from "react";
import { Link } from "react-router-dom";
import items from "../data/items.generated.json";

function getImageUrl(item) {
  if (!item.imageSource) {
    return item.image;
  }

  return item.imageSource.startsWith("/")
    ? `https://bindingofisaacrebirth.wiki.gg${item.imageSource}`
    : item.imageSource;
}

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [qualityFilter, setQualityFilter] = useState("all");
  const [viewMode, setViewMode] = useState("text");
  const [sortMode, setSortMode] = useState("default");
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const sortOptions =
    qualityFilter === "all"
      ? [
          ["default", "Default"],
          ["az", "A-Z"],
          ["za", "Z-A"],
          ["quality-high", "Quality High-Low"],
          ["quality-low", "Quality Low-High"],
        ]
      : [
          ["default", "Default"],
          ["az", "A-Z"],
          ["za", "Z-A"],
        ];

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesQuality =
      qualityFilter === "all" ||
      item.quality === Number(qualityFilter);

    return matchesSearch && matchesQuality;
  });

  const sortedItems = [...filteredItems].sort((firstItem, secondItem) => {
    if (sortMode === "az") {
      return firstItem.name.localeCompare(secondItem.name);
    }

    if (sortMode === "za") {
      return secondItem.name.localeCompare(firstItem.name);
    }

    if (sortMode === "quality-high") {
      return (secondItem.quality ?? -1) - (firstItem.quality ?? -1);
    }

    if (sortMode === "quality-low") {
      return (firstItem.quality ?? -1) - (secondItem.quality ?? -1);
    }

    return 0;
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
      <Link
        to="/compare"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 14px",
          background: "#222",
          color: "#d4af37",
          border: "1px solid #d4af37",
          borderRadius: "8px",
          fontWeight: "bold",
        }}
      >
        Compare Items
      </Link>

      <Link
        to="/coach"
        style={{
          position: "absolute",
          top: "68px",
          left: "20px",
          padding: "10px 14px",
          background: "#222",
          color: "#d4af37",
          border: "1px solid #d4af37",
          borderRadius: "8px",
          fontWeight: "bold",
        }}
      >
        AI Coach
      </Link>

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

      {viewMode === "text" && (
        <label
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
            color: "#d4af37",
            fontWeight: "bold",
          }}
        >
          Sort by
          <select
            value={sortMode}
            onChange={(event) => setSortMode(event.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #444",
              background: "#222",
              color: "white",
            }}
          >
            {sortOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginBottom: "24px",
        }}
      >
        {["text", "image"].map((mode) => (
          <button
            key={mode}
            onClick={() => {
              setViewMode(mode);
            }}
            style={{
              padding: "10px 18px",
              background: viewMode === mode ? "#d4af37" : "#222",
              color: viewMode === mode ? "black" : "white",
              border: "1px solid #444",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {mode === "text" ? "Text View" : "Image View"}
          </button>
        ))}
      </div>

      {(qualityFilter === "all"
        ? ["all"]
        : ["4", "3", "2", "1", "0"]
      ).map((quality) => {
        const qualityItems =
          quality === "all"
            ? sortedItems
            : sortedItems.filter(
                (item) => item.quality === Number(quality)
              );

        if (qualityItems.length === 0) {
          return null;
        }

        return (
          <section
            key={quality}
            id={`quality-${quality}`}
            style={{
              scrollMarginTop: "20px",
              marginBottom: quality === "all" ? 0 : "30px",
            }}
          >
            {quality !== "all" && (
              <h2
                style={{
                  color: "#d4af37",
                  textAlign: "center",
                  margin: "20px 0",
                }}
              >
                Quality {quality}
              </h2>
            )}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              {viewMode === "text"
                ? qualityItems.map((item) => (
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
            ))
          : qualityItems.map((item) => (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  width: "96px",
                  height: "96px",
                }}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
              >
                <Link
                  to={`/item/${item.id}`}
                  aria-label={`${item.name}, Quality ${item.quality}`}
                  onFocus={() => setHoveredItemId(item.id)}
                  onBlur={() => setHoveredItemId(null)}
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#222",
                    border: "2px solid #444",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  <img
                    src={getImageUrl(item)}
                    alt={item.name}
                    style={{
                      width: "72px",
                      height: "72px",
                      objectFit: "contain",
                    }}
                  />
                </Link>

                {hoveredItemId === item.id && (
                  <div
                    role="tooltip"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "190px",
                      padding: "12px",
                      background: "#171717",
                      border: "1px solid #d4af37",
                      borderRadius: "8px",
                      color: "white",
                      textAlign: "center",
                      zIndex: 10,
                      pointerEvents: "none",
                    }}
                  >
                    <strong style={{ color: "#d4af37" }}>
                      {item.name}
                    </strong>
                    <div>Quality {item.quality}</div>
                    <em>"{item.quote}"</em>
                  </div>
                )}
              </div>
            ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default HomePage;