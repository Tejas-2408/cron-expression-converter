import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Terminal, Clock, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Ultimate Guide to Cron Syntax (POSIX & Beyond) | CronView',
  description: 'Comprehensive guide to understanding standard 5-part cron syntax. Learn how each field functions, special operators (* , - /), and practical production examples.',
  alternates: {
    canonical: 'https://cronview-six.vercel.app/guides/cron-syntax-guide',
  },
};

export default function CronSyntaxGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Guides</span>
          </Link>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Terminal className="h-4 w-4" />
            <span>Fundamentals</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            The Ultimate Guide to Cron Syntax (POSIX &amp; Beyond)
          </h1>
          <p className="text-xs text-slate-500">
            Published by Senior Backend Engineering Team &bull; 6 min read
          </p>
        </div>

        <article className="prose dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <p className="text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
            Cron is a time-based job scheduler found in Unix-like operating systems. Named after the Greek god of time, <em>Chronos</em>, it has been the bedrock of server automation since Version 7 Unix in 1979. Whether you are running a database backup, clearing stale cache keys, or triggering billing events, cron expressions are the universal language of scheduled tasks.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              The Standard 5-Part Cron Anatomy
            </h2>
            <p>
              In POSIX and Linux crontab configurations, a cron expression is composed of 5 distinct fields separated by white spaces:
            </p>

            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
              <pre className="text-emerald-400">{`* * * * *
│ │ │ │ │
│ │ │ │ └─── Day of Week (0 - 6 or SUN - SAT, 0 = Sunday)
│ │ │ └───── Month (1 - 12 or JAN - DEC)
│ │ └─────── Day of Month (1 - 31)
│ └───────── Hour (0 - 23, 24-hour military format)
└─────────── Minute (0 - 59)`}</pre>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 dark:bg-slate-900 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-800">Position</th>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-800">Field Name</th>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-800">Allowed Values</th>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-800">Allowed Special Characters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="p-3 font-mono font-bold">1</td>
                    <td className="p-3 font-semibold">Minute</td>
                    <td className="p-3 font-mono">0 - 59</td>
                    <td className="p-3 font-mono text-blue-600 dark:text-blue-400">* , - /</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold">2</td>
                    <td className="p-3 font-semibold">Hour</td>
                    <td className="p-3 font-mono">0 - 23</td>
                    <td className="p-3 font-mono text-blue-600 dark:text-blue-400">* , - /</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold">3</td>
                    <td className="p-3 font-semibold">Day of Month</td>
                    <td className="p-3 font-mono">1 - 31</td>
                    <td className="p-3 font-mono text-blue-600 dark:text-blue-400">* , - /</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold">4</td>
                    <td className="p-3 font-semibold">Month</td>
                    <td className="p-3 font-mono">1 - 12 (or JAN - DEC)</td>
                    <td className="p-3 font-mono text-blue-600 dark:text-blue-400">* , - /</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold">5</td>
                    <td className="p-3 font-semibold">Day of Week</td>
                    <td className="p-3 font-mono">0 - 7 (0 &amp; 7 = SUN, or SUN - SAT)</td>
                    <td className="p-3 font-mono text-blue-600 dark:text-blue-400">* , - /</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Understanding Special Operators
            </h2>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="font-mono text-blue-600 text-sm">* (Wildcard / Asterisk)</span>
                  <span>Matches all possible values</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Specifies that the event should trigger for every instance of that field. For example, <code>*</code> in the hour position means &quot;every hour&quot;.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="font-mono text-blue-600 text-sm">, (Comma / Value List)</span>
                  <span>Specifies discrete values</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Allows defining a comma-separated list of values. For example, <code>15,45 * * * *</code> executes at both minute 15 and minute 45 of every hour.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="font-mono text-blue-600 text-sm">- (Hyphen / Range)</span>
                  <span>Defines an inclusive range</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Executes for all values within a continuous range. For example, <code>0 9-17 * * 1-5</code> runs hourly from 9 AM through 5 PM, Monday through Friday.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="font-mono text-blue-600 text-sm">/ (Slash / Step Intervals)</span>
                  <span>Specifies increments</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Skips through values in steps. For example, <code>*/15 * * * *</code> means every 15 minutes (at :00, :15, :30, :45).
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              10 Practical Production Examples
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <span className="font-bold text-slate-900 dark:text-white block">Every 10 minutes</span>
                <code className="text-blue-600 dark:text-blue-400 font-mono font-bold">*/10 * * * *</code>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <span className="font-bold text-slate-900 dark:text-white block">Daily at Midnight</span>
                <code className="text-blue-600 dark:text-blue-400 font-mono font-bold">0 0 * * *</code>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <span className="font-bold text-slate-900 dark:text-white block">Weekdays at 9:30 AM</span>
                <code className="text-blue-600 dark:text-blue-400 font-mono font-bold">30 9 * * 1-5</code>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <span className="font-bold text-slate-900 dark:text-white block">First day of every month</span>
                <code className="text-blue-600 dark:text-blue-400 font-mono font-bold">0 0 1 * *</code>
              </div>
            </div>
          </section>

          <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Try CronView Now
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Evaluate your expressions with live visual timetable projections.
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 transition"
            >
              Open Interactive Tool &rarr;
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
