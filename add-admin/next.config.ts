import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/media/**', 
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '80',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
