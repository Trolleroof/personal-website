import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://nikhilprabhu.tech");

const siteDescription = "welcome to my personal website";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nikhil Prabhu",
  description: siteDescription,
  openGraph: {
    title: "Nikhil Prabhu",
    description: siteDescription,
    url: siteUrl,
    siteName: "Nikhil Prabhu",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Nikhil Prabhu",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={geistSans.className}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
