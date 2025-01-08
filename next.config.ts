import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['i.pinimg.com', 'ffcuisine.fr', 'img.daisyui.com'], // Ajoutez ici le domaine autorisé
  },
  reactStrictMode: true,
};

export default nextConfig;
