# Character Cards

A small Next.js app for generating *dossier-style* RPG character sheets (currently: Skyrim) from a prompt.

- Write a prompt
- The app generates a **structured character sheet** via the `/api/generate` route (OpenAI)
- Preview the card instantly
- Export a crisp **PNG** (powered by `html-to-image`) for sharing
- **Share your character** via a persistent link with rich OpenGraph previews for Discord/Twitter

This repo is intentionally approachable: it’s a fun place to collaborate on **functionality, templates, art, and ideas**.

## What’s in here

- **Next.js (App Router)** UI in [app/](app)
- **Client UI** in [components/](components)
- **Template + schema + content rules** in [templates/](templates)
- **Local art assets** in [public/assets/](public/assets)
- **Generate API** in [app/api/generate/route.ts](app/api/generate/route.ts)

## Getting started

### 1) Install

```bash
npm install
```

### 2) Configure environment

Create a `.env.local` in the project root:

```bash
OPENAI_API_KEY=your_key_here
# optional
DONATION_URL=https://...
# optional (for persistent shareable links in production)
KV_REST_API_URL=your_vercel_kv_url
KV_REST_API_TOKEN=your_vercel_kv_token
```

Notes:
- `OPENAI_API_KEY` is required for `/api/generate`.
- `DONATION_URL` is optional (the UI reads it from `process.env.DONATION_URL`).
- `KV_REST_API_URL` and `KV_REST_API_TOKEN` are optional. If not provided, shareable links will use in-memory storage (which won't persist across deployments). For production, set up Vercel KV in your Vercel project dashboard.

### 3) Run

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Contributing (yes please)

There are three great ways to help, and all of them are valuable.

### 1) Functionality (code)

Good starter contributions:
- More export options (e.g. JPEG, different pixel ratios)
- Better prompt UX (presets, examples, validation)
- New card templates (different layout, different game)
- Error handling / loading states polish

How to propose code changes:
- Open an issue describing what you want to build
- Or open a PR directly with a short summary + screenshots

### 2) Art (frames, portraits, overlays)

Want to contribute visual assets? Amazing.

Where assets live today:
- Skyrim assets: [public/assets/skyrim/](public/assets/skyrim)
  - frames: [public/assets/skyrim/frames/](public/assets/skyrim/frames)
  - portraits: [public/assets/skyrim/portraits/](public/assets/skyrim/portraits)
  - overlays/seals/textures: [public/assets/skyrim/](public/assets/skyrim)

Guidelines (keep it simple):
- Use consistent naming (match the existing `sk_*.png/.webp` style)
- Prefer `.webp` for portraits when possible
- Keep compositions readable inside the existing frame safe area

If you’re unsure about sizes/aspect ratios, just drop a draft PR and we’ll align it together.

### 3) Ideas (templates, lore hooks, UX)

Not a coder or artist (or you are, but you’re busy)? Still welcome.

Great “ideas-only” issues:
- New template themes (e.g. Fallout terminal, D&D parchment, Cyberpunk ID card)
- Schema improvements (better stats, traits, relationships)
- Content rule tweaks (tone, brevity, variety)
- Accessibility/readability suggestions

## Adding a new template (high-level)

Current Skyrim generation is defined in [templates/skyrim.ts](templates/skyrim.ts):
- `skyrimSchema`: the JSON Schema the model must output
- `skyrimInstructions`: the generation rules
- `SKYRIM_*`: allowed IDs for archetypes/frames/portraits

To add a new game/template, you’ll typically:
1. Create a new template file in [templates/](templates)
2. Add assets under [public/assets/](public/assets)
3. Add a new card component in [components/](components)
4. Update the UI to select the template (or replace Skyrim for now)

## Tech notes

- Uses the OpenAI Node SDK (`openai`) from a server route in the Next.js App Router.
- The API route currently targets `model: "gpt-4.1-mini"`. If you don’t have access to that model on your account, you may need to change the model string in [app/api/generate/route.ts](app/api/generate/route.ts).

## Repo etiquette

- Keep PRs small and focused when possible
- Include screenshots for UI changes
- If you add new art, mention the source and usage rights in the PR description

## License

No license is included yet.

If you plan to reuse or redistribute this project (especially the art), please open an issue so we can pick a license that matches the project’s goals.

---

If you’re thinking “I’d love to help but I’m not sure where,” open an issue and say what you’re into (code, art, lore, layout). We’ll find a good first task.
