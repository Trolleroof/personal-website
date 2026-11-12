import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import JsonLd from "@/components/JsonLd";
import { AUTHOR, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import { graph, personSchema, webSiteSchema } from "@/lib/structured-data";

// CMU Sans Serif (Computer Modern, SIL OFL) — Medium is the default weight.
const cmuSans = localFont({
  variable: "--font-cmu-sans",
  src: [
    { path: "./fonts/cmu-sans-serif-500-roman.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cmu-sans-serif-500-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/cmu-sans-serif-700-roman.woff2", weight: "700", style: "normal" },
  ],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
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
    default: "nikhil prabhu — personal website",
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
    title: "nikhil prabhu — personal website",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "nikhil prabhu",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "nikhil prabhu — personal website",
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
    <html lang="en" className={`${cmuSans.variable} ${plexMono.variable}`}>
      <head>
        <link rel="llms-txt" href={`${SITE_URL}/llms.txt`} type="text/plain" />
        <link rel="author" href={`${SITE_URL}/llms.txt`} />
        <JsonLd json={graph(personSchema(), webSiteSchema())} />
      </head>
      <body className={cmuSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
