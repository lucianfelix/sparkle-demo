/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'publish-p81252-e700817.adobeaemcloud.com',
        // port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig