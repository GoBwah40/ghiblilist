import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Les tests end-to-end compilent dans un dossier à part pour ne pas écraser .next.
  distDir: process.env.NEXT_DIST_DIR ?? '.next',
  images: {
    // Affiches et bannières servies par TMDB via la Studio Ghibli API.
    remotePatterns: [{ protocol: 'https', hostname: 'image.tmdb.org', pathname: '/t/p/**' }],
  },
};

export default nextConfig;
