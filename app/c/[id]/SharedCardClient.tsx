"use client";

import React, { useEffect, useState } from "react";
import SkyrimDossierCard from "@/components/SkyrimDossierCard";
import { useRouter } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default function SharedCardClient({ params }: Props) {
  const [sheet, setSheet] = useState<any>(null);
  const [prompt, setPrompt] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadCard() {
      try {
        const { id: cardId } = await params;
        
        const res = await fetch(`/api/cards/${cardId}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Card not found");
          } else {
            const j = await res.json().catch(() => ({}));
            setError(j?.error ?? `HTTP ${res.status}`);
          }
          return;
        }
        
        const data = await res.json();
        setSheet(data.sheet);
        setPrompt(data.prompt);
      } catch (e: any) {
        setError(e.message ?? "Failed to load card");
      } finally {
        setLoading(false);
      }
    }

    loadCard();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl">Loading card...</div>
        </div>
      </main>
    );
  }

  if (error || !sheet) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-neutral-100 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-xl mb-4">😔 {error || "Card not found"}</div>
          <button
            onClick={() => router.push("/")}
            className="rounded-xl bg-white text-black px-4 py-2 text-sm font-medium"
          >
            Create Your Own
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-neutral-100 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <header className="text-center mb-8">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200/90 mb-4">
            Shared Card
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
            {sheet.name}
          </h1>
          {prompt && (
            <p className="mt-3 text-sm text-neutral-200/70 max-w-2xl mx-auto">
              <span className="opacity-60">Original prompt: </span>
              <span className="italic">&quot;{prompt}&quot;</span>
            </p>
          )}
        </header>

        <div className="flex justify-center">
          <div className="w-fit">
            <SkyrimDossierCard sheet={sheet} />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/")}
            className="rounded-xl border border-white/15 px-6 py-3 text-sm hover:bg-white/5"
          >
            Create Your Own Character Card
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-neutral-400">
          <a
            href="https://github.com/Xeyf/character-cards"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-200"
          >
            Powered by Skyrim Cards
          </a>
        </div>
      </div>
    </main>
  );
}
