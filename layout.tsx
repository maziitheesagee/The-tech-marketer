import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Tech Marketer — Messaging & Content for Tech Startups",
  description:
    "Tech startup marketer helping web3 and SaaS founders communicate clearly and convert. Messaging, landing page copy, content and founder-led brand.",
  openGraph: {
    title: "The Tech Marketer — Penned by JB",
    description: "Complex tech. Simple words. Real customers.",
    type: "website",
  },
  twitter: { card: "summary_large_image", creator: "@pennedbyjb_" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
