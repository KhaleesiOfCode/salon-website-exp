"use client";

import { useLocale } from "@/lib/i18n/context";

export function ContactSection() {
  const { t } = useLocale();

  return (
    <section id="contatti" className="relative bg-charcoal px-6 py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold/70">{t.contact.badge}</p>
          <h2 className="font-serif text-4xl font-light text-ivory sm:text-5xl">{t.contact.title}</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm font-light text-ivory/50">{t.contact.subtitle}</p>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="rounded-2xl border border-gold/10 bg-ivory/5 p-6">
              <h3 className="font-serif text-lg text-gold">{t.contact.address}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/60">
                {t.contact.addressLine1}<br />
                {t.contact.addressLine2}<br />
                {t.contact.addressLine3}
              </p>
            </div>
            <div className="rounded-2xl border border-gold/10 bg-ivory/5 p-6">
              <h3 className="font-serif text-lg text-gold">{t.contact.hours}</h3>
              <div className="mt-3 space-y-2 text-sm text-ivory/60">
                <div className="flex justify-between">
                  <span>{t.contact.monFri}</span>
                  <span className="text-ivory/80">09:00 &ndash; 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.contact.sat}</span>
                  <span className="text-ivory/80">09:00 &ndash; 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.contact.sun}</span>
                  <span className="text-ivory/40">{t.contact.closed}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-gold/10 bg-ivory/5 p-6">
              <h3 className="font-serif text-lg text-gold">{t.contact.phone}</h3>
              <a
                href="tel:+390212345678"
                className="mt-2 block text-sm text-ivory/80 transition-colors hover:text-gold"
              >
                +39 02 1234 5678
              </a>
            </div>
            <div className="rounded-2xl border border-gold/10 bg-ivory/5 p-6">
              <h3 className="font-serif text-lg text-gold">{t.contact.email}</h3>
              <a
                href="mailto:info@bellezzasaloon.it"
                className="mt-2 block text-sm text-ivory/80 transition-colors hover:text-gold"
              >
                info@bellezzasaloon.it
              </a>
            </div>
            <div className="rounded-2xl border border-gold/10 bg-ivory/5 p-6">
              <h3 className="font-serif text-lg text-gold">{t.contact.social}</h3>
              <p className="mt-2 text-sm text-ivory/60">{t.contact.socialText}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gold/10 bg-ivory/5 p-6 lg:col-span-1">
            <iframe
              title="Mappa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11198.123456789!2d9.19!3d45.464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDI3JzUwLjQiTiA5CsKxMTUnMjQuMCJF!5e0!3m2!1sit!2sit!4v1"
              width="100%"
              height="100%"
              min-height="250"
              className="rounded-xl"
              style={{ border: 0, minHeight: "250px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
