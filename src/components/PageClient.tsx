"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/context";
import { ServicesSection } from "./ServicesSection";
import { BookingForm } from "./BookingForm";
import { SelectedServicesSummary } from "./SelectedServicesSummary";

interface Service {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  image?: string | null;
}

export function PageClient({ grouped }: { grouped: Record<string, Service[]> }) {
  const { t } = useLocale();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showBooking, setShowBooking] = useState(false);

  const toggleService = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleBook = () => {
    setShowBooking(true);
    setTimeout(() => {
      document.getElementById("prenota")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      <ServicesSection
        grouped={grouped}
        selectedIds={selectedIds}
        onToggle={toggleService}
        onBook={handleBook}
      />

      {showBooking && (
        <section id="prenota" className="relative bg-cream/60 px-6 py-28">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-dark/70">
              {t.booking.title}
            </p>
            <h2 className="font-serif text-4xl font-light text-charcoal sm:text-5xl">
              {t.booking.title}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm font-light text-charcoal/50">
              {t.booking.subtitle}
            </p>
          </div>

          <SelectedServicesSummary selectedIds={selectedIds} />

          <div className="mx-auto mt-8 max-w-2xl">
            <BookingForm
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
            />
          </div>
        </section>
      )}
    </>
  );
}
