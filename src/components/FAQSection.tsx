"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/lib/i18n/context";
import type { FAQItem } from "@/lib/types";

export function FAQSection() {
  const { t } = useLocale();
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faq")
      .then((r) => r.json())
      .then((data) => { setFaqs(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <SectionSkeleton />;
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="relative bg-cream/60 px-6 py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-dark/70">{t.faq.badge}</p>
          <h2 className="font-serif text-4xl font-light text-charcoal sm:text-5xl">{t.faq.title}</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm font-light text-charcoal/50">{t.faq.subtitle}</p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-gold/10 bg-white shadow-sm transition-all duration-300 hover:border-gold/20"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left sm:px-8"
                >
                  <span className="font-serif text-lg text-charcoal pr-8">{faq.question}</span>
                  <svg
                    className={`h-4 w-4 shrink-0 text-gold-dark transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-gold/10 px-6 py-5 text-sm leading-relaxed text-charcoal/60 sm:px-8">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionSkeleton() {
  return (
    <section className="relative bg-cream/60 px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mx-auto mb-3 h-3 w-24 animate-pulse rounded bg-gold/20" />
          <div className="mx-auto h-8 w-32 animate-pulse rounded bg-gold/20" />
        </div>
        <div className="mt-12 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-gold/10 bg-white p-6">
              <div className="h-5 w-3/4 rounded bg-gold/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
