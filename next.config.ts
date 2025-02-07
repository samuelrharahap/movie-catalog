import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_TMDB_IMAGE_HOST ?? 'image.tmdb.org',
      },
    ],
  },
};

export default nextConfig;
