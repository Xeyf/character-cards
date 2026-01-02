```md
# Character Cards — Visual RPG Character Sheet Generator (Skyrim v1)

A small web app to generate **highly visual character sheets** (“cards”) for different games using the **OpenAI API**.  
The focus is **visual wow**, not technical complexity: templates are HTML/CSS, portraits are **pre-made archetypes** (no image generation costs), and the LLM outputs **structured JSON** that fits the template.

---

## Goals

- ✨ Generate character sheets that look like premium “dossiers / trading cards”.
- 🧠 LLM fills only the data fields (JSON), never the layout.
- 🖼️ Character portraits are **local assets** (10–20 archetypes per game).
- 📦 Export the rendered card to PNG for sharing.
- 🔁 Easy to add new games: add `template + schema + assets`.

---

## Stack

- Next.js (App Router) + TypeScript
- OpenAI API (server-side only)
- Structured Outputs (JSON Schema) for reliable fields
- `html-to-image` for export PNG (client-side)

> Security: OpenAI API key must remain server-side (`/app/api/*` only). Never expose it to the browser.

---

## Project Structure (current + intended)

```

/app
/api
/generate
route.ts           # OpenAI call -> returns JSON sheet
page.tsx               # UI input + preview + export PNG

/components
SkyrimDossierCard.tsx  # Visual card template (Skyrim: dossier)

/templates
skyrim.ts              # schema + instructions + archetypes enum

/public/assets
/skyrim
/portraits           # archetype portraits (webp)
/textures            # parchment, grain, etc.
/seals               # rarity seals (webp)
/frames              # optional overlays (png/webp)

````

---

## Quick Start

### 1) Install
```bash
npm i
````

### 2) Env

Create `.env.local`:

```bash
OPENAI_API_KEY=your_key_here
```

### 3) Run

```bash
npm run dev
```

Open `http://localhost:3000`.

---

## How it works

### User flow

1. User writes a prompt (e.g., “redguard duelista… tono oscuro, sin magia”)
2. Client calls `POST /api/generate`
3. Server calls OpenAI with:

   * template instructions (style constraints)
   * JSON Schema (strict)
4. Server returns `{ sheet: <json> }`
5. UI renders the sheet using the game template
6. User exports PNG via `html-to-image`

### Key principle

**The template is the source of truth for layout**.
The model only produces **fields**, and chooses an `archetype_id` from a closed list.

---

## OpenAI API usage

Server-only endpoint:

* `app/api/generate/route.ts`

Template config:

* `templates/skyrim.ts` defines:

  * `skyrimSchema` (JSON Schema)
  * `skyrimInstructions` (prompt rules)
  * `SKYRIM_ARCHETYPES` (closed list of portrait IDs)

---

## Archetype portraits (no image generation)

Each sheet includes:

* `archetype_id` (e.g., `sk_redguard_duelist`)

The template loads:

* `/public/assets/skyrim/portraits/${archetype_id}.webp`

**Add a new archetype**

1. Add portrait file:

   * `public/assets/skyrim/portraits/<id>.webp`
2. Add `<id>` to `SKYRIM_ARCHETYPES` enum in `templates/skyrim.ts`
3. Done — LLM can now select it.

---

## Visual Design Guidelines

The app is meant to feel like a “product”. Prioritize:

* Strong typography hierarchy (title > epithet > sections)
* Texture overlays (parchment, grain, scanlines)
* Badges / seals / stamps (rarity, faction, status)
* Compact punchy text blocks (avoid long paragraphs)

### Card constraints

To keep layout stable:

* Keep `hook` short (<= 140)
* `backstory` limited (<= 420)
* Lists are 2–4 items max
* Traits exactly 3

---

## Development Roadmap (agent-friendly)

### Phase 1 — Skyrim Vertical Slice (now)

* [x] API route `/api/generate` returning JSON sheet
* [x] `SkyrimDossierCard` template renders sheet
* [x] Export PNG
* [ ] Add proper assets pack (parchment, grain, seal, frame)
* [ ] Add missing seals for all rarities (`common/rare/epic/legendary`)
* [ ] Add portraits for all 10 Skyrim archetypes

### Phase 2 — UX polish

* [ ] “Shuffle art” button (change `archetype_id` client-side only)
* [ ] “Tone sliders” (dark ↔ heroic) as prompt modifiers
* [ ] Save history (LocalStorage): last 20 sheets
* [ ] One-click “Copy JSON” / “Download JSON”

### Phase 3 — More templates & games

* [ ] Add `SkyrimTCGCard` template (same schema)
* [ ] Add Fallout 4 schema + PipBoy template
* [ ] Add Starfield schema + HUD template

### Phase 4 — Party generator

* [ ] Generate N characters cohesive as a party (schema: `{ party: Sheet[] }`)
* [ ] Add party view + export “party sheet” image

---

## Coding Conventions

* **No secret keys in client code**
* Add new games by creating:

  * `/templates/<game>.ts`
  * `/components/cards/<GameTemplate>.tsx`
  * `/public/assets/<game>/...`
* Keep schemas strict:

  * `additionalProperties: false`
  * enumerations for IDs (archetypes, rarity, template_style)
* Keep UI components:

  * Pure: take `sheet` and render
  * Avoid fetching inside card component

---

## Agent Instructions (important)

When you (the agent) work on this repo:

1. **Always preserve the “visual-first” goal.** Don’t add heavy complexity unless it improves visual quality or developer iteration speed.
2. **Do not introduce image generation APIs.** All portraits must remain local assets.
3. **The model must output strict JSON.** If you modify schema, update:

   * the schema file
   * any card component assumptions
   * any default sheet fallback
4. **Prefer incremental changes**:

   * one template improvement per PR
   * one new asset pack addition per PR
5. **Don’t refactor prematurely** unless needed for adding the next game.

### Next tasks the agent should do (in order)

#### Task A — Make Skyrim Dossier look premium

* Add `frames` overlay support (optional PNG)
* Add rarity-based border styles
* Add small “stamp” variants (e.g., `CLASSIFIED`, `WANTED`, `SEALED`)
* Improve typography & spacing while keeping constraints stable

#### Task B — Add full Skyrim archetype assets

* Add portraits for all IDs in `SKYRIM_ARCHETYPES`
* Add seals for all rarities
* Add textures (parchment, grain) high quality

#### Task C — Add “Shuffle art”

* Add a button that cycles archetypes from the enum
* Must not call OpenAI
* Must not change narrative text (only portrait)

---

## Testing Checklist

* Generate 5 times with varied prompts → layout should not break
* Export PNG works on:

  * Chrome / Edge
* Portrait resolves for chosen archetype
* No console errors
* API key not present in client bundle

---

## Troubleshooting

### “Model not found” / API error

* Replace `model` in `app/api/generate/route.ts` with a model available in your account.
* Keep Structured Outputs enabled (schema strict).

### Export PNG looks blurry

* Increase `pixelRatio` in `html-to-image.toPng(...)`
* Ensure fonts are loaded before export (optional: wait for `document.fonts.ready`)

---

## Example Prompt

> “Un redguard duelista que busca redención tras traicionar a su maestro, tono oscuro, sin magia”

---

## License / Credits

* Textures/frames/portraits: provide your own or properly licensed assets.


