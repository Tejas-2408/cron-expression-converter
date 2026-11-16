import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldAlert, ArrowLeft, AlertTriangle, CheckCircle2, Clock, Terminal } from 'lucide-react';

export const metadata: Metadata = {
  title: '5 Critical Cron Job Mistakes That Crash Production | CronView',
  description: 'Deep dive into the 5 most common cron mistakes in production systems: Day-of-Week OR logic, Daylight Saving Time (DST) jumps, and month-length traps.',
  alternates: {
    canonical: 'https://cronview-six.vercel.app/guides/common-cron-mistakes',
  },
};

export default function CommonCronMistakesPage() {
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
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <ShieldAlert className="h-4 w-4" />
            <span>Reliability &amp; Outage Prevention</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            5 Critical Cron Job Mistakes That Crash Production
          </h1>
          <p className="text-xs text-slate-500">
            Published by Senior Site Reliability &amp; Backend Engineering Team &bull; 10 min read
          </p>
        </div>

        <article className="prose dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <p className="text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
            Cron expressions look deceptively simple. Five or six numbers and asterisks on a single line appear innocuous. Yet, behind this simple syntax lie decades of POSIX legacy rules, calendar edge cases, and distributed systems traps that routinely cause high-severity production incidents.
          </p>

          {/* Pitfall 1 */}
          <section className="space-y-3 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-500/20 text-rose-600 font-bold text-xs">
                #1
              </span>
              The Day-of-Month vs Day-of-Week OR-Logic Trap
            </h2>
            <p>
              In standard POSIX Linux cron, if you specify <strong>both</strong> Day of Month (field 3) and Day of Week (field 5), the scheduler executes the command if <strong>EITHER</strong> condition is met (logical OR, not logical AND).
            </p>
            <div className="p-3 bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-500/20 text-xs text-rose-900 dark:text-rose-300 font-mono">
              Trap: <code>0 0 13 * 5</code> (Intended: &quot;Friday the 13th only&quot;)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>What actually happens:</strong> POSIX cron will execute the job on the 13th day of every single month, <em>plus</em> every Friday of the year. If this was a financial reconciliation job, it runs 60+ times a year instead of 1 or 2 times!
            </p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-300">
              <strong>Solution:</strong> In UNIX crontab, schedule for <code>0 0 13 * *</code> and add a script guard: <code>[ $(date +\%u) -eq 5 ] &amp;&amp; /run/job.sh</code>, or switch to Quartz which supports explicit <code>?</code> masking.
            </div>
          </section>

          {/* Pitfall 2 */}
          <section className="space-y-3 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-500/20 text-rose-600 font-bold text-xs">
                #2
              </span>
              Daylight Saving Time (DST) 2:00 AM – 3:00 AM Jumps
            </h2>
            <p>
              In regions observing Daylight Saving Time (such as US and European timezones), clocks jump forward in the spring (02:00 jumps to 03:00) and fall backward in the autumn (02:00 repeats twice).
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Spring Forward:</strong> A cron scheduled at <code>0 2 * * *</code> is completely skipped because 2:00 AM does not exist on transition night.</li>
              <li><strong>Fall Backward:</strong> A cron scheduled at <code>30 2 * * *</code> executes <em>twice</em> on transition night because 2:30 AM occurs twice.</li>
            </ul>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-300">
              <strong>Solution:</strong> In cloud and server environments (AWS, Kubernetes, GCP, Linux), pin your server and cron daemon timezone to <strong>UTC (Coordinated Universal Time)</strong>. UTC never experiences DST shifts.
            </div>
          </section>

          {/* Pitfall 3 */}
          <section className="space-y-3 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-500/20 text-rose-600 font-bold text-xs">
                #3
              </span>
              The 31st-Day Month-End Skip
            </h2>
            <p>
              Setting a monthly billing job to run at <code>0 0 31 * *</code> will completely fail to execute in 5 out of 12 months: February (28/29 days), April (30 days), June (30 days), September (30 days), and November (30 days).
            </p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-300">
              <strong>Solution:</strong> In Quartz or AWS, use the <code>L</code> modifier (e.g. <code>0 0 23 L * ?</code>). In Linux POSIX, run on the 1st of every month (<code>0 0 1 * *</code>) and process data for the preceding month.
            </div>
          </section>

          {/* Pitfall 4 */}
          <section className="space-y-3 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-500/20 text-rose-600 font-bold text-xs">
                #4
              </span>
              Crontab Stripped Environment &amp; $PATH
            </h2>
            <p>
              When cron executes a command, it runs in a heavily restricted sub-shell with minimal environment variables. The default <code>$PATH</code> is often limited to <code>/usr/bin:/bin</code>.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              If your script calls <code>node</code>, <code>python3</code>, <code>aws</code>, or binaries installed in <code>/usr/local/bin</code> or user directories, the job silently crashes with <code>command not found</code>.
            </p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-300">
              <strong>Solution:</strong> Always use absolute paths in crontab scripts (e.g. <code>/usr/local/bin/node /opt/app/worker.js</code>) and declare <code>SHELL=/bin/bash</code> and <code>PATH=/usr/local/bin:/usr/bin:/bin</code> at the top of the crontab file.
            </div>
          </section>

          {/* Pitfall 5 */}
          <section className="space-y-3 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-500/20 text-rose-600 font-bold text-xs">
                #5
              </span>
              Overlapping Job Execution Cascades
            </h2>
            <p>
              If a job is scheduled to run every 5 minutes (<code>*/5 * * * *</code>), but database latency causes a run to take 7 minutes, a second instance starts while the first is still active. This quickly starves server CPU, locks database tables, and causes system crashes.
            </p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-300 font-mono">
              <strong>Solution:</strong> Use Linux <code>flock</code> to ensure only 1 instance can execute:
              <br />
              <code>* * * * * /usr/bin/flock -n /tmp/myjob.lock /opt/app/run.sh</code>
            </div>
          </section>

          <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Audit Your Cron Expressions on CronView
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                CronView automatically highlights Daylight Saving Time and OR-logic hazards before you deploy.
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 transition"
            >
              Run Schedule Audit &rarr;
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
