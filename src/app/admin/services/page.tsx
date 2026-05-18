"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Service {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  category: string;
  active: boolean;
  _count?: { bookings: number };
}

const inputClass =
  "w-full rounded-xl border border-gold/20 bg-white/80 px-5 py-3.5 text-sm text-charcoal placeholder:text-charcoal/25 backdrop-blur focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-300";
const labelClass = "block text-xs font-medium uppercase tracking-[0.15em] text-charcoal/50 mb-2";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("Capelli");
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
    setCategory("Capelli");
    setEditingId(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { name, description, price: Number(price), duration: Number(duration), category };
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
    setCategory(s.category);
    setEditingId(s.id);
  };

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-2 flex items-center gap-3 text-xs text-charcoal/40">
          <Link href="/admin" className="transition-colors hover:text-charcoal">Admin</Link>
          <span>/</span>
          <span className="text-charcoal/60">Servizi</span>
        </div>
        <h1 className="font-serif text-4xl font-light text-charcoal sm:text-5xl">Gestione Servizi</h1>

        {msg && (
          <div
            className={`mt-8 rounded-xl border px-5 py-3 text-sm ${msg.ok ? "border-gold/20 bg-gold/5 text-gold-dark" : "border-red/20 bg-red-50 text-red-600"}`}
          >
            {msg.text}
          </div>
        )}

        <form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border border-gold/10 bg-gold/5 p-6 sm:p-8">
          <h3 className="font-serif text-xl text-charcoal">{editingId ? "Modifica Servizio" : "Nuovo Servizio"}</h3>

          <div>
            <label className={labelClass}>Nome</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Prezzo (&euro;)</label>
              <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Durata (min)</label>
              <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Categoria</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                {["Capelli", "Viso", "Unghie", "Corpo", "Benessere", "Altro"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Descrizione</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className={inputClass} />
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" className="rounded-xl bg-burgundy px-6 py-2.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-burgundy-dark">
              {editingId ? "Aggiorna" : "Crea"}
            </button>
            {editingId && (
              <button type="button" onClick={reset} className="text-sm text-charcoal/40 transition-colors duration-300 hover:text-charcoal">
                Annulla
              </button>
            )}
          </div>
        </form>

        <div className="mt-10 space-y-3">
          {services.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-xl border border-gold/10 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:border-gold/20 hover:shadow-md">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${s.active ? "bg-burgundy" : "bg-charcoal/15"}`} />
                  <span className="truncate font-medium text-charcoal">{s.name}</span>
                  <span className="hidden shrink-0 rounded bg-gold/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gold-dark sm:inline">
                    {s.category}
                  </span>
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
    </div>
  );
}
