import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "80",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },{
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      }
    ],
    // domains : ["source.unsplash.com","images.unsplash.com"],
  },
  experimental: {
   
  },
};

export default nextConfig;
