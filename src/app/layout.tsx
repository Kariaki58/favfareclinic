import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: {
    default: 'Precision Dental | Expert Care for a Brighter Smile',
    template: '%s | Precision Dental',
  },
  description: 'Experience modern dentistry with a gentle touch. Precision Dental offers expert care, from routine cleanings to cosmetic procedures, in a calm and welcoming environment.',
  keywords: ['dentist', 'dental clinic', 'cosmetic dentistry', 'teeth whitening', 'dental implants', 'family dentistry'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      "name": "Precision Dental",
      "image": "https://picsum.photos/seed/logo/200/200",
      "url": "https://your-domain.com",
      "telephone": "+1-234-567-890",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Dental St",
        "addressLocality": "Smileville",
        "addressRegion": "CA",
        "postalCode": "90210",
        "addressCountry": "US"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "17:00"
      }
    };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <div className="fixed bottom-4 right-4 z-50 md:hidden">
          <Button asChild size="lg" className="rounded-full shadow-lg">
            <Link href="/book-appointment">Book Appointment</Link>
          </Button>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
