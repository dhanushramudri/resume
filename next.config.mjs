/** @type {import('next').NextConfig} */
import path from 'path';

// Get the directory name for ES module
const __dirname = new URL('.', import.meta.url).pathname;

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: [
      'stories',
      'src/__test__',
      'src/common',
      'src/helpers',
      'src/modules',
      'src/pages',
      'src/styles',
      'src/templates',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/editor',
        destination: '/builder',
        permanent: true,
      },
    ];
  },
  webpack(config) {
    // Alias '@' to 'src'
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');

    return config;
  },
};

export default nextConfig;
