import { useState } from "react";

function HeartImage({ src, alt, fallbackLabel, size = 32, className }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <span
        className={className}
        role="img"
        aria-label={alt}
        title={alt}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          color: "#d4af37",
          border: "1px solid #555",
          borderRadius: "6px",
          fontSize: size > 30 ? "0.7rem" : "0.6rem",
          textAlign: "center",
        }}
      >
        {fallbackLabel}
      </span>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      title={alt}
      onError={() => setHasError(true)}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        imageRendering: "pixelated",
      }}
    />
  );
}

export default HeartImage;
