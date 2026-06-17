import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cataas.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      }
    ],
  },
  // Inyectamos el Proxy Inverso aquí para evadir el bloqueo de Firefox en Codespaces
  async rewrites() {
    return [
      {
        source: '/api/gatos-externos/:path*',
        destination: 'https://cataas.com/:path*',
      },
    ];
  },
};

export default nextConfig;
