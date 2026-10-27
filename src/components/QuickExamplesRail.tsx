'use client';

import React from 'react';
import { CronDialect } from '../types/cron';
import { Sparkles, Terminal, BookOpen, Clock } from 'lucide-react';

interface QuickExamplesRailProps {
  onSelectExpr: (expr: string, dialect: CronDialect) => void;
}

export const QuickExamplesRail: React.FC<QuickExamplesRailProps> = ({ onSelectExpr }) => {
  const commonQuartz = [
    { label: 'Every 5 seconds', expr: '*/5 * * * * ?', dialect: 'quartz' as CronDialect },
    { label: 'Every 15 minutes', expr: '0 */15 * * * ?', dialect: 'quartz' as CronDialect },
    { label: 'Every hour at :00', expr: '0 0 * * * ?', dialect: 'quartz' as CronDialect },
    { label: 'Last Friday of month', expr: '0 0 22 ? * 6L', dialect: 'quartz' as CronDialect },
    { label: 'Every weekday 9 AM', expr: '0 0 9 ? * 2-6', dialect: 'quartz' as CronDialect },
    { label: 'Midnight 1st of month', expr: '0 0 0 1 * ?', dialect: 'quartz' as CronDialect },
  ];

  const cloudExamples = [
    { label: 'AWS: Weekdays 6PM', expr: '0 18 ? * MON-FRI *', dialect: 'aws' as CronDialect },
    { label: 'Jenkins: Hash 15m', expr: 'H/15 * * * *', dialect: 'jenkins' as CronDialect },
    { label: 'UNIX: Twice daily', expr: '0 9,18 * * *', dialect: 'unix' as CronDialect },
    { label: 'K8s: Midnight cleanup', expr: '0 0 * * *', dialect: 'kubernetes' as CronDialect },
  ];

  return (
    <div className="space-y-4">
      {/* Quartz Favorites Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 shadow-xs">
        <div className="flex items-center gap-1.5 pb-2.5 border-b border-slate-100 dark:border-slate-800">
          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Popular Quartz Jobs
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 my-2">
          Click any 6/7-part Quartz pattern to load &amp; inspect:
        </p>
        <div className="space-y-1.5">
          {commonQuartz.map((item) => (
            <button
              key={item.label}
              onClick={() => onSelectExpr(item.expr, item.dialect)}
              className="w-full text-left p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-300 dark:hover:border-blue-500/40 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {item.label}
                </span>
                <span className="text-[10px] font-mono text-slate-400">Quartz</span>
              </div>
              <code className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 block mt-0.5">
                {item.expr}
              </code>
            </button>
          ))}
        </div>
      </div>

      {/* Cloud & Enterprise Shortcuts */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 shadow-xs">
        <div className="flex items-center gap-1.5 pb-2.5 border-b border-slate-100 dark:border-slate-800">
          <Terminal className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Cloud Schedulers
          </h3>
        </div>
        <div className="space-y-1.5 mt-2">
          {cloudExamples.map((item) => (
            <button
              key={item.label}
              onClick={() => onSelectExpr(item.expr, item.dialect)}
              className="w-full text-left p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-300 dark:hover:border-emerald-500/40 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {item.label}
                </span>
                <span className="text-[10px] font-mono uppercase text-slate-400">{item.dialect}</span>
              </div>
              <code className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 block mt-0.5">
                {item.expr}
              </code>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
