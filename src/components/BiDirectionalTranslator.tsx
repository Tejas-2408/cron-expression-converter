'use client';

import React, { useState } from 'react';
import { CronDialect } from '../types/cron';
import { naturalLanguageToCron } from '../lib/naturalLanguage';
import { Sparkles, ArrowRight } from 'lucide-react';

interface BiDirectionalTranslatorProps {
  currentDialect: CronDialect;
  onApplyExpression: (expr: string) => void;
}

export const BiDirectionalTranslator: React.FC<BiDirectionalTranslatorProps> = ({
  currentDialect,
  onApplyExpression,
}) => {
  const [nlQuery, setNlQuery] = useState<string>('');
  const [generatedResult, setGeneratedResult] = useState<ReturnType<typeof naturalLanguageToCron> | null>(null);

  const handleConvert = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!nlQuery.trim()) return;
    const res = naturalLanguageToCron(nlQuery, currentDialect);
    setGeneratedResult(res);
  };

  const handleSelectExample = (text: string) => {
    setNlQuery(text);
    const res = naturalLanguageToCron(text, currentDialect);
    setGeneratedResult(res);
  };

  return (
    <div className="w-full space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Bi-Directional Generator: Plain English &rarr; Cron</span>
        </span>
        <span className="text-[11px] font-mono text-slate-500">
          Dialect: <strong className="text-blue-600 dark:text-blue-400 uppercase">{currentDialect}</strong>
        </span>
      </div>

      <form onSubmit={handleConvert} className="flex gap-2">
        <input
          type="text"
          value={nlQuery}
          onChange={(e) => setNlQuery(e.target.value)}
          placeholder="Type plain English e.g. 'every alternate Tuesday at 4:30 PM', 'every 15 minutes'..."
          className="flex-1 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/90 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs transition"
        />
        <button
          type="submit"
          className="rounded-xl bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors shrink-0"
        >
          Convert
        </button>
      </form>

      {/* Suggested Quick Prompts */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-slate-500 text-[11px]">Examples:</span>
        {[
          'every alternate Tuesday at 4:30 PM',
          'every 15 minutes',
          'every weekday at 9:00 AM',
          'first of every month',
          'every 2 hours',
        ].map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => handleSelectExample(example)}
            className="rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 px-2.5 py-1 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-[11px] font-medium transition"
          >
            {example}
          </button>
        ))}
      </div>

      {generatedResult && (
        <div className="rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/80 dark:bg-blue-950/20 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Generated Expression:</span>
              <code className="font-mono font-bold text-base text-blue-700 dark:text-blue-300 bg-white dark:bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-500/20">
                {generatedResult.expression}
              </code>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-[11px]">{generatedResult.explanation}</p>
          </div>

          <button
            type="button"
            onClick={() => onApplyExpression(generatedResult.expression)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 px-4 py-2 text-xs font-bold text-white transition shrink-0 shadow-xs"
          >
            <span>Apply to Converter</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
