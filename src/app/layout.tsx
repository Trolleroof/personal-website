import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import JsonLd from "@/components/JsonLd";
import { AUTHOR, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import { graph, personSchema, webSiteSchema } from "@/lib/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/favicon.png" },
  title: {
    default: "nikhil prabhu — agents · robotics UIs · systems that ship",
    template: "%s — Nikhil Prabhu",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Nikhil Prabhu",
  authors: [{ name: AUTHOR.name, url: SITE_URL }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  keywords: [
    "Nikhil Prabhu",
    "Trolleroof",
    "UC San Diego computer science",
    "robot learning",
    "reinforcement learning",
    "world models",
    "agentic software",
    "robotics UI",
    "hackathon projects",
  ],
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "llms.txt — machine-readable profile" },
        { url: "/llms-full.txt", title: "llms-full.txt — profile with full blog text" },
      ],
    },
  },
  openGraph: {
    title: "nikhil prabhu — agents · robotics UIs · systems that ship",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "nikhil prabhu",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "nikhil prabhu — agents · robotics UIs · systems that ship",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="llms-txt" href={`${SITE_URL}/llms.txt`} type="text/plain" />
        <link rel="author" href={`${SITE_URL}/llms.txt`} />
        <JsonLd json={graph(personSchema(), webSiteSchema())} />
      </head>
      <body className={geistSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
