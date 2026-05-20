"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/lib/i18n/context";
import type { ReviewItem } from "@/lib/types";

export function ReviewsSection() {
  const { t } = useLocale();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => { setReviews(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (reviews.length < 2) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (loading) return <SectionSkeleton />;
  if (reviews.length === 0) return null;

  const review = reviews[activeIndex];

  return (
    <section id="recensioni" className="relative bg-ivory px-6 py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-dark/70">{t.reviews.badge}</p>
        <h2 className="font-serif text-4xl font-light text-charcoal sm:text-5xl">{t.reviews.title}</h2>
      </div>

      <div className="mt-14 mx-auto max-w-2xl">
        <div className="relative rounded-2xl border border-gold/10 bg-white p-8 shadow-sm sm:p-12">
          <div className="absolute -top-3 left-8 text-5xl font-serif text-gold/20">&ldquo;</div>

          <div className="mb-2 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-sm ${i < review.rating ? "text-gold" : "text-gold/20"}`}>
                &#9733;
              </span>
            ))}
          </div>

          <p className="relative text-base leading-relaxed text-charcoal/70 italic">&ldquo;{review.text}&rdquo;</p>

          <div className="mt-6 flex items-center justify-center gap-3">
            {review.customerImage ? (
              <img src={review.customerImage} alt="" className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-sm font-medium text-gold-dark">
                {review.customerName.charAt(0)}
              </span>
            )}
            <span className="text-sm font-medium text-charcoal">{review.customerName}</span>
          </div>
        </div>

        {reviews.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-burgundy" : "w-2 bg-gold/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SectionSkeleton() {
  return (
    <section className="relative bg-ivory px-6 py-28">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <div className="mx-auto mb-3 h-3 w-24 animate-pulse rounded bg-gold/20" />
          <div className="mx-auto h-8 w-48 animate-pulse rounded bg-gold/20" />
        </div>
        <div className="mt-14 animate-pulse rounded-2xl border border-gold/10 bg-white p-12">
          <div className="mx-auto mb-4 h-4 w-32 rounded bg-gold/10" />
          <div className="mx-auto h-16 w-full rounded bg-gold/10" />
        </div>
      </div>
    </section>
  );
}
