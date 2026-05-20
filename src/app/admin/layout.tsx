"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import AdminLogoutButton from "@/components/AdminLogoutButton";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/services", label: "Servizi" },
  { href: "/admin/bookings", label: "Prenotazioni" },
  { href: "/admin/calendar", label: "Calendario" },
  { href: "/admin/staff", label: "Team" },
  { href: "/admin/reviews", label: "Recensioni" },
  { href: "/admin/faq", label: "FAQ" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-ivory">
      <header className="sticky top-0 z-50 border-b border-gold/10 bg-white/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-serif text-lg font-medium tracking-wide text-charcoal">
              Bellezza Admin
            </Link>
            <div className="hidden items-center gap-1 sm:flex">
              {NAV_LINKS.map((link) => {
                const isActive = link.exact
                  ? pathname === link.href
                  : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-burgundy/10 text-burgundy"
                        : "text-charcoal/50 hover:text-charcoal"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-charcoal/40 transition-colors hover:text-charcoal"
            >
              Vedi sito &rarr;
            </Link>
            <AdminLogoutButton />
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
