function ScreenshotUploader({ screenshot, onScreenshotChange }) {
  return (
    <section style={cardStyle}>
      <h2 style={headingStyle}>Upload Screenshot</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => onScreenshotChange(event.target.files?.[0] || null)}
        style={{ color: "white", maxWidth: "100%" }}
      />
      {screenshot && (
        <p style={{ color: "#bbb", marginTop: "12px" }}>
          {screenshot.name} selected
        </p>
      )}
      <p style={{ color: "#888", fontSize: "0.85rem" }}>
        Screenshot detection is prepared for a future update.
      </p>
    </section>
  );
}

const cardStyle = {
  background: "#222",
  border: "1px solid #444",
  borderRadius: "12px",
  padding: "20px",
};

const headingStyle = {
  color: "#d4af37",
  marginTop: 0,
};

export default ScreenshotUploader;
