# The Isaac Oracle

A searchable knowledge platform and build-analysis companion for The Binding of Isaac: Rebirth and its expansions.

## What is The Binding of Isaac?

The Binding of Isaac is a roguelike action game where players build unique runs by combining hundreds of items, characters, health systems and special mechanics.

A single run can contain:

- 700+ collectible items
- dozens of playable characters
- multiple health systems
- hundreds of item interactions and synergies
- branching progression paths
- many room, enemy and boss types

Because of the sheer number of mechanics and possible combinations, discovering and understanding strong builds can be difficult.

The Isaac Oracle aims to become an interactive knowledge platform and build analysis tool for the game.

The long-term goal is to bring items, synergies, characters, health, bosses, enemies, rooms, floors, pickups, transformations, unlocks and game mechanics into one structured application.

> Project status: Active development
>
> The Item Explorer, item detail pages and item comparison are implemented.
> The AI Coach, screenshot recognition, synergy engine and full encyclopedia are still in development.

## Why This Project Exists

Many Isaac resources are spread across separate wiki pages.

This project aims to bring game knowledge into a single searchable platform that can answer questions such as:

- Which item should I take?
- What synergies does this item have?
- Which character benefits most from this item?
- What route should I take next?
- Which transformation am I close to completing?
- How does my health setup affect item decisions?

## Current Project Status

### Implemented

- Searchable item explorer
- Item quality filters
- Alphabetical and quality-based sorting
- Text and image views
- Item image tooltips
- Dynamic item detail pages
- Side-by-side item comparison
- Structured generated item dataset
- Item import and validation scripts
- Multi-route React application
- Health configuration interface
- Manual build item selection
- Pixel-art heart assets and health utilities

### Partially Implemented

- AI Coach interface
- Build summary
- Health-aware build input
- Screenshot upload interface
- Initial synergy data structure
- Isaac-themed visual design

### Not Yet Implemented

- Real AI-generated build advice
- Screenshot item recognition
- Complete synergy database
- Synergy graph
- Build scoring
- Boss encyclopedia
- Enemy encyclopedia
- Character encyclopedia
- Trinkets, cards, runes and pills
- Room encyclopedia
- Floor and progression guide
- Item pool browser
- Unlock tracker
- Transformation tracker
- Seed analysis
- Mod support
- Full mobile optimisation

## Current Features

### Item Explorer

The Item Explorer provides a searchable view of the generated item dataset.

Available controls include:

- Search by item name
- Filter by item quality
- Sort alphabetically
- Sort by quality
- Switch between text and image views
- Open an individual item page
- View item name, quality and quote in image tooltips

### Item Detail Pages

Each item can be opened through its own route.

Current item pages display:

- Item image
- Item name
- Quality
- Description
- Quote
- Type

### Item Comparison

Two items can be selected and displayed side by side.

The current comparison includes:

- Images
- Names
- Quality ratings
- Types
- Quotes
- Descriptions

The comparison currently presents the data without recommending a winner or calculating build compatibility.

### Health Configuration

The Coach interface contains a health configuration model for:

- Red Hearts
- Soul Hearts
- Black Hearts
- Bone Hearts
- Rotten Hearts
- Eternal Hearts
- Golden Hearts
- Broken Hearts

The health model is intended to support future build analysis and character-specific recommendations.

### AI Coach Interface

The AI Coach interface currently supports:

- Manual item selection
- Item removal
- Build summary display
- Health configuration
- Question input
- Screenshot upload interface

The current analysis response is a placeholder. It does not yet calculate real stats, detect synergies or call an AI model.

### Data Pipeline

The repository includes scripts for importing, scraping and validating structured game data.

The generated item records include fields such as:

- Internal identifier
- Game identifier
- Name
- Type
- Quality
- Quote
- Description
- Image source
- Local image path
- Source reference

Data imported from external sources may contain combined descriptions from different game versions. The data must therefore be treated as generated source material that still requires cleaning and validation.

## Planned Complete Encyclopedia

The sections below describe the planned final scope. These features are not all implemented yet.

## Collectibles

### Passive Items

Each passive item page should eventually contain:

- Item ID
- Name
- Icon
- Quality
- Quote
- Description
- Stat changes
- Tear effects
- Special mechanics
- Item pools
- Unlock condition
- Character-specific interactions
- Transformation contribution
- Important synergies
- Anti-synergies
- Version differences
- Tags
- Related items

### Active Items

Active-item pages should additionally contain:

- Charge type
- Maximum charge
- Timed or room-based recharge
- Single-use status
- Resource cost
- Passive effect while held
- Schoolbag interaction
- Battery interaction
- Car Battery interaction
- Book of Virtues interaction
- Tainted character interactions

