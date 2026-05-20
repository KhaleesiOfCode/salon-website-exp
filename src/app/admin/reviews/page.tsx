"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ReviewItem } from "@/lib/types";

const inputClass = "w-full rounded-xl border border-gold/20 bg-white/80 px-5 py-3.5 text-sm text-charcoal placeholder:text-charcoal/25 backdrop-blur focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-300";
const labelClass = "block text-xs font-medium uppercase tracking-[0.15em] text-charcoal/50 mb-2";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    let done = false;
    (async () => {
      const r = await fetch("/api/admin/reviews");
      if (r.ok && !done) setReviews(await r.json());
    })();
    return () => { done = true; };
  }, []);

  const reset = () => { setCustomerName(""); setText(""); setRating(5); setEditingId(null); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { customerName, text, rating };
    const r = editingId
      ? await fetch(`/api/admin/reviews/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      : await fetch("/api/admin/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (r.ok) {
      setMsg({ ok: true, text: editingId ? "Recensione aggiornata." : "Recensione creata." });
      reset();
      (async () => {
        const r = await fetch("/api/admin/reviews");
        if (r.ok) setReviews(await r.json());
      })();
    } else {
      const err = await r.json();
      setMsg({ ok: false, text: err.error || "Errore" });
    }
  };

  const toggle = async (r: ReviewItem) => {
    await fetch(`/api/admin/reviews/${r.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active: !r.active }) });
    (async () => {
      const rr = await fetch("/api/admin/reviews");
      if (rr.ok) setReviews(await rr.json());
    })();
  };

  const remove = async (id: number) => {
    if (!confirm("Eliminare questa recensione?")) return;
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    setMsg({ ok: true, text: "Recensione eliminata." });
    (async () => {
      const r = await fetch("/api/admin/reviews");
      if (r.ok) setReviews(await r.json());
    })();
  };

  const edit = (r: ReviewItem) => {
    setCustomerName(r.customerName); setText(r.text); setRating(r.rating); setEditingId(r.id);
  };

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-2 flex items-center gap-3 text-xs text-charcoal/40">
          <Link href="/admin" className="transition-colors hover:text-charcoal">Admin</Link>
          <span>/</span>
          <span className="text-charcoal/60">Recensioni</span>
        </div>
        <h1 className="font-serif text-4xl font-light text-charcoal sm:text-5xl">Gestione Recensioni</h1>

        {msg && (
          <div className={`mt-8 rounded-xl border px-5 py-3 text-sm ${msg.ok ? "border-gold/20 bg-gold/5 text-gold-dark" : "border-red/20 bg-red-50 text-red-600"}`}>
            {msg.text}
          </div>
        )}

        <form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border border-gold/10 bg-gold/5 p-6 sm:p-8">
          <h3 className="font-serif text-xl text-charcoal">{editingId ? "Modifica Recensione" : "Nuova Recensione"}</h3>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Cliente</label>
              <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Valutazione</label>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className={inputClass}>
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} stella{n > 1 ? "e" : ""}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Testo</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} required rows={3} className={inputClass} />
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="rounded-xl bg-burgundy px-6 py-2.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-burgundy-dark">
              {editingId ? "Aggiorna" : "Crea"}
            </button>
            {editingId && (
              <button type="button" onClick={reset} className="text-sm text-charcoal/40 transition-colors duration-300 hover:text-charcoal">Annulla</button>
            )}
          </div>
        </form>

        <div className="mt-10 space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-xl border border-gold/10 bg-white p-5 shadow-sm transition-all duration-300 hover:border-gold/20 hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${r.active ? "bg-burgundy" : "bg-charcoal/15"}`} />
                    <span className="font-medium text-charcoal">{r.customerName}</span>
                    <span className="text-xs text-gold">{Array.from({ length: r.rating }).map(() => "\u2605").join("")}</span>
                  </div>
                  <p className="mt-1 text-sm text-charcoal/60">&ldquo;{r.text}&rdquo;</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button onClick={() => toggle(r)}
                    className={`rounded-xl border px-3 py-1.5 text-xs transition-all duration-300 ${r.active ? "border-gold/20 text-charcoal/50 hover:border-gold/40" : "border-gold/40 text-gold-dark hover:bg-gold/10"}`}>
                    {r.active ? "Nascondi" : "Mostra"}
                  </button>
                  <button onClick={() => edit(r)}
                    className="rounded-xl border border-gold/20 px-3 py-1.5 text-xs text-charcoal/50 transition-all duration-300 hover:border-gold/40 hover:text-burgundy">
                    Modifica
                  </button>
                  <button onClick={() => remove(r.id)}
                    className="rounded-xl border border-red/20 px-3 py-1.5 text-xs text-red-400 transition-all duration-300 hover:border-red/40 hover:text-red-600">
                    Elimina
                  </button>
                </div>
              </div>
            </div>
          ))}
          {reviews.length === 0 && <p className="py-12 text-center text-sm text-charcoal/35">Nessuna recensione.</p>}
        </div>
      </div>
    </div>
  );
}
