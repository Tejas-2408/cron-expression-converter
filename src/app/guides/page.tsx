import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookOpen, Terminal, ShieldAlert, Cpu, ArrowRight, Clock, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cron Guides & Technical Documentation | CronView',
  description: 'In-depth developer guides, tutorials, and references for Quartz, UNIX, AWS EventBridge, and Kubernetes cron job syntax.',
  alternates: {
    canonical: 'https://cronview-six.vercel.app/guides',
  },
};

export default function GuidesIndexPage() {
  const articles = [
    {
      slug: 'cron-syntax-guide',
      title: 'The Ultimate Guide to Cron Syntax (POSIX & Beyond)',
      description: 'Master the fundamentals of recurring job scheduling. Understand each asterisk, special characters (* , - /), step intervals, and common examples.',
      icon: Terminal,
      readTime: '6 min read',
      category: 'Fundamentals',
    },
    {
      slug: 'quartz-cron-tutorial',
      title: 'Mastering Quartz Cron Expressions: 6 & 7 Part Schedules',
      description: 'A deep-dive tutorial into the Quartz Java scheduler. Learn how to use ?, L (last), W (weekday), and # (nth weekday) modifiers with confidence.',
      icon: Layers,
      readTime: '8 min read',
      category: 'Enterprise / Java',
    },
    {
      slug: 'aws-eventbridge-cron-guide',
      title: 'AWS EventBridge & CloudWatch Cron Expression Guide',
      description: 'Everything you need to know about Amazon CloudWatch and EventBridge cron rules: mandatory year field, question mark (?) requirements, and UTC offsets.',
      icon: Cpu,
      readTime: '7 min read',
      category: 'Cloud Architecture',
    },
    {
      slug: 'common-cron-mistakes',
      title: '5 Critical Cron Job Pitfalls That Crash Production',
      description: 'Prevent catastrophic outages. Learn about the Day-of-Month vs Day-of-Week OR-logic trap, Daylight Saving Time (DST) skips, and missing environment variables.',
      icon: ShieldAlert,
      readTime: '10 min read',
      category: 'DevOps & Reliability',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-12 flex-1 w-full space-y-10">
        <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-500/20">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Developer Knowledge Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Cron Guides &amp; Documentation
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Written by senior infrastructure engineers to help you build reliable, outage-free scheduled jobs across UNIX, Quartz, AWS, Jenkins, and Kubernetes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art) => {
            const Icon = art.icon;
            return (
              <Link
                key={art.slug}
                href={`/guides/${art.slug}`}
                className="group flex flex-col justify-between p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs hover:border-blue-500 dark:hover:border-blue-500/50 hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-500/20">
                      {art.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{art.readTime}</span>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug">
                      {art.title}
                    </h2>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {art.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900/60 dark:to-indigo-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Ready to test your cron schedule?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Jump back to the live interactive evaluator and projection engine.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition shrink-0"
          >
            <span>Open Evaluator</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
