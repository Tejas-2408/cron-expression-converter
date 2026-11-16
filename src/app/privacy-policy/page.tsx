import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Lock, Cookie, Eye, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | CronView',
  description: 'Privacy Policy for CronView. Explains data handling, zero-tracking philosophy, cookies, and Google AdSense advertising compliance.',
  alternates: {
    canonical: 'https://cronview-six.vercel.app/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <ShieldCheck className="h-4 w-4" />
            <span>Compliance &amp; Trust</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">
            Last updated: November 16, 2026 &bull; Effective immediately for all visitors to CronView (https://cronview-six.vercel.app)
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-600" />
              1. Overview &amp; Client-Side Architecture
            </h2>
            <p>
              At <strong>CronView</strong>, accessible from <a href="https://cronview-six.vercel.app" className="text-blue-600 dark:text-blue-400 underline">https://cronview-six.vercel.app</a>, the privacy of our visitors is of paramount importance to us.
            </p>
            <p>
              CronView operates as a <strong>100% client-side web application</strong>. All cron expression parsing, evaluation, natural language generation, and timetable projections are processed locally in your web browser using JavaScript. We do not store, log, inspect, or transmit your cron expressions, scheduling parameters, or server automation configurations to any remote backend server.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cookie className="h-5 w-5 text-blue-600" />
              2. Google AdSense &amp; Third-Party Advertising Cookies
            </h2>
            <p>
              Google is a third-party vendor on our site. Google uses cookies, including the DoubleClick DART cookie and similar technologies, to serve ads to our site visitors based on their visit to CronView and other sites on the Internet.
            </p>
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                Google AdSense Disclosure Requirements
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li>
                  Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.
                </li>
                <li>
                  Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
                </li>
                <li>
                  Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Google Ads Settings</a>.
                </li>
                <li>
                  Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">www.aboutads.info</a>.
                </li>
              </ul>
            </div>
            <p>
              We do not share any personal identification details with advertising partners. Any data gathered by third-party advertising partners is governed strictly by the respective third party&apos;s privacy policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              3. Log Files &amp; Web Analytics
            </h2>
            <p>
              CronView follows standard procedures for using log files provided automatically by our hosting platform (Vercel). These files log visitors when they visit web pages. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and number of clicks. These are not linked to any information that is personally identifiable. The purpose of this information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information to ensure website availability and security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              4. Local Storage Preferences
            </h2>
            <p>
              CronView uses your browser&apos;s <code>localStorage</code> solely to remember your chosen theme preference (e.g. <code>theme: &quot;light&quot;</code> or <code>theme: &quot;dark&quot;</code>). This information never leaves your device and contains zero personally identifiable data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              5. CCPA Privacy Rights (Do Not Sell My Personal Information)
            </h2>
            <p>Under the California Consumer Privacy Act (CCPA), California consumers have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Request that a business disclose the categories and specific pieces of personal data collected about consumers.</li>
              <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
              <li>Request that a business that sells a consumer&apos;s personal data, not sell the consumer&apos;s personal data.</li>
            </ul>
            <p>CronView does not collect or sell personal consumer data. If you make a request, we have one month to respond to you. Please contact us to exercise any of these rights.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              6. GDPR Data Protection Rights
            </h2>
            <p>We want to ensure you are fully aware of all of your data protection rights under the General Data Protection Regulation (GDPR):</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification:</strong> You have the right to request correction of inaccurate data.</li>
              <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data under certain conditions.</li>
              <li><strong>The right to restrict processing:</strong> You have the right to request restriction of data processing.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              7. Children&apos;s Information
            </h2>
            <p>
              CronView does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              8. Contact Us
            </h2>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to reach out to us via our <a href="/contact" className="text-blue-600 dark:text-blue-400 underline">Contact Page</a> or submit an issue on our official <a href="https://github.com/Tejas-2408/cron-expression-converter" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">GitHub repository</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
