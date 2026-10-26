import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'CronDialect - Developer Cron Expression Parser & Dialect Converter',
  description: 'Fast, edge-case safe Cron Expression Converter. Supports UNIX, Quartz, AWS EventBridge, Jenkins, and Kubernetes with visual timetables and natural language conversion.',
  keywords: ['cron converter', 'quartz cron', 'aws eventbridge cron', 'jenkins cron syntax', 'kubernetes cronjob', 'cron generator', 'cron natural language'],
  authors: [{ name: 'Senior Infrastructure Engineer' }],
  robots: 'index, follow',
  openGraph: {
    title: 'CronDialect - Developer Cron Expression Parser',
    description: 'Multi-dialect cron converter with visual timetables and edge-case warnings.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* EthicalAds script CDN placeholder - Safe & privacy-friendly */}
        <script async src="https://media.ethicalads.io/media/client/ethicalads.min.js"></script>
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
