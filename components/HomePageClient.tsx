"use client";

import React, { useEffect, useRef, useState } from "react";
import SkyrimDossierCard from "@/components/SkyrimDossierCard";
import * as htmlToImage from "html-to-image";
import { SKYRIM_ARCHETYPES, SKYRIM_FRAMES, SKYRIM_PORTRAITS } from "@/templates/skyrim";

const DEFAULT_PROMPT =
  "A Redguard duelist seeking redemption after betraying his mentor; dark tone; with magic";

const EXAMPLE_PROMPTS = [
  "A Nord warrior seeking glory in battle",
  "A cunning Khajiit thief with a heart of gold",
  "A Breton mage haunted by dark visions",
  "An Argonian ranger protecting the marsh",
  "A Dunmer exile seeking revenge"
];

const DEFAULT_SHEET = {
  game: "skyrim",
  archetype_id: "sk_redguard_duelist",
  frame_id: "sk_standard.png",
  portrait_id: "sk_standard.webp",

  name: "Azhar al-Sahr",
  epithet: "The Doubting Blade",
  race: "Redguard",
  origin: "The old sands of Sentinel",

  hook: "He betrayed his mentor to live. Now he can’t tell if redemption is earned… or taken.",
  backstory:
    "Azhar was raised under a master swordsman who preached discipline without mercy and honor without compromise. In a rigged duel arranged by corrupt nobles, Azhar chose survival and left his mentor to die. Since then he has drifted as a sellsword, nursing a forbidden gift for spellwork he refuses to trust. Each victory feels like a verdict, and each wound like a confession.",

  history:
    "He will try to join the Companions to earn honor the hard way—then use that standing to hunt the noble who rigged the duel.",

  build: {
    playstyle:
      "Technical one-on-one fighting, punishing mistakes; backs the blade with controlled spellwork.",
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

function linesToArray(text: string) {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function arrayToLines(arr: unknown) {
  return Array.isArray(arr) ? arr.join("\n") : "";
}

type Props = {
  donationUrl?: string;
};

export default function HomePageClient({ donationUrl }: Props) {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [sheet, setSheet] = useState<any>(DEFAULT_SHEET);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState(false);
  const [editFieldsExpanded, setEditFieldsExpanded] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;

    // Natural card size: 720px wide with 9/16 aspect ratio.
    const CARD_W = 720;
    const CARD_H = 1280;

    function recompute() {
      const target = previewRef.current;
      if (!target) return;
      const { clientWidth, clientHeight } = target;
      if (!clientWidth || !clientHeight) return;
      const s = Math.min(clientWidth / CARD_W, clientHeight / CARD_H, 1);
      setPreviewScale(Number.isFinite(s) && s > 0 ? s : 1);
    }

    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  async function generateWithPrompt(promptText: string) {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: promptText })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error ?? `HTTP ${res.status}`);
      }
      const data = await res.json();
      setSheet(data.sheet);
      if (!hasGeneratedOnce) {
        setHasGeneratedOnce(true);
        setEditFieldsExpanded(true);
      }
    } catch (e: any) {
      setErr(e.message ?? "Error");
    } finally {
      setLoading(false);
    }
  }

  async function generate() {
    await generateWithPrompt(prompt);
  }

  async function handlePromptChipClick(examplePrompt: string) {
    setPrompt(examplePrompt);
    await generateWithPrompt(examplePrompt);
  }

  async function exportPng() {
    if (!cardRef.current) return;

    setExporting(true);
    try {
      // Export the actual card element (the SkyrimDossierCard root), not the preview scaling wrapper.
      const node = (cardRef.current.querySelector("[data-card-root]") ??
        cardRef.current.firstElementChild ??
        cardRef.current) as HTMLElement;

      // Prevent cropping by ensuring fonts & images are loaded.
      await (document as any).fonts?.ready?.catch(() => undefined);
      const imgs = Array.from(node.querySelectorAll("img"));
      await Promise.all(
        imgs.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                img.onload = () => resolve();
                img.onerror = () => resolve();
              })
        )
      );

      const rect = node.getBoundingClientRect();
      const pad = 16;
      const width = Math.ceil(rect.width + pad * 2);
      const height = Math.ceil(rect.height + pad * 2);

      const dataUrl = await htmlToImage.toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "transparent",
        width,
        height,
        style: {
          width: `${Math.ceil(rect.width)}px`,
          height: `${Math.ceil(rect.height)}px`,
          margin: "0",
          transform: `translate(${pad}px, ${pad}px)`,
          transformOrigin: "top left"
        }
      });

      const link = document.createElement("a");
      link.download = `${sheet?.name ?? "character"}-skyrim.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setExporting(false);
    }
  }

  function shuffleArt() {
    setSheet((prev: any) => {
      const currentPortrait = String(prev?.portrait_id ?? "");
      const currentFrame = String(prev?.frame_id ?? "");

      const portraitIdx = SKYRIM_PORTRAITS.indexOf(currentPortrait as any);
      const nextPortraitIdx =
        portraitIdx >= 0 ? (portraitIdx + 1) % SKYRIM_PORTRAITS.length : 0;
      const nextPortraitId = SKYRIM_PORTRAITS[nextPortraitIdx] ?? prev?.portrait_id;

      const frameIdx = SKYRIM_FRAMES.indexOf(currentFrame as any);
      const nextFrameIdx = frameIdx >= 0 ? (frameIdx + 1) % SKYRIM_FRAMES.length : 0;
      const nextFrameId = SKYRIM_FRAMES[nextFrameIdx] ?? prev?.frame_id;

      return { ...prev, portrait_id: nextPortraitId, frame_id: nextFrameId };
    });
  }

  function setField(path: string, value: any) {
    setSheet((prev: any) => {
      const next = { ...(prev ?? {}) };
      const parts = path.split(".");
      let obj = next;
      for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        obj[key] = { ...(obj[key] ?? {}) };
        obj = obj[key];
      }
      obj[parts[parts.length - 1]] = value;
      return next;
    });
  }

  function setCoreSkill(index: number, value: string) {
    setSheet((prev: any) => {
      const next = { ...(prev ?? {}) };
      const build = { ...(next.build ?? {}) };
      const existing = Array.isArray(build.core_skills) ? build.core_skills : [];
      const core_skills = [existing[0] ?? "", existing[1] ?? "", existing[2] ?? ""];
      core_skills[index] = value;
      build.core_skills = core_skills;
      next.build = build;
      return next;
    });
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-neutral-100 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200/90">
              Skyrim v1 • Dossier template
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Forge Skyrim Character Cards — Dossier-Style RPG Sheets
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-neutral-200/80">
            Write a prompt, generate structured character details, preview the sheet, then export a crisp PNG for sharing.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-6">
          <div className="w-full overflow-hidden">
            <div
              ref={previewRef}
              className="relative w-full h-[75vh] max-h-[820px] flex items-center justify-center"
            >
              <div
                className="relative"
                style={{ width: `${720 * previewScale}px`, height: `${1280 * previewScale}px` }}
              >
                <div
                  ref={cardRef}
                  className="absolute left-0 top-0 w-fit"
                  style={{ transform: `scale(${previewScale})`, transformOrigin: "top left" }}
                >
                  <SkyrimDossierCard sheet={sheet} />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm opacity-80 mb-2">Prompt</div>
            <div className="text-xs text-neutral-200/70 mb-3">
              Generate a dossier in one click — try an example below or write your own prompt
            </div>
            
            {/* Example prompt chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              {EXAMPLE_PROMPTS.map((examplePrompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptChipClick(examplePrompt)}
                  disabled={loading || exporting}
                  className="rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {examplePrompt}
                </button>
              ))}
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-28 rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
            />

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={generate}
                disabled={loading || exporting}
                className="rounded-xl bg-white text-black px-4 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Generating..." : "Generate"}
              </button>
              <button
                onClick={shuffleArt}
                disabled={loading || exporting}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                title="Change the local portrait without regenerating text"
              >
                Shuffle Art
              </button>
              <button
                onClick={exportPng}
                disabled={loading || exporting}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exporting ? "Exporting..." : "Export PNG"}
              </button>

              <div className="ml-auto inline-flex items-center gap-3">
                <a
                  href="https://github.com/Xeyf/character-cards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-neutral-200/80 hover:text-neutral-100"
                  aria-label="View source on GitHub"
                  title="GitHub"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 .5C5.73.5.75 5.63.75 12c0 5.11 3.29 9.44 7.86 10.97.58.11.79-.26.79-.57v-2.1c-3.2.71-3.87-1.39-3.87-1.39-.52-1.37-1.27-1.74-1.27-1.74-1.04-.73.08-.72.08-.72 1.15.08 1.76 1.2 1.76 1.2 1.02 1.79 2.67 1.27 3.32.97.1-.76.4-1.27.72-1.56-2.55-.3-5.23-1.31-5.23-5.84 0-1.29.45-2.35 1.19-3.17-.12-.3-.52-1.52.12-3.17 0 0 .97-.32 3.18 1.21a10.7 10.7 0 0 1 2.9-.4c.99 0 1.98.14 2.9.4 2.2-1.53 3.18-1.21 3.18-1.21.64 1.65.24 2.87.12 3.17.74.82 1.19 1.88 1.19 3.17 0 4.54-2.69 5.54-5.25 5.83.41.37.78 1.1.78 2.22v3.3c0 .32.21.69.8.57A11.27 11.27 0 0 0 23.25 12C23.25 5.63 18.27.5 12 .5z" />
                  </svg>
                </a>

                {donationUrl ? (
                  <a
                    href={donationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                    title="Donate"
                  >
                    <img
                      src="/assets/skyrim/donate_button.png"
                      alt="Donate"
                      className="h-20 w-auto"
                      draggable={false}
                    />
                  </a>
                ) : null}
              </div>
            </div>

            {err && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="text-sm text-red-300">Error: {err}</div>
                <button
                  onClick={generate}
                  disabled={loading || exporting}
                  className="mt-2 text-xs text-red-200 hover:text-red-100 underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm opacity-80">Edit Fields</div>
              <button
                onClick={() => setEditFieldsExpanded(!editFieldsExpanded)}
                className="text-xs text-neutral-200/70 hover:text-neutral-100 transition-colors"
              >
                {editFieldsExpanded ? "Collapse ▲" : "Expand ▼"}
              </button>
            </div>

            {editFieldsExpanded && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="text-sm">
                    <div className="mb-1 opacity-70">Name</div>
                    <input
                      value={sheet?.name ?? ""}
                      onChange={(e) => setField("name", e.target.value)}
                      className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
                    />
                  </label>

                  <label className="text-sm">
                    <div className="mb-1 opacity-70">Alias</div>
                    <input
                      value={sheet?.epithet ?? ""}
                      onChange={(e) => setField("epithet", e.target.value)}
                      className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
                    />
                  </label>

                  <label className="text-sm">
                    <div className="mb-1 opacity-70">Frame</div>
                    <select
                      value={sheet?.frame_id ?? SKYRIM_FRAMES[0]}
                      onChange={(e) => setField("frame_id", e.target.value)}
                      className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
                    >
                      {SKYRIM_FRAMES.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm">
                    <div className="mb-1 opacity-70">Portrait</div>
                    <select
                      value={sheet?.portrait_id ?? SKYRIM_PORTRAITS[0]}
                      onChange={(e) => setField("portrait_id", e.target.value)}
                      className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
                    >
                      {SKYRIM_PORTRAITS.map((id) => (
                        <option key={id} value={id}>
                          {id}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm">
                    <div className="mb-1 opacity-70">Combat Role</div>
                    <input
                      value={sheet?.build?.combat_role ?? ""}
                      onChange={(e) => setField("build.combat_role", e.target.value)}
                      className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
                    />
                  </label>

                  <label className="text-sm md:col-span-2">
                    <div className="mb-1 opacity-70">Playstyle</div>
                    <textarea
                      value={sheet?.build?.playstyle ?? ""}
                      onChange={(e) => setField("build.playstyle", e.target.value)}
                      className="w-full h-20 rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
                    />
                  </label>

                  <label className="text-sm">
                    <div className="mb-1 opacity-70">Core Skill 1</div>
                    <input
                      value={sheet?.build?.core_skills?.[0] ?? ""}
                      onChange={(e) => setCoreSkill(0, e.target.value)}
                      className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
                    />
                  </label>

                  <label className="text-sm">
                    <div className="mb-1 opacity-70">Core Skill 2</div>
                    <input
                      value={sheet?.build?.core_skills?.[1] ?? ""}
                      onChange={(e) => setCoreSkill(1, e.target.value)}
                      className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
                    />
                  </label>

                  <label className="text-sm md:col-span-2">
                    <div className="mb-1 opacity-70">Core Skill 3</div>
                    <input
                      value={sheet?.build?.core_skills?.[2] ?? ""}
                      onChange={(e) => setCoreSkill(2, e.target.value)}
                      className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
                    />
                  </label>

                  <label className="text-sm md:col-span-2">
                    <div className="mb-1 opacity-70">Background</div>
                    <textarea
                      value={sheet?.backstory ?? ""}
                      onChange={(e) => setField("backstory", e.target.value)}
                      className="w-full h-28 rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
                    />
                  </label>

                  <label className="text-sm md:col-span-2">
                    <div className="mb-1 opacity-70">History (path forward)</div>
                    <textarea
                      value={sheet?.history ?? ""}
                      onChange={(e) => setField("history", e.target.value)}
                      className="w-full h-20 rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
                    />
                  </label>

                  <label className="text-sm">
                    <div className="mb-1 opacity-70">Oath</div>
                    <textarea
                      value={sheet?.oath ?? ""}
                      onChange={(e) => setField("oath", e.target.value)}
                      className="w-full h-20 rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
                    />
                  </label>

                  <label className="text-sm">
                    <div className="mb-1 opacity-70">Flaw</div>
                    <textarea
                      value={sheet?.flaw ?? ""}
                      onChange={(e) => setField("flaw", e.target.value)}
                      className="w-full h-20 rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
                    />
                  </label>

                  <label className="text-sm">
                    <div className="mb-1 opacity-70">Allies (one per line)</div>
                    <textarea
                      value={arrayToLines(sheet?.allies)}
                      onChange={(e) => setField("allies", linesToArray(e.target.value))}
                      className="w-full h-24 rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
                    />
                  </label>

                  <label className="text-sm">
                    <div className="mb-1 opacity-70">Enemies (one per line)</div>
                    <textarea
                      value={arrayToLines(sheet?.enemies)}
                      onChange={(e) => setField("enemies", linesToArray(e.target.value))}
                      className="w-full h-24 rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
                    />
                  </label>

                  <label className="text-sm md:col-span-2">
                    <div className="mb-1 opacity-70">Epic Final Phrase</div>
                    <textarea
                      value={sheet?.quote ?? ""}
                      onChange={(e) => setField("quote", e.target.value)}
                      className="w-full h-20 rounded-xl bg-black/40 border border-white/10 p-3 text-sm outline-none"
                    />
                  </label>
                </div>

                <div className="mt-4 text-xs opacity-70">
                  Changes here are local-only and will reflect immediately in the preview and PNG export.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
