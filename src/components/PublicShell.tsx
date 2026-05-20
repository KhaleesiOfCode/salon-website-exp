"use client";

import { usePathname } from "next/navigation";
import { LocaleProvider, useLocale } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

function ShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useLocale();
  const isAdmin = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-gold/10 bg-ivory/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#hero" className="font-serif text-xl font-medium tracking-wide text-charcoal" suppressHydrationWarning>
            Bellezza Salon
          </a>
          <div className="flex items-center gap-4 text-sm sm:gap-6">
            <a href="#servizi" className="relative text-charcoal/50 transition-colors duration-300 hover:text-burgundy after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-gold after:transition-all after:duration-500 hover:after:w-full">
              {t.nav.servizi}
            </a>
            <a href="#prenota" className="relative text-charcoal/50 transition-colors duration-300 hover:text-burgundy after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-gold after:transition-all after:duration-500 hover:after:w-full">
              {t.nav.prenota}
            </a>
            <a href="#contatti" className="relative text-charcoal/50 transition-colors duration-300 hover:text-burgundy after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-gold after:transition-all after:duration-500 hover:after:w-full hidden sm:inline">
              {t.nav.contatti}
            </a>
            <span className="h-4 w-px bg-gold/20" />
            <LanguageSwitcher />
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-gold/10 bg-charcoal px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 sm:grid-cols-4">
            <div className="sm:col-span-1">
              <h3 className="font-serif text-xl text-ivory">Bellezza Salon</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/50">{t.footer.description}</p>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t.footer.services}</h4>
              <ul className="space-y-3 text-sm text-ivory/50">
                <li><a href="#servizi" className="transition-colors hover:text-gold">{t.nav.servizi}</a></li>
                <li><a href="#prenota" className="transition-colors hover:text-gold">{t.nav.prenota}</a></li>
                <li><a href="#faq" className="transition-colors hover:text-gold">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t.footer.salon}</h4>
              <ul className="space-y-3 text-sm text-ivory/50">
                <li><a href="#team" className="transition-colors hover:text-gold">{t.footer.team}</a></li>
                <li><a href="#recensioni" className="transition-colors hover:text-gold">{t.footer.reviews}</a></li>
                <li><a href="#contatti" className="transition-colors hover:text-gold">{t.footer.contacts}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t.footer.contacts}</h4>
              <ul className="space-y-3 text-sm text-ivory/50">
                <li>{t.contact.addressLine1}, Milano</li>
                <li>+39 02 1234 5678</li>
                <li className="text-gold/70">info@bellezzasaloon.it</li>
                <li>{t.contact.monFri}: 9:00 &ndash; 19:00</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gold/10 pt-8 text-center text-xs text-ivory/30">
            &copy; {new Date().getFullYear()} Bellezza Salon &mdash; {t.footer.copyright}
          </div>
        </div>
      </footer>
    </>
  );
}

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <ShellInner>{children}</ShellInner>
    </LocaleProvider>
  );
}