### Familiars

Familiars should be searchable as both items and a separate gameplay category.

Planned familiar information:

- Movement behaviour
- Attack behaviour
- Damage
- Fire rate
- Contact damage
- Projectile blocking
- BFFS interaction
- Hive Mind interaction
- Baby Bender interaction
- Friendship Necklace interaction
- Conjoined transformation contribution
- Sacrificial Altar interaction

### Quest and Story Items

Quest-related objects should be clearly separated from ordinary collectibles.

Examples of planned categories:

- Key Pieces
- Knife Pieces
- The Polaroid
- The Negative
- Dad's Note
- Broken Shovel pieces
- Mom's Shovel
- Story-path objects
- Character-exclusive objects

## Item Pools

Every item should link to all pools in which it can appear.

Planned item-pool coverage:

- Treasure Room pool
- Boss pool
- Shop pool
- Devil Room pool
- Angel Room pool
- Secret Room pool
- Library pool
- Curse Room pool
- Planetarium pool
- Golden Chest pool
- Red Chest pool
- Beggar pool
- Devil Beggar pool
- Key Master pool
- Bomb Bum pool
- Battery Bum pool
- Crane Game pool
- Rotten Beggar pool
- Ultra Secret Room pool
- Greed Mode pools
- Greedier Mode pools
- Character-specific pools
- Challenge-specific pools
- Special and temporary pools

The pool browser should support both directions:

- Open an item and view its pools
- Open a pool and view all possible items

## Synergies and Interactions

The synergy system is one of the main planned features.

### Synergy Types

- Positive synergy
- Negative interaction
- Conditional synergy
- Character-specific interaction
- Active-item interaction
- Familiar interaction
- Health interaction
- Transformation interaction
- Tear-replacement interaction
- Stat-cap interaction
- Resource interaction
- Room-specific interaction
- Boss-specific interaction
- Version-specific interaction

### Synergy Records

Each synergy should eventually include:

- Participating items
- Optional character
- Optional trinket
- Optional card, rune or pill
- Interaction type
- Description
- Resulting behaviour
- Known limitations
- Game version
- Evidence source
- Confidence or validation status

### Synergy Graph

The planned graph view should support:

- Item nodes
- Character nodes
- Trinket nodes
- Transformation nodes
- Health-mechanic nodes
- Positive and negative edges
- Search
- Filtering
- Zoom and pan
- Direct links to entity pages
- Multi-item build visualisation
- Highlighting of connected components
- Display of missing build pieces

### Combination Analysis

The final system should distinguish between:

- Pairwise interactions
- Three-item interactions
- Multi-item build interactions
- Order-dependent interactions
- Conditional interactions
- Interactions that only matter for specific characters
- Interactions that change between game versions

## Characters

### Standard Characters

Character pages should eventually include:

- Starting health
- Starting stats
- Starting items
- Starting pickups
- Starting trinkets
- Special mechanics
- Unlock method
- Completion marks
- Unlockable rewards
- Recommended items
- Risky items
- Character-specific item interactions
- Strategy notes

### Tainted Characters

Tainted characters require separate records because their mechanics can substantially change item behaviour.

Planned coverage includes:

- Tainted starting state
- Pocket active or pocket consumable
- Unique resource system
- Character-specific item behaviour
- Character-specific transformations
- Unlock method
- Birthright effect
- Completion marks
- Unlock rewards
- Recommended and dangerous interactions

### Character Comparison

A future comparison page should compare:

- Base health
- Damage
- Tears
- Range
- Shot speed
- Speed
- Luck
- Starting items
- Character mechanic
- Unlock requirements
- Difficulty considerations

## Health System

The final health guide should explain and model:

- Red Heart containers
- Filled and empty Red Hearts
- Half Red Hearts
- Double Hearts
- Soul Hearts
- Half Soul Hearts
- Black Hearts
- Half Black Hearts
- Bone Hearts
- Filled Bone Hearts
- Rotten Hearts
- Eternal Hearts
- Golden Hearts
- Broken Hearts
- Health caps
- Health ordering
- Health conversion
- Devil Deal pricing
- Character-specific health rules
- Items that remove or replace containers
- Items triggered at low health
- Items triggered by taking damage
- Items triggered by healing

The build analyzer should eventually account for health-dependent items rather than treating health as a simple total.

## Trinkets

The trinket encyclopedia should include:

