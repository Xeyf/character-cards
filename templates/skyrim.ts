export const SKYRIM_ARCHETYPES = [
  "sk_nord_mercenary",
  "sk_breton_spellblade",
  "sk_dunmer_outcast",
  "sk_khajiit_sneakthief",
  "sk_altmer_court_mage",
  "sk_orc_stronghold",
  "sk_argonian_marsh_scout",
  "sk_imperial_inquisitor",
  "sk_redguard_duelist",
  "sk_reach_witch"
] as const;

export type SkyrimArchetypeId = (typeof SKYRIM_ARCHETYPES)[number];

export const SKYRIM_PORTRAITS = [
  "sk_standard.webp",
  "sk_altmer_court_mage.webp",
  "sk_argonian_marsh_scout.webp",
  "sk_bosmer_archer.webp",
  "sk_breton_spellblade.webp",
  "sk_dunmer_outcast.webp",
  "sk_imperial_inquisitor.webp",
  "sk_khajiit_sneakthief.webp",
  "sk_nord_mercenary.webp",
  "sk_orc_stronghold.webp",
  "sk_redguard_duelist.webp"
] as const;
export type SkyrimPortraitId = (typeof SKYRIM_PORTRAITS)[number];

export const SKYRIM_FRAMES = [
  "sk_standard.png",
  "bearframe.png",
  "sk_altmer.png",
  "sk_argonian.png",
  "sk_bosmer.png",
  "sk_breton.png",
  "sk_dunmer.png",
  "sk_imperial.png",
  "sk_khajit.png",
  "sk_nord.png",
  "sk_orsimer.png",
  "sk_redguard.png"
] as const;
export type SkyrimFrameId = (typeof SKYRIM_FRAMES)[number];

export const skyrimSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "game","archetype_id","frame_id","portrait_id",
    "name","epithet","race","origin",
    "hook","backstory","history","build",
    "allies","enemies",
    "flaw","oath","signature_item","quote",
    "traits","bond","nemesis",
    "stats"
  ],
  properties: {
    game: { type: "string", const: "skyrim" },
    archetype_id: { type: "string", enum: SKYRIM_ARCHETYPES },
    frame_id: { type: "string", enum: SKYRIM_FRAMES },
    portrait_id: { type: "string", enum: SKYRIM_PORTRAITS },

    name: { type: "string", minLength: 2, maxLength: 24 },
    epithet: { type: "string", minLength: 2, maxLength: 32 },

    race: { type: "string", maxLength: 20 },
    origin: { type: "string", maxLength: 42 },

    hook: { type: "string", minLength: 10, maxLength: 140 },
    backstory: { type: "string", minLength: 80, maxLength: 420 },
    history: { type: "string", minLength: 20, maxLength: 160 },

    build: {
      type: "object",
      additionalProperties: false,
      required: ["playstyle","core_skills","combat_role"],
      properties: {
        playstyle: { type: "string", maxLength: 90 },
        combat_role: { type: "string", maxLength: 36 },
        core_skills: {
          type: "array",
          minItems: 3,
          maxItems: 3,
          items: { type: "string", maxLength: 20 }
        }
      }
    },

    stats: {
      type: "object",
      additionalProperties: false,
      required: ["might","guile","arcana","grit","presence"],
      properties: {
        might: { type: "integer", minimum: 1, maximum: 10 },
        guile: { type: "integer", minimum: 1, maximum: 10 },
        arcana: { type: "integer", minimum: 1, maximum: 10 },
        grit: { type: "integer", minimum: 1, maximum: 10 },
        presence: { type: "integer", minimum: 1, maximum: 10 }
      }
    },

    traits: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: { type: "string", maxLength: 28 }
    },
    bond: { type: "string", maxLength: 70 },
    nemesis: { type: "string", maxLength: 70 },

    allies: {
      type: "array",
      minItems: 2,
      maxItems: 4,
      items: { type: "string", maxLength: 42 }
    },
    enemies: {
      type: "array",
      minItems: 2,
      maxItems: 4,
      items: { type: "string", maxLength: 42 }
    },

    flaw: { type: "string", maxLength: 90 },
    oath: { type: "string", maxLength: 90 },

    signature_item: { type: "string", maxLength: 60 },
    quote: { type: "string", maxLength: 110 }
  }
} as const;

export const skyrimInstructions = `
You are generating a Skyrim character sheet for a highly visual card UI.
Return ONLY JSON that matches the provided JSON Schema.

Style rules:
- Write ALL fields in English, even if the user input is not.
- Keep text punchy and card-friendly: short sentences, no long paragraphs.
- Avoid repeating the same concept across fields.
- Ensure internal coherence: allies/enemies fit backstory; oath must meaningfully relate to flaw.
- Names must feel Elder Scrolls (no modern slang).
- Choose ONE archetype_id from the allowed list that best fits the user input.
- Choose ONE frame_id from the allowed list.
- Choose ONE portrait_id from the allowed list.

Frame selection guidance:
- Prefer a race-matching frame when possible:
  - Nord -> sk_nord.png
  - Breton -> sk_breton.png
  - Dunmer -> sk_dunmer.png
  - Altmer -> sk_altmer.png
  - Bosmer -> sk_bosmer.png
  - Khajiit -> sk_khajit.png
  - Argonian -> sk_argonian.png
  - Imperial -> sk_imperial.png
  - Redguard -> sk_redguard.png
  - Orc/Orsimer -> sk_orsimer.png
- Otherwise use sk_standard.png

Portrait selection guidance:
- Prefer a race-matching portrait when possible:
  - Nord -> sk_nord_mercenary.webp
  - Breton -> sk_breton_spellblade.webp
  - Dunmer -> sk_dunmer_outcast.webp
  - Altmer -> sk_altmer_court_mage.webp
  - Bosmer -> sk_bosmer_archer.webp
  - Khajiit -> sk_khajiit_sneakthief.webp
  - Argonian -> sk_argonian_marsh_scout.webp
  - Imperial -> sk_imperial_inquisitor.webp
  - Redguard -> sk_redguard_duelist.webp
  - Orc/Orsimer -> sk_orc_stronghold.webp
- Otherwise use sk_standard.webp



Content guidance:
- hook: 1–2 lines, immediate premise.
- backstory: 3–6 sentences max.
- history: 1–2 lines describing the character's next path (what they plan to do next in the world).
- traits: 3 distinct, non-overlapping.
- bond/nemesis: specific, flavorful, not generic.
- stats: at least one weakness (<=4) and one strength (>=8).
`.trim();
