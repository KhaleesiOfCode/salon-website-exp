"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import it from "./it";
import en from "./en";
import de from "./de";
import type { Translation } from "./it";

export type Locale = "it" | "en" | "de";

const translations: Record<Locale, Translation> = { it, en, de };

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translation;
}>({
  locale: "it",
  setLocale: () => {},
  t: translations.it,
});

function detectLocale(): Locale {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored && stored in translations) return stored;
    const browserLang = navigator.language.slice(0, 2);
    if (browserLang in translations) return browserLang as Locale;
  }
  return "it";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("it");

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setLocaleState(detectLocale()); }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
