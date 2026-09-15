import copy
import json
import re
import time
from pathlib import Path

import requests
from bs4 import BeautifulSoup


SOURCE_URL = "https://bindingofisaacrebirth.wiki.gg/wiki/Items"

# paths relative to the repo root, so the script also works outside Codespaces
REPO_ROOT = Path(__file__).resolve().parent.parent

FRONTEND_FILE = REPO_ROOT / "frontend" / "src" / "data" / "items.generated.json"


def create_slug(name):
    """
    Convert an item name into a stable URL-friendly ID.

    Example:
    Cricket's Head -> crickets-head
    """
    slug = name.lower().strip()
    slug = slug.replace("'", "")
    slug = slug.replace("’", "")
    slug = re.sub(r"[^a-z0-9]+", "-", slug)

    return slug.strip("-")


CONTEXT_CLASS = re.compile(r"^cf-context-\d+$")


def drop_outdated_versions(cell):
    """
    Remove values that only exist in older game versions.

    The wiki shows old and new values next to each other. The old ones
    have a small icon with the title "Removed in ...". Everything with the
    same cf-context-<n> class belongs to that old value, so all of it gets
    removed and only the Repentance+ value is left.
    """
    cell = copy.copy(cell)

    for icon in cell.find_all("img", class_="dlc"):
        if "Removed in" not in (icon.get("title") or ""):
            continue

        context = icon.find_parent(class_=CONTEXT_CLASS)

        if context is None:
            continue

        context_class = next(
            name for name in context.get("class", [])
            if CONTEXT_CLASS.match(name)
        )

        for element in cell.find_all(class_=context_class):
            element.decompose()

    for element in cell.find_all(["img", "button"]):
        element.decompose()

    return cell


def clean_text(value):
    """
    Remove repeated whitespace from scraped text.
    """
    text = " ".join(value.get_text(" ", strip=True).split())

    # get_text(" ") puts a space in front of . and , after links ("tears .")
    text = re.sub(r"\s+([.,;:!?)])", r"\1", text)
    return re.sub(r"([(])\s+", r"\1", text)


def extract_game_id(raw_id):
    """
    Extract the collectible number from values such as:
    5.100. 130 -> 130
    """
    numbers = re.findall(r"\d+", raw_id)

    if not numbers:
        return None

    return int(numbers[-1])


def extract_quality(raw_quality):
    """
    Extract the first valid quality value from the quality cell.

    Some wiki rows can contain values for multiple game versions.
    This script stores the first visible value and also preserves
    the original text in qualityRaw for later review.
    """
    qualities = re.findall(r"\b[0-4]\b", raw_quality)

    if not qualities:
        return None

    return int(qualities[0])


def detect_item_type(heading_text):
    """
    Determine whether the current table contains active
    or passive collectibles.
    """
    heading = heading_text.lower()

    if "activated" in heading:
        return "active"

    if "passive" in heading:
        return "passive"

    return "unknown"


def find_previous_heading(table):
    """
    Find the h2 heading above a table.

    Only h2, because the active items table has a "Notes" h3 right above it
    and then every active item ended up as "unknown".
    """
    heading = table.find_previous("h2")

    if heading is None:
        return ""

    return heading.get_text(" ", strip=True)


def scrape_items():
    """
    Download and parse the public Isaac Wiki item table.
    """
    headers = {
        "User-Agent": (
            "IsaacOracleStudentProject/1.0 "
            "(educational portfolio project)"
        )
    }

    print("Downloading Isaac Wiki item page...")

    response = requests.get(
        SOURCE_URL,
        headers=headers,
        timeout=30,
    )

    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    items = []
    seen_game_ids = set()

    for table in soup.find_all("table"):
        header_cells = table.find_all("th")

        headers_found = [
            clean_text(cell).lower()
            for cell in header_cells
        ]

        required_headers = {
            "name",
            "id",
            "description",
        }

        if not required_headers.issubset(
            set(headers_found)
        ):
            continue

        heading_text = find_previous_heading(table)
        item_type = detect_item_type(heading_text)

        for row in table.find_all("tr"):
            cells = row.find_all(["td", "th"])

            if len(cells) < 5:
                continue

            name = clean_text(cells[0])
            raw_id = clean_text(cells[1])

            if name.lower() == "name":
                continue

            game_id = extract_game_id(raw_id)

            if game_id is None:
                continue

            if game_id in seen_game_ids:
                continue

            seen_game_ids.add(game_id)

            quote = clean_text(drop_outdated_versions(cells[3]))
            description = clean_text(drop_outdated_versions(cells[4]))

            raw_quality = (
                clean_text(drop_outdated_versions(cells[-1]))
                if len(cells) >= 6
                else ""
            )

            quality = extract_quality(raw_quality)

            icon = cells[2].find("img")
            image_url = None

            if icon is not None:
                image_url = (
                    icon.get("data-src")
                    or icon.get("src")
                )

                if image_url and image_url.startswith("//"):
                    image_url = "https:" + image_url


            item = {
                "id": f"{create_slug(name)}-{game_id}",
                "gameId": game_id,
                "name": name,
                "type": item_type,
                "quality": quality,
                "qualityRaw": raw_quality,
                "quote": quote,
                "description": description,
                "imageSource": image_url,
                "image": f"/images/items/{create_slug(name)}-{game_id}.png",
                "source": SOURCE_URL,
            }

            items.append(item)

    items.sort(key=lambda item: item["gameId"])

    return items


def validate_items(items):
    """
    Perform basic validation before writing JSON.
    """
    errors = []
    used_ids = set()

    for item in items:
        if not item["id"]:
            errors.append(
                f"Missing ID for {item['name']}"
            )

        if item["id"] in used_ids:
            errors.append(
                f"Duplicate ID: {item['id']}"
            )

        used_ids.add(item["id"])

        quality = item["quality"]

        if quality is not None and quality not in range(5):
            errors.append(
                f"Invalid quality for {item['name']}"
            )

        if item["type"] not in {"active", "passive"}:
            errors.append(
                f"Unknown item type for {item['name']}"
            )

    return errors


def save_json(items, path):
    """
    Save items as readable UTF-8 JSON.
    """
    path.parent.mkdir(parents=True, exist_ok=True)

    with path.open("w", encoding="utf-8") as file:
        json.dump(
            items,
            file,
            ensure_ascii=False,
            indent=2,
        )
        file.write("\n")


def main():
    items = scrape_items()
    errors = validate_items(items)

    print(f"Items found: {len(items)}")

    if errors:
        print("Validation errors:")

        for error in errors[:20]:
            print(f"- {error}")

        raise SystemExit(
            "Import stopped because validation failed."
        )

    save_json(items, FRONTEND_FILE)

    print(f"Generated: {FRONTEND_FILE}")

    # Be polite if the script is extended later.
    time.sleep(1)


if __name__ == "__main__":
    main()
