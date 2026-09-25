import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2036qm85j5v94.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
