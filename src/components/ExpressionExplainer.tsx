'use client';

import React from 'react';
import { FieldDefinition } from '../types/cron';

interface ExpressionExplainerProps {
  fields: FieldDefinition[];
  activeFieldIdx: number | null;
  onFieldHover: (idx: number | null) => void;
  onSelectField?: (idx: number) => void;
}

export const ExpressionExplainer: React.FC<ExpressionExplainerProps> = ({
  fields,
  activeFieldIdx,
  onFieldHover,
  onSelectField,
}) => {
  if (!fields || fields.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {/* Position Columns - Strictly strictly in a single horizontal row on all viewports */}
      <div className="w-full overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        <div className="flex flex-nowrap items-center justify-between gap-1.5 sm:gap-2.5 min-w-[560px] md:min-w-0">
          {fields.map((field, idx) => {
            const isSelected = activeFieldIdx === idx;
            return (
              <button
                type="button"
                key={field.name + idx}
                onMouseEnter={() => onFieldHover(idx)}
                onMouseLeave={() => onFieldHover(null)}
                onClick={() => onSelectField ? onSelectField(idx) : onFieldHover(isSelected ? null : idx)}
                className="flex-1 flex flex-col items-center group cursor-pointer select-none min-w-[68px] sm:min-w-[76px] transition focus:outline-none"
              >
                {/* Field Token Box */}
                <div
                  className={`w-full py-2 px-1 rounded-xl text-center font-mono text-lg sm:text-xl font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-102 ring-2 ring-blue-500 dark:ring-blue-400'
                      : 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-700 shadow-xs'
                  }`}
                >
                  {field.currentValue || '*'}
                </div>

                {/* Connecting vertical tick */}
                <div
                  className={`h-2 w-0.5 transition-colors ${
                    isSelected ? 'bg-blue-500 dark:bg-blue-400' : 'bg-slate-300 dark:bg-slate-800 group-hover:bg-blue-400'
                  }`}
                />

                {/* Field Name in a single line */}
                <span
                  className={`text-[11px] font-semibold tracking-tight uppercase whitespace-nowrap transition-colors text-center ${
                    isSelected
                      ? 'text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                  }`}
                >
                  {field.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Field Meaning Breakdown Details */}
      <div className="mx-auto w-full">
        {activeFieldIdx !== null && fields[activeFieldIdx] ? (
          <div className="rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/80 dark:bg-blue-950/20 p-3 text-xs text-blue-900 dark:text-blue-200 shadow-xs transition-all flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="space-y-0.5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-bold text-slate-900 dark:text-white text-xs">
                  Position #{fields[activeFieldIdx].position}: {fields[activeFieldIdx].name}
                </span>
                <span className="bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold border border-blue-200 dark:border-blue-500/30">
                  Allowed: {fields[activeFieldIdx].allowedValues}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-normal">
                {fields[activeFieldIdx].description}
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0 bg-white dark:bg-slate-900 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-800">
              Special: <span className="text-blue-600 dark:text-blue-300 font-bold">{fields[activeFieldIdx].specialChars}</span>
            </div>
          </div>
        ) : (
          <div className="text-center text-[11px] text-slate-400 dark:text-slate-500 py-0.5">
            Hover or click any position above to inspect its allowed syntax rules &amp; valid characters
          </div>
        )}
      </div>
    </div>
  );
};
