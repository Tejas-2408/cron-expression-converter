'use client';

import React, { useState } from 'react';
import { TriggerRun } from '../types/cron';
import { Calendar, Clock } from 'lucide-react';

interface VisualTimetableProps {
  runs: TriggerRun[];
}

export const VisualTimetable: React.FC<VisualTimetableProps> = ({ runs }) => {
  const [viewTz, setViewTz] = useState<'local' | 'utc'>('local');

  if (!runs || runs.length === 0) return null;

  // Exactly 5 trigger times
  const top5Runs = runs.slice(0, 5);

  return (
    <div className="w-full space-y-3">
      {/* Header with Timezone Toggle */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Next Scheduled Executions (Next 5 Runs)</span>
        </span>

        {/* Clean Timezone Switcher */}
        <div className="flex items-center rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-0.5 text-xs">
          <button
            onClick={() => setViewTz('local')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
              viewTz === 'local'
                ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            User Local Time
          </button>
          <button
            onClick={() => setViewTz('utc')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
              viewTz === 'utc'
                ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            UTC
          </button>
        </div>
      </div>

      {/* Vertical List Format with Easy-to-Read, Clean Sans-Serif / Monospace Font */}
      <ol className="divide-y divide-slate-100 dark:divide-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 overflow-hidden shadow-xs">
        {top5Runs.map((run, idx) => (
          <li
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition gap-1.5 sm:gap-4"
          >
            {/* Step number and complete date/time */}
            <div className="flex items-center space-x-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                {idx + 1}
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 font-mono tracking-tight">
                {viewTz === 'local' ? run.localString : run.utcString}
              </span>
            </div>

            {/* Relative time countdown badge */}
            <div className="flex items-center self-start sm:self-center ml-8 sm:ml-0">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-100 dark:border-blue-500/20">
                <Clock className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                <span>{run.relativeTime}</span>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
