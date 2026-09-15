import { Link, useParams } from "react-router-dom";

import ItemImage from "../components/ItemImage";
import { useItems } from "../data/useItems";
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
    </main>
  );
}

export default ItemPage;
