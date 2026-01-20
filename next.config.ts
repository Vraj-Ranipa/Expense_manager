import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // @ts-expect-error - eslint config is valid in runtime but missing in type definition
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
