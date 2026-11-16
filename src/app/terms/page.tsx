import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | CronView',
  description: 'Terms of Service and acceptable use conditions for CronView online cron scheduler evaluator.',
  alternates: {
    canonical: 'https://cronview-six.vercel.app/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <FileText className="h-4 w-4" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500">
            Last updated: November 16, 2026 &bull; Effective immediately for all users of CronView
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and using CronView (&quot;the Website&quot;, &quot;the Service&quot;), you accept and agree to be bound by the terms and provisions of this agreement. In addition, when using this tool, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Free Developer Utility Service</h2>
            <p>
              CronView provides an online developer interface for parsing, formatting, visualizing, and translating recurring cron schedules across various dialects (UNIX POSIX, Quartz, AWS EventBridge, Jenkins, Kubernetes). The service is provided completely free of charge for personal and commercial development workflows.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Disclaimer of Warranty</h2>
            <p>
              While CronView strives for 100% precision in evaluating cron expressions, timetable projections, and edge-case hazard calculations (such as Daylight Saving Time shifts and Day-of-Month vs Day-of-Week OR logic), the tool is provided on an <strong>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot;</strong> basis without warranties of any kind, whether express or implied.
            </p>
            <p>
              Users are advised to thoroughly test and verify scheduling expressions in staging or non-production environments prior to executing mission-critical automated workflows in production cloud environments.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Limitation of Liability</h2>
            <p>
              In no event shall the authors, maintainers, or hosting entities of CronView be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, procurement of substitute goods or services; loss of use, data, or profits; or business interruption) however caused and on any theory of liability arising in any way out of the use of this software.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Intellectual Property &amp; Open Source</h2>
            <p>
              CronView is an open-source project. Source code is licensed under the permissive ISC/MIT license and available on GitHub for public inspection, fork, and contribution.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">6. Third-Party Advertisements &amp; External Links</h2>
            <p>
              CronView may display non-intrusive programmatic advertisements served by Google AdSense or certified developer partners to offset hosting and domain maintenance costs. We do not endorse or assume responsibility for any third-party websites or services linked to or advertised on the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">7. Governing Law &amp; Changes</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of CronView following any modifications signifies your acceptance of the updated terms.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
