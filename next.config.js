/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Security hardening
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            // Allows self, ethicalads and carbon ads CDN scripts and styles
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://media.ethicalads.io https://cdn.carbonads.com; style-src 'self' 'unsafe-inline' https://media.ethicalads.io; img-src 'self' data: https:; connect-src 'self' https://server.ethicalads.io https://cdn.carbonads.com; font-src 'self' data:;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
