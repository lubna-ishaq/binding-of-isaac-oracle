import argparse
import json
import time
from datetime import date
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

SOURCE_PAGE = "https://bindingofisaacrebirth.fandom.com/wiki/Hearts"
SOURCE_BASE = "https://bindingofisaacrebirth.fandom.com/"
HEART_DIR = Path("frontend/public/images/hearts")
OUTPUT_FILE = Path("scraper/output/hearts.generated.json")
USER_AGENT = "IsaacOracleHeartScraper/1.0 (educational fan project)"

ASSETS = [
    ("red-heart", "Red Heart", "red-heart-full.png", ("redheart",)),
    ("half-red-heart", "Half Red Heart", "red-heart-half.png", ("halfredheart",)),
    ("soul-heart", "Soul Heart", "soul-heart-full.png", ("soulheart",)),
    ("half-soul-heart", "Half Soul Heart", "soul-heart-half.png", ("halfsoulheart",)),
    ("black-heart", "Black Heart", "black-heart-full.png", ("blackheart",)),
    ("eternal-heart", "Eternal Heart", "eternal-heart.png", ("eternalheart",)),
    ("gold-heart", "Gold Heart", "golden-heart.png", ("goldheart", "goldenheart")),
    ("broken-heart", "Broken Heart", "broken-heart.png", ("brokenheart",)),
    ("bone-heart", "Bone Heart", "bone-heart-empty.png", ("boneheart",)),
    ("rotten-heart", "Rotten Heart", "rotten-heart.png", ("rottenheart",)),
]


def normalized(value):
    return "".join(character.lower() for character in value if character.isalnum())


def discover_images(html):
    soup = BeautifulSoup(html, "html.parser")
    images = []
    for image in soup.find_all("img"):
        source = image.get("src") or image.get("data-src")
        if not source:
            continue
        source = urljoin(SOURCE_BASE, source)
        text = normalized(f"{image.get('alt', '')} {image.get('title', '')} {source}")
        images.append((text, source))
    discovered = {}
    for heart_id, name, filename, names in ASSETS:
        for text, source in images:
            if any(candidate in text for candidate in names):
                discovered[heart_id] = {
                    "id": heart_id,
                    "name": name,
                    "localPath": f"/images/hearts/{filename}",
                    "sourcePage": SOURCE_PAGE,
                    "sourceImage": source,
                    "downloaded": False,
                }
                break
    return discovered


def download(session, entry, force):
    destination = Path(".") / entry["localPath"].lstrip("/")
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists() and not force:
        entry["downloaded"] = True
        return "skipped"
    response = session.get(entry["sourceImage"], timeout=30)
    response.raise_for_status()
    if not response.content:
        raise ValueError("empty image response")
    destination.write_bytes(response.content)
    entry["downloaded"] = True
    return "downloaded"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT})
    try:
        page = session.get(SOURCE_PAGE, timeout=30)
        page.raise_for_status()
        discovered = discover_images(page.text)
    except requests.RequestException as error:
        print(f"Source page unavailable: {error}")
        discovered = {}
    entries = []
    counts = {"downloaded": 0, "skipped": 0, "missing": 0, "failed": 0}
    for heart_id, name, filename, _ in ASSETS:
        entry = discovered.get(heart_id, {
            "id": heart_id,
            "name": name,
            "localPath": f"/images/hearts/{filename}",
            "sourcePage": SOURCE_PAGE,
            "sourceImage": None,
            "downloaded": False,
        })
        if entry["sourceImage"] is None:
            counts["missing"] += 1
        else:
            try:
                counts[download(session, entry, args.force)] += 1
                time.sleep(0.25)
            except (requests.RequestException, OSError, ValueError) as error:
                counts["failed"] += 1
                print(f"Failed download for {name}: {error}")
        entries.append(entry)
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(json.dumps(entries, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Assets discovered: {len(discovered)}")
    print(f"Assets downloaded: {counts['downloaded']}")
    print(f"Assets skipped: {counts['skipped']}")
    print(f"Assets missing: {counts['missing']}")
    print(f"Failed downloads: {counts['failed']}")
    print(f"Retrieved: {date.today().isoformat()}")


if __name__ == "__main__":
    main()
