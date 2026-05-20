import { prisma } from "@/lib/db";
import { PageClient } from "@/components/PageClient";
import { HeroSection } from "@/components/HeroSection";
import { ValuesSection } from "@/components/ValuesSection";
import { TeamSection } from "@/components/TeamSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";

export default async function Home() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { category: "asc" },
  });

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
