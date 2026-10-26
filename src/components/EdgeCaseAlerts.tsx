'use client';

import React from 'react';
import { EdgeCaseWarning } from '../types/cron';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface EdgeCaseAlertsProps {
  warnings: EdgeCaseWarning[];
}

export const EdgeCaseAlerts: React.FC<EdgeCaseAlertsProps> = ({ warnings }) => {
  if (!warnings || warnings.length === 0) return null;

  return (
    <div className="space-y-2.5">
      {warnings.map((warn, i) => {
        const isCritical = warn.severity === 'critical';
        const isWarning = warn.severity === 'warning';

        return (
          <div
            key={i}
            className={`rounded-xl border p-3.5 transition-all ${
              isCritical
                ? 'border-rose-200 dark:border-rose-500/40 bg-rose-50/80 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200'
                : isWarning
                ? 'border-amber-200 dark:border-amber-500/40 bg-amber-50/80 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200'
                : 'border-blue-200 dark:border-blue-500/40 bg-blue-50/80 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                {isCritical ? (
                  <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                ) : isWarning ? (
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                ) : (
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{warn.title}</span>
                  <span
                    className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      isCritical
                        ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400'
                        : isWarning
                        ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
                        : 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400'
                    }`}
                  >
                    {warn.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{warn.message}</p>
                {warn.recommendation && (
                  <div className="mt-1.5 text-xs font-medium text-slate-800 dark:text-slate-200 bg-white/70 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-blue-600 dark:text-emerald-400 font-bold mr-1">&gt; Recommendation:</span>
                    {warn.recommendation}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
