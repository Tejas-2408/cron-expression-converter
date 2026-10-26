'use client';

import React, { useEffect, useState } from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface AdSlotProps {
  network?: 'ethicalads' | 'carbon' | 'placeholder';
}

export const DeveloperAdSlot: React.FC<AdSlotProps> = () => {
  const [adBlocked, setAdBlocked] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    const checkScriptBlocker = setTimeout(() => {
      const adElement = document.getElementById('developer-ad-unit');
      if (adElement && adElement.clientHeight === 0 && adElement.clientWidth === 0) {
        setAdBlocked(true);
      }
    }, 2500);

    return () => clearTimeout(checkScriptBlocker);
  }, []);

  if (!isClient) return null;

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
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-500/20">
                  Dev Sponsor
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Privacy-first &bull; Zero tracking
                </span>
              </div>
              <p className="mt-0.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                {adBlocked
                  ? 'Supporting open developer infrastructure.'
                  : 'Reliable Cloud Scheduling & Background Cron Automation'}
              </p>
            </div>
          </div>

          <a
            href="https://www.ethicalads.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <span>Learn More</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </a>
        </div>

        {/* EthicalAds script placeholder slot */}
        <div
          className="horizontal adaptive"
          data-ea-publisher="cronconverter-dev"
          data-ea-type="image"
          style={{ display: 'none' }}
        />
      </div>
    </aside>
  );
};
