"use client";

import { useState, useEffect, useMemo } from "react";
import { useLocale } from "@/lib/i18n/context";

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

const inputClass =
  "w-full rounded-xl border border-gold/20 bg-white/80 px-5 py-3.5 text-sm text-charcoal placeholder:text-charcoal/25 backdrop-blur focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-300";
const labelClass = "block text-xs font-medium uppercase tracking-[0.15em] text-charcoal/50 mb-2";

export function BookingForm({
  selectedIds,
  onSelectionChange,
}: {
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
}) {
  const { t } = useLocale();
  const [services, setServices] = useState<Service[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [staffList, setStaffList] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [staffName, setStaffName] = useState("");
  const [confirmation, setConfirmation] = useState<{
    customerName: string;
    staffName: string;
    date: string;
    time: string;
    services: { name: string; price: number; duration: number }[];
    totalPrice: number;
    totalDuration: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then(setServices);
  }, []);

  useEffect(() => {
    let done = false;
    (async () => {
      const r = await fetch("/api/staff");
      if (r.ok && !done) {
        const data = await r.json();
        setStaffList(data.map((s: { id: number; name: string }) => ({ id: s.id, name: s.name })));
      }
    })();
    return () => { done = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!date || selectedIds.length === 0) {
        if (!cancelled) setAvailableTimes([]);
        return;
      }
      const res = await fetch(
        `/api/bookings/available-times?date=${date}&serviceIds=${selectedIds.join(",")}`
      );
      if (!cancelled) {
        if (res.ok) {
          setAvailableTimes(await res.json());
        } else {
          const err = await res.text();
          console.error("available-times error:", res.status, err);
          setAvailableTimes([]);
        }
      }
    }
    load();
    return () => { cancelled = true; };
  }, [date, selectedIds]);

  const totalDuration = useMemo(
    () => services.filter((s) => selectedIds.includes(s.id)).reduce((sum, s) => sum + s.duration, 0),
    [selectedIds, services]
  );

  const totalPrice = useMemo(
    () => services.filter((s) => selectedIds.includes(s.id)).reduce((sum, s) => sum + s.price, 0),
    [selectedIds, services]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length === 0) return;
    setLoading(true);
    setErrorMsg(null);
    setConfirmation(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceIds: selectedIds,
          customerName,
          customerEmail,
          customerPhone,
          staffName,
          date,
          time,
          notes,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setConfirmation({
          customerName: data.customerName,
          staffName: data.staffName,
          date: data.date,
          time: data.time,
          services: data.services,
          totalPrice: data.totalPrice,
          totalDuration: data.totalDuration,
        });
        onSelectionChange([]);
        setCustomerName("");
        setCustomerEmail("");
        setCustomerPhone("");
        setStaffName("");
        setDate("");
        setTime("");
        setNotes("");
        setAvailableTimes([]);
      } else {
        const err = await res.json();
        setErrorMsg(err.error || t.booking.error);
      }
    } catch {
      setErrorMsg(t.booking.connectionError);
    } finally {
      setLoading(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div>
      {confirmation && (
        <div className="mb-8 rounded-2xl border border-emerald/20 bg-emerald/5 p-6 sm:p-8">
          <div className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-600">
            {t.booking.confirmed}
          </div>
          <h3 className="font-serif text-xl text-charcoal">{t.booking.confirmedTitle}</h3>
          <p className="mt-1 text-sm text-charcoal/50">
            {t.booking.confirmedText.replace("{name}", confirmation.customerName)}
          </p>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald/10 text-xs text-emerald-600">&#128197;</span>
              <div>
                  <span className="text-charcoal/40">{t.booking.date}</span>
                <p className="font-medium text-charcoal">
                  {new Date(confirmation.date).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald/10 text-xs text-emerald-600">&#128338;</span>
              <div>
                  <span className="text-charcoal/40">{t.booking.time}</span>
                <p className="font-medium text-charcoal">{confirmation.time}</p>
              </div>
            </div>
            {confirmation.staffName && (
              <div className="flex items-center gap-3 text-sm">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald/10 text-xs text-emerald-600">&#128100;</span>
                <div>
                  <span className="text-charcoal/40">{t.booking.operator}</span>
                  <p className="font-medium text-charcoal">{confirmation.staffName}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 border-t border-emerald/10 pt-4">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-charcoal/40">{t.booking.services}</span>
            <div className="mt-2 space-y-1.5">
              {confirmation.services.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-charcoal/70">{s.name}</span>
                  <span className="text-charcoal/40">
                    &euro;{s.price.toFixed(2)} &middot; {s.duration}min
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-emerald/10 pt-2 text-sm font-medium">
              <span className="text-charcoal">{t.booking.total}</span>
              <span className="text-emerald-600">
                &euro;{confirmation.totalPrice.toFixed(2)} &middot; {confirmation.totalDuration}min
              </span>
            </div>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 rounded-xl border border-red/20 bg-red-50 px-5 py-4 text-sm text-red-600">
          {errorMsg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-7 rounded-2xl border border-gold/10 bg-white/90 p-8 shadow-sm backdrop-blur sm:p-10"
      >
        <div>
          <label className={labelClass}>
            {t.booking.selectedServices}
          </label>
          {selectedIds.length === 0 ? (
            <p className="mt-3 rounded-xl border border-gold/10 bg-ivory/50 px-5 py-4 text-sm text-charcoal/40">
              {t.booking.noServices}
            </p>
          ) : (
            <div className="mt-3 space-y-2">
              {services
                .filter((s) => selectedIds.includes(s.id))
                .map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between rounded-xl border border-burgundy/20 bg-burgundy/5 px-4 py-3"
                  >
                    <div>
                      <span className="text-sm font-medium text-charcoal">{s.name}</span>
                      <span className="ml-2 text-xs text-charcoal/40">
                        &euro;{s.price.toFixed(2)} &middot; {s.duration}min
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectionChange(selectedIds.filter((v) => v !== s.id))}
                      className="text-xs text-charcoal/30 transition-colors hover:text-red-500"
                    >
                        {t.booking.remove}
                    </button>
                  </div>
                ))}
              <div className="pt-1 text-xs text-charcoal/50">
                {selectedIds.length} {selectedIds.length === 1 ? t.services.selected_one : t.services.selected_other} &mdash;{" "}
                <span className="font-medium text-burgundy">&euro;{totalPrice.toFixed(2)}</span>
                {" / "}
                {totalDuration} min totali
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t.booking.name}</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              placeholder="Il tuo nome"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{t.booking.email}</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
              placeholder="tua@email.it"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <label className={labelClass}>{t.booking.phone}</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="+39 3XX XXX XXXX"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{t.booking.staff}</label>
            <select
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              className={inputClass}
            >
              <option value="">{staffList.length > 0 ? "--" : t.booking.staff}</option>
              {staffList.map((s) => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>{t.booking.dateLabel}</label>
            <input
              type="date"
              value={date}
              min={minDate}
              onChange={(e) => {
                setDate(e.target.value);
                setTime("");
              }}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{t.booking.timeLabel}</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className={inputClass}
              disabled={selectedIds.length === 0}
            >
              <option value="">{t.booking.timeLabel}</option>
              {availableTimes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {date && selectedIds.length > 0 && availableTimes.length === 0 && (
              <p className="mt-1.5 text-xs text-charcoal/35">
                {t.booking.noSlots}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className={labelClass}>
            {t.booking.notes} <span className="font-normal uppercase tracking-normal text-charcoal/25">{t.booking.notesOptional}</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder={t.booking.notesPlaceholder}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading || selectedIds.length === 0}
          className="w-full rounded-xl bg-burgundy px-6 py-4 text-sm font-medium tracking-wide text-white shadow-lg shadow-burgundy/15 transition-all duration-300 hover:bg-burgundy-dark hover:shadow-xl hover:shadow-burgundy/25 disabled:opacity-50"
        >
          {loading ? t.booking.submitting : t.booking.submit}
        </button>
      </form>
    </div>
  );
}
