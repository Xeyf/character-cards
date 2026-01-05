import { nanoid } from "nanoid";
import { storage, type SharedCardData } from "@/lib/storage";

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

    await storage.set(id, cardData);

    return Response.json({ id });
  } catch (err: any) {
    console.error("Share API error:", err);
    return Response.json(
      { error: err?.message ?? "Failed to create shareable link" },
      { status: 500 }
    );
  }
}
