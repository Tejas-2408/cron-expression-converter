'use client';

import React from 'react';
import { EdgeCaseWarning } from '../types/cron';
import { AlertTriangle, AlertCircle, Info, ShieldAlert } from 'lucide-react';

interface EdgeCaseAlertsProps {
  warnings: EdgeCaseWarning[];
}

export const EdgeCaseAlerts: React.FC<EdgeCaseAlertsProps> = ({ warnings }) => {
  if (!warnings || warnings.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-amber-400" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
          Senior Engineer Edge-Case Guardrails ({warnings.length})
        </h3>
      </div>

      <div className="space-y-2.5">
        {warnings.map((warn, i) => {
          const isCritical = warn.severity === 'critical';
          const isWarning = warn.severity === 'warning';

          return (
            <div
              key={i}
              className={`rounded-xl border p-3.5 transition-all ${
                isCritical
                  ? 'border-rose-500/40 bg-rose-950/20 text-rose-200'
                  : isWarning
                  ? 'border-amber-500/40 bg-amber-950/20 text-amber-200'
                  : 'border-blue-500/40 bg-blue-950/20 text-blue-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  {isCritical ? (
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                  ) : isWarning ? (
                    <AlertCircle className="h-5 w-5 text-amber-400" />
                  ) : (
                    <Info className="h-5 w-5 text-blue-400" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-100">{warn.title}</span>
                    <span
                      className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        isCritical
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : isWarning
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {warn.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{warn.message}</p>
                  {warn.recommendation && (
                    <div className="mt-2 text-xs font-medium text-slate-200 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                      <span className="text-emerald-400 font-bold mr-1">&gt; Senior Recommendation:</span>
                      {warn.recommendation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
