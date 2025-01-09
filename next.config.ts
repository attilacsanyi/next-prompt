import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['mongoose'],
  images: {
    remotePatterns: [{ hostname: 'lh3.googleusercontent.com' }],
  },
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
