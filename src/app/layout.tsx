import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bellezza Salon — Alta Bellezza Italiana",
  description: "Scopri i nostri trattamenti di acconciatura, estetica e benessere. Prenota il tuo appuntamento online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full scroll-smooth antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" />
        <header className="fixed top-0 z-50 w-full border-b border-gold/10 bg-ivory/90 backdrop-blur-md">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="#hero" className="font-serif text-xl font-medium tracking-wide text-charcoal" suppressHydrationWarning>
              Bellezza Salon
            </a>
            <div className="flex items-center gap-10 text-sm">
              <a
                href="#servizi"
                className="relative text-charcoal/50 transition-colors duration-300 hover:text-burgundy after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-gold after:transition-all after:duration-500 hover:after:w-full"
              >
                Servizi
              </a>
              <a
                href="#prenota"
                className="relative text-charcoal/50 transition-colors duration-300 hover:text-burgundy after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-gold after:transition-all after:duration-500 hover:after:w-full"
              >
                Prenota
              </a>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gold/10 bg-charcoal px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 sm:grid-cols-3">
              <div>
                <h3 className="font-serif text-xl text-ivory">Bellezza Salon</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/50">
                  Dal 2010, cura e bellezza nel cuore dell&apos;Italia. Trattamenti esclusivi per valorizzare la tua bellezza naturale.
                </p>
              </div>
              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Link</h4>
                <ul className="space-y-3 text-sm text-ivory/50">
                  <li><a href="#servizi" className="transition-colors hover:text-gold">Servizi</a></li>
                  <li><a href="#prenota" className="transition-colors hover:text-gold">Prenota</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Contatti</h4>
                <ul className="space-y-3 text-sm text-ivory/50">
                  <li>Via Roma 42, Milano</li>
                  <li>+39 02 1234 5678</li>
                  <li className="text-gold/70">info@bellezzasaloon.it</li>
                  <li>Lun&ndash;Sab: 9:00 &ndash; 19:00</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-gold/10 pt-8 text-center text-xs text-ivory/30">
              &copy; {new Date().getFullYear()} Bellezza Salon &mdash; Tutti i diritti riservati
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
