# The Isaac Oracle

[![CI](https://github.com/lubna-ishaq/binding-of-isaac-oracle/actions/workflows/ci.yml/badge.svg)](https://github.com/lubna-ishaq/binding-of-isaac-oracle/actions/workflows/ci.yml)

A web app for **The Binding of Isaac: Rebirth** where you can look up every item, compare items and (soon) get help with your build.

Isaac has more than 700 items, lots of different heart types and thousands of item combinations, and the information is spread over many wiki pages. The goal of this project is to have all of it in one place.

**This is still a work in progress.** The item database, item pages, the comparison page and the health system are working. The AI coach page is there, but the analysis behind it is not done yet.

![Item explorer with the quality 4 filter](docs/screenshots/home.png)

## What works right now

- **Item explorer:** all 719 items (171 active, 548 passive). You can search by name, filter by quality (0 to 4), sort A-Z or by quality and switch between a text view and an image view with tooltips.
- **Item pages:** icon, quality, description, pickup quote and type for every item.
- **Compare:** pick two items and see them next to each other.
- **Health system:** red, soul, black, bone, rotten, eternal, golden and broken hearts. The hearts are pixel SVGs so they look like the game.
- **Data pipeline:** a Python scraper that builds the item list from the wiki.

## What I am working on

- **AI coach:** choose your items and hearts, ask a question and get strengths, risks and what to focus on next. The page is done, the real analysis is not (right now it gives a placeholder answer).
- **Synergies and build analyzer**
- **Screenshot recognition:** upload a screenshot of your run and the app reads your items

| Item page | AI coach (preview) |
| --- | --- |
| ![Item page](docs/screenshots/item.png) | ![AI coach](docs/screenshots/coach.png) |

## Built with

- React 19, React Router and Vite
- Python with requests and BeautifulSoup for the scraper
- ESLint, Vitest and pytest, running on GitHub Actions

## Run it locally

You need Node.js 20 or newer.

```bash
git clone https://github.com/lubna-ishaq/binding-of-isaac-oracle.git
cd binding-of-isaac-oracle/frontend
npm install
npm run dev
```

Then open http://localhost:5173.

Other commands (inside `frontend/`):

- `npm run build` builds the app into `dist/`
- `npm run lint` runs ESLint
- `npm test` runs the tests

## Item data

The items come from the item tables on the [Binding of Isaac: Rebirth Wiki](https://bindingofisaacrebirth.wiki.gg/wiki/Items).

```bash
pip install -r scraper/requirements.txt
python scraper/scrape_items.py      # downloads the tables and writes frontend/src/data/items.generated.json
python scraper/validate_items.py    # checks ids, types and quality
python -m pytest scraper/tests      # tests for the parser
```

Note: the wiki shows old and new values next to each other (for example a different quality before and after Repentance). The scraper now removes everything marked as "Removed in ..." so the app only shows the current Repentance+ values.

## Project structure

```text
frontend/
  public/            favicon and the dancing Isaac
  src/components/    item image and all AI coach parts
  src/data/          generated item list
  src/pages/         home, item, compare, coach
  src/utils/         heart logic, image urls, tests
scraper/             scraper, validation and tests
docs/                screenshots, project plan, heart designs
```

## Roadmap

- [x] Item explorer, item pages, compare page, health system
- [x] Item database with scraper and validation
- [ ] Synergies (item pairs, bigger combos, character specific)
- [ ] Synergy graph with React Flow
- [ ] Build analyzer and a real AI coach
- [ ] Screenshot recognition
- [ ] Pages for characters, bosses, enemies, trinkets, cards, runes and pills
- [ ] Rooms, floors, route planner, transformations
- [ ] Progress tracking and a better mobile layout

The full plan is in [PROJECT_BOARD.md](PROJECT_BOARD.md).

## Live demo

The repo has a GitHub Pages workflow. To put the app online: Settings > Pages > Source: GitHub Actions, then run "Deploy to GitHub Pages" in the Actions tab.

## Credits

This is a fan project and has nothing to do with Edmund McMillen, Nicalis or the publishers of The Binding of Isaac.

- Item names, quotes, descriptions and quality values are from the [Binding of Isaac: Rebirth Wiki](https://bindingofisaacrebirth.wiki.gg/wiki/Items) (CC BY-SA 4.0), so the generated item data uses the same license.
- The item icons are loaded from the wiki and belong to their owners.
- More details in [SOURCES.md](SOURCES.md).

## License

My code is under the [MIT License](LICENSE). The game content is not.
