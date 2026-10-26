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
            // Hardened CSP: allows self, Google AdSense, Google Syndication, EthicalAds, and Carbon Ads
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://pagead2.googlesyndication.com https://adservice.google.com https://www.googletagservices.com https://media.ethicalads.io https://cdn.carbonads.com; style-src 'self' 'unsafe-inline' https://media.ethicalads.io; img-src 'self' data: https:; connect-src 'self' https://pagead2.googlesyndication.com https://server.ethicalads.io https://cdn.carbonads.com; font-src 'self' data:; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
