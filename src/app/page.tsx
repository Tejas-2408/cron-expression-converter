'use client';

import React, { useState, useMemo } from 'react';
import { CronDialect } from '../types/cron';
import { DIALECTS } from '../lib/dialects';
import { analyzeCronExpression } from '../lib/cronParser';
import { ExpressionExplainer } from '../components/ExpressionExplainer';
import { EdgeCaseAlerts } from '../components/EdgeCaseAlerts';
import { VisualTimetable } from '../components/VisualTimetable';
import { BiDirectionalTranslator } from '../components/BiDirectionalTranslator';
import { DeveloperAdSlot } from '../components/DeveloperAdSlot';
import {
  Clock,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Code
} from 'lucide-react';

export default function HomePage() {
  const [dialect, setDialect] = useState<CronDialect>('unix');
  const [expression, setExpression] = useState<string>('*/15 * * * *');
  const [activeFieldIdx, setActiveFieldIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showCheatsheet, setShowCheatsheet] = useState<boolean>(false);

  // Memoized analysis
  const analysis = useMemo(() => {
    return analyzeCronExpression(expression, dialect);
  }, [expression, dialect]);

  const handleDialectChange = (newDialect: CronDialect) => {
    setDialect(newDialect);
    if (newDialect === 'quartz') setExpression('0 */15 * * * ?');
    else if (newDialect === 'aws') setExpression('0/15 * ? * * *');
    else if (newDialect === 'jenkins') setExpression('H/15 * * * *');
    else setExpression('*/15 * * * *');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyPreset = (expr: string) => {
    setExpression(expr);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                CronView
                <span className="text-[10px] uppercase font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.2 rounded">
                  Free
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowCheatsheet(!showCheatsheet)}
              className="text-xs text-slate-400 hover:text-slate-200 transition hidden sm:flex items-center gap-1"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Cheatsheet</span>
            </button>
            <a
              href="https://github.com/Tejas-2408/cron-expression-converter"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors shadow-sm"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Contribute</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Focus Area (Cronhub-like clean layout) */}
      <main className="max-w-3xl w-full mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col items-center space-y-8">
        
        {/* Header & Dialect Selector */}
        <div className="w-full text-center space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Cron Expression Evaluator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Interactive, human-readable cron schedule generator and dialect converter.
          </p>

          {/* Dialect Tabs */}
          <div className="inline-flex flex-wrap justify-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs mt-2">
            {(Object.keys(DIALECTS) as CronDialect[]).map((dKey) => {
              const dObj = DIALECTS[dKey];
              const isActive = dialect === dKey;
              return (
                <button
                  key={dKey}
                  onClick={() => handleDialectChange(dKey)}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {dObj.name.split(' / ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Clean Card (Cronhub style) */}
        <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 shadow-xl backdrop-blur space-y-6">
          
          {/* Real-time Human Translation Title */}
          <div className="text-center space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Human-Readable Schedule
            </span>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400 min-h-[2.5rem] flex items-center justify-center">
              {analysis.isValid ? (
                <span>&ldquo;{analysis.humanDescription}&rdquo;</span>
              ) : (
                <span className="text-rose-400 text-lg font-medium">{analysis.error}</span>
              )}
            </div>
          </div>

          {/* Big Clean Input Area */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="* * * * *"
              className={`w-full text-center font-mono text-2xl sm:text-4xl py-3 px-4 rounded-xl border bg-slate-950/80 tracking-widest text-white transition focus:outline-none focus:ring-2 ${
                analysis.isValid
                  ? 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/20'
                  : 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
              }`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                title="Copy expression"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
              <button
                onClick={() => handleDialectChange(dialect)}
                title="Reset"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Asterisk Field Positions Breakdown */}
          <ExpressionExplainer
            fields={analysis.fields}
            activeFieldIdx={activeFieldIdx}
            onFieldHover={setActiveFieldIdx}
          />

          {/* Clean Quick Presets */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 border-t border-slate-800/60 text-xs">
            <span className="text-slate-500 text-[11px] mr-1">Presets:</span>
            {DIALECTS[dialect].exampleExpressions.map((example) => (
              <button
                key={example.expr}
                onClick={() => handleApplyPreset(example.expr)}
                className="rounded-lg bg-slate-950 hover:bg-slate-800 px-2.5 py-1 text-slate-300 font-mono border border-slate-800 text-[11px] transition"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        {/* Edge-Case Warning Notice (if applicable) */}
        {analysis.warnings.length > 0 && (
          <div className="w-full">
            <EdgeCaseAlerts warnings={analysis.warnings} />
          </div>
        )}

        {/* Next Execution Visual Timetable */}
        <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/30 p-5 backdrop-blur">
          <VisualTimetable runs={analysis.nextRuns} />
        </div>

        {/* Plain English to Cron Translator */}
        <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/30 p-5 backdrop-blur">
          <BiDirectionalTranslator
            currentDialect={dialect}
            onApplyExpression={handleApplyPreset}
          />
        </div>

        {/* SEO Cheatsheet Section (Expandable or accessible for crawlers) */}
        <section aria-labelledby="seo-reference" className="w-full space-y-4 pt-4 border-t border-slate-900">
          <div className="flex items-center justify-between">
            <h2 id="seo-reference" className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Cron Job Syntax & Dialects Reference
            </h2>
            <button
              onClick={() => setShowCheatsheet(!showCheatsheet)}
              className="text-xs text-blue-400 hover:underline"
            >
              {showCheatsheet ? 'Collapse' : 'Expand Cheatsheet'}
            </button>
          </div>

          {showCheatsheet && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-400 pt-2">
              <div className="p-3 rounded-xl border border-slate-800/80 bg-slate-900/30 space-y-1">
                <span className="font-semibold text-slate-200">Standard UNIX Crontab</span>
                <p>5 fields: Minute, Hour, Day of Month, Month, Day of Week. Supports ranges (1-5) and steps (*/15).</p>
              </div>
              <div className="p-3 rounded-xl border border-slate-800/80 bg-slate-900/30 space-y-1">
                <span className="font-semibold text-slate-200">AWS CloudWatch / EventBridge</span>
                <p>6 fields: requires wildcard ? in either Day-of-month or Day-of-week to avoid ambiguity.</p>
              </div>
              <div className="p-3 rounded-xl border border-slate-800/80 bg-slate-900/30 space-y-1">
                <span className="font-semibold text-slate-200">Jenkins Hashed Cron</span>
                <p>Uses H/15 token to distribute execution starts deterministically across executor nodes.</p>
              </div>
            </div>
          )}
        </section>

        {/* Single Developer Ad Banner (Shifted to Bottom) */}
        <div className="w-full pt-4">
          <DeveloperAdSlot network="ethicalads" />
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>CronView &bull; Open-source cron evaluator & expression generator.</p>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Tejas-2408/cron-expression-converter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition"
            >
              GitHub Repository
            </a>
            <span>&bull;</span>
            <a href="https://cronview-six.vercel.app/sitemap.xml" className="hover:text-slate-300 transition">
              Sitemap
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
