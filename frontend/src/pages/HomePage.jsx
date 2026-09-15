import { useState } from "react";
import { Link } from "react-router-dom";

import ItemImage from "../components/ItemImage";
import { useItems } from "../data/useItems";
import { filterItems, QUALITY_FILTERS, sortItems, TYPE_FILTERS } from "../utils/itemFilters";
import "./HomePage.css";

const ALL_SORT_OPTIONS = [
  ["default", "Default"],
  ["az", "A-Z"],
  ["za", "Z-A"],
  ["quality-high", "Quality High-Low"],
  ["quality-low", "Quality Low-High"],
];

function HomePage() {
  const items = useItems();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDescriptions, setSearchDescriptions] = useState(false);
  const [qualityFilter, setQualityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState("text");
  const [sortMode, setSortMode] = useState("default");
  const [hoveredItemId, setHoveredItemId] = useState(null);

  // sorting by quality makes no sense when only one quality is shown
  const sortOptions =
    qualityFilter === "all" ? ALL_SORT_OPTIONS : ALL_SORT_OPTIONS.slice(0, 3);

  const filteredItems = items
    ? filterItems(items, {
        searchTerm,
        searchDescriptions,
        quality: qualityFilter,
        type: typeFilter,
      })
    : [];

  const sortedItems = sortItems(filteredItems, sortMode);

  const sections = qualityFilter === "all" ? ["all"] : ["4", "3", "2", "1", "0"];

  return (
    <div className="page">
      <header className="home-header">
        <nav className="home-nav" aria-label="Main">
          <Link to="/compare">Compare Items</Link>
          <Link to="/coach">AI Coach (preview)</Link>
        </nav>

        <h1 className="page-title">THE ISAAC ORACLE</h1>

        <img
          src={`${import.meta.env.BASE_URL}images/isaac.gif`}
          alt=""
          className="home-mascot"
        />
      </header>

      <input
        type="text"
        className="field search-box"
        placeholder="Search items..."
        aria-label="Search items"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <label className="search-option">
        <input
          type="checkbox"
          checked={searchDescriptions}
          onChange={(event) => setSearchDescriptions(event.target.checked)}
        />
        Also search in descriptions
      </label>

      <div className="button-row filter-row" role="group" aria-label="Quality filter">
        {QUALITY_FILTERS.map((quality) => (
          <button
            key={quality}
            type="button"
            className={`toggle-button ${qualityFilter === quality ? "is-active" : ""}`}
            aria-pressed={qualityFilter === quality}
            onClick={() => setQualityFilter(quality)}
          >
            {quality === "all" ? "All" : `Q${quality}`}
          </button>
        ))}
      </div>

      <div className="button-row filter-row" role="group" aria-label="Type filter">
        {TYPE_FILTERS.map(([type, label]) => (
          <button
            key={type}
            type="button"
            className={`toggle-button ${typeFilter === type ? "is-active" : ""}`}
            aria-pressed={typeFilter === type}
            onClick={() => setTypeFilter(type)}
          >
            {label}
          </button>
        ))}
      </div>

      {!items ? (
        <p className="loading">Loading items...</p>
      ) : (
        <>
          <p className="item-count">Showing {filteredItems.length} Items</p>

          {viewMode === "text" && (
            <label className="sort-label">
              Sort by
              <select
                className="field"
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value)}
              >
                {sortOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          )}

          <div className="button-row view-switch">
            {["text", "image"].map((mode) => (
              <button
                key={mode}
                type="button"
                className={`toggle-button ${viewMode === mode ? "is-active" : ""}`}
                aria-pressed={viewMode === mode}
                onClick={() => setViewMode(mode)}
              >
                {mode === "text" ? "Text View" : "Image View"}
              </button>
            ))}
          </div>

          {sections.map((quality) => {
            const sectionItems =
              quality === "all"
                ? sortedItems
                : sortedItems.filter((item) => item.quality === Number(quality));

            if (sectionItems.length === 0) {
              return null;
            }

            return (
              <section key={quality} id={`quality-${quality}`} className="quality-section">
                {quality !== "all" && <h2>Quality {quality}</h2>}

                <div className="item-grid">
                  {viewMode === "text"
                    ? sectionItems.map((item) => (
                        <Link key={item.id} to={`/item/${item.id}`} className="item-card">
                          <h3>{item.name}</h3>
                          <p>Quality {item.quality}</p>
                        </Link>
                      ))
                    : sectionItems.map((item) => (
                        <div
                          key={item.id}
                          className="item-tile"
                          onMouseEnter={() => setHoveredItemId(item.id)}
                          onMouseLeave={() => setHoveredItemId(null)}
                        >
                          <Link
                            to={`/item/${item.id}`}
                            className="item-tile__link"
                            aria-label={`${item.name}, Quality ${item.quality}`}
                            aria-describedby={
                              hoveredItemId === item.id ? `tooltip-${item.id}` : undefined
                            }
                            onFocus={() => setHoveredItemId(item.id)}
                            onBlur={() => setHoveredItemId(null)}
                          >
                            <ItemImage item={item} size={72} />
                          </Link>

                          <div className="item-tile__caption" aria-hidden="true">
                            {item.name}
                          </div>

                          {hoveredItemId === item.id && (
                            <div id={`tooltip-${item.id}`} role="tooltip" className="item-tooltip">
                              <strong>{item.name}</strong>
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
        </>
      )}
    </div>
  );
}

export default HomePage;
