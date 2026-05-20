"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/context";

interface Service {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  image?: string | null;
}

export function CategoryGroup({
  category,
  services,
  selectedIds,
  onToggle,
  defaultOpen = false,
}: {
  category: string;
  services: Service[];
  selectedIds: number[];
  onToggle: (id: number) => void;
  defaultOpen?: boolean;
}) {
  const { t } = useLocale();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mt-16 first:mt-14">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group mb-8 flex w-full items-center justify-center gap-3 text-center transition-all duration-300"
      >
        <span className="h-px flex-1 bg-gold/15 transition-all duration-300 group-hover:bg-gold/30" />
        <span className="flex items-center gap-2 font-serif text-2xl font-light text-charcoal/60 transition-colors duration-300 group-hover:text-charcoal/80">
          {category}
          <svg
            className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
        <span className="h-px flex-1 bg-gold/15 transition-all duration-300 group-hover:bg-gold/30" />
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const isSelected = selectedIds.includes(service.id);
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onToggle(service.id)}
                className={`group relative overflow-hidden rounded-2xl border p-6 text-left shadow-sm backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/5 ${
                  isSelected
                    ? "border-burgundy/40 bg-burgundy/5"
                    : "border-gold/10 bg-white/80 hover:border-gold/30"
                }`}
              >
                <h3 className="font-serif text-xl text-charcoal">{service.name}</h3>
                {service.description && (
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal/45">
                    {service.description}
                  </p>
                )}
                <div className="mt-6 flex items-center justify-between border-t border-gold/10 pt-5">
                  <span className="text-sm font-light">
                    <span className="font-medium text-burgundy">&euro;{service.price.toFixed(2)}</span>
                    <span className="text-charcoal/35"> &mdash; {service.duration} min</span>
                  </span>
                  <span
                    className={`rounded-full border px-5 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 ${
                      isSelected
                        ? "border-burgundy/50 bg-burgundy text-white"
                        : "border-gold/30 text-gold-dark hover:border-gold hover:bg-gold hover:text-white"
                    }`}
                  >
                    {isSelected ? t.services.selectedLabel : t.services.selectLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
