export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/db";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default async function AdminPage() {
  const [serviceCount, bookingCount, pendingCount, staffCount, reviewCount, faqCount] = await Promise.all([
    prisma.service.count(),
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "pending" } }),
    prisma.staffMember.count(),
    prisma.review.count(),
    prisma.fAQ.count(),
  ]);

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-dark/70">
              Amministrazione
            </p>
            <h1 className="font-serif text-4xl font-light text-charcoal sm:text-5xl">Pannello Admin</h1>
          </div>
          <AdminLogoutButton />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/services" className="group rounded-2xl border border-gold/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/40">Servizi</p>
            <p className="mt-3 font-serif text-5xl font-light text-charcoal">{serviceCount}</p>
            <p className="mt-1 text-sm text-charcoal/40">configurati</p>
          </Link>

          <Link href="/admin/bookings" className="group rounded-2xl border border-gold/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/40">Prenotazioni</p>
            <p className="mt-3 font-serif text-5xl font-light text-charcoal">{bookingCount}</p>
            <p className="mt-1 text-sm text-charcoal/40">totali</p>
          </Link>

          <Link href="/admin/bookings" className="group rounded-2xl border border-gold/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-dark/60">In attesa</p>
            <p className="mt-3 font-serif text-5xl font-light text-burgundy">{pendingCount}</p>
            <p className="mt-1 text-sm text-charcoal/40">da confermare</p>
          </Link>

          <Link href="/admin/staff" className="group rounded-2xl border border-gold/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/40">Team</p>
            <p className="mt-3 font-serif text-5xl font-light text-charcoal">{staffCount}</p>
            <p className="mt-1 text-sm text-charcoal/40">membri</p>
          </Link>

          <Link href="/admin/reviews" className="group rounded-2xl border border-gold/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/40">Recensioni</p>
            <p className="mt-3 font-serif text-5xl font-light text-charcoal">{reviewCount}</p>
            <p className="mt-1 text-sm text-charcoal/40">ricevute</p>
          </Link>

          <Link href="/admin/faq" className="group rounded-2xl border border-gold/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/40">FAQ</p>
            <p className="mt-3 font-serif text-5xl font-light text-charcoal">{faqCount}</p>
            <p className="mt-1 text-sm text-charcoal/40">domande</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
