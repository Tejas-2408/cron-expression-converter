import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Layers, ArrowLeft, CheckCircle2, AlertTriangle, Code2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mastering Quartz Cron Expressions: 6 & 7 Part Schedules | CronView',
  description: 'Complete guide to Quartz scheduler syntax in Java and Spring Boot. Master ?, L, W, and # operators with production-ready scheduling examples.',
  alternates: {
    canonical: 'https://cronview-six.vercel.app/guides/quartz-cron-tutorial',
  },
};

export default function QuartzCronTutorialPage() {
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
            <Layers className="h-4 w-4" />
            <span>Enterprise &bull; Java / Spring</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Mastering Quartz Cron Expressions: 6 &amp; 7 Part Schedules
          </h1>
          <p className="text-xs text-slate-500">
            Published by Senior Backend Engineering Team &bull; 8 min read
          </p>
        </div>

        <article className="prose dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <p className="text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
            The Quartz Job Scheduling library is the industry standard for enterprise Java, Spring Boot, and distributed Kotlin services. Unlike traditional 5-field UNIX crontab, Quartz introduces sub-minute granularity (seconds), an optional year field, and powerful calendar tokens such as <code>?</code>, <code>L</code>, <code>W</code>, and <code>#</code>.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Quartz Field Structure (6 to 7 Fields)
            </h2>
            <p>
              A Quartz cron expression is composed of 6 mandatory fields, with an optional 7th year field:
            </p>

            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
              <pre className="text-blue-400">{`0 15 10 ? * 6L 2026
│  │  │ │ │  │   │
│  │  │ │ │  │   └─── Year (Optional: 1970 - 2099)
│  │  │ │ │  └─────── Day of Week (1 - 7 or SUN - SAT, 1 = Sunday)
│  │  │ │ └────────── Month (1 - 12 or JAN - DEC)
│  │  │ └──────────── Day of Month (1 - 31, ?, L, W)
│  │  └────────────── Hour (0 - 23)
│  └───────────────── Minute (0 - 59)
└──────────────────── Seconds (0 - 59)`}</pre>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-300">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <div>
                <strong>Critical Day-of-Week Difference:</strong> In POSIX cron, <code>0</code> or <code>7</code> represents Sunday. In Quartz, <strong>1 represents Sunday</strong> and <strong>7 represents Saturday</strong>.
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Quartz Special Modifiers Explained
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded">
                    ? (Question Mark - No Specific Value)
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Used in either the <em>Day of Month</em> or <em>Day of Week</em> field. Quartz requires you to specify <code>?</code> in one of these two fields whenever you specify a condition in the other. It explicitly tells the scheduler: &quot;I do not care what calendar day/weekday it is; do not evaluate this field.&quot;
                </p>
                <div className="text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-2 rounded">
                  Example: <code>0 0 12 ? * WED</code> (Runs every Wednesday at noon regardless of what day of the month it is).
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded">
                    L (Last)
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Stands for &quot;Last&quot;. In the Day of Month field, <code>L</code> means the last day of the month (e.g. day 31 in January, day 28/29 in February, day 30 in April). When used in Day of Week with a qualifier like <code>6L</code>, it means <strong>the last Friday of the month</strong>.
                </p>
                <div className="text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-2 rounded">
                  Example: <code>0 0 22 ? * 6L</code> (Runs at 10:00 PM on the last Friday of every month).
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded">
                    W (Weekday)
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Specifies the nearest weekday (Monday through Friday) to the given calendar day. For instance, <code>15W</code> means &quot;the nearest weekday to the 15th of the month&quot;. If the 15th is a Saturday, the job fires on Friday the 14th. If Sunday, it fires on Monday the 16th.
                </p>
                <div className="text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-2 rounded">
                  Example: <code>0 0 8 1W * ?</code> (First weekday of the month at 8:00 AM).
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded">
                    # (Nth Weekday of the Month)
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Allows targeting the nth occurrence of a specific weekday in a month. Format: <code>dayOfWeek#occurrence</code>. For example, <code>2#1</code> means the first Monday of the month, while <code>6#3</code> means the third Friday.
                </p>
                <div className="text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-2 rounded">
                  Example: <code>0 0 12 ? * 2#3</code> (Third Monday of every month at noon).
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Spring Boot Code Implementation
            </h2>
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
              <pre className="text-emerald-400">{`@Component
public class MonthlyReconciliationJob {

    // Runs at 22:00:00 on the last Friday of every month
    @Scheduled(cron = "0 0 22 ? * 6L", zone = "UTC")
    public void executeMonthEndPayroll() {
        // Business logic here
    }
}`}</pre>
            </div>
          </section>

          <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Inspect Quartz Schedules in Realtime
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                CronView supports full Quartz syntax out of the box with zero setup.
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 transition"
            >
              Test Quartz on CronView &rarr;
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
