# run with: python -m pytest scraper/tests

import sys
from pathlib import Path

from bs4 import BeautifulSoup

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import scrape_items  # noqa: E402


def cell(html):
    return BeautifulSoup(f"<table><tr><td>{html}</td></tr></table>", "html.parser").td


def current_text(html):
    return scrape_items.clean_text(scrape_items.drop_outdated_versions(cell(html)))


def test_keeps_current_description_only():
    html = (
        '<span class="cf-context cf-context-582"><img class="dlc" title="Removed in Repentance">'
        ' Adds a Red <a>Heart Container</a>. Old text.<br></span>'
        '<span class="cf-context cf-context-581"><img class="dlc" title="Added in Repentance">'
        ' Adds a Red <a>Heart Container</a>. New text.</span>'
    )
    assert current_text(html) == "Adds a Red Heart Container. New text."


def test_keeps_current_quality_from_slideshow():
    html = (
        '<div class="boir-slideshow"><dl>'
        '<dt class="cf-context cf-context-1083"><img class="dlc" title="Removed in Repentance+"></dt>'
        '<dd class="cf-context cf-context-1083">1</dd>'
        '<dt class="cf-context cf-context-1082"><img class="dlc" title="Added in Repentance+"></dt>'
        '<dd class="cf-context cf-context-1082">0</dd>'
        "</dl></div>"
    )
    text = current_text(html)
    assert text == "0"
    assert scrape_items.extract_quality(text) == 0


def test_plain_cells_are_unchanged():
    assert current_text("<i>Homing shots + DMG up</i>") == "Homing shots + DMG up"


def test_clean_text_fixes_spacing_before_punctuation():
    assert current_text("+0.7 <a>tears</a> . ( <a>x</a> )") == "+0.7 tears. (x)"


def test_slug_and_ids():
    assert scrape_items.create_slug("Cricket's Head") == "crickets-head"
    assert scrape_items.extract_game_id("5.100. 130") == 130
    assert scrape_items.extract_game_id("none") is None


def test_detect_item_type():
    assert scrape_items.detect_item_type("Activated Collectibles") == "active"
    assert scrape_items.detect_item_type("Passive Collectibles") == "passive"
    assert scrape_items.detect_item_type("Notes") == "unknown"
