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
  title: {
    default: "Skyrim Cards",
    template: "%s | Skyrim Cards",
  },
  description:
    "Create Skyrim-style character dossier cards and export beautiful images to share.",
  applicationName: "Skyrim Cards",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/skyrim/favicon.png", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/assets/skyrim/favicon.png", type: "image/png" }],
  },
  keywords: [
    "Skyrim cards",
    "Skyrim character card",
    "Skyrim character sheet",
    "RPG character card",
    "character dossier",
  ],
  openGraph: {
    type: "website",
    title: "Skyrim Cards",
    description:
      "Create Skyrim-style character dossier cards and export beautiful images to share.",
  },
  twitter: {
    card: "summary",
    title: "Skyrim Cards",
    description:
      "Create Skyrim-style character dossier cards and export beautiful images to share.",
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
