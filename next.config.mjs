/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com'
      }
    ]
  },
  i18n: {
    locales: ['en', 'mm'],
    defaultLocale: 'en',
    localeDetection: false
  },
  trailingSlash: true,
};

export default nextConfig;
