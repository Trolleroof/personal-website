import type { Metadata, Viewport } from "next";
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

const siteDescription =
  "Personal portfolio of Nikhil Prabhu — agents, robotics UIs, and systems that ship. CS @ UC San Diego.";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nikhil Prabhu",
  url: siteUrl,
  image: `${siteUrl}/profile-avatar.png`,
  jobTitle: "Computer Science Student",
  description: siteDescription,
  email: "mailto:nikhilprabhu06@gmail.com",
  sameAs: [
    "https://github.com/Trolleroof",
    "https://www.linkedin.com/in/nikprabhu1/",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of California, San Diego",
  },
  knowsAbout: [
    "Robotics",
    "Reinforcement Learning",
    "Autonomous Systems",
    "Agentic Software",
    "Computer Vision",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: "/favicon.png" },
  title: {
    default: "nikhil prabhu",
    template: "%s",
  },
  description: siteDescription,
  alternates: {
    types: {
      "text/plain": [{ url: "/llms.txt", title: "LLMs.txt — machine-readable profile" }],
    },
  },
  openGraph: {
    title: "nikhil prabhu",
    description: siteDescription,
    url: siteUrl,
    siteName: "nikhil prabhu",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "nikhil prabhu",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
        <link rel="llms-txt" href={`${siteUrl}/llms.txt`} type="text/plain" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={geistSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