- Trinket ID
- Name
- Icon
- Effect
- Golden version effect
- Smelted behaviour
- Mom's Box interaction
- Character-specific interaction
- Item synergy
- Unlock condition
- Drop source
- Related mechanics

Additional categories should include:

- Ordinary trinkets
- Golden trinkets
- Quest-related trinkets
- Destroyed or transformed trinkets
- Character-exclusive trinkets
- Temporary trinket effects

## Cards, Runes and Soul Stones

### Tarot Cards

Planned fields:

- Name
- Roman numeral
- Effect
- Reverse-card effect
- Tarot Cloth interaction
- Blank Card interaction
- Deck of Cards availability
- Unlock condition

### Playing Cards

Planned coverage:

- Suit-based cards
- Joker
- Rules Card
- Special cards
- Multiplayer or mode-specific behaviour

### Runes

Planned fields:

- Rune name
- Effect
- Clear Rune interaction
- Blank Card compatibility where relevant
- Unlock condition
- Game-version availability

### Soul Stones

Planned fields:

- Associated character
- Effect
- Unlock condition
- Clear Rune interaction
- Special limitations

### Other Consumables

The database should also cover:

- Dice Shards
- Cracked Keys
- Emergency Contact
- Credit Card
- Chaos Card
- Holy Card
- Wild Card
- Get Out of Jail Free Card
- Era Walk
- Ancient Recall
- Huge Growth
- Other special consumables

## Pills

The pill guide should include:

- Identified and unidentified appearance
- Positive pills
- Negative pills
- Neutral or situational pills
- Horse pills
- Gold pills
- Pill rotation
- PHD interaction
- False PHD interaction
- Lucky Foot interaction
- Virgo interaction
- Placebo interaction
- Character-specific effects
- Stat caps
- Temporary effects
- Permanent effects

The final AI Coach should consider whether an unidentified pill is worth taking based on the current build, character and available mitigation.

## Pickups and Resources

Planned pickup categories:

### Coins

- Penny
- Nickel
- Dime
- Double Penny
- Lucky Penny
- Sticky Nickel
- Golden Penny
- Golden Troll Bomb-related coin interactions where relevant

### Keys

- Key
- Double Key
- Charged Key
- Golden Key
- Key Ring

### Bombs

- Bomb
- Double Bomb
- Troll Bomb
- Mega Troll Bomb
- Golden Bomb
- Giga Bomb

### Batteries

- Micro Battery
- Lil' Battery
- Mega Battery
- Golden Battery

### Sacks

- Grab Bag
- Black Sack
- Character-specific sacks

### Chests

- Wooden Chest
- Old Chest
- Golden Chest
- Locked Chest
- Red Chest
- Stone Chest
- Eternal Chest
- Haunted Chest
- Mimic Chest
- Spiked Chest
- Mega Chest
- Mom's Chest
- Character-specific and mode-specific chests

### Other Pickups

- Hearts
- Cards
- Runes
- Pills
- Trinkets
- Dice Shards
- Cracked Keys
- Quest pickups
- Golden variants

## Transformations

Transformation pages should include:

- Transformation name
- Required number of contributing items
- All contributing items
- Resulting effect
- Character restrictions
- Items that count only while held
- Items that can remove progress
- Related synergies
- Visual appearance

Planned transformations include:

- Guppy
- Lord of the Flies
- Beelzebub
- Spun
- Mom
- Yes Mother?
- Conjoined
- Leviathan
- Seraphim
- Bob
- Fun Guy
- Bookworm
- Spider Baby
- Adult
- Stompy
- Super Bum
- Oh Crap
- Character-specific or expansion-specific transformations

## Stats and Build Calculation

The build analyzer should eventually model:

- Damage
- Damage multipliers
- Flat damage additions
- Tears
- Fire rate
- Tear delay
- Range
- Tear height
- Shot speed
- Speed
- Luck
- Health
- Devil and Angel Room chance
- Planetarium chance
- Active-item charge
- Tear effects
- Bomb effects
- Creep effects
- Familiar damage
- Contact damage
- Flight
- Spectral tears
- Piercing
- Homing
- Status effects
- Invulnerability
- Extra lives

The calculation engine must distinguish between:

- Additive stat changes
- Multiplicative stat changes
- Caps
- Overrides
- Conditional bonuses
- Temporary bonuses
- Room-level bonuses
- Floor-level bonuses
- Character-specific formulas
- Item-order dependencies

## AI Coach

The AI Coach is planned as an explanation and decision-support layer above the structured data.

### Planned Inputs

- Manually selected items
- Current character
- Tainted or standard character state
- Health configuration
- Current stats
- Trinkets
- Active item
- Pocket item
- Card, rune or pill
- Coins, keys and bombs
- Current floor
- Current room
- Current item choice
- Completion goal
- Screenshot input

