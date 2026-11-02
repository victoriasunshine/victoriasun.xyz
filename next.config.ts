import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/projects/book-tracker", destination: "https://book-tracker-abc.vercel.app/projects/book-tracker" },
        { source: "/projects/book-tracker/:path*", destination: "https://book-tracker-abc.vercel.app/projects/book-tracker/:path*" },
      ],
    };
  },
};

export default nextConfig;
