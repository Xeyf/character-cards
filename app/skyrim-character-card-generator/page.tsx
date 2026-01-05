import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Skyrim Character Card Generator - Create RPG Dossier Cards",
  description:
    "Free Skyrim character card generator. Create stunning RPG character dossier cards with AI-powered generation. Export as high-quality images for your campaigns.",
  keywords: [
    "skyrim character card generator",
    "skyrim character sheet",
    "skyrim dossier card",
    "rpg character card maker",
    "skyrim card creator",
    "character card generator",
    "dnd character card",
    "rpg character sheet generator",
  ],
  openGraph: {
    type: "website",
    title: "Skyrim Character Card Generator - Create RPG Dossier Cards",
    description:
      "Free Skyrim character card generator. Create stunning RPG character dossier cards with AI-powered generation. Export as high-quality images for your campaigns.",
    url: "https://skyrim-cards.vercel.app/skyrim-character-card-generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skyrim Character Card Generator - Create RPG Dossier Cards",
    description:
      "Free Skyrim character card generator. Create stunning RPG character dossier cards with AI-powered generation.",
  },
  alternates: {
    canonical: "/skyrim-character-card-generator",
  },
};

// Example card data for the gallery
const exampleCards = [
  {
    src: "/assets/skyrim/portraits/sk_nord_mercenary.webp",
    alt: "Nord mercenary character card - rugged warrior with battle-worn features",
    title: "Nord Mercenary",
  },
  {
    src: "/assets/skyrim/portraits/sk_breton_spellblade.webp",
    alt: "Breton spellblade character card - magical warrior combining sword and sorcery",
    title: "Breton Spellblade",
  },
  {
    src: "/assets/skyrim/portraits/sk_khajiit_sneakthief.webp",
    alt: "Khajiit sneakthief character card - stealthy feline rogue",
    title: "Khajiit Sneakthief",
  },
  {
    src: "/assets/skyrim/portraits/sk_dunmer_outcast.webp",
    alt: "Dunmer outcast character card - dark elf wanderer with mysterious past",
    title: "Dunmer Outcast",
  },
  {
    src: "/assets/skyrim/portraits/sk_altmer_court_mage.webp",
    alt: "Altmer court mage character card - high elf arcane scholar",
    title: "Altmer Court Mage",
  },
  {
    src: "/assets/skyrim/portraits/sk_redguard_duelist.webp",
    alt: "Redguard duelist character card - skilled swordsman seeking redemption",
    title: "Redguard Duelist",
  },
  {
    src: "/assets/skyrim/portraits/sk_argonian_marsh_scout.webp",
    alt: "Argonian marsh scout character card - lizardfolk ranger from Black Marsh",
    title: "Argonian Scout",
  },
  {
    src: "/assets/skyrim/portraits/sk_bosmer_archer.webp",
    alt: "Bosmer archer character card - wood elf ranger with deadly aim",
    title: "Bosmer Archer",
  },
];