### Planned Questions

Examples of questions the Coach should eventually answer:

- Which item should be taken?
- Is this Devil Deal worth the health cost?
- Should the current build enter the Angel or Devil path?
- Which stat is currently weakest?
- Which transformation is close to completion?
- Which item damages the current synergy?
- Is the current build safe for the next boss?
- Which active item should be kept?
- Should the current pill be used?
- Is a Sacrifice Room play viable?
- Which route is available from the current floor?
- What should be prioritised in the next shop?

### Planned Output

The Coach should return:

- Build strengths
- Build weaknesses
- Important synergies
- Dangerous interactions
- Missing stats
- Recommended priorities
- Health summary
- Resource summary
- Transformation progress
- Relevant item choices
- Explanation of the recommendation
- Source references

### Accuracy Rules

The AI layer should not invent game mechanics.

Planned safeguards:

- Retrieve facts from the local structured database
- Separate verified facts from generated suggestions
- Display source references
- Mark version-specific mechanics
- Record uncertainty
- Refuse unsupported numerical calculations
- Show which items and rules were used
- Validate important calculations independently from the language model

## Screenshot Recognition

Screenshot analysis is currently represented only by the upload interface.

Planned screenshot pipeline:

1. Upload or paste a screenshot
2. Detect the HUD region
3. Detect collectible icons
4. Detect the active item
5. Detect the trinket
6. Detect consumables
7. Detect health
8. Detect coins, keys and bombs
9. Match icons against local assets
10. Display uncertain matches for manual correction
11. Build a structured run state
12. Pass the verified run state to the analyzer

### Planned Recognition Targets

- Passive items
- Active item
- Trinket
- Card, rune or pill
- Red, Soul and Black Hearts
- Bone, Rotten, Eternal, Golden and Broken Hearts
- Coins
- Keys
- Bombs
- Character
- Floor
- Curse indicator
- Completion target where visible

The interface should never silently accept low-confidence matches.

## Bosses

Boss pages should eventually include:

- Boss name
- Image
- Floor and chapter
- Health
- Phases
- Attacks
- Summoned enemies
- Champions or variants
- Armor or damage-scaling mechanics
- Recommended strategy
- Character-specific considerations
- Item interactions
- Unlock relevance
- Completion mark
- Associated ending
- Delirium form where relevant
- Boss Rush and Greed Mode availability

### Boss Categories

- Regular bosses
- Alternative-floor bosses
- Double Trouble encounters
- Harbingers
- Seven Deadly Sins
- Mini-bosses
- Final bosses
- Optional bosses
- Story bosses
- Greed Mode bosses
- Greedier Mode bosses
- Challenge-exclusive encounters

## Enemies

Enemy pages should eventually contain:

- Enemy name
- Image
- Enemy ID
- Floors
- Room types
- Health
- Movement
- Attacks
- Projectiles
- Status immunities
- Champion variants
- Spawned enemies
- Death effects
- Related bosses
- Strategy notes
- Special interactions

Additional enemy categories:

- Standard enemies
- Champions
- Hosts
- Flies
- Spiders
- Poop enemies
- Ghost enemies
- Stone enemies
- Invulnerable hazards
- Environmental enemies
- Friendly versions
- Modded enemies

## Rooms

### Normal Rooms

Planned normal-room coverage:

- Standard rooms
- Closets
- Narrow rooms
- Double rooms
- L-shaped rooms
- Quadruple rooms
- Tiny rooms
- Flooded room variants
- Rare room layouts
- Reward rules

### Treasure Rooms

Planned Treasure Room coverage:

- Standard Treasure Rooms
- Golden Treasure Rooms
- Silver Treasure Rooms
- Devil Treasure Rooms
- Alternative-path Treasure Rooms
- Item choice behaviour
- More Options interactions
- Reroll behaviour
- Accessibility conditions

### Shops

Planned Shop coverage:

- Standard Shops
- Upgraded Shops
- Greed encounters
- Secret Shops
- Angel Shops
- Member Card shops
- Restock behaviour
- Shop item pools
- Price rules
- Sale rules
- Keeper interactions

### Libraries

The Library, sometimes informally called the book room, should include:

- Library generation conditions
- Library item pool
- Book items
- Bookworm transformation
- Reroll behaviour
- Shop and item interactions
- Layout variants

### Devil Rooms

Planned information:

