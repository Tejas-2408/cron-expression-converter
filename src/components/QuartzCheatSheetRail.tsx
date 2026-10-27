'use client';

import React from 'react';
import { HelpCircle, ShieldAlert, Cpu } from 'lucide-react';

export const QuartzCheatSheetRail: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Quartz Special Symbols Legend */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 shadow-xs">
        <div className="flex items-center gap-1.5 pb-2.5 border-b border-slate-100 dark:border-slate-800">
          <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Quartz Special Characters
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 my-2">
          Quartz supports extended calendar keywords:
        </p>

        <div className="space-y-2 text-xs">
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <code className="font-mono font-bold text-blue-600 dark:text-blue-400 text-xs bg-blue-50 dark:bg-blue-500/10 px-1.5 py-0.5 rounded">
                ?
              </code>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">No specific value</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
              Required in either Day of Month or Day of Week to avoid conflict.
            </p>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <code className="font-mono font-bold text-blue-600 dark:text-blue-400 text-xs bg-blue-50 dark:bg-blue-500/10 px-1.5 py-0.5 rounded">
                L
              </code>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">Last day</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
              <code>L</code> in DOM means last day of month. <code>6L</code> means last Friday.
            </p>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <code className="font-mono font-bold text-blue-600 dark:text-blue-400 text-xs bg-blue-50 dark:bg-blue-500/10 px-1.5 py-0.5 rounded">
                W
              </code>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">Nearest Weekday</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
              <code>15W</code> executes on the nearest Mon-Fri to the 15th of the month.
            </p>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <code className="font-mono font-bold text-blue-600 dark:text-blue-400 text-xs bg-blue-50 dark:bg-blue-500/10 px-1.5 py-0.5 rounded">
                #
              </code>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">Nth Day of Month</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
              <code>6#3</code> executes on the 3rd Friday (6=Fri) of each month.
            </p>
          </div>
        </div>
      </div>

      {/* Senior Dev Best Practice Tips */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 shadow-xs">
        <div className="flex items-center gap-1.5 pb-2.5 border-b border-slate-100 dark:border-slate-800">
          <Cpu className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Engine Rules
          </h3>
        </div>
        <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-2 mt-2">
          <li className="flex items-start gap-1.5">
            <span className="text-blue-600 dark:text-blue-400 font-bold">&bull;</span>
            <span><strong>Quartz Field Order:</strong> Seconds, Minutes, Hours, Day of Month, Month, Day of Week, [Year].</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-blue-600 dark:text-blue-400 font-bold">&bull;</span>
            <span><strong>Day of Week Index:</strong> 1 = Sunday through 7 = Saturday (different from UNIX 0 = Sun).</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
