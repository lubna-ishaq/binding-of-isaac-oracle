"""
Checks frontend/src/data/items.generated.json.

Usage: python scraper/validate_items.py
Exits with 1 if something is wrong, so it can run in CI.
"""

import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
FRONTEND_FILE = REPO_ROOT / "frontend" / "src" / "data" / "items.generated.json"

REQUIRED_FIELDS = ("id", "gameId", "name", "type", "quality", "quote", "description")
VALID_TYPES = {"active", "passive"}
VALID_QUALITIES = set(range(5))


def validate(items):
    errors = []
    seen_ids = set()
    seen_game_ids = set()

    for index, item in enumerate(items):
        label = item.get("name") or f"entry #{index}"

        missing = [field for field in REQUIRED_FIELDS if item.get(field) in (None, "")]
        if missing:
            errors.append(f"{label}: missing {', '.join(missing)}")

        if item.get("id") in seen_ids:
            errors.append(f"{label}: duplicate id {item.get('id')}")
        seen_ids.add(item.get("id"))

        if item.get("gameId") in seen_game_ids:
            errors.append(f"{label}: duplicate gameId {item.get('gameId')}")
        seen_game_ids.add(item.get("gameId"))

        if item.get("type") not in VALID_TYPES:
            errors.append(f"{label}: invalid type {item.get('type')!r}")

        if item.get("quality") not in VALID_QUALITIES:
            errors.append(f"{label}: invalid quality {item.get('quality')!r}")

    return errors


def main():
    items = json.loads(FRONTEND_FILE.read_text(encoding="utf-8"))
    errors = validate(items)

    active = sum(item.get("type") == "active" for item in items)
    passive = sum(item.get("type") == "passive" for item in items)
    print(f"Validated items: {len(items)} ({active} active, {passive} passive)")

    if errors:
        print("Validation failed:")
        for error in errors[:50]:
            print(f"- {error}")
        raise SystemExit(1)

    print("Item data validation passed.")


if __name__ == "__main__":
    main()
