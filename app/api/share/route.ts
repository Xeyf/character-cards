import { nanoid } from "nanoid";

// Type for the shared card data
type SharedCardData = {
  sheet: any;
  prompt?: string;
  createdAt: number;
};

// In-memory store (for development/testing without KV)
// In production with Vercel KV, this won't be used
const inMemoryStore = new Map<string, SharedCardData>();

// Attempt to use Vercel KV if available, otherwise fall back to in-memory
let kv: any = null;
try {
  // Dynamic import to avoid build errors if @vercel/kv isn't configured
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  kv = require("@vercel/kv").kv;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (e) {
  console.warn("Vercel KV not available, using in-memory storage");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sheet, prompt } = body;

    if (!sheet) {
      return Response.json({ error: "Sheet data is required" }, { status: 400 });
    }

    // Generate a short, URL-friendly ID
    const id = nanoid(10);

    const cardData: SharedCardData = {
      sheet,
      prompt: prompt || undefined,
      createdAt: Date.now(),
    };

    // Try to store in Vercel KV first
    if (kv) {
      try {
        // Store with 90-day expiration (in seconds)
        await kv.set(`card:${id}`, JSON.stringify(cardData), { ex: 90 * 24 * 60 * 60 });
      } catch (kvError) {
        console.error("KV storage failed, falling back to in-memory:", kvError);
        inMemoryStore.set(id, cardData);
      }
    } else {
      // Fallback to in-memory storage
      inMemoryStore.set(id, cardData);
    }

    return Response.json({ id });
  } catch (err: any) {
    console.error("Share API error:", err);
    return Response.json(
      { error: err?.message ?? "Failed to create shareable link" },
      { status: 500 }
    );
  }
}