- Appearance conditions
- Deal chance
- Red Heart damage effects
- Deal prices
- Character-specific prices
- Devil Room item pool
- Red Chests
- Krampus encounters
- Goat Head
- Satanic Bible interaction
- Teleportation effects
- Duality interaction
- Angel Room consequences

### Angel Rooms

Planned information:

- Appearance conditions
- Angel chance
- Angel Room item pool
- Key Piece encounters
- Statue bombing
- Sacrifice Room interaction
- Eucharist
- Duality
- Stairway shops
- Confessional interactions
- Character-specific considerations

### Curse Rooms

Planned information:

- Door damage
- Entering and leaving costs
- Flight interaction
- Curse Room item pool
- Red Chest layouts
- Devil Deal layouts
- Teleport behaviour
- Character-specific health considerations

### Sacrifice Rooms

Planned information:

- Spike damage
- Payout sequence
- Angel chance
- Teleport outcomes
- Key Piece rewards
- Uriel and Gabriel encounters
- Dark Room teleport
- Health-based recommendations
- Character-specific strategy

### Dice Rooms

The Dice Room guide should include all floor effects:

- Die-face number
- Trigger condition
- Room reroll effect
- Floor reroll effect
- Pickup reroll effect
- Item reroll effect
- D4, D6, D20 and combined behaviour
- Objects that are unaffected
- Strategy and risk notes

### Challenge Rooms

Planned categories:

- Standard Challenge Rooms
- Boss Challenge Rooms
- Entry health requirements
- Wave structure
- Reward types
- Item pools
- Character-specific considerations

### Secret Rooms

Planned categories:

- Secret Rooms
- Super Secret Rooms
- Ultra Secret Rooms
- Detection rules
- Door placement
- Typical layouts
- Item pools
- Red Key interaction
- Blue Map interaction
- X-Ray Vision interaction
- Bomb requirements

### Planetariums

Planned information:

- Spawn chance
- Chance modifiers
- Treasure Room skipping
- Telescope Lens interaction
- Planetarium item pool
- Generation limits
- Route considerations

### Arcades

Planned information:

- Spawn conditions
- Slot Machines
- Blood Donation Machines
- Fortune Telling Machines
- Shell Games
- Beggars
- Crane Games
- Restock Machines
- Confessionals
- Hell Games
- Charge Beggars
- Rotten Beggars

### Vaults

Planned information:

- Vault door requirements
- Double-key cost
- Layout types
- Pickups
- Chests
- Machines
- Item possibilities

### Bedrooms

Planned categories:

- Clean Bedrooms
- Dirty Bedrooms
- Beds
- Crawl Space access
- Health restoration
- Character-specific effects
- Trapdoor and passage behaviour

### Crawl Spaces and Black Markets

Planned coverage:

- Crawl Space entrances
- Trapdoor generation
- Black Markets
- Item pedestals
- Shops
- Exit behaviour
- I AM ERROR connections
- We Need To Go Deeper interactions
- Ehwaz interactions
- Shovel interactions

### Red Rooms

Planned coverage:

- Red Key
- Cracked Key
- Red-room generation
- Ultra Secret Rooms
- Error layouts
- Hidden Home closets
- Character unlock use
- Invalid-room behaviour

### Additional Special Rooms and Arenas

The encyclopedia should also cover:

- I AM ERROR Rooms
- Boss Rush
- Mega Satan arena
- Mother arena
- Hush entrance
- Blue Womb entrance
- Greed exit rooms
- Greedier exit rooms
- Alternative-path exit rooms
- Strange Door exit room
- Grave rooms
- Mirror room
- Mine Cart room
- Ascent rooms
- Home rooms
- Starting rooms
- End rooms
- Void boss rooms

## Floors, Chapters and Routes

The progression guide should model the full route graph.

### Main and Alternative Chapters

Planned floor coverage:

- Basement
- Cellar
- Burning Basement
- Downpour
- Dross
- Caves
- Catacombs
- Flooded Caves
- Mines
- Ashpit
- Depths
- Necropolis
- Dank Depths
- Mausoleum
- Gehenna
- Womb
- Utero
- Scarred Womb
- Blue Womb
- Sheol
- Cathedral
- Dark Room
- Chest
- The Void
- Corpse
- Home
- Ascent
- Greed Mode floors
- Greedier Mode floors

### Route Planner

The route planner should explain:

- Required doors
- Required keys
- Required bombs
- Required health
- Knife Piece route
- Corpse route
- Hush route
- Mega Satan route
- Delirium route
- Beast route
- Mother route
- Chest route
- Dark Room route
- Greed route
- Greedier route
- Optional detours
- Time-limited entrances
- Character unlock routes

## Curses

The encyclopedia should cover:

