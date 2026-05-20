"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface ServiceInfo {
  id: number;
  name: string;
  duration: number;
  price: number;
}

interface Booking {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  staffName: string;
  date: string;
  time: string;
  notes: string | null;
  status: string;
  services: ServiceInfo[];
  totalDuration: number;
  totalPrice: number;
}

const STATUS_LABELS: Record<string, string> = {
  pending: "In attesa",
  confirmed: "Confermata",
  cancelled: "Annullata",
  completed: "Completata",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-gold/10 text-gold-dark border-gold/20",
  confirmed: "bg-emerald/10 text-emerald-700 border-emerald/20",
  cancelled: "bg-red/10 text-red-500 border-red/20",
  completed: "bg-charcoal/5 text-charcoal/50 border-charcoal/10",
};

const MONTHS = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
const DAYS = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(d);
  return days;
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function AdminCalendarPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [today] = useState(() => new Date());
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

  useEffect(() => {
    let done = false;
    (async () => {
      const r = await fetch("/api/admin/bookings");
      if (r.ok && !done) setBookings(await r.json());
      if (!done) setLoading(false);
    })();
    return () => { done = true; };
  }, []);

  const bookingsByDate = useMemo(() => {
    const map = new Map<string, Booking[]>();
    for (const b of bookings) {
      const dateKey = b.date.split("T")[0];
      const list = map.get(dateKey) || [];
      list.push(b);
      map.set(dateKey, list);
    }
    return map;
  }, [bookings]);

  const monthDays = useMemo(() => getMonthDays(year, month), [year, month]);

  const selectedBookings = selectedDay ? bookingsByDate.get(formatDateKey(year, month, selectedDay)) || [] : [];

  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); } else { setMonth(m => m - 1); }
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); } else { setMonth(m => m + 1); }
    setSelectedDay(null);
  };

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const r = await fetch("/api/admin/bookings");
    if (r.ok) setBookings(await r.json());
  };

  const allBookingsCount = bookingsByDate.size;
  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-2 flex items-center gap-3 text-xs text-charcoal/40">
          <Link href="/admin" className="transition-colors hover:text-charcoal">Admin</Link>
          <span>/</span>
          <span className="text-charcoal/60">Calendario</span>
        </div>
        <h1 className="font-serif text-4xl font-light text-charcoal sm:text-5xl">Calendario Prenotazioni</h1>

        <div className="mt-8 flex items-center gap-4 text-sm text-charcoal/50">
          <span><strong className="text-charcoal">{allBookingsCount}</strong> giorni con prenotazioni</span>
          <span className="h-3 w-px bg-gold/20" />
          <span><strong className="text-burgundy">{pendingCount}</strong> in attesa</span>
        </div>

        {loading ? (
          <div className="mt-8 grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-xl bg-gold/10" />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-gold/10 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gold/10 px-6 py-4">
                  <button onClick={prevMonth} className="rounded-xl border border-gold/20 px-3 py-1.5 text-xs text-charcoal/50 transition-all hover:border-gold/40 hover:text-charcoal">
                    &larr;
                  </button>
                  <h2 className="font-serif text-xl text-charcoal">{MONTHS[month]} {year}</h2>
                  <button onClick={nextMonth} className="rounded-xl border border-gold/20 px-3 py-1.5 text-xs text-charcoal/50 transition-all hover:border-gold/40 hover:text-charcoal">
                    &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-7">
                  {DAYS.map((d) => (
                    <div key={d} className="border-b border-gold/5 px-3 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-charcoal/30">
                      {d}
                    </div>
                  ))}
                  {monthDays.map((day, i) => {
                    if (day === null) return <div key={`e-${i}`} />;
                    const dateKey = formatDateKey(year, month, day);
                    const dayBookings = bookingsByDate.get(dateKey);
                    const isToday = dateKey === todayKey;
                    const isSelected = selectedDay === day;
                    return (
                      <button
                        key={dateKey}
                        onClick={() => setSelectedDay(day)}
                        className={`relative border-b border-r border-gold/5 p-2 text-left transition-all duration-200 hover:bg-gold/5 min-h-[80px] sm:min-h-[100px] ${
                          isSelected ? "bg-burgundy/5 ring-2 ring-inset ring-burgundy/30" : ""
                        }`}
                      >
                        <span
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                            isToday
                              ? "bg-burgundy text-white"
                              : "text-charcoal/60"
                          }`}
                        >
                          {day}
                        </span>
                        {dayBookings && (
                          <div className="mt-1 space-y-0.5">
                            {dayBookings.slice(0, 3).map((b) => (
                              <div
                                key={b.id}
                                className={`rounded px-1.5 py-0.5 text-[9px] font-medium leading-tight ${
                                  b.status === "pending"
                                    ? "bg-gold/15 text-gold-dark"
                                    : b.status === "confirmed"
                                    ? "bg-emerald/10 text-emerald-700"
                                    : b.status === "completed"
                                    ? "bg-charcoal/5 text-charcoal/40"
                                    : "bg-red/10 text-red-400"
                                }`}
                              >
                                {b.time.slice(0, 5)} {b.customerName.split(" ")[0]}
                              </div>
                            ))}
                            {dayBookings.length > 3 && (
                              <div className="text-[9px] font-medium text-charcoal/30 pl-1">
                                +{dayBookings.length - 3} altre
                              </div>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                <h3 className="font-serif text-lg text-charcoal">
                  {selectedDay ? `${selectedDay} ${MONTHS[month]} ${year}` : "Seleziona un giorno"}
                </h3>
                {selectedDay && selectedBookings.length === 0 && (
                  <p className="mt-6 text-center text-sm text-charcoal/35">Nessuna prenotazione</p>
                )}
                {selectedDay && selectedBookings.length > 0 && (
                  <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto">
                    {selectedBookings
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((b) => (
                        <div
                          key={b.id}
                          className="rounded-xl border p-4 text-sm transition-all hover:shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium text-charcoal">{b.customerName}</p>
                              <p className="text-xs text-charcoal/40">{b.customerEmail}</p>
                            </div>
                            <span className={`shrink-0 rounded-lg border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS_COLORS[b.status]}`}>
                              {STATUS_LABELS[b.status]}
                            </span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2 text-xs text-charcoal/50">
                            <span className="rounded-lg bg-gold/5 px-2 py-1 font-medium text-charcoal/70">{b.time}</span>
                            <span className="rounded-lg bg-gold/5 px-2 py-1">{b.totalDuration} min</span>
                            <span className="rounded-lg bg-gold/5 px-2 py-1">&euro;{b.totalPrice.toFixed(2)}</span>
                          </div>
                          {b.services.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {b.services.map((s) => (
                                <span key={s.id} className="rounded bg-burgundy/5 px-2 py-0.5 text-[10px] text-burgundy/70">
                                  {s.name}
                                </span>
                              ))}
                            </div>
                          )}
                          {b.staffName && <p className="mt-2 text-xs text-charcoal/35">Operatore: {b.staffName}</p>}
                          {b.notes && <p className="mt-1 text-xs text-charcoal/35 italic">&ldquo;{b.notes}&rdquo;</p>}
                          <div className="mt-3 flex items-center gap-2">
                            {b.status === "pending" && (
                              <>
                                <button onClick={() => updateStatus(b.id, "confirmed")}
                                  className="rounded-lg bg-burgundy px-3 py-1 text-[10px] font-medium text-white transition-all hover:bg-burgundy-dark">
                                  Conferma
                                </button>
                                <button onClick={() => updateStatus(b.id, "cancelled")}
                                  className="rounded-lg border border-red/20 px-3 py-1 text-[10px] font-medium text-red-400 transition-all hover:border-red/40">
                                  Annulla
                                </button>
                              </>
                            )}
                            {b.status === "confirmed" && (
                              <button onClick={() => updateStatus(b.id, "completed")}
                                className="rounded-lg bg-charcoal px-3 py-1 text-[10px] font-medium text-white transition-all hover:bg-charcoal/80">
                              Completa
                            </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
