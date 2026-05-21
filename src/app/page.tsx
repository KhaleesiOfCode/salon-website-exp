export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { PageClient } from "@/components/PageClient";
import { HeroSection } from "@/components/HeroSection";
import { ValuesSection } from "@/components/ValuesSection";
import { TeamSection } from "@/components/TeamSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";

const defaultServices = [
  { id: 1, name: "Taglio Donna", description: "Taglio personalizzato con lavaggio e asciugatura", price: 35.0, duration: 45, category: "Capelli", image: null, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, name: "Taglio Uomo", description: "Taglio classico o moderno con lavaggio", price: 20.0, duration: 30, category: "Capelli", image: null, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, name: "Colore", description: "Tinta completa con prodotti professionali", price: 55.0, duration: 90, category: "Capelli", image: null, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 4, name: "Mèches", description: "Schiariture a ciocche con tecnica avanzata", price: 70.0, duration: 120, category: "Capelli", image: null, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 5, name: "Piega", description: "Piega liscio o morbida con phon", price: 25.0, duration: 30, category: "Capelli", image: null, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 6, name: "Manicure", description: "Cura e smaltatura delle unghie", price: 25.0, duration: 30, category: "Unghie", image: null, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 7, name: "Pedicure", description: "Trattamento completo dei piedi", price: 35.0, duration: 40, category: "Unghie", image: null, active: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 8, name: "Maschera Viso", description: "Pulizia del viso con maschera idratante", price: 30.0, duration: 30, category: "Viso", image: null, active: true, createdAt: new Date(), updatedAt: new Date() },
];

export default async function Home() {
  let services: Awaited<ReturnType<typeof prisma.service.findMany>> = [];
  try {
    services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { category: "asc" },
    });
  } catch {
    services = defaultServices as unknown as Awaited<ReturnType<typeof prisma.service.findMany>>;
  }

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
