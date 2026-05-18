import { prisma } from "@/lib/db";
import { PageClient } from "@/components/PageClient";

export default async function Home() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { category: "asc" },
  });

  const grouped = services.reduce<Record<string, typeof services>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div className="flex flex-col">
      {/* ─── HERO ─── */}
      <section
        id="hero"
        className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-burgundy/5 via-ivory to-ivory" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
        <div className="absolute left-1/2 top-0 h-64 w-px -translate-x-1/2 bg-gradient-to-b from-gold/40 to-transparent" />

        <div className="relative">
          <div className="mx-auto mb-6 flex items-center justify-center gap-3">
            <span className="block h-px w-12 bg-gold/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-dark/70">
              Salone di Alta Bellezza
            </span>
            <span className="block h-px w-12 bg-gold/40" />
          </div>

          <h1 className="font-serif text-6xl leading-[1.1] tracking-tight text-charcoal sm:text-7xl lg:text-8xl">
            Benvenuti da
            <br />
            <span className="bg-gradient-to-r from-burgundy via-burgundy-light to-burgundy bg-clip-text text-transparent">
              Bellezza Salon
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-charcoal/50">
            Scopri i nostri trattamenti esclusivi di acconciatura, estetica e benessere.
            Ogni servizio &egrave; pensato per esaltare la tua bellezza naturale.
          </p>

          <div className="mt-12 flex items-center justify-center gap-5">
            <a
              href="#servizi"
              className="group relative overflow-hidden rounded-full bg-burgundy px-9 py-3.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-burgundy-dark"
            >
              <span className="relative z-10">Vedi Servizi</span>
            </a>
            <a
              href="#servizi"
              className="rounded-full border border-gold/40 px-9 py-3.5 text-sm font-medium tracking-wide text-gold-dark transition-all duration-300 hover:border-gold hover:bg-gold hover:text-white"
            >
              Prenota Ora
            </a>
          </div>
        </div>

        <div className="relative mt-20 flex items-center justify-center gap-4 text-[10px] font-light uppercase tracking-[0.3em] text-charcoal/25">
          <span className="h-px w-16 bg-gold/20" />
          <span>Acconciatura &bull; Estetica &bull; Benessere</span>
          <span className="h-px w-16 bg-gold/20" />
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="relative bg-cream/60 px-6 py-28">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-dark/70">
            Perch&eacute; Sceglierci
          </p>
          <h2 className="font-serif text-4xl font-light text-charcoal sm:text-5xl">
            La tua bellezza &egrave; la nostra passione
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              { title: "Prodotti Premium", desc: "Selezioniamo solo i migliori brand internazionali per garantirti un trattamento d&apos;eccellenza." },
              { title: "Professionisti Esperti", desc: "Un team di hairstylist ed estetiste con anni di esperienza e formazione continua." },
              { title: "Atmosfera Esclusiva", desc: "Un ambiente rilassante e raffinato, dove ogni visita diventa un momento di piacere." },
            ].map((item) => (
              <div key={item.title} className="group relative rounded-2xl bg-ivory p-8 text-left shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-sm text-gold-dark transition-all duration-500 group-hover:bg-gold group-hover:text-white">
                  <span className="text-xs">{item.title.charAt(0)}</span>
                </div>
                <h3 className="font-serif text-xl text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageClient grouped={grouped} />
    </div>
  );
}
