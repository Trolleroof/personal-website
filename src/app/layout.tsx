import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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

/** Small square art for iMessage / social link previews (not the profile headshot). */
const linkPreviewIcon = {
  url: "/og-icon.png",
  width: 180,
  height: 180,
  alt: "Nikhil Prabhu",
  type: "image/png",
} as const;

const siteDescription = "welcome to my personal website";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nikhil Prabhu",
  description: siteDescription,
  icons: {
    apple: [{ url: "/og-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Nikhil Prabhu",
    description: siteDescription,
    url: siteUrl,
    siteName: "Nikhil Prabhu",
    type: "website",
    images: [linkPreviewIcon],
  },
  twitter: {
    card: "summary",
    title: "Nikhil Prabhu",
    description: siteDescription,
    images: [linkPreviewIcon.url],
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
      </body>
    </html>
  );
}