- Curse of Darkness
- Curse of the Labyrinth
- Curse of the Lost
- Curse of the Unknown
- Curse of the Maze
- Curse of the Blind
- Curse of the Cursed
- Black Candle interaction
- Dagaz interaction
- Character-specific impact
- Floor and challenge restrictions

## Machines, Beggars and Interactive Objects

Planned machines:

- Slot Machine
- Blood Donation Machine
- Fortune Telling Machine
- Restock Machine
- Donation Machine
- Greed Donation Machine
- Crane Game
- Confessional
- Hell Game

Planned beggars:

- Beggar
- Devil Beggar
- Key Master
- Bomb Bum
- Battery Beggar
- Rotten Beggar
- Shell Game variants

Each entry should include:

- Cost
- Possible payouts
- Payout probabilities where verified
- Destruction result
- Explosion interaction
- Luck interaction
- Character-specific interaction
- Related item pool

## Obstacles and Environmental Objects

Planned coverage:

- Rocks
- Tinted Rocks
- Super Special Rocks
- Marked Rocks
- Bomb Rocks
- Spiked Rocks
- Fool's Gold Rocks
- Buckets
- Mushrooms
- Skulls
- Polyps
- Urns
- Shopkeepers
- Fireplaces
- Blue Fireplaces
- Purple Fireplaces
- Red Fireplaces
- Poop variants
- TNT
- Metal Blocks
- Key Blocks
- Buttons
- Pressure Plates
- Spikes
- Retracting Spikes
- Spike Rocks
- Cobwebs
- Creep
- Pits
- Bridges
- Trapdoors
- Ladders
- Portals
- Mirrors
- Mine carts

## Completion Marks, Unlocks and Achievements

### Completion Marks

Planned tracking for each character:

- Mom's Heart or It Lives
- Isaac
- Satan
- Boss Rush
- Hush
- Mega Satan
- Greed
- Greedier
- Delirium
- Mother
- The Beast

### Unlock Database

Each unlock should include:

- Unlock name
- Unlock type
- Required character
- Required boss or route
- Difficulty requirement
- Completion mark
- Challenge requirement
- Achievement linkage
- Resulting item, trinket, character, card, rune or mechanic

### Progress Tracker

Future tracking features:

- Manual completion marking
- Character progress board
- Remaining unlocks
- Recommended next unlock
- Unlock dependencies
- Challenge progress
- Collection-page progress
- Optional save-file import where technically and legally appropriate

## Challenges

Challenge pages should include:

- Challenge number
- Name
- Starting character
- Starting items
- Starting trinkets
- Starting pickups
- Goal
- Disabled rooms
- Special rules
- Curse
- Reward
- Recommended strategy
- Difficult interactions
- Available unlocks
- Daily Challenge separation

## Game Modes

Planned modes:

- Normal Mode
- Hard Mode
- Greed Mode
- Greedier Mode
- Daily Challenges
- Victory Laps
- Reruns
- Co-op where supported
- Online or multiplayer-specific content where applicable

The application should clearly label mechanics that change by mode.

## Mechanics Encyclopedia

Planned mechanic categories:

- Damage formulas
- Tears and fire-rate formulas
- Range
- Shot speed
- Luck
- Health
- Devil and Angel Room chances
- Planetarium chance
- Item weight
- Item quality
- Item pools
- Rerolls
- Transformations
- Status effects
- Flight
- Spectral tears
- Piercing
- Homing
- Creep
- Bomb interactions
- Active-item charges
- Extra lives
- Damage penalties
- Room rewards
- Deal pricing
- Character-specific mechanics
- Generated items
- Glitched items
- Golden items
- Golden trinkets
- Horse pills
- Seed effects
- Level generation
- Unlock conditions
- Completion marks

## Status Effects

Planned status-effect documentation:

- Burn
- Poison
- Fear
- Charm
- Confusion
- Slow
- Freeze
- Petrification
- Bleeding
- Shrink
- Bait
- Magnetisation
- Marking
- Homing targets
- Friendly conversion
- Invulnerability
- Shielding

Each status page should contain duration, affected targets, immunities and relevant items.

## Seeds

The seed section should eventually cover:

- Run seeds
- Special seeds
- Easter egg seeds
- Seeded-run restrictions
- Unlock restrictions
- Shareable build links
- Reproducible test builds

The project should not claim that generated or user-provided seeds reproduce identical runs across incompatible game versions.

## Endings and Story Progression

Planned information:

