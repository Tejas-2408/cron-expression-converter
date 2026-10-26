'use client';

import React, { useState } from 'react';
import { CronDialect } from '../types/cron';
import { naturalLanguageToCron } from '../lib/naturalLanguage';
import { Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';

interface BiDirectionalTranslatorProps {
  currentDialect: CronDialect;
  onApplyExpression: (expr: string) => void;
}

export const BiDirectionalTranslator: React.FC<BiDirectionalTranslatorProps> = ({
  currentDialect,
  onApplyExpression,
}) => {
  const [nlQuery, setNlQuery] = useState<string>('every alternate Tuesday at 4:30 PM');
  const [generatedResult, setGeneratedResult] = useState<ReturnType<typeof naturalLanguageToCron> | null>(() => {
    return naturalLanguageToCron('every alternate Tuesday at 4:30 PM', currentDialect);
  });

  const handleConvert = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!nlQuery.trim()) return;
    const res = naturalLanguageToCron(nlQuery, currentDialect);
    setGeneratedResult(res);
  };

  const handleQuickPreset = (preset: string) => {
    setNlQuery(preset);
    const res = naturalLanguageToCron(preset, currentDialect);
    setGeneratedResult(res);
  };

  return (
    <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/10 p-5 backdrop-blur space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-200">
            Bi-Directional Translation: Plain English &rarr; Cron
          </h3>
        </div>
        <span className="text-xs text-indigo-400/80 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-mono">
          Target Dialect: {currentDialect.toUpperCase()}
        </span>
      </div>

      <form onSubmit={handleConvert} className="relative flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={nlQuery}
          onChange={(e) => setNlQuery(e.target.value)}
          placeholder="e.g. every alternate Tuesday at 4:30 PM, every 15 minutes, 1st of every month..."
          className="flex-1 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-colors"
        >
          <span>Generate Cron</span>
          <CornerDownLeft className="h-4 w-4" />
        </button>
      </form>

      {/* Suggested Quick Natural Language Examples */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400">Quick Prompts:</span>
        {[
          'every alternate Tuesday at 4:30 PM',
          'every 15 minutes',
          'every weekday at 9:00 AM',
          'last day of every month',
          'every 2 hours',
        ].map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => handleQuickPreset(example)}
            className="rounded-lg bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 text-slate-300 border border-slate-700/60 transition-colors"
          >
            {example}
          </button>
        ))}
      </div>

      {generatedResult && (
        <div className="rounded-xl border border-indigo-500/30 bg-slate-900/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono font-bold text-slate-400">Generated:</span>
              <code className="text-lg font-mono font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                {generatedResult.expression}
              </code>
            </div>
            <p className="text-xs text-slate-300">{generatedResult.explanation}</p>
          </div>

          <button
            type="button"
            onClick={() => onApplyExpression(generatedResult.expression)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow transition-colors"
          >
            <span>Apply to Visualizer</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
