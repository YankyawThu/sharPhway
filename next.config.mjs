/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'drive.google.com',
      }
    ]
  },
  i18n: {
    locales: ['en', 'mm'],
    defaultLocale: 'mm',
    localeDetection: false
  },
  trailingSlash: true,
};

export default nextConfig;
