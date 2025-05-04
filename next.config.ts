import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.lionbrand.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imgs.michaels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.yarnspirations.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
