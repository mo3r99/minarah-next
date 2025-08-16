import type { NextConfig } from "next";

import packageJson from '@/package.json';

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
  images: { unoptimized: true },
  generateBuildId: async () => {
    // Use package version + timestamp
    return `v${packageJson.version}-${Date.now()}`;
  },

};

export default nextConfig;
