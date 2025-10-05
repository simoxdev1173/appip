import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // If you customized these, make sure 640 is present:
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  /* config options here */
};

export default nextConfig;
