'use client';

import React, { useState } from 'react';
import { TriggerRun } from '../types/cron';
import { Calendar, Clock, Globe } from 'lucide-react';

interface VisualTimetableProps {
  runs: TriggerRun[];
}

export const VisualTimetable: React.FC<VisualTimetableProps> = ({ runs }) => {
  const [viewTz, setViewTz] = useState<'local' | 'utc'>('local');

  if (!runs || runs.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Next Scheduled Executions (Projection)</span>
        </span>

        {/* Timezone Switcher */}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {runs.slice(0, 6).map((run, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 px-3.5 py-2.5 transition hover:border-blue-400 dark:hover:border-slate-700 shadow-xs"
          >
            <div className="flex items-center space-x-2.5 truncate">
              <span className="font-mono text-[11px] font-semibold text-slate-400 dark:text-slate-500 w-4">
                #{idx + 1}
              </span>
              <span className="font-mono text-slate-800 dark:text-slate-200 font-medium truncate">
                {viewTz === 'local' ? run.localString : run.utcString}
              </span>
            </div>
            <span className="shrink-0 text-[11px] font-mono font-semibold text-blue-700 dark:text-blue-400 ml-2 bg-blue-100 dark:bg-blue-500/10 px-2 py-0.5 rounded-md">
              {run.relativeTime}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
