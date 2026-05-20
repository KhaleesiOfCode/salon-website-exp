"use client";

import { useLocale } from "@/lib/i18n/context";

export function HeroSection() {
  const { t } = useLocale();

  return (
    <section
      id="hero"
      className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center"
    >
      <div className="pointer-events-none absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80"
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.4) saturate(0.8)" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy/60 via-burgundy/40 to-ivory/90" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent" />
      <div className="absolute left-1/2 top-0 h-64 w-px -translate-x-1/2 bg-gradient-to-b from-gold/40 to-transparent" />

      <div className="relative">
        <div className="mx-auto mb-6 flex items-center justify-center gap-3">
          <span className="block h-px w-12 bg-gold/40" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold/80">
            {t.hero.badge}
          </span>
          <span className="block h-px w-12 bg-gold/40" />
        </div>

        <h1 className="font-serif text-6xl leading-[1.1] tracking-tight text-ivory sm:text-7xl lg:text-8xl">
          {t.hero.title1}
          <br />
          <span className="bg-gradient-to-r from-burgundy via-burgundy-light to-burgundy bg-clip-text text-transparent">
            {t.hero.title2}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-ivory/70">
          {t.hero.subtitle}
        </p>

        <div className="mt-12 flex items-center justify-center gap-5">
          <a
            href="#servizi"
            className="group relative overflow-hidden rounded-full bg-burgundy px-9 py-3.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-burgundy-dark"
          >
            <span className="relative z-10">{t.hero.ctaServizi}</span>
          </a>
          <a
            href="#servizi"
            className="rounded-full border border-gold/50 px-9 py-3.5 text-sm font-medium tracking-wide text-gold transition-all duration-300 hover:bg-gold hover:text-charcoal"
          >
            {t.hero.ctaPrenota}
          </a>
        </div>
      </div>

      <div className="relative mt-20 flex items-center justify-center gap-4 text-[10px] font-light uppercase tracking-[0.3em] text-ivory/40">
        <span className="h-px w-16 bg-gold/30" />
        <span>{t.hero.tags}</span>
        <span className="h-px w-16 bg-gold/30" />
      </div>
    </section>
  );
}
