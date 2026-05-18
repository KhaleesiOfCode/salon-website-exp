"use client";

import { useState, useEffect } from "react";

interface Service {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  active: boolean;
  _count?: { bookings: number };
}

interface Booking {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  date: string;
  time: string;
  notes: string | null;
  status: string;
  service: { name: string; duration: number };
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

const BOOKING_FILTERS = [
  { value: "all", label: "Tutte" },
  { value: "pending", label: "In attesa" },
  { value: "confirmed", label: "Confermate" },
  { value: "completed", label: "Completate" },
  { value: "cancelled", label: "Annullate" },
];

const inputClass =
  "w-full rounded-xl border border-gold/20 bg-white/80 px-5 py-3.5 text-sm text-charcoal placeholder:text-charcoal/25 backdrop-blur focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-300";
const labelClass = "block text-xs font-medium uppercase tracking-[0.15em] text-charcoal/50 mb-2";

/* ─── Services Tab ─── */
function ServicesTab() {
  const [services, setServices] = useState<Service[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const load = async () => {
    const r = await fetch("/api/admin/services");
    if (r.ok) setServices(await r.json());
  };

  useEffect(() => {
    let done = false;
    (async () => {
      const r = await fetch("/api/admin/services");
      if (r.ok && !done) setServices(await r.json());
    })();
    return () => { done = true; };
  }, []);

  const reset = () => {
    setName("");
    setDescription("");
    setPrice("");
    setDuration("");
    setEditingId(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { name, description, price: Number(price), duration: Number(duration) };
    const r = editingId
      ? await fetch(`/api/admin/services/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      : await fetch("/api/admin/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (r.ok) {
      setMsg({ ok: true, text: editingId ? "Servizio aggiornato." : "Servizio creato." });
      reset();
      load();
    } else {
      const err = await r.json();
      setMsg({ ok: false, text: err.error || "Errore" });
    }
  };

  const toggle = async (s: Service) => {
    await fetch(`/api/admin/services/${s.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active: !s.active }) });
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Eliminare questo servizio?")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    setMsg({ ok: true, text: "Servizio eliminato." });
    load();
  };

  const edit = (s: Service) => {
    setName(s.name);
    setDescription(s.description || "");
    setPrice(String(s.price));
    setDuration(String(s.duration));
    setEditingId(s.id);
  };

  return (
    <div>
      {msg && (
        <div
          className={`mb-6 rounded-xl border px-5 py-3 text-sm ${msg.ok ? "border-gold/20 bg-gold/5 text-gold-dark" : "border-red/20 bg-red-50 text-red-600"}`}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={submit} className="mb-10 space-y-5 rounded-2xl border border-gold/10 bg-gold/5 p-6 sm:p-8">
        <h3 className="font-serif text-xl text-charcoal">{editingId ? "Modifica Servizio" : "Nuovo Servizio"}</h3>
        <div>
          <label className={labelClass}>Nome</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Prezzo (&euro;)</label>
            <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Durata (min)</label>
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Descrizione</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className={inputClass} />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-xl bg-burgundy px-6 py-2.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-burgundy-dark"
          >
            {editingId ? "Aggiorna" : "Crea"}
          </button>
          {editingId && (
            <button type="button" onClick={reset} className="text-sm text-charcoal/40 transition-colors duration-300 hover:text-charcoal">
              Annulla
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded-xl border border-gold/10 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:border-gold/20 hover:shadow-md">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <span className={`h-2 w-2 shrink-0 rounded-full ${s.active ? "bg-burgundy" : "bg-charcoal/15"}`} />
                <span className="truncate font-medium text-charcoal">{s.name}</span>
                <span className="shrink-0 text-sm text-charcoal/35">&euro;{s.price.toFixed(2)} &mdash; {s.duration}min</span>
              </div>
              {s.description && <p className="ml-5 mt-0.5 truncate text-xs text-charcoal/35">{s.description}</p>}
            </div>
            <div className="ml-4 flex shrink-0 items-center gap-2">
              <button onClick={() => toggle(s)}
                className={`rounded-xl border px-3 py-1.5 text-xs transition-all duration-300 ${s.active ? "border-gold/20 text-charcoal/50 hover:border-gold/40" : "border-gold/40 text-gold-dark hover:bg-gold/10"}`}>
                {s.active ? "Disattiva" : "Attiva"}
              </button>
              <button onClick={() => edit(s)}
                className="rounded-xl border border-gold/20 px-3 py-1.5 text-xs text-charcoal/50 transition-all duration-300 hover:border-gold/40 hover:text-burgundy">
                Modifica
              </button>
              <button onClick={() => remove(s.id)}
                className="rounded-xl border border-red/20 px-3 py-1.5 text-xs text-red-400 transition-all duration-300 hover:border-red/40 hover:text-red-600">
                Elimina
              </button>
            </div>
          </div>
        ))}
        {services.length === 0 && <p className="py-12 text-center text-sm text-charcoal/35">Nessun servizio configurato.</p>}
      </div>
    </div>
  );
}

/* ─── Bookings Tab ─── */
function BookingsTab() {
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
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {BOOKING_FILTERS.map((f) => (
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

      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b.id} className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gold/20 hover:shadow-md sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h4 className="font-serif text-lg text-charcoal">{b.customerName}</h4>
                <p className="truncate text-sm text-charcoal/45">
                  {b.customerEmail}
                  {b.customerPhone && <> &bull; {b.customerPhone}</>}
                </p>
              </div>
              <span className={`shrink-0 rounded-xl border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${STATUS_CLASSES[b.status]}`}>
                {STATUS_LABELS[b.status]}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Servizio", value: b.service.name },
                { label: "Data", value: new Date(b.date).toLocaleDateString("it-IT") },
                { label: "Orario", value: b.time },
                { label: "Durata", value: `${b.service.duration} min` },
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
  );
}

/* ─── Admin Panel ─── */
export function AdminPanel() {
  const [tab, setTab] = useState<"services" | "bookings">("bookings");

  return (
    <div className="rounded-2xl border border-gold/10 bg-white shadow-sm">
      <div className="flex border-b border-gold/10">
        <button
          onClick={() => setTab("services")}
          className={`flex-1 px-6 py-5 text-sm font-medium tracking-wide transition-all duration-300 ${
            tab === "services"
              ? "border-b-2 border-burgundy text-burgundy"
              : "text-charcoal/40 hover:text-charcoal"
          }`}
        >
          Servizi
        </button>
        <button
          onClick={() => setTab("bookings")}
          className={`flex-1 px-6 py-5 text-sm font-medium tracking-wide transition-all duration-300 ${
            tab === "bookings"
              ? "border-b-2 border-burgundy text-burgundy"
              : "text-charcoal/40 hover:text-charcoal"
          }`}
        >
          Prenotazioni
        </button>
      </div>
      <div className="p-6 sm:p-8">
        {tab === "services" ? <ServicesTab /> : <BookingsTab />}
      </div>
    </div>
  );
}
