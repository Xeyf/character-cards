import HomePageClient from "@/components/HomePageClient";

export default function Page() {
  const donationUrl = process.env.DONATION_URL ?? "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Skyrim Dossier Cards",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web",
    url: "https://skyrim.cards",
    description:
      "Generate Skyrim-style character dossier cards with AI. Create detailed RPG character sheets and export beautiful images for your Elder Scrolls adventures.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Skyrim Cards",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient donationUrl={donationUrl} />
    </>
  );
}
