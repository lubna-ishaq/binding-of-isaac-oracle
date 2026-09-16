import { Link, useParams } from "react-router-dom";

import ItemImage from "../components/ItemImage";
import { useItems } from "../data/useItems";
import { synergiesForItem } from "../utils/synergies";
import "./ItemPage.css";

function ItemPage() {
  const { itemId } = useParams();
  const items = useItems();

  if (!items) {
    return (
      <main className="page">
        <p className="loading">Loading item...</p>
      </main>
    );
  }

  const selectedItem = items.find((item) => item.id === itemId);
  const itemNames = Object.fromEntries(items.map((item) => [item.id, item.name]));

  if (!selectedItem) {
    return (
      <main className="page not-found">
        <h1 className="page-title">Item not found</h1>

        <p>There is no item with the ID "{itemId}".</p>

        <Link to="/" className="back-link">← Back to all items</Link>
      </main>
    );
  }

  return (
    <main className="page">
      <Link to="/" className="back-link">
        ← Back
      </Link>

      <ItemImage item={selectedItem} size={120} className="item-page__image" />

      <h1 className="item-page__name">{selectedItem.name}</h1>

      <div className="quality-badge">Quality {selectedItem.quality}</div>

      {selectedItem.description && (
        <section className="item-page__description">
          <h2>Description</h2>
          <p>{selectedItem.description}</p>
        </section>
      )}

      <div className="item-page__facts">
        <section className="item-page__fact">
          <h3>Quote</h3>
          <p>
            <em>"{selectedItem.quote}"</em>
          </p>
        </section>

        <section className="item-page__fact">
          <h3>Type</h3>
          <p className="item-page__type">{selectedItem.type}</p>
        </section>
      </div>

      <SynergyList itemId={selectedItem.id} itemNames={itemNames} />
    </main>
  );
}

function SynergyList({ itemId, itemNames }) {
  const synergies = synergiesForItem(itemId);

  if (synergies.length === 0) {
    return null;
  }

  return (
    <section className="item-page__synergies">
      <h2>Synergies</h2>
      <ul>
        {synergies.map((synergy) => {
          const partners = synergy.items.filter((id) => id !== itemId);

          return (
            <li key={synergy.id} className={`synergy synergy--${synergy.type}`}>
              <span className="synergy__partners">
                {partners.map((id, index) => (
                  <span key={id}>
                    {index > 0 && " + "}
                    <Link to={`/item/${id}`}>{itemNames[id] ?? id}</Link>
                  </span>
                ))}
              </span>
              <span className="synergy__type">{synergy.type}</span>
              <p>{synergy.description}</p>
            </li>
          );
        })}
      </ul>
      <p className="hint">
        Source: <a href={synergies[0].source}>Binding of Isaac: Rebirth Wiki</a>
      </p>
    </section>
  );
}

export default ItemPage;
