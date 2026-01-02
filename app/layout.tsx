import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Skyrim Character Card Generator | Create Dossier-Style RPG Sheets",
    template: "%s | Skyrim Character Card Generator",
  },
  description:
    "Generate dossier-style Skyrim RPG character cards from a prompt using structured JSON outputs, then export a crisp PNG for sharing.",
  applicationName: "Character Cards",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: ["/favicon.png"],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
  keywords: [
    "Skyrim character card generator",
    "RPG character sheet",
    "dossier character sheet",
    "character card",
    "PNG export",
    "OpenAI structured outputs",
  ],
  openGraph: {
    type: "website",
    title: "Skyrim Character Card Generator",
    description:
      "Create dossier-style Skyrim RPG character cards from a prompt and export them to PNG.",
  },
  twitter: {
    card: "summary",
    title: "Skyrim Character Card Generator",
    description:
      "Create dossier-style Skyrim RPG character cards from a prompt and export them to PNG.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
