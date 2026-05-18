"use client";

import { CategoryGroup } from "./CategoryGroup";

interface Service {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration: number;
}

export function ServicesSection({
  grouped,
  selectedIds,
  onToggle,
  onBook,
}: {
  grouped: Record<string, Service[]>;
  selectedIds: number[];
  onToggle: (id: number) => void;
  onBook: () => void;
}) {
  const totalPrice = Object.values(grouped)
    .flat()
    .filter((s) => selectedIds.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);

  const totalDuration = Object.values(grouped)
    .flat()
    .filter((s) => selectedIds.includes(s.id))
    .reduce((sum, s) => sum + s.duration, 0);

  return (
    <section id="servizi" className="relative bg-ivory px-6 py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-dark/70">
            I Nostri Trattamenti
          </p>
          <h2 className="font-serif text-4xl font-light text-charcoal sm:text-5xl">Servizi</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm font-light text-charcoal/50">
            Seleziona uno o pi&ugrave; trattamenti, poi prenota il tuo appuntamento.
          </p>
        </div>

        {Object.entries(grouped).map(([category, items]) => (
          <CategoryGroup
            key={category}
            category={category}
            services={items}
            selectedIds={selectedIds}
            onToggle={onToggle}
            defaultOpen={false}
          />
        ))}
      </div>

      {selectedIds.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/10 bg-white/95 px-6 py-4 shadow-2xl shadow-charcoal/10 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <p className="text-sm text-charcoal/60">
              <span className="font-medium text-burgundy">{selectedIds.length}</span>{" "}
              servizio{selectedIds.length > 1 ? "i" : ""} selezionato
              {selectedIds.length > 1 ? "i" : ""}
              <span className="hidden sm:inline">
                {" "}&mdash;{" "}
                <span className="font-medium text-burgundy">&euro;{totalPrice.toFixed(2)}</span>
                {" / "}
                {totalDuration} min
              </span>
            </p>
            <button
              type="button"
              onClick={onBook}
              className="rounded-xl bg-burgundy px-8 py-3 text-sm font-medium tracking-wide text-white shadow-lg shadow-burgundy/20 transition-all duration-300 hover:bg-burgundy-dark hover:shadow-xl"
            >
              Prenota {selectedIds.length > 1 ? `${selectedIds.length} Servizi` : "Servizio"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
