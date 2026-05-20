"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/lib/i18n/context";
import type { StaffMemberItem } from "@/lib/types";

export function TeamSection() {
  const { t } = useLocale();
  const [staff, setStaff] = useState<StaffMemberItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/staff")
      .then((r) => r.json())
      .then((data) => { setStaff(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <SectionSkeleton />;
  if (staff.length === 0) return null;

  return (
    <section id="team" className="relative bg-ivory px-6 py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-dark/70">{t.team.badge}</p>
          <h2 className="font-serif text-4xl font-light text-charcoal sm:text-5xl">{t.team.title}</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm font-light text-charcoal/50">{t.team.subtitle}</p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => (
            <div
              key={member.id}
              className="group rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5"
            >
              <div className="mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full bg-gold/10 ring-2 ring-gold/20 transition-all duration-500 group-hover:ring-gold/40">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl font-serif text-gold-dark">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
              <h3 className="font-serif text-xl text-charcoal">{member.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-gold-dark/70">{member.role}</p>
              {member.bio && (
                <p className="mt-3 text-sm leading-relaxed text-charcoal/50">{member.bio}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionSkeleton() {
  return (
    <section className="relative bg-ivory px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="mx-auto mb-3 h-3 w-24 animate-pulse rounded bg-gold/20" />
          <div className="mx-auto h-8 w-64 animate-pulse rounded bg-gold/20" />
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-2xl bg-white p-6">
              <div className="mx-auto mb-5 h-24 w-24 rounded-full bg-gold/10" />
              <div className="mx-auto h-5 w-32 rounded bg-gold/10" />
              <div className="mx-auto mt-2 h-3 w-24 rounded bg-gold/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
