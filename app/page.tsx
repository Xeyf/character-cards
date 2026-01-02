import HomePageClient from "@/components/HomePageClient";

export default function Page() {
  const donationUrl = process.env.DONATION_URL ?? "";
  return <HomePageClient donationUrl={donationUrl} />;
}
