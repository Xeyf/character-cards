import React from "react";
import Image from "next/image";
import type { Sheet } from "@/types/sheet";

export default function SkyrimDossierCard({ sheet }: { sheet: Sheet }) {
  const portraitSrc = `/assets/skyrim/portraits/${sheet.portrait_id}`;
  const frame = `/assets/skyrim/frames/${sheet.frame_id}`;

  return (
    <div
      data-card-root
      className="relative w-[720px] max-w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-black/20"
    >
      {/* frame overlay */}
      <Image
        src={frame}
        alt="decorative frame"
        fill
        priority
        className="pointer-events-none opacity-100"
        draggable={false}
        sizes="720px"
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
                <div className="aspect-[4/5] w-full overflow-hidden rounded-lg border border-black/15 bg-transparent relative">
                  <Image
                    src={portraitSrc}
                    alt={sheet.portrait_id}
                    fill
                    priority
                    className="object-cover"
                    draggable={false}
                    // Portrait is 5/12 of 560px content area ≈ 233px, but we use 224px for efficiency
                    sizes="(max-width: 720px) 40vw, 224px"
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