- Endings
- Ending unlock conditions
- Route dependencies
- Boss requirements
- Character unlock relationships
- Home and Ascent progression
- Knife Piece progression
- Polaroid and Negative routes
- Mega Satan progression
- Hush and Delirium progression

## Version and Expansion Support

Every structured record should eventually specify compatibility with:

- Rebirth
- Afterbirth
- Afterbirth+
- Repentance
- Repentance updates
- Optional supported mods

Version-specific descriptions must be stored separately instead of merging conflicting values into a single sentence.

## Search and Navigation

The completed application should provide global search across:

- Items
- Trinkets
- Cards
- Runes
- Pills
- Characters
- Bosses
- Enemies
- Rooms
- Floors
- Transformations
- Unlocks
- Challenges
- Mechanics

Planned filters:

- Entity type
- Expansion
- Quality
- Item pool
- Passive or active
- Character
- Floor
- Room
- Unlock state
- Transformation
- Status effect
- Verified data status

## Data Quality

The project should maintain separate states for:

- Raw scraped data
- Normalised generated data
- Manually verified data
- Version-specific data
- Community-submitted data
- Unverified records

Planned validation rules:

- Unique IDs
- Required names
- Valid quality values
- Valid item types
- Existing local image paths
- Valid relationships
- No missing referenced entities
- No duplicate game IDs within a version
- No unresolved synergy references
- No merged version values without labels
- Source attribution
- Last verified version

## Content Sources and Attribution

The application is an unofficial fan project.

Game names, item names, characters, artwork and related intellectual property belong to their respective owners.

Before publishing scraped descriptions or third-party images, the project should verify:

- Source licensing
- Attribution requirements
- Image redistribution permissions
- Automated-access rules
- Terms of service
- Whether local asset redistribution is permitted
- Whether linking to remote assets is permitted

Where redistribution is unclear, the safer approach is to store original structured metadata, link to the source and avoid republishing protected text or artwork without permission.

## Proposed Architecture

```text
src/
├── app/
│   ├── routes/
│   ├── navigation/
│   └── providers/
├── components/
│   ├── common/
│   ├── items/
│   ├── coach/
│   ├── health/
│   ├── graph/
│   ├── search/
│   └── encyclopedia/
├── pages/
│   ├── HomePage
│   ├── ItemPage
│   ├── ComparePage
│   ├── CoachPage
│   ├── CharacterPage
│   ├── BossPage
│   ├── EnemyPage
│   ├── RoomPage
│   ├── FloorPage
│   ├── TransformationPage
│   ├── UnlockPage
│   └── SearchPage
├── data/
│   ├── raw/
│   ├── generated/
│   ├── verified/
│   └── schemas/
├── features/
│   ├── item-explorer/
│   ├── global-search/
│   ├── build-analyzer/
│   ├── ai-coach/
│   ├── screenshot-recognition/
│   ├── synergy-graph/
│   ├── route-planner/
│   └── unlock-tracker/
├── services/
│   ├── search/
│   ├── analysis/
│   ├── recognition/
│   └── ai/
└── utils/
```

## Proposed Data Entities

```text
Item
ItemVersion
ItemPool
Synergy
Character
HealthState
Trinket
Card
Rune
SoulStone
Pill
Pickup
Transformation
Boss
Enemy
Room
Floor
Chapter
Curse
Machine
Beggar
Obstacle
Challenge
Unlock
Achievement
CompletionMark
Mechanic
StatusEffect
Seed
GameMode
Source
```

Relationships should be stored through stable IDs rather than names.

Example:

```json
{
  "id": "example-synergy",
  "entities": [
    {
      "type": "item",
      "id": "example-item-a"
    },
    {
      "type": "item",
      "id": "example-item-b"
    }
  ],
  "interactionType": "positive",
  "versions": ["repentance"],
  "description": "Verified interaction description.",
  "verificationStatus": "verified",
  "sources": []
}
```

## Development Phases

### Phase 1: Stabilise the Current Application

- Clean the repository structure
- Remove `node_modules` from version control
- Add a complete `.gitignore`
- Move inline page styles into reusable components or stylesheets
- Add loading and error states
- Add a not-found route
- Add tests for filtering, sorting and routing
- Add screenshots to the README
- Document actual implemented features only

### Phase 2: Clean the Item Dataset

- Separate active, passive and familiar items
- Fix unknown item types
- Remove duplicated version descriptions
- Preserve version-specific values
- Validate images
- Validate IDs
- Add item pools
- Add unlock conditions
- Add transformations
- Add tags
- Add source metadata

### Phase 3: Build the Core Encyclopedia

- Trinkets
- Cards
- Runes
- Soul Stones
- Pills
- Pickups
- Characters
- Transformations
- Item pools
- Health mechanics

