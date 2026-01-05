import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Missing card ID", { status: 400 });
    }

    // Fetch card data
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    
    let cardData: any = null;
    try {
      const res = await fetch(`${baseUrl}/api/cards/${id}`, {
        cache: "no-store",
      });
      if (res.ok) {
        cardData = await res.json();
      }
    } catch (e) {
      console.error("Failed to fetch card data for OG image:", e);
    }

    if (!cardData || !cardData.sheet) {
      // Return a generic image if card not found
      return new ImageResponse(
        (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0a0a0a",
              backgroundImage: "linear-gradient(to bottom, #171717, #0a0a0a)",
            }}
          >
            <div style={{ fontSize: 60, fontWeight: 700, color: "white" }}>
              Skyrim Cards
            </div>
            <div style={{ fontSize: 24, color: "#a3a3a3", marginTop: 16 }}>
              Create dossier-style RPG character sheets
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    const sheet = cardData.sheet;
    const characterName = sheet.name || "Character";
    const epithet = sheet.epithet || "";
    const race = sheet.race || "";
    const hook = sheet.hook || "";
    const backstory = sheet.backstory || "";

    // Create a beautiful OG image with card details
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#0a0a0a",
            backgroundImage: "linear-gradient(to bottom right, #171717, #0a0a0a, #0f0f0f)",
            padding: "60px 80px",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: 40 }}>
            <div
              style={{
                fontSize: 24,
                color: "#737373",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: 16,
              }}
            >
              Skyrim • Dossier
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: "white",
                lineHeight: 1,
                marginBottom: 12,
              }}
            >
              {characterName}
            </div>
            {epithet && (
              <div
                style={{
                  fontSize: 32,
                  color: "#a3a3a3",
                  fontStyle: "italic",
                }}
              >
                &quot;{epithet}&quot;
              </div>
            )}
            {race && (
              <div
                style={{
                  fontSize: 28,
                  color: "#737373",
                  marginTop: 12,
                }}
              >
                {race}
              </div>
            )}
          </div>

          {/* Hook or Backstory preview */}
          {(hook || backstory) && (
            <div
              style={{
                fontSize: 24,
                color: "#d4d4d4",
                lineHeight: 1.5,
                maxWidth: "90%",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {(hook || backstory).substring(0, 200)}
              {(hook || backstory).length > 200 ? "..." : ""}
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              marginTop: "auto",
              fontSize: 20,
              color: "#525252",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span>🎮</span>
            <span style={{ marginLeft: 12 }}>character-cards on GitHub</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error("OG image generation error:", e);
    return new Response("Failed to generate image", { status: 500 });
  }
}
