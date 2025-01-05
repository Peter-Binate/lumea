import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['i.pinimg.com', 'ffcuisine.fr'], // Ajoutez ici le domaine autorisé
  },
  reactStrictMode: true,
};

export default nextConfig;