const faqs = [
  {
    question: "What is a Skyrim character card generator?",
    answer:
      "A Skyrim character card generator is a tool that creates detailed, visual character dossiers in the style of The Elder Scrolls V: Skyrim. It generates character sheets with backstory, stats, traits, and a portrait, formatted as a beautiful card you can save and share.",
  },
  {
    question: "How do I create a character card?",
    answer:
      "Simply write a prompt describing your character (e.g., 'A Nord warrior seeking revenge'), and our AI will generate a complete character sheet including name, backstory, stats, skills, and more. You can then export it as a high-quality PNG image.",
  },
  {
    question: "Is the generator free to use?",
    answer:
      "Yes! The Skyrim character card generator is completely free to use. Generate as many character cards as you want and export them without any watermarks or restrictions.",
  },
  {
    question: "What information is included in each card?",
    answer:
      "Each card includes: character name and epithet, race and origin, detailed backstory, personality traits, combat role and skills, stats (might, guile, arcana, grit, presence), bonds and nemeses, flaws and oaths, signature items, and a memorable quote.",
  },
  {
    question: "Can I customize the character portraits?",
    answer:
      "The generator automatically selects appropriate portraits based on your character's race and archetype. Each portrait is carefully designed to match the Skyrim aesthetic and your character's role.",
  },
  {
    question: "What races are supported?",
    answer:
      "All Skyrim races are supported: Nord, Imperial, Breton, Redguard, Altmer (High Elf), Bosmer (Wood Elf), Dunmer (Dark Elf), Orsimer (Orc), Khajiit, and Argonian. Each race has unique themed frames and portraits.",
  },
  {
    question: "Can I use these cards for D&D or other RPGs?",
    answer:
      "Absolutely! While styled after Skyrim, these character cards work great for any fantasy RPG campaign including D&D, Pathfinder, or homebrew games. The dossier format translates well to any fantasy setting.",
  },
  {
    question: "How do I export my character card?",
    answer:
      "Once your character is generated, click the 'Export PNG' button to download a high-resolution image (720x1280 pixels) of your character card. The exported image is perfect for sharing on social media or printing.",
  },
  {
    question: "Can I edit the generated character?",
    answer:
      "Currently, the generator creates complete characters in one go. If you want changes, you can refine your prompt and generate again. We're working on editing features for future updates.",
  },
  {
    question: "What makes a good character prompt?",
    answer:
      "Include the character's race, class/role, personality traits, and a central conflict or goal. For example: 'A Dunmer assassin haunted by a failed mission, seeking redemption through the Dark Brotherhood.' The more specific your prompt, the better the result.",
  },
];

export default function SkyrimCharacterCardGeneratorPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-center">
          Skyrim Character Card Generator
        </h1>
        <div className="mt-8 text-lg leading-relaxed text-center max-w-3xl mx-auto opacity-90">
          <p className="mb-4">
            Create stunning character dossier cards for your Skyrim adventures.
            Our AI-powered generator transforms simple prompts into detailed,
            beautifully formatted character sheets complete with backstory,
            stats, traits, and portraits. Whether you&apos;re planning your next
            playthrough or building an NPC for your tabletop campaign, generate
            professional-quality character cards in seconds.
          </p>
          <p className="mb-4">
            Each card captures the essence of Tamriel with authentic Skyrim
            styling, race-specific frames, and carefully crafted character
            details. From Nord warriors to Khajiit thieves, from Altmer mages
            to Argonian scouts—bring your characters to life with rich lore and
            compelling narratives.
          </p>
          <p>
            Export your cards as crisp PNG images perfect for sharing with
            friends, posting on social media, or keeping as inspiration for your
            next Elder Scrolls adventure.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="rounded-lg bg-foreground px-8 py-4 text-lg font-semibold text-background hover:opacity-90 transition-opacity"
          >
            Create Your Character Card →
          </Link>
        </div>
      </section>

      {/* Example Gallery */}
      <section className="mx-auto max-w-7xl px-6 py-16 bg-foreground/[0.02]">
        <h2 className="text-3xl font-bold text-center mb-4">
          Example Character Cards
        </h2>
        <p className="text-center text-lg opacity-80 mb-12 max-w-2xl mx-auto">
          Explore examples of character portraits generated by our system. Each
          card features unique artwork, detailed backstories, and complete stat
          profiles.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {exampleCards.map((card, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-lg border border-foreground/10 bg-background shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[2/3] relative">
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={1024}
                  height={1536}
                  className="w-full h-full object-cover"
                  loading={idx < 4 ? "eager" : "lazy"}
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-semibold text-sm">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block rounded-lg border-2 border-foreground/20 px-6 py-3 font-semibold hover:border-foreground/40 transition-colors"
          >
            Generate Your Own →
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-8">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border-b border-foreground/10 pb-8 last:border-b-0"
            >
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
              <p className="text-base leading-relaxed opacity-90">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Create Your Character?
        </h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Start generating unique Skyrim character cards now. It&apos;s free, fast,
          and fun!
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-foreground px-8 py-4 text-lg font-semibold text-background hover:opacity-90 transition-opacity"
        >
          Go to Generator
        </Link>
      </section>

      {/* Internal Links */}
      <section className="mx-auto max-w-4xl px-6 py-8 text-center text-sm opacity-70">
        <p>
          <Link href="/" className="underline hover:opacity-100">
            Home
          </Link>
        </p>
      </section>
    </div>
  );
}
