import json
from pathlib import Path
from urllib.parse import urlparse

METADATA_FILE = Path("scraper/output/hearts.generated.json")
HEART_ROOT = (Path("frontend/public/images/hearts")).resolve()


def main():
    errors = []
    entries = json.loads(METADATA_FILE.read_text(encoding="utf-8"))
    ids = [entry.get("id") for entry in entries]
    paths = [entry.get("localPath") for entry in entries]
    if len(ids) != len(set(ids)):
        errors.append("duplicate heart IDs")
    if len(paths) != len(set(paths)):
        errors.append("duplicate local paths")
    for entry in entries:
        source = entry.get("sourceImage")
        if source and urlparse(source).scheme not in {"http", "https"}:
            errors.append(f"invalid sourceImage: {entry.get('id')}")
        local_path = entry.get("localPath", "")
        resolved = (Path("frontend/public") / local_path.lstrip("/")).resolve()
        if HEART_ROOT not in resolved.parents:
            errors.append(f"path outside heart directory: {local_path}")
        if entry.get("downloaded") and (not resolved.exists() or resolved.stat().st_size == 0):
            errors.append(f"missing or empty downloaded file: {local_path}")
    print(f"Validated heart entries: {len(entries)}")
    if errors:
        print("Validation failed:")
        for error in errors:
            print(f"- {error}")
        raise SystemExit(1)
    print("Heart metadata validation passed.")


if __name__ == "__main__":
    main()
