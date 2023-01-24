/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'plants-strapi-ysfz5.ondigitalocean.app',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
