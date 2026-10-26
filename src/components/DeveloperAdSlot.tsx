'use client';

import React, { useEffect, useState } from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface AdSlotProps {
  // 'carbon' | 'ethicalads' | 'placeholder'
  network?: 'ethicalads' | 'carbon' | 'placeholder';
}

export const DeveloperAdSlot: React.FC<AdSlotProps> = ({ network = 'ethicalads' }) => {
  const [adBlocked, setAdBlocked] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);

    // Subtle check if script blocker or ad blocker stopped network assets
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
      aria-label="Sponsored Developer Content"
      className="w-full max-w-4xl mx-auto my-6 px-4"
    >
      <div
        id="developer-ad-unit"
        className="relative overflow-hidden rounded-xl border border-slate-700/60 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 p-4 shadow-sm backdrop-blur transition-all duration-200 hover:border-emerald-500/40"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Dev Sponsor
                </span>
                <span className="text-xs text-slate-400">
                  Privacy-first &bull; Zero tracking
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-200">
                {adBlocked
                  ? 'Supporting open developer infrastructure.'
                  : 'Reliable Cloud Scheduling & Background Cron Automation'}
              </p>
              <p className="text-xs text-slate-400">
                Monitor jobs with automatic retry queues, dead-letter alerts, and latency graphs.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <a
              href="https://www.ethicalads.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30 transition-colors"
            >
              <span>Explore Provider</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* EthicalAds script placeholder slot */}
        <div
          className="horizontal adaptive"
          data-ea-publisher="cronconverter-dev"
          data-ea-type="image"
          style={{ display: 'none' }}
        />
      </div>
      <div className="text-center mt-1">
        <span className="text-[11px] text-slate-500 tracking-wide">
          One single ethical tech ad &bull; Never hinders interface responsiveness &bull; Bypasses intrusive tracking
        </span>
      </div>
    </aside>
  );
};
