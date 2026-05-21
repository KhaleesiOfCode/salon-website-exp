export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { PageClient } from "@/components/PageClient";
import { HeroSection } from "@/components/HeroSection";
import { ValuesSection } from "@/components/ValuesSection";
import { TeamSection } from "@/components/TeamSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";

export default async function Home() {
  let services: Awaited<ReturnType<typeof prisma.service.findMany>> = [];
  try {
    services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { category: "asc" },
    });
  } catch {} // fallback to empty array when DB is unavailable

  const grouped = services.reduce<Record<string, typeof services>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div className="flex flex-col">
      <HeroSection />
      <ValuesSection />
      <TeamSection />
      <PageClient grouped={grouped} />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
