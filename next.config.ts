import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  basePath: process.env.FRONTEND_BASE_PATH,
};

export default nextConfig;
