"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ServiceInfo {
  id: number;
  name: string;
  duration: number;
  price: number;
}

interface Booking {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  staffName: string;
  date: string;
  time: string;
  notes: string | null;
  status: string;
  service: ServiceInfo;
  services: ServiceInfo[];
  totalDuration: number;
  totalPrice: number;
}

const STATUS_LABELS: Record<string, string> = {
  pending: "In attesa",
  confirmed: "Confermata",
  cancelled: "Annullata",
  completed: "Completata",
};

const STATUS_CLASSES: Record<string, string> = {
  pending: "border-gold/20 bg-gold/5 text-gold-dark",
  confirmed: "border-emerald/20 bg-emerald/5 text-emerald-700",
  cancelled: "border-red/20 bg-red-50 text-red-500",
  completed: "border-charcoal/10 bg-charcoal/5 text-charcoal/60",
};

const FILTERS = [
  { value: "all", label: "Tutte" },
  { value: "pending", label: "In attesa" },
  { value: "confirmed", label: "Confermate" },
  { value: "completed", label: "Completate" },
  { value: "cancelled", label: "Annullate" },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let done = false;
    (async () => {
      const url = filter !== "all" ? `/api/admin/bookings?status=${filter}` : "/api/admin/bookings";
      const r = await fetch(url);
      if (r.ok && !done) setBookings(await r.json());
    })();
    return () => { done = true; };
  }, [filter]);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/admin/bookings/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    const url = filter !== "all" ? `/api/admin/bookings?status=${filter}` : "/api/admin/bookings";
    const r = await fetch(url);
    if (r.ok) setBookings(await r.json());
  };

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-2 flex items-center gap-3 text-xs text-charcoal/40">
          <Link href="/admin" className="transition-colors hover:text-charcoal">Admin</Link>
          <span>/</span>
          <span className="text-charcoal/60">Prenotazioni</span>
        </div>
        <h1 className="font-serif text-4xl font-light text-charcoal sm:text-5xl">Gestione Prenotazioni</h1>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-xl border px-4 py-1.5 text-xs tracking-wide transition-all duration-300 ${
                filter === f.value
                  ? "border-burgundy bg-burgundy text-white"
                  : "border-gold/20 text-charcoal/50 hover:border-gold/40"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gold/20 hover:shadow-md sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="font-serif text-lg text-charcoal">{b.customerName}</h4>
                  <p className="truncate text-sm text-charcoal/45">
                    {b.customerEmail}
                    {b.customerPhone && <> &bull; {b.customerPhone}</>}
                  {b.staffName && <> &bull; Op. {b.staffName}</>}
                  </p>
                </div>
                <span className={`shrink-0 rounded-xl border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${STATUS_CLASSES[b.status]}`}>
                  {STATUS_LABELS[b.status]}
                </span>
              </div>

              <div className="mt-5">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-charcoal/35">Servizi</div>
                <div className="flex flex-wrap gap-2">
                  {b.services.map((s) => (
                    <span key={s.id} className="rounded-lg border border-gold/10 bg-ivory/50 px-3 py-1 text-sm text-charcoal/70">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Data", value: new Date(b.date).toLocaleDateString("it-IT") },
                  { label: "Orario", value: b.time },
                  { label: "Durata", value: `${b.totalDuration} min` },
                  { label: "Totale", value: `\u20AC${b.totalPrice.toFixed(2)}` },
                ].map((d) => (
                  <div key={d.label} className="rounded-xl bg-ivory/50 px-4 py-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-charcoal/35">{d.label}</span>
                    <p className="mt-0.5 font-medium text-charcoal">{d.value}</p>
                  </div>
                ))}
              </div>

              {b.notes && (
                <p className="mt-4 text-sm text-charcoal/45">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-charcoal/35">Note: </span>
                  {b.notes}
                </p>
              )}

              <div className="mt-5 flex items-center gap-2">
                {b.status === "pending" && (
                  <>
                    <button onClick={() => updateStatus(b.id, "confirmed")}
                      className="rounded-xl bg-burgundy px-5 py-2 text-xs font-medium tracking-wide text-white transition-all duration-300 hover:bg-burgundy-dark">
                      Conferma
                    </button>
                    <button onClick={() => updateStatus(b.id, "cancelled")}
                      className="rounded-xl border border-red/20 px-5 py-2 text-xs font-medium tracking-wide text-red-400 transition-all duration-300 hover:border-red/40 hover:text-red-600">
                      Annulla
                    </button>
                  </>
                )}
                {b.status === "confirmed" && (
                  <button onClick={() => updateStatus(b.id, "completed")}
                    className="rounded-xl bg-charcoal px-5 py-2 text-xs font-medium tracking-wide text-white transition-all duration-300 hover:bg-charcoal/80">
                    Completa
                  </button>
                )}
              </div>
            </div>
          ))}
          {bookings.length === 0 && <p className="py-20 text-center text-sm text-charcoal/35">Nessuna prenotazione.</p>}
        </div>
      </div>
    </div>
  );
}
