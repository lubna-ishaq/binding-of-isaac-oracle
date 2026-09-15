import { useEffect, useState } from "react";

// the item list is big, so it is loaded in its own chunk after the page shows up
let itemsPromise = null;

export function loadItems() {
  if (!itemsPromise) {
    itemsPromise = import("./items.generated.json").then((module) => module.default);
  }

  return itemsPromise;
}

export function useItems() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    let active = true;

    loadItems().then((loadedItems) => {
      if (active) {
        setItems(loadedItems);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return items;
}
