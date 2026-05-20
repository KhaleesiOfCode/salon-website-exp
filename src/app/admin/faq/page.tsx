"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { FAQItem } from "@/lib/types";

const inputClass = "w-full rounded-xl border border-gold/20 bg-white/80 px-5 py-3.5 text-sm text-charcoal placeholder:text-charcoal/25 backdrop-blur focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-300";
const labelClass = "block text-xs font-medium uppercase tracking-[0.15em] text-charcoal/50 mb-2";

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("Generale");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    let done = false;
    (async () => {
      const r = await fetch("/api/admin/faq");
      if (r.ok && !done) setFaqs(await r.json());
    })();
    return () => { done = true; };
  }, []);

  const reset = () => { setQuestion(""); setAnswer(""); setCategory("Generale"); setEditingId(null); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { question, answer, category };
    const r = editingId
      ? await fetch(`/api/admin/faq/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      : await fetch("/api/admin/faq", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (r.ok) {
      setMsg({ ok: true, text: editingId ? "FAQ aggiornata." : "FAQ creata." });
      reset();
      (async () => {
        const r = await fetch("/api/admin/faq");
        if (r.ok) setFaqs(await r.json());
      })();
    } else {
      const err = await r.json();
      setMsg({ ok: false, text: err.error || "Errore" });
    }
  };

  const toggle = async (f: FAQItem) => {
    await fetch(`/api/admin/faq/${f.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active: !f.active }) });
    (async () => {
      const rr = await fetch("/api/admin/faq");
      if (rr.ok) setFaqs(await rr.json());
    })();
  };

  const remove = async (id: number) => {
    if (!confirm("Eliminare questa FAQ?")) return;
    await fetch(`/api/admin/faq/${id}`, { method: "DELETE" });
    setMsg({ ok: true, text: "FAQ eliminata." });
    (async () => {
      const r = await fetch("/api/admin/faq");
      if (r.ok) setFaqs(await r.json());
    })();
  };

  const edit = (f: FAQItem) => {
    setQuestion(f.question); setAnswer(f.answer); setCategory(f.category); setEditingId(f.id);
  };

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-2 flex items-center gap-3 text-xs text-charcoal/40">
          <Link href="/admin" className="transition-colors hover:text-charcoal">Admin</Link>
          <span>/</span>
          <span className="text-charcoal/60">FAQ</span>
        </div>
        <h1 className="font-serif text-4xl font-light text-charcoal sm:text-5xl">Gestione FAQ</h1>

        {msg && (
          <div className={`mt-8 rounded-xl border px-5 py-3 text-sm ${msg.ok ? "border-gold/20 bg-gold/5 text-gold-dark" : "border-red/20 bg-red-50 text-red-600"}`}>
            {msg.text}
          </div>
        )}

        <form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border border-gold/10 bg-gold/5 p-6 sm:p-8">
          <h3 className="font-serif text-xl text-charcoal">{editingId ? "Modifica FAQ" : "Nuova FAQ"}</h3>
          <div>
            <label className={labelClass}>Domanda</label>
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Risposta</label>
            <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} required rows={3} className={inputClass} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Categoria</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                {["Generale", "Servizi", "Prenotazioni", "Pagamenti", "Politiche"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
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

        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <div key={f.id} className="rounded-xl border border-gold/10 bg-white p-5 shadow-sm transition-all duration-300 hover:border-gold/20 hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${f.active ? "bg-burgundy" : "bg-charcoal/15"}`} />
                    <span className="truncate font-medium text-charcoal">{f.question}</span>
                    <span className="shrink-0 rounded bg-gold/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gold-dark">{f.category}</span>
                  </div>
                  <p className="ml-4 mt-1 text-sm text-charcoal/50">{f.answer}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button onClick={() => toggle(f)}
                    className={`rounded-xl border px-3 py-1.5 text-xs transition-all duration-300 ${f.active ? "border-gold/20 text-charcoal/50 hover:border-gold/40" : "border-gold/40 text-gold-dark hover:bg-gold/10"}`}>
                    {f.active ? "Disattiva" : "Attiva"}
                  </button>
                  <button onClick={() => edit(f)}
                    className="rounded-xl border border-gold/20 px-3 py-1.5 text-xs text-charcoal/50 transition-all duration-300 hover:border-gold/40 hover:text-burgundy">
                    Modifica
                  </button>
                  <button onClick={() => remove(f.id)}
                    className="rounded-xl border border-red/20 px-3 py-1.5 text-xs text-red-400 transition-all duration-300 hover:border-red/40 hover:text-red-600">
                    Elimina
                  </button>
                </div>
              </div>
            </div>
          ))}
          {faqs.length === 0 && <p className="py-12 text-center text-sm text-charcoal/35">Nessuna FAQ.</p>}
        </div>
      </div>
    </div>
  );
}
