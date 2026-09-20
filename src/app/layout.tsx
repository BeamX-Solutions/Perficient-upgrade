import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { BookingProvider } from "@/components/booking/BookingProvider";
import { COMPANY } from "@/data/company";
import "./globals.css";

/*
 * Brand typefaces, taken from the live site at perficientlogisticsltd.com.
 *
 * Playfair Display 500 for h1/h2 and Inter for body and h3-h6, matching the
 * brand already in market. This supersedes the export's Avenir Next Condensed:
 * the two are not variations on a theme, and consistency with the live brand
 * wins over a face that only ever existed on macOS.
 *
 * Playfair is a normal-width serif, so the heading scale in globals.css is
 * tuned for it rather than for the condensed grotesque it replaced.
 */
const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display-face",
  display: "swap",
});

const body = Inter({ subsets: ["latin"], variable: "--font-body-face", display: "swap" });

/* Set NEXT_PUBLIC_SITE_URL once the production domain is confirmed — it only
   affects absolute URLs in metadata (Open Graph, canonicals). */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Chauffeur-driven car hire in Lagos & Abuja · ${COMPANY.shortName}`,
    template: `%s · ${COMPANY.shortName}`,
  },
  description:
    "Premium chauffeur-driven car hire in Lagos and Abuja. Thirty vehicles with confirmed day rates, driver and fuel included. Request a booking with Perficient Logistics Limited.",
  openGraph: {
    type: "website",
    siteName: COMPANY.name,
    locale: "en_NG",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f7fa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  );
}
