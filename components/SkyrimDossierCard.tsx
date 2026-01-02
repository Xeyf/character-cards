import React from "react";

type Sheet = {
  game: "skyrim";
  archetype_id: string;
  frame_id: string;
  portrait_id: string;
  name: string;
  epithet: string;
  race: string;
  origin: string;
  hook: string;
  backstory: string;
  history: string;
  build: { playstyle: string; combat_role: string; core_skills: string[] };
  stats: { might: number; guile: number; arcana: number; grit: number; presence: number };
  traits: string[];
  bond: string;
  nemesis: string;
  allies: string[];
  enemies: string[];
  flaw: string;
  oath: string;
  signature_item: string;
  quote: string;
};

export default function SkyrimDossierCard({ sheet }: { sheet: Sheet }) {
  const portraitSrc = `/assets/skyrim/portraits/${sheet.portrait_id}`;
  const frame = `/assets/skyrim/frames/${sheet.frame_id}`;

  return (
    <div
      className="relative w-[720px] max-w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-black/20"
    >
      {/* frame overlay */}
      <img
        src={frame}
        alt="decorative frame"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-100"
        draggable={false}
      />

      {/* safe content area (keeps text inside the frame) */}
      <div className="relative h-full px-[84px] pt-[230px] pb-[92px]">
        <div className="mx-auto w-full max-w-[560px] h-full relative flex flex-col">
          {/* header */}
          <div className="text-center">
            {/* <div className="text-[11px] tracking-[0.32em] uppercase opacity-70">Skyrim • Dossier</div> */}
            <div className="mt-2 text-[38px] font-semibold leading-[0.95] break-words">
              {sheet.name}
            </div>
            <div className="mt-1 text-[12px] tracking-[0.12em] opacity-80">Alias: {sheet.epithet}</div>
          </div>

          {/* columns */}
          <div className="mt-10 rounded-xl border border-black/15 bg-transparent p-4 pb-24">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-5">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-lg border border-black/15 bg-transparent">
                  <img
                    src={portraitSrc}
                    alt={sheet.portrait_id}
                    className="h-full w-full object-cover"
                    draggable={false}
                    decoding="async"
                  />
                </div>

                <div className="mt-4">
                  <div className="text-[11px] tracking-[0.22em] uppercase opacity-70">Skills Summary</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {sheet.build.core_skills.map((s) => (
                      <span key={s} className="rounded-md bg-transparent border border-black/15 px-2 py-1 text-[12px]">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 text-[12px] opacity-90">Role: {sheet.build.combat_role}</div>
                  <div className="mt-1 text-[12px] opacity-90">{sheet.build.playstyle}</div>
                </div>
              </div>

              <div className="col-span-7 min-w-0">
                <div className="text-[11px] tracking-[0.22em] uppercase opacity-70">Background</div>
                <div className="mt-2 text-[13px] leading-relaxed">{sheet.backstory}</div>

                <div className="mt-4">
                  <div className="text-[11px] tracking-[0.22em] uppercase opacity-70">History</div>
                  <div className="mt-2 text-[13px] leading-relaxed">{sheet.history}</div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] tracking-[0.22em] uppercase opacity-70">Oath</div>
                    <div className="mt-2 text-[13px] leading-relaxed">{sheet.oath}</div>
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[0.22em] uppercase opacity-70">Flaw</div>
                    <div className="mt-2 text-[13px] leading-relaxed">{sheet.flaw}</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] tracking-[0.22em] uppercase opacity-70">Allies</div>
                    <ul className="mt-2 space-y-1 text-[13px]">
                      {sheet.allies.map((a) => (
                        <li key={a}>• {a}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[0.22em] uppercase opacity-70">Enemies</div>
                    <ul className="mt-2 space-y-1 text-[13px]">
                      {sheet.enemies.map((e) => (
                        <li key={e}>• {e}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* epic final phrase (pinned to bottom, centered) */}
          <div className="absolute bottom-[250px] left-0 right-0">
            <div className="rounded-lg border border-black/10 bg-transparent px-5 py-4 italic text-[16px] text-center">
              “{sheet.quote}”
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
