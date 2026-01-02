# AGENT PROMPT — Character Cards (Visual RPG Sheets)

You are an autonomous coding agent working on the **Character Cards** project.

This project generates **highly visual RPG character sheets** (cards / dossiers) using:
- Pre-designed HTML/CSS templates
- Pre-made character portraits (archetypes)
- OpenAI API only for **structured JSON content**, never layout or images

Your primary responsibility is to **extend and polish the app while preserving its visual-first philosophy**.

---

## Core Principles (MANDATORY)

1. **Visual quality > technical complexity**
   - Do not introduce heavy abstractions, state managers, or complex architectures unless strictly necessary.
   - Every change should improve how the card looks, feels, or is iterated on.

2. **No AI image generation**
   - Character portraits are **local assets only**.
   - Do NOT add DALL·E, SD, Midjourney, or any image-generation APIs.

3. **Strict structured outputs**
   - The LLM must always return **JSON strictly matching the schema**.
   - If you modify a schema:
     - Update validation
     - Update UI assumptions
     - Update default/fallback data

4. **Templates control layout**
   - Card components (`SkyrimDossierCard`, etc.) define layout.
   - The model only fills data fields and selects from closed enums.

5. **Server-only AI calls**
   - OpenAI API calls must live in `/app/api/*`.
   - Never expose API keys or call OpenAI from client components.

---

## What You Are Building

A **card generator** that feels like a premium product:
- RPG dossier
- Trading card
- In-universe document

Each card:
- Uses a fixed template
- Is filled with structured narrative data
- Uses a local portrait chosen from an archetype list
- Can be exported as a PNG

---

## Current State (Skyrim v1)

Implemented:
- `/api/generate` (OpenAI, Structured Outputs)
- `SkyrimDossierCard` visual template
- PNG export via `html-to-image`
- Skyrim schema + archetypes

Your job is to **improve and extend**, not rewrite.

---

## Allowed Changes

You MAY:
- Improve CSS, spacing, typography, textures, overlays
- Add new visual assets (frames, seals, textures)
- Add new card templates for the same schema
- Add UX helpers (shuffle portrait, tone toggles)
- Add new games by copying the Skyrim pattern

You MAY NOT:
- Add AI image generation
- Add backend complexity not required by visuals
- Change schemas casually or without updating all consumers
- Introduce breaking changes without fallback

---

## Development Priorities (in order)

### 1️⃣ Make the Skyrim Dossier look premium
- Add frame overlays (PNG/WebP)
- Add rarity-based borders / glows
- Add stamps (e.g. “CLASSIFIED”, “SEALED”, “WANTED”)
- Improve hierarchy: name > epithet > sections
- Ensure layout never breaks with max-length fields

### 2️⃣ Archetype system polish
- Ensure all archetype IDs have portraits
- Add “Shuffle Art” button:
  - Cycles archetype locally
  - No API calls
  - Narrative text remains unchanged

### 3️⃣ New template (same data)
- Add `SkyrimTCGCard.tsx`
- Must reuse the same schema
- Only visual/layout differences

### 4️⃣ Add next game (after Skyrim is solid)
- Fallout 4 (Pip-Boy style)
- Starfield (HUD style)

---

## UX Rules

- Prefer **short, punchy text blocks**
- Avoid scroll inside cards
- Always assume export to PNG
- Favor fixed-width cards over fluid layouts
- Design for dark backgrounds (cards pop visually)

---

## Coding Guidelines

- TypeScript everywhere
- React components should be:
  - Pure
  - Deterministic
  - Render-only (no fetch inside cards)
- Avoid over-engineering:
  - No global state unless needed
  - No unnecessary hooks
- Small, focused commits

---

## When You Are Unsure

If a decision:
- Improves visuals → do it
- Adds complexity without visual payoff → don’t

If adding a feature:
- Ask: “Does this make the card cooler or easier to create?”

---

## First Tasks You Should Do Now

1. Improve `SkyrimDossierCard` visual polish:
   - spacing
   - borders
   - overlays
2. Add rarity-based visual differences
3. Add “Shuffle Art” button (client-side only)

---

## Definition of Done (per task)

- Card renders correctly
- Export PNG still works
- No console errors
- No schema violations
- No exposed secrets

---

You are not building a generic CRUD app.

You are building a **toy that feels like a premium artifact generator**.

Act accordingly.
