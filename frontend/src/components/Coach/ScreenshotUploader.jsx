function ScreenshotUploader({ screenshot, onScreenshotChange }) {
  return (
    <section className="card">
      <h2 className="card-title">Upload Screenshot</h2>
      <input
        type="file"
        accept="image/*"
        className="file-input"
        onChange={(event) => onScreenshotChange(event.target.files?.[0] || null)}
      />
      {screenshot && (
        <p className="muted">{screenshot.name} selected</p>
      )}
      <p className="hint">
        Screenshot detection is prepared for a future update.
      </p>
    </section>
  );
}

export default ScreenshotUploader;
