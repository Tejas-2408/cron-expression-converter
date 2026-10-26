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
  Code2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Server,
  Layers,
  HelpCircle,
  Terminal,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const [dialect, setDialect] = useState<CronDialect>('unix');
  const [expression, setExpression] = useState<string>('*/15 * * * *');
  const [activeFieldIdx, setActiveFieldIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Memoized analysis
  const analysis = useMemo(() => {
    return analyzeCronExpression(expression, dialect);
  }, [expression, dialect]);

  const handleDialectChange = (newDialect: CronDialect) => {
    setDialect(newDialect);
    // Set a sensible default expression for that dialect
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
    <div className="relative min-h-screen bg-slate-950 bg-grid-pattern text-slate-100 flex flex-col justify-between">
      {/* Background ambient glow */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-b from-indigo-500/15 via-blue-500/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Navigation / Header */}
        <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-500/20">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  CronDialect <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">v2.4 Prod</span>
                </h1>
                <p className="text-xs text-slate-400">Multi-engine scheduler parser built by senior backend engineers</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">Engine: Zero Cold-Start Edge Ready</span>
            </div>
          </div>
        </header>

        {/* Developer Ad Slot (Single Unit, high-relevance, non-intrusive) */}
        <DeveloperAdSlot network="ethicalads" />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
          {/* Hero & Dialect Selector */}
          <section className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Universal Cron Expression Engine
                </h2>
                <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                  Inspect, translate, and bulletproof schedule triggers across AWS CloudWatch, Quartz, Jenkins Hashed syntax, POSIX UNIX, and Kubernetes workloads.
                </p>
              </div>

              {/* Dialect Tabs */}
              <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-center">
                {(Object.keys(DIALECTS) as CronDialect[]).map((dKey) => {
                  const dObj = DIALECTS[dKey];
                  const isActive = dialect === dKey;
                  return (
                    <button
                      key={dKey}
                      onClick={() => handleDialectChange(dKey)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      {dObj.name.split(' / ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dialect Info Banner */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 flex items-start gap-3 text-xs text-slate-300">
              <Layers className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">{DIALECTS[dialect].name}: </span>
                {DIALECTS[dialect].description}
              </div>
            </div>
          </section>

          {/* Interactive Input Section */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 shadow-xl backdrop-blur space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="cron-input" className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-emerald-400" />
                  <span>Cron Expression ({dialect.toUpperCase()})</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md transition-colors"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => handleDialectChange(dialect)}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md transition-colors"
                    title="Reset to default for dialect"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Expression Main Input Field */}
              <div className="relative">
                <input
                  id="cron-input"
                  type="text"
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  placeholder="e.g. */15 * * * *"
                  className={`w-full rounded-xl border font-mono text-lg sm:text-2xl px-4 py-3.5 text-slate-100 bg-slate-950/80 transition focus:outline-none focus:ring-2 ${
                    analysis.isValid
                      ? 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                      : 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                  }`}
                />
              </div>

              {/* Realtime Human-Readable Meaning */}
              {analysis.isValid ? (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 flex items-start gap-3">
                  <Zap className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      Evaluated Schedule Output:
                    </span>
                    <p className="text-base sm:text-lg font-medium text-slate-100 mt-0.5">
                      &ldquo;{analysis.humanDescription}&rdquo;
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-3.5 text-xs text-rose-300">
                  {analysis.error}
                </div>
              )}
            </div>

            {/* Quick Presets for current dialect */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Verified {DIALECTS[dialect].name.split(' / ')[0]} Presets:</span>
                {DIALECTS[dialect].exampleExpressions.map((example) => (
                  <button
                    key={example.expr}
                    onClick={() => handleApplyPreset(example.expr)}
                    className="rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-slate-300 font-mono border border-slate-700/60 transition-colors"
                  >
                    {example.label} ({example.expr})
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Asterisk Blueprint */}
            <ExpressionExplainer
              fields={analysis.fields}
              activeFieldIdx={activeFieldIdx}
              onFieldHover={setActiveFieldIdx}
            />
          </section>

          {/* Edge Case Warning Panel */}
          {analysis.warnings.length > 0 && (
            <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur">
              <EdgeCaseAlerts warnings={analysis.warnings} />
            </section>
          )}

          {/* Bi-Directional Plain English Translation */}
          <section>
            <BiDirectionalTranslator
              currentDialect={dialect}
              onApplyExpression={handleApplyPreset}
            />
          </section>

          {/* Visual Run Timetable (Next 5-10 Runs) */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 backdrop-blur">
            <VisualTimetable runs={analysis.nextRuns} />
          </section>

          {/* Dialect Reference Guide & Cheatsheet for SEO */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Code2 className="h-5 w-5 text-indigo-400" />
              <span>Production Schedule Architecture Notes</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/50 space-y-1.5">
                <h4 className="font-semibold text-slate-100">AWS EventBridge Rules</h4>
                <p className="text-slate-400">
                  Must supply 6 fields: <code>cron(Min Hour DOM Month DOW Year)</code>. Exactly one wildcard between DOM and DOW must be <code>?</code> to resolve ambiguity.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/50 space-y-1.5">
                <h4 className="font-semibold text-slate-100">Jenkins Hashed Triggers</h4>
                <p className="text-slate-400">
                  Using <code>H/15 * * * *</code> guarantees executions every 15 minutes while offsetting the start minute according to the job name hash, avoiding peak server saturation.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/50 space-y-1.5">
                <h4 className="font-semibold text-slate-100">Quartz Scheduler</h4>
                <p className="text-slate-400">
                  Supports seconds at position 1 and advanced calendar tags like <code>L</code> (Last day) and <code>W</code> (Nearest weekday).
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/90 py-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-medium text-slate-400">CronDialect - Production-Grade Schedule Trigger Utility</p>
              <p className="mt-0.5">Designed with strict security headers, zero-tracking ethical monetization, and instant client-side execution.</p>
            </div>
            <div className="flex items-center space-x-4">
              <span>Next.js 14 / TypeScript</span>
              <span>&bull;</span>
              <span>Tailwind CSS</span>
              <span>&bull;</span>
              <span>Vercel Deployable</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