### Phase 4: Add World and Progression Data

- Floors
- Chapters
- Routes
- Rooms
- Curses
- Machines
- Beggars
- Obstacles
- Completion marks
- Unlocks
- Challenges

### Phase 5: Add Combat Data

- Bosses
- Mini-bosses
- Enemies
- Champions
- Status effects
- Attack patterns
- Encounter locations

### Phase 6: Build the Synergy Engine

- Define a versioned synergy schema
- Add pairwise interactions
- Add negative interactions
- Add character-specific interactions
- Add health-dependent interactions
- Add transformation relationships
- Add multi-item rules
- Build the graph view
- Validate every referenced entity

### Phase 7: Build the Deterministic Analyzer

- Calculate stats
- Apply multipliers
- Apply caps
- Handle overrides
- Track health
- Track transformations
- Detect strengths
- Detect missing stats
- Detect risks
- Explain calculation steps

This deterministic layer should exist before the AI Coach gives numerical advice.

### Phase 8: Implement the AI Coach

- Add retrieval from verified local data
- Add structured prompts
- Add evidence references
- Separate facts from recommendations
- Show uncertainty
- Add conversation history
- Add build-aware questions
- Add route and item-choice advice
- Add guardrails against invented mechanics

### Phase 9: Implement Screenshot Recognition

- HUD region detection
- Item icon matching
- Health recognition
- Resource recognition
- Character recognition
- Confidence display
- Manual correction interface
- Analyzer integration

### Phase 10: Add Progress Tracking

- Completion marks
- Unlocks
- Challenges
- Collection progress
- Character overview
- Recommended next objective
- Optional local save import

### Phase 11: Polish and Release

- Responsive design
- Accessibility
- Performance optimisation
- Search indexing
- Data caching
- Offline support
- Automated tests
- CI
- Deployment
- Contributor guide
- Data-source documentation
- Release versioning

## Recommended MVP

The complete vision is intentionally large. A practical first public version should contain:

- Stable Item Explorer
- Item detail pages
- Item comparison
- Clean item dataset
- Item pools
- Characters
- Trinkets
- Cards, runes and pills
- Health system
- A small verified synergy set
- Honest roadmap
- No claim that mocked AI or screenshot recognition is complete

## Technology Stack

Current technologies include:

- React
- React Router
- Vite
- JavaScript
- JSON datasets
- Python data scripts

Technologies prepared or relevant to planned features include:

- React Flow for graph visualisation
- Schema validation for structured datasets
- Computer vision for screenshot recognition
- Retrieval-based AI for grounded recommendations
- Automated testing and continuous integration

## Local Development

```bash
npm install
npm run dev
```

The exact available scripts depend on the current `package.json`.

## Repository Hygiene

The repository should not include:

```text
node_modules/
dist/
.env
.env.*
coverage/
__pycache__/
*.pyc
```

Example `.gitignore`:

```gitignore
node_modules/
dist/
coverage/

.env
.env.*
!.env.example

__pycache__/
*.py[cod]

.DS_Store
Thumbs.db

.vscode/
.idea/
```

Do not commit AI API keys, tokens, cookies or private configuration.

## Roadmap Summary

### Working Now

- Item Explorer
- Search
- Quality filtering
- Sorting
- Text and image views
- Item detail pages
- Item comparison
- Generated item dataset
- Coach interface
- Health configuration
- Manual build selection

### In Progress

- Data cleaning
- Health system integration
- Coach workflow
- Synergy schema
- Asset organisation

### Planned

- Verified synergies
- Synergy graph
- Deterministic build analyzer
- AI Coach
- Screenshot recognition
- Characters
- Trinkets
- Cards
- Runes
- Pills
- Pickups
- Transformations
- Item pools
- Bosses
- Enemies
- Rooms
- Floors
- Chapters
- Routes
- Curses
- Challenges
- Machines
- Beggars
- Obstacles
- Completion marks
- Unlocks
- Achievements
- Progress tracker
- Mechanics encyclopedia
- Status effects
- Seeds
- Game modes
- Version-aware data
- Mod support

## Disclaimer

The Isaac Oracle is an unofficial fan-made project and is not affiliated with or endorsed by the creators, publishers or rights holders of The Binding of Isaac.

All game-related names, artwork and trademarks belong to their respective owners.

## License

Source code is licensed under the MIT License.

Game-related content, images and external data sources may be subject to their own licenses and copyright restrictions.

The Isaac Oracle is an unofficial fan-made project and is not affiliated with the creators or publishers of The Binding of Isaac.
