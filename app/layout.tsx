import type { Metadata } from "next";
import { Lato, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

// Lato is Buckley's own typeface; Instrument Serif carries the editorial
// accents; Geist Mono does the small labels.
const sans = Lato({
  variable: "--font-sans-face",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const serif = Instrument_Serif({
  variable: "--font-serif-face",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Creative ís de targeting · Q4-strategie Buckley Belts",
  description:
    "Joris van Huët · opdracht Head of Creative, Cintura Group. Sub-niche ABM als motor van de Creative Engine: de Q4-strategie en de audience-audit, in één scroll.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" style={{ colorScheme: "dark" }}>
      <body className={`${sans.variable} ${mono.variable} ${serif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
