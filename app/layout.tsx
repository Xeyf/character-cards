import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Cinzel, Geist_Mono } from "next/font/google";
import "./globals.css";

const skyrimSans = Cinzel({
  variable: "--font-skyrim-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skyrim.cards"),
  title: {
    default: "Skyrim Dossier Cards - Character Card Generator",
    template: "%s | Skyrim Cards",
  },
  description:
    "Generate Skyrim-style character dossier cards with AI. Create detailed RPG character sheets and export beautiful images for your Elder Scrolls adventures. Not playing cards - character profile generators.",
  applicationName: "Skyrim Dossier Cards",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/skyrim/favicon.png", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/assets/skyrim/favicon.png", type: "image/png" }],
  },
  keywords: [
    "Skyrim character generator",
    "Skyrim dossier cards",
    "Skyrim character card generator",
    "Skyrim character sheet",
    "Elder Scrolls character creator",
    "RPG character card",
    "character dossier generator",
    "Skyrim character profile",
    "AI character generator",
  ],
  openGraph: {
    type: "website",
    url: "https://skyrim.cards/",
    siteName: "Skyrim Dossier Cards",
    title: "Skyrim Dossier Cards - Character Card Generator",
    description:
      "Generate Skyrim-style character dossier cards with AI. Create detailed RPG character sheets and export beautiful images for your Elder Scrolls adventures.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skyrim Dossier Cards - Character Card Generator",
    description:
      "Generate Skyrim-style character dossier cards with AI. Create detailed RPG character sheets and export beautiful images.",
  },
  alternates: {
    canonical: "https://skyrim.cards/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${skyrimSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
