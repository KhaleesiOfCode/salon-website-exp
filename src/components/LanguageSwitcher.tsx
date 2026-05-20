"use client";

import { useLocale, type Locale } from "@/lib/i18n/context";

const flags: Record<Locale, string> = { it: "IT", en: "EN", de: "DE" };

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="flex items-center gap-1">
      {(["it", "en", "de"] as Locale[]).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`rounded-lg px-2 py-1 text-[11px] font-medium tracking-wide transition-all duration-300 ${
            locale === l
              ? "bg-burgundy/10 text-burgundy"
              : "text-charcoal/30 hover:text-charcoal/60"
          }`}
          title={t.language[l]}
        >
          {flags[l]}
        </button>
      ))}
    </div>
  );
}
