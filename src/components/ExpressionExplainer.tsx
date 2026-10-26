'use client';

import React, { useState } from 'react';
import { FieldDefinition } from '../types/cron';

interface ExpressionExplainerProps {
  fields: FieldDefinition[];
  activeFieldIdx: number | null;
  onFieldHover: (idx: number | null) => void;
  onFieldValueChange?: (idx: number, newVal: string) => void;
}

export const ExpressionExplainer: React.FC<ExpressionExplainerProps> = ({
  fields,
  activeFieldIdx,
  onFieldHover,
  onFieldValueChange,
}) => {
  if (!fields || fields.length === 0) return null;

  return (
    <div className="w-full">
      {/* Visual Alignment Columns */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 py-2">
        {fields.map((field, idx) => {
          const isSelected = activeFieldIdx === idx;
          return (
            <div
              key={field.name + idx}
              onMouseEnter={() => onFieldHover(idx)}
              onMouseLeave={() => onFieldHover(null)}
              onClick={() => onFieldHover(isSelected ? null : idx)}
              className="flex flex-col items-center cursor-pointer group select-none min-w-[70px] sm:min-w-[85px]"
            >
              {/* Field Value Box */}
              <div
                className={`w-full py-2.5 px-2 rounded-xl text-center font-mono text-xl sm:text-2xl font-bold transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105 ring-2 ring-blue-400'
                    : 'bg-slate-900/80 text-blue-400 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                }`}
              >
                {field.currentValue || '*'}
              </div>

              {/* Connecting indicator line */}
              <div className={`h-2.5 w-0.5 transition-colors ${isSelected ? 'bg-blue-400' : 'bg-slate-800 group-hover:bg-slate-700'}`} />

              {/* Label */}
              <span
                className={`text-xs font-medium tracking-wide uppercase transition-colors text-center ${
                  isSelected ? 'text-blue-400 font-bold' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                {field.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dynamic Detail Card under selected field */}
      {activeFieldIdx !== null && fields[activeFieldIdx] && (
        <div className="mt-4 mx-auto max-w-xl rounded-xl border border-blue-500/30 bg-blue-950/20 p-3.5 text-xs text-blue-200 shadow-sm backdrop-blur transition-all flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="space-y-0.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-semibold text-white">
                Position #{fields[activeFieldIdx].position}: {fields[activeFieldIdx].name}
              </span>
              <span className="bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded text-[10px] font-mono border border-blue-500/30">
                Range: {fields[activeFieldIdx].allowedValues}
              </span>
            </div>
            <p className="text-slate-300 text-[11px]">{fields[activeFieldIdx].description}</p>
          </div>
          <div className="text-[11px] font-mono text-slate-400 shrink-0">
            Special: <span className="text-blue-300 font-semibold">{fields[activeFieldIdx].specialChars}</span>
          </div>
        </div>
      )}
    </div>
  );
};
