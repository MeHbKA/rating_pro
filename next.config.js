/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['aws-s3.ratingpro.pl', 'dev-rating-pro.local'],
  },
}

module.exports = nextConfig
