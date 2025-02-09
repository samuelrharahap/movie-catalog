import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_TMDB_IMAGE_HOST ?? 'image.tmdb.org',
      },
    ],
    unoptimized: true, // Disable static image optimization due to vercel OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED
  },
};

export default nextConfig;
