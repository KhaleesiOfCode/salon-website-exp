"use client";

import { useLocale } from "@/lib/i18n/context";

export function ValuesSection() {
  const { t } = useLocale();

  return (
    <section className="relative bg-cream/60 px-6 py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-dark/70">
              {t.values.badge}
            </p>
            <h2 className="font-serif text-4xl font-light text-charcoal sm:text-5xl">
              {t.values.title}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {t.values.items.map((item) => (
                <div key={item.title} className="group rounded-2xl bg-ivory p-6 text-left shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-sm text-gold-dark transition-all duration-500 group-hover:bg-gold group-hover:text-white">
                    <span className="text-xs">{item.title.charAt(0)}</span>
                  </div>
                  <h3 className="font-serif text-lg text-charcoal">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden lg:col-span-2 lg:block">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80"
                alt=""
                className="h-full w-full object-cover"
                style={{ minHeight: "400px" }}
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-gold/20 bg-ivory/95 p-5 shadow-lg backdrop-blur">
              <p className="font-serif text-2xl font-light text-burgundy">10+</p>
              <p className="text-xs text-charcoal/50">Anni di esperienza</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
