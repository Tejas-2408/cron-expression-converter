'use client';

import React from 'react';
import { ExternalLink, Activity, Cloud } from 'lucide-react';
import { SPONSOR_CONFIG } from '../lib/sponsorConfig';

interface SideAdRailProps {
  side: 'left' | 'right';
}

export const SideAdRail: React.FC<SideAdRailProps> = ({ side }) => {
  const provider = SPONSOR_CONFIG.activeProvider;

  if (side === 'left') {
    return (
      <aside
        aria-label="Developer Sponsor"
        className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 shadow-xs transition hover:border-blue-400 dark:hover:border-slate-700"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-500/20">
              Sponsor
            </span>
            <span className="text-[10px] text-slate-400">Zero-Tracking</span>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                Better Stack
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Cron heartbeat &amp; silent failure monitoring.
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/80">
            Get instant PagerDuty, Slack, or SMS alerts when scheduled jobs crash or skip.
          </p>

          <a
            href={SPONSOR_CONFIG.links.betterstack}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 py-2 text-xs font-bold text-white shadow-xs transition"
          >
            <span>Monitor Crons Free</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </aside>
    );
  }

  // Right Side Rail: DigitalOcean Cloud Credits or AdSense
  return (
    <aside
      aria-label="Cloud Partner"
      className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 shadow-xs transition hover:border-blue-400 dark:hover:border-slate-700"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-500/20">
            Cloud Partner
          </span>
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">$200 Credit</span>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
            <Cloud className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              DigitalOcean
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Host cron workers &amp; background tasks.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/80">
          Deploy Linux crontab scripts, background worker queues, or Docker containers.
        </p>

        <a
          href={SPONSOR_CONFIG.links.digitalocean}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 py-2 text-xs font-bold text-white shadow-xs transition"
        >
          <span>Claim $200 Free</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </aside>
  );
};
