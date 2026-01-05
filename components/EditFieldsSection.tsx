"use client";

import React from "react";
import type { Sheet } from "@/types/sheet";
import { SKYRIM_FRAMES, SKYRIM_PORTRAITS } from "@/templates/skyrim";

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
  sheet: Sheet;
  setField: (path: string, value: string | string[]) => void;
  setCoreSkill: (index: number, value: string) => void;
};

export default function EditFieldsSection({ sheet, setField, setCoreSkill }: Props) {
  return (
    <div>
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
    </div>
  );
}
