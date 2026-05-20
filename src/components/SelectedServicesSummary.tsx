"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/lib/i18n/context";

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

export function SelectedServicesSummary({ selectedIds }: { selectedIds: number[] }) {
  const { t } = useLocale();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then(setServices);
  }, []);

  const selected = services.filter((s) => selectedIds.includes(s.id));
  if (selected.length === 0) return null;

  const total = selected.reduce((s, x) => s + x.price, 0);
  const duration = selected.reduce((s, x) => s + x.duration, 0);

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <div className="rounded-2xl border border-burgundy/20 bg-burgundy/5 p-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-burgundy/60">
          {t.booking.selectedServices}
        </p>
        <div className="space-y-2">
          {selected.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-xl border border-burgundy/10 bg-white/60 px-4 py-2.5 text-sm">
              <span className="font-medium text-charcoal">{s.name}</span>
              <span className="text-xs text-charcoal/40">
                &euro;{s.price.toFixed(2)} &middot; {s.duration}min
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-right text-sm text-charcoal/50">
          {t.booking.total}: <span className="font-medium text-burgundy">&euro;{total.toFixed(2)}</span>
          {" / "}
          {duration} min
        </div>
      </div>
    </div>
  );
}
