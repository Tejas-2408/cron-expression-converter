'use client';

import React, { useEffect } from 'react';
import { ExternalLink, Activity, Cloud } from 'lucide-react';
import { SPONSOR_CONFIG } from '../lib/sponsorConfig';

export const DeveloperAdSlot: React.FC = () => {
  const provider = SPONSOR_CONFIG.activeProvider;

  useEffect(() => {
    if (provider === 'adsense') {
      try {
        if (typeof window !== 'undefined') {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error('AdSense push error:', err);
      }
    }
  }, [provider]);

  // 1. Google AdSense Unit
  if (provider === 'adsense') {
    return (
      <aside
        aria-label="Advertisement"
        className="w-full max-w-2xl mx-auto my-6 px-4 text-center"
      >
        <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">
          Sponsored
        </div>
        <div className="min-h-[100px] w-full flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-2 overflow-hidden shadow-xs">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: '90px' }}
            data-ad-client={SPONSOR_CONFIG.adsense.client}
            data-ad-slot={SPONSOR_CONFIG.adsense.slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </aside>
    );
  }

  // 2. Better Stack Heartbeat Sponsor Card
  if (provider === 'betterstack') {
    return (
      <aside
        aria-label="Developer Sponsor"
        className="w-full max-w-2xl mx-auto my-6 px-4"
      >
        <div
          id="developer-ad-unit"
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 shadow-xs transition-all hover:border-slate-300 dark:hover:border-slate-700"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-500/20">
                    Featured Sponsor
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Uptime &amp; Cron Monitoring
                  </span>
                </div>
                <p className="mt-0.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Never let a silent cron job failure break your production.
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Instant heartbeat alerts via Slack, SMS, or PagerDuty with Better Stack.
                </p>
              </div>
            </div>

            <a
              href={SPONSOR_CONFIG.links.betterstack}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-colors"
            >
              <span>Monitor Free</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </aside>
    );
  }

  // 3. DigitalOcean Cloud Credits Sponsor Card
  if (provider === 'digitalocean') {
    return (
      <aside
        aria-label="Developer Sponsor"
        className="w-full max-w-2xl mx-auto my-6 px-4"
      >
        <div
          id="developer-ad-unit"
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 shadow-xs transition-all hover:border-slate-300 dark:hover:border-slate-700"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                <Cloud className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-500/20">
                    Cloud Partner
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    $200 Free Credit
                  </span>
                </div>
                <p className="mt-0.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Deploy scheduled jobs, cron workers, and VMs on DigitalOcean.
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  New users receive $200 in free cloud infrastructure credits for 60 days.
                </p>
              </div>
            </div>

            <a
              href={SPONSOR_CONFIG.links.digitalocean}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-colors"
            >
              <span>Claim $200</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </aside>
    );
  }

  // 4. EthicalAds Slot
  return (
    <aside aria-label="Sponsored Developer Content" className="w-full max-w-2xl mx-auto my-6 px-4">
      <div
        id="developer-ad-unit"
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 shadow-xs"
      >
        <div
          className="horizontal adaptive"
          data-ea-publisher={SPONSOR_CONFIG.links.ethicaladsPublisherId}
          data-ea-type="image"
        />
      </div>
    </aside>
  );
};
