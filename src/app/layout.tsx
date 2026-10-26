import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://cronview-six.vercel.app'),
  title: 'Cron Expression Evaluator & Parser | Crontab Guru Alternative | CronView',
  description: 'Fast, clean, and interactive cron expression generator, evaluator, and dialect converter. Instant human-readable translations, next execution timeline, edge-case warnings, and natural language to cron.',
  keywords: [
    'cron',
    'cron job',
    'cron expression',
    'cron job evaluator',
    'cron evaluator',
    'cron converter',
    'crontab guru',
    'cron expression generator',
    'cron generator',
    'quartz cron',
    'aws eventbridge cron',
    'jenkins cron syntax',
    'kubernetes cronjob',
    'cron translator',
    'crontab syntax'
  ],
  authors: [{ name: 'CronView Team' }],
  creator: 'CronView',
  publisher: 'CronView',
  alternates: {
    canonical: 'https://cronview-six.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Cron Expression Evaluator & Crontab Generator | CronView',
    description: 'Convert cron expressions to plain English, inspect trigger timetable, and evaluate Quartz, AWS, Jenkins, and UNIX cron dialects.',
    url: 'https://cronview-six.vercel.app',
    siteName: 'CronView',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cron Expression Evaluator & Crontab Generator | CronView',
    description: 'Instant cron schedule evaluator with interactive visual timetable, edge case warnings, and dialect converters.',
    creator: '@cronview',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CronView - Cron Expression Evaluator',
    url: 'https://cronview-six.vercel.app',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    description: 'Universal online cron expression parser, evaluator, and schedule timeline generator supporting UNIX, Quartz, AWS EventBridge, Jenkins, and Kubernetes.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Interactive Cron Expression Visualizer',
      'Instant Human-Readable Plain English Translation',
      'Quartz, AWS CloudWatch, Jenkins Hash, and Kubernetes Dialect Support',
      'Next Trigger Schedule & Timezone Offset Projections',
      'Edge Case Alerts for DST and Day-of-Week vs Day-of-Month traps',
      'Bi-directional Natural Language to Cron Generation',
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* EthicalAds script CDN placeholder - Safe & privacy-friendly */}
        <script async src="https://media.ethicalads.io/media/client/ethicalads.min.js"></script>
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
