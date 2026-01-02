"use client";

import React, { useRef, useState } from "react";
import SkyrimDossierCard from "@/components/SkyrimDossierCard";
import * as htmlToImage from "html-to-image";
import { SKYRIM_ARCHETYPES } from "@/templates/skyrim";

const DEFAULT_PROMPT =
  "A Redguard duelist seeking redemption after betraying his mentor; dark tone; with magic";

const DEFAULT_SHEET = {
  game: "skyrim",
  template_style: "dossier",
  rarity: "epic",
  archetype_id: "sk_redguard_duelist",
  frame_id: "bearframe.png",

  name: "Azhar al-Sahr",
  epithet: "The Doubting Blade",
  race: "Redguard",
  origin: "The old sands of Sentinel",

  hook:
    "He betrayed his mentor to live. Now he can’t tell if redemption is earned… or taken.",
  backstory:
    "Azhar was raised under a master swordsman who preached discipline without mercy and honor without compromise. In a rigged duel arranged by corrupt nobles, Azhar chose survival and left his mentor to die. Since then he has drifted as a sellsword, nursing a forbidden gift for spellwork he refuses to trust. Each victory feels like a verdict, and each wound like a confession.",

  build: {
    playstyle: "Technical one-on-one fighting, punishing mistakes; backs the blade with controlled spellwork.",
    combat_role: "Duelist",
    core_skills: ["One-Handed", "Block", "Light Armor"]
  },

  stats: { might: 8, guile: 6, arcana: 1, grit: 9, presence: 5 },

  traits: ["Unforgiving discipline", "Wounded pride", "Quiet under pressure"],
  bond: "A broken sword that once belonged to his mentor.",
  nemesis: "The noble who paid for the rigged duel.",

  allies: ["Borderland sellswords", "Wandering Redguard warriors"],
  enemies: ["Corrupt city nobles", "Fame-hungry duelists"],

  flaw: "He mistakes penance for self-destruction.",
  oath: "He will never claim a victory he did not earn.",

  signature_item: "A nicked Redguard saber with a black leather hilt",
  quote: "Steel remembers what men try to forget."
};

export default function HomePage() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [sheet, setSheet] = useState<any>(DEFAULT_SHEET);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement | null>(null);

  async function generate() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: prompt })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error ?? `HTTP ${res.status}`);
      }
      const data = await res.json();
      setSheet(data.sheet);
    } catch (e: any) {
      setErr(e.message ?? "Error");
    } finally {
      setLoading(false);
    }
  }

  async function exportPng() {
    if (!cardRef.current) return;
    const dataUrl = await htmlToImage.toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 2
    });

    const link = document.createElement("a");
    link.download = `${sheet?.name ?? "character"}-skyrim.png`;
    link.href = dataUrl;
    link.click();
  }

  function shuffleArt() {
    setSheet((prev: any) => {
      const current = String(prev?.archetype_id ?? "");
      const idx = SKYRIM_ARCHETYPES.indexOf(current as any);
      const nextIdx = idx >= 0 ? (idx + 1) % SKYRIM_ARCHETYPES.length : 0;
      const nextId = SKYRIM_ARCHETYPES[nextIdx];
      return { ...prev, archetype_id: nextId };
    });
  }

  return (
    <main className="min-h-screen p-8 bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold tracking-tight">Character Cards (Skyrim v1)</h1>
        <p className="mt-1 text-sm opacity-70">
          Generate “dossier” sheets with OpenAI Structured Outputs and export to PNG.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm opacity-80 mb-3">Preview</div>
            <div className="w-full overflow-auto">
              <div ref={cardRef} className="mx-auto w-fit">
                <SkyrimDossierCard sheet={sheet} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm opacity-80 mb-2">Prompt</div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-28 rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={generate}
                disabled={loading}
                className="rounded-xl bg-white text-black px-4 py-2 text-sm font-medium disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate with OpenAI"}
              </button>
              <button
                onClick={shuffleArt}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm"
                title="Change the local portrait without regenerating text"
              >
                Shuffle Art
              </button>
              <button
                onClick={exportPng}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm"
              >
                Export PNG
              </button>
            </div>

            {err && (
              <div className="mt-4 text-sm text-red-300">Error: {err}</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
