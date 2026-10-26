'use client';

import React from 'react';
import { FieldDefinition } from '../types/cron';

interface ExpressionExplainerProps {
  fields: FieldDefinition[];
  activeFieldIdx: number | null;
  onFieldHover: (idx: number | null) => void;
}

export const ExpressionExplainer: React.FC<ExpressionExplainerProps> = ({
  fields,
  activeFieldIdx,
  onFieldHover,
}) => {
  if (!fields || fields.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
          Field Breakdown & Position Blueprint
        </h3>
        <span className="text-xs text-slate-400">
          Hover or click on any position to inspect allowed ranges & special characters
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2.5">
        {fields.map((field, idx) => {
          const isSelected = activeFieldIdx === idx;
          return (
            <div
              key={field.name + idx}
              onMouseEnter={() => onFieldHover(idx)}
              onMouseLeave={() => onFieldHover(null)}
              className={`relative flex flex-col justify-between rounded-xl p-3 border transition-all cursor-pointer ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-950/40 ring-1 ring-indigo-500 shadow-md shadow-indigo-500/10'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                    Pos #{field.position}
                  </span>
                  <span className="font-semibold text-slate-200">{field.name}</span>
                </div>

                <div className="my-2 text-center">
                  <span className="font-mono text-xl font-bold tracking-tight text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20 inline-block">
                    {field.currentValue || '*'}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                <div className="flex justify-between">
                  <span className="text-slate-500">Allowed:</span>
                  <span className="font-mono font-medium text-slate-300">{field.allowedValues}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Special:</span>
                  <span className="font-mono font-medium text-indigo-300">{field.specialChars}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeFieldIdx !== null && fields[activeFieldIdx] && (
        <div className="rounded-lg bg-indigo-950/20 border border-indigo-500/30 p-3 text-xs text-indigo-200 flex items-center justify-between">
          <div>
            <strong className="font-semibold text-indigo-300">
              Position #{fields[activeFieldIdx].position} ({fields[activeFieldIdx].name}):
            </strong>{' '}
            {fields[activeFieldIdx].description}
          </div>
          <div className="font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded">
            Value: {fields[activeFieldIdx].currentValue}
          </div>
        </div>
      )}
    </div>
  );
};
