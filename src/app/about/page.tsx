import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Clock, ShieldCheck, Terminal, Cpu, Users, Heart, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About CronView | Enterprise Cron Expression Tool',
  description: 'About CronView: An open-source developer utility created to eliminate scheduler outages, syntax confusion, and dialect incompatibilities across modern cloud infrastructures.',
  alternates: {
    canonical: 'https://cronview-six.vercel.app/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full space-y-10">
        <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Users className="h-4 w-4" />
            <span>Publisher &amp; Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About CronView
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            CronView was created by senior infrastructure and backend engineers to solve the silent, high-stakes errors that occur when scheduling recurring background jobs across diverse cloud environments.
          </p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-600" />
              The Problem We Solved
            </h2>
            <p>
              Nearly every software company relies heavily on cron jobs for billing runs, database maintenance, data pipeline syncs, and transaction auditing. Yet, writing cron expressions remains notoriously error-prone.
            </p>
            <p>
              Worse, there is no single &quot;standard cron&quot;:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li><strong>Linux POSIX Cron</strong> uses a 5-part format where specifying both Day-of-Month and Day-of-Week executes as an <em>OR</em> condition, causing unexpected double-triggers.</li>
              <li><strong>Quartz Scheduler (Java / Spring Boot)</strong> uses 6 to 7 fields, puts seconds at position 1, and requires special modifiers like <code>?</code>, <code>L</code>, and <code>#</code>.</li>
              <li><strong>AWS EventBridge &amp; CloudWatch</strong> strictly enforces 6 fields and will reject any expression that doesn&apos;t supply a question mark (<code>?</code>) in either DOM or DOW.</li>
              <li><strong>Jenkins CI/CD</strong> utilizes distributed hashing (<code>H/15</code>) to load-balance build executors across clusters.</li>
            </ul>
            <p>
              Most existing online cron utilities only support standard 5-part Linux cron. Developers trying to configure AWS CloudWatch or Quartz would get incorrect translations or failed deployments. <strong>CronView was engineered to bridge this gap.</strong>
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-2">
              <div className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                <Terminal className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Universal Dialects</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Native support for Quartz, POSIX UNIX, AWS EventBridge, Jenkins, and Kubernetes CronJob formats.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-2">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Zero-Outage Guardrails</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Automated detection of Daylight Saving Time shifts, 31st-day skips in shorter months, and syntax hazards.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-2">
              <div className="h-9 w-9 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">100% Client-Side</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Calculations execute instantly in your browser with zero latency, zero server logs, and complete privacy.
              </p>
            </div>
          </section>

          <section className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Open Source &amp; Community-Driven
            </h2>
            <p>
              CronView is maintained openly on GitHub. We believe critical developer infrastructure tools should be transparent, inspectable, and freely accessible to everyone around the world.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://github.com/Tejas-2408/cron-expression-converter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow-xs transition"
              >
                <span>View on GitHub</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs shadow-xs transition"
              >
                <span>Explore Technical Guides</span>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
