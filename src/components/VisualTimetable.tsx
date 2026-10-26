'use client';

import React, { useState } from 'react';
import { TriggerRun } from '../types/cron';
import { Calendar, Clock, Globe, ArrowRight, SunMedium } from 'lucide-react';

interface VisualTimetableProps {
  runs: TriggerRun[];
}

export const VisualTimetable: React.FC<VisualTimetableProps> = ({ runs }) => {
  const [viewMode, setViewMode] = useState<'both' | 'local' | 'utc'>('both');

  if (!runs || runs.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-center text-slate-400 text-sm">
        No upcoming trigger runs found in the immediate calculation horizon. Check your expression syntax.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Next Trigger Timeline ({runs.length} Runs Projected)
          </h3>
        </div>

        {/* Timezone view toggles */}
        <div className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-slate-800 text-xs">
          <button
            onClick={() => setViewMode('both')}
            className={`px-3 py-1 rounded-md transition-colors ${
              viewMode === 'both' ? 'bg-slate-700 text-slate-100 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dual View (UTC + Local)
          </button>
          <button
            onClick={() => setViewMode('local')}
            className={`px-3 py-1 rounded-md transition-colors ${
              viewMode === 'local' ? 'bg-slate-700 text-slate-100 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            User Local Time
          </button>
          <button
            onClick={() => setViewMode('utc')}
            className={`px-3 py-1 rounded-md transition-colors ${
              viewMode === 'utc' ? 'bg-slate-700 text-slate-100 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            UTC Standard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {runs.map((run, idx) => {
          return (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 transition hover:border-slate-700 hover:bg-slate-900/90"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-slate-300">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-xs text-slate-200">
                    Execution Trigger
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <Clock className="h-3 w-3" />
                  <span>{run.relativeTime}</span>
                </div>
              </div>

              <div className="py-2.5 space-y-1.5 text-xs">
                {(viewMode === 'both' || viewMode === 'local') && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-indigo-400" /> Local:
                    </span>
                    <span className="font-mono text-slate-200 font-medium">{run.localString}</span>
                  </div>
                )}

                {(viewMode === 'both' || viewMode === 'utc') && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Globe className="h-3.5 w-3.5 text-emerald-400" /> UTC:
                    </span>
                    <span className="font-mono text-emerald-300 font-medium">{run.utcString}</span>
                  </div>
                )}
              </div>

              {run.daylightSavingsImpact && (
                <div className="mt-1 pt-1.5 border-t border-slate-800 flex items-center gap-1 text-[11px] text-amber-400">
                  <SunMedium className="h-3 w-3 shrink-0" />
                  <span>{run.daylightSavingsImpact}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
