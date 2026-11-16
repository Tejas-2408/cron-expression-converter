import React from 'react';
import Link from 'next/link';
import { Clock, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 text-xs text-slate-500 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Clock className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                CronView
              </span>
            </Link>
            <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
              Free, open-source online cron expression evaluator, schedule timeline projector, and multi-dialect converter. Built by senior backend engineers to prevent production scheduler outages.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>100% Client-Side Privacy Safe</span>
            </div>
          </div>

          {/* Schedulers & Dialects */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px]">
              Dialects &amp; Tools
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Quartz Cron Converter (6-7 Parts)
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Standard UNIX POSIX Crontab (5 Parts)
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  AWS EventBridge / CloudWatch Syntax
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Jenkins Hashed CI/CD Schedulers
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Kubernetes CronJob v1/v1beta1
                </Link>
              </li>
            </ul>
          </div>

          {/* Educational Documentation & Guides */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px]">
              Guides &amp; Tutorials
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link href="/guides/cron-syntax-guide" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Complete Cron Syntax Guide
                </Link>
              </li>
              <li>
                <Link href="/guides/quartz-cron-tutorial" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Quartz Cron Tutorial (?, L, W, #)
                </Link>
              </li>
              <li>
                <Link href="/guides/aws-eventbridge-cron-guide" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  AWS CloudWatch &amp; EventBridge Rules
                </Link>
              </li>
              <li>
                <Link href="/guides/common-cron-mistakes" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Common Cron Mistakes &amp; DST Pitfalls
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-blue-600 dark:hover:text-blue-400 transition font-semibold text-blue-600 dark:text-blue-400">
                  View All Documentation &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Company Information (Required by AdSense) */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px]">
              Company &amp; Legal
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  About CronView
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Privacy Policy (AdSense &amp; Cookies)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Contact Us &amp; Support
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Tejas-2408/cron-expression-converter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>
            &copy; {new Date().getFullYear()} CronView. Free, open-source tool for developers and DevOps engineers.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="/privacy-policy" className="hover:text-slate-800 dark:hover:text-slate-300 transition">
              Privacy
            </Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-slate-800 dark:hover:text-slate-300 transition">
              Terms
            </Link>
            <span>&bull;</span>
            <Link href="/about" className="hover:text-slate-800 dark:hover:text-slate-300 transition">
              About
            </Link>
            <span>&bull;</span>
            <Link href="/contact" className="hover:text-slate-800 dark:hover:text-slate-300 transition">
              Contact
            </Link>
            <span>&bull;</span>
            <a href="https://cronview-six.vercel.app/sitemap.xml" className="hover:text-slate-800 dark:hover:text-slate-300 transition">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
