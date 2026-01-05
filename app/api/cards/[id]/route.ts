import { NextRequest } from "next/server";

type SharedCardData = {
  sheet: any;
  prompt?: string;
  createdAt: number;
};

// Same in-memory store as in share route (shared across API routes in same process)
// In production, this would use Vercel KV
const inMemoryStore = new Map<string, SharedCardData>();

let kv: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  kv = require("@vercel/kv").kv;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (e) {
  // KV not available
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return Response.json({ error: "Card ID is required" }, { status: 400 });
    }

    let cardData: SharedCardData | null = null;

    // Try to retrieve from Vercel KV first
    if (kv) {
      try {
        const stored = await kv.get(`card:${id}`);
        if (stored) {
          cardData = typeof stored === "string" ? JSON.parse(stored) : stored;
        }
      } catch (kvError) {
        console.error("KV retrieval failed, trying in-memory:", kvError);
      }
    }

    // Fallback to in-memory storage
    if (!cardData) {
      cardData = inMemoryStore.get(id) || null;
    }

    if (!cardData) {
      return Response.json({ error: "Card not found" }, { status: 404 });
    }

    return Response.json(cardData);
  } catch (err: any) {
    console.error("Card retrieval error:", err);
    return Response.json(
      { error: err?.message ?? "Failed to retrieve card" },
      { status: 500 }
    );
  }
}
