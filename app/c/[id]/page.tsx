import React from "react";
import SharedCardClient from "./SharedCardClient";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

// Generate metadata for OG previews
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    
    // Fetch card data server-side for metadata
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    
    const res = await fetch(`${baseUrl}/api/cards/${id}`, {
      cache: "no-store",
    });
    
    if (res.ok) {
      const data = await res.json();
      const sheet = data.sheet;
      const characterName = sheet?.name || "Character";
      const epithet = sheet?.epithet || "";
      const description = data.prompt 
        ? `${data.prompt.substring(0, 150)}...`
        : `${characterName} - A Skyrim character card`;
      
      return {
        title: `${characterName} - Skyrim Card`,
        description,
        openGraph: {
          title: `${characterName}${epithet ? ` "${epithet}"` : ""} - Skyrim Card`,
          description,
          type: "website",
          images: [
            {
              url: `/api/og?id=${id}`,
              width: 1200,
              height: 630,
              alt: `${characterName} character card`,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: `${characterName} - Skyrim Card`,
          description,
          images: [`/api/og?id=${id}`],
        },
      };
    }
  } catch (e) {
    console.error("Failed to generate metadata:", e);
  }

  // Fallback metadata
  return {
    title: "Shared Skyrim Card",
    description: "A shared Skyrim character card",
  };
}

export default function SharedCardPage({ params }: Props) {
  return <SharedCardClient params={params} />;
}
