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
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-blue-400" />
          <span>Next Scheduled Executions</span>
        </span>

        {/* Minimal timezone toggle */}
        <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs">
          <button
            onClick={() => setViewTz('local')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
              viewTz === 'local' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Local Time
          </button>
          <button
            onClick={() => setViewTz('utc')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
              viewTz === 'utc' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
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
            className="flex items-center justify-between rounded-lg bg-slate-900/40 border border-slate-800/80 px-3 py-2 text-slate-300 transition hover:border-slate-700 hover:bg-slate-900/80"
          >
            <div className="flex items-center space-x-2 truncate">
              <span className="font-mono text-[10px] text-slate-500 w-3">#{idx + 1}</span>
              <span className="font-mono text-slate-200 truncate">
                {viewTz === 'local' ? run.localString : run.utcString}
              </span>
            </div>
            <span className="shrink-0 text-[11px] font-mono text-blue-400 ml-2 bg-blue-500/10 px-1.5 py-0.5 rounded">
              {run.relativeTime}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
