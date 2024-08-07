/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com']
  },
  i18n: {
    locales: ['en', 'mm'],
    defaultLocale: 'en',
    localeDetection: false
  },
  trailingSlash: true,
};

export default nextConfig;
