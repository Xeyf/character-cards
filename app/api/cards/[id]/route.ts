import { NextRequest } from "next/server";
import { storage } from "@/lib/storage";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return Response.json({ error: "Card ID is required" }, { status: 400 });
    }

    const cardData = await storage.get(id);

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
