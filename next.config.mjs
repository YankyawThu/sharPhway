/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'mm'],
    defaultLocale: 'en',
    localeDetection: false
  },
  trailingSlash: true
};

export default nextConfig;
