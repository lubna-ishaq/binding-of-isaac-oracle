import { useState } from "react";

import { getItemImageUrl } from "../utils/itemImages";

// shows the item name instead of a broken image if the icon does not load
function ItemImage({ item, size = 72, alt, style }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const src = getItemImageUrl(item);

  if (!src || failedSrc === src) {
    return (
      <span
        role="img"
        aria-label={alt ?? item?.name ?? "Item"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          padding: "4px",
          color: "#d4af37",
          fontSize: "0.7rem",
          lineHeight: 1.1,
          textAlign: "center",
          overflow: "hidden",
          ...style,
        }}
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
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        imageRendering: "pixelated",
        ...style,
      }}
    />
  );
}

export default ItemImage;
