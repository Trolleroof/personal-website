import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Dev server is also opened via the Network URL printed by `next dev`.
  // Without this, Next blocks the JS bundle and project clicks never hydrate.
  allowedDevOrigins: ["100.114.253.152"],
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

