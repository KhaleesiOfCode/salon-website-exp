import type { Metadata } from "next";
import "./globals.css";
import { PublicShell } from "@/components/PublicShell";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bellezzasaloon.it";

export const metadata: Metadata = {
  title: {
    default: "Bellezza Salon — Alta Bellezza Italiana",
    template: "%s | Bellezza Salon",
  },
  description:
    "Scopri i nostri trattamenti esclusivi di acconciatura, estetica e benessere a Milano. Prenota il tuo appuntamento online da Bellezza Salon.",
  keywords: ["salone bellezza", "acconciatura Milano", "estetica", "benessere", "parrucchiere Milano", "trattamenti capelli", "manicure", "pedicure"],
  authors: [{ name: "Bellezza Salon" }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Bellezza Salon",
    title: "Bellezza Salon — Alta Bellezza Italiana",
    description:
      "Scopri i nostri trattamenti esclusivi di acconciatura, estetica e benessere. Prenota il tuo appuntamento online.",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bellezza Salon — Alta Bellezza Italiana",
    description:
      "Scopri i nostri trattamenti esclusivi di acconciatura, estetica e benessere. Prenota il tuo appuntamento online.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(baseUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full scroll-smooth antialiased" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              name: "Bellezza Salon",
              image: `${baseUrl}/og-image.jpg`,
              "@id": baseUrl,
              url: baseUrl,
              telephone: "+39 02 1234 5678",
              email: "info@bellezzasaloon.it",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Via Roma 42",
                addressLocality: "Milano",
                postalCode: "20121",
                addressCountry: "IT",
              },
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "18:00" },
              ],
              priceRange: "€€",
              description: "Salone di alta bellezza a Milano specializzato in acconciatura, estetica e benessere.",
            }),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
