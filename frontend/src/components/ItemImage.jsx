import { useState } from "react";

import { getItemImageUrl } from "../utils/itemImages";
import "./ItemImage.css";

// shows the item name instead of a broken image if the icon does not load
function ItemImage({ item, size = 72, alt, className = "" }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const src = getItemImageUrl(item);
  // the size changes per page, so it stays inline
  const sizeStyle = { width: size, height: size };

  if (!src || failedSrc === src) {
    return (
      <span
        role="img"
        aria-label={alt ?? item?.name ?? "Item"}
        className={`item-image item-image--fallback ${className}`}
        style={sizeStyle}
      >
        {item?.name}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt ?? item.name}
      loading="lazy"
      onError={() => setFailedSrc(src)}
      className={`item-image ${className}`}
      style={sizeStyle}
    />
  );
}

export default ItemImage;
