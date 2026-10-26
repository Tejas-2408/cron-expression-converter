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
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>Convert Plain English to Cron</span>
        </span>
      </div>

      <form onSubmit={handleConvert} className="flex gap-2">
        <input
          type="text"
          value={nlQuery}
          onChange={(e) => setNlQuery(e.target.value)}
          placeholder="e.g. every alternate Tuesday at 4:30 PM, every 15 minutes, at 9:00 AM on weekdays..."
          className="flex-1 rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
        />
        <button
          type="submit"
          className="rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors"
        >
          Generate
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
        ].map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => handleSelectExample(example)}
            className="rounded-md bg-slate-900 hover:bg-slate-800 px-2 py-0.5 text-slate-400 hover:text-slate-200 border border-slate-800 text-[11px] transition"
          >
            {example}
          </button>
        ))}
      </div>

      {generatedResult && (
        <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Generated:</span>
              <code className="font-mono font-bold text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                {generatedResult.expression}
              </code>
            </div>
            <p className="text-slate-300 text-[11px]">{generatedResult.explanation}</p>
          </div>

          <button
            type="button"
            onClick={() => onApplyExpression(generatedResult.expression)}
            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 hover:bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white transition shrink-0"
          >
            <span>Apply</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
};
