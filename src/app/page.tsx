'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { CronDialect } from '../types/cron';
import { DIALECTS } from '../lib/dialects';
import { analyzeCronExpression } from '../lib/cronParser';
import { ExpressionExplainer } from '../components/ExpressionExplainer';
import { EdgeCaseAlerts } from '../components/EdgeCaseAlerts';
import { VisualTimetable } from '../components/VisualTimetable';
import { BiDirectionalTranslator } from '../components/BiDirectionalTranslator';
import { DeveloperAdSlot } from '../components/DeveloperAdSlot';
import { SideAdRail } from '../components/SideAdRail';
import { QuickExamplesRail } from '../components/QuickExamplesRail';
import { QuartzCheatSheetRail } from '../components/QuartzCheatSheetRail';
import {
  Clock,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Sun,
  Moon,
  ChevronDown,
  Layers,
  Calendar
} from 'lucide-react';

export default function HomePage() {
  // Set Quartz as default dialect and default Quartz expression
  const [dialect, setDialect] = useState<CronDialect>('quartz');
  const [expression, setExpression] = useState<string>('0 */15 * * * ?');
  const [activeFieldIdx, setActiveFieldIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showCheatsheet, setShowCheatsheet] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Initialize theme from localStorage or default to light
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const scrollToCheatsheet = () => {
    setShowCheatsheet(true);
    setTimeout(() => {
      document.getElementById('cheatsheet-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

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

  const handleApplyPreset = (expr: string, targetDialect?: CronDialect) => {
    if (targetDialect && targetDialect !== dialect) {
      setDialect(targetDialect);
    }
    setExpression(expr);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 bg-grid-pattern text-slate-800 dark:text-slate-100 flex flex-col justify-between transition-colors duration-200">
      {/* Top Header */}
      <header className="border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur sticky top-0 z-30 transition-colors">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                CronView
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            {/* Working Cheatsheet quick-scroll button */}
            <button
              onClick={scrollToCheatsheet}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Jump to Syntax Cheatsheet"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Cheatsheet</span>
            </button>

            {/* Dark / Light Theme Toggle (Light by default) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark/Light Mode"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition shadow-xs"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
            </button>

            {/* Contribute to GitHub button */}
            <a
              href="https://github.com/Tejas-2408/cron-expression-converter"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white px-3 py-1.5 text-xs font-bold transition shadow-xs"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Contribute</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main 3-Column Studio Grid Layout */}
      <div className="max-w-7xl w-full mx-auto px-4 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side Rail: Popular Presets + Sponsor Unit (3 cols on desktop) */}
        <aside className="hidden lg:flex lg:col-span-3 flex-col gap-5 sticky top-24">
          <QuickExamplesRail onSelectExpr={handleApplyPreset} />
          <SideAdRail side="left" />
        </aside>

        {/* Center Primary Canvas (6 cols on desktop) */}
        <main className="lg:col-span-6 w-full flex flex-col items-center space-y-6">
          
          {/* Header & Dialect Selector */}
          <div className="w-full text-center space-y-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Cron Expression Evaluator &amp; Parser
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Build, convert, and inspect cron job expressions across Quartz (Default), UNIX, AWS, Jenkins, and Kubernetes.
            </p>

            {/* Dialect Switcher Tabs with Quartz highlighted */}
            <div className="inline-flex flex-wrap justify-center gap-1.5 p-1 rounded-xl bg-slate-200/80 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-800 text-xs mt-2 shadow-xs">
              {(Object.keys(DIALECTS) as CronDialect[]).map((dKey) => {
                const dObj = DIALECTS[dKey];
                const isActive = dialect === dKey;
                return (
                  <button
                    key={dKey}
                    onClick={() => handleDialectChange(dKey)}
                    className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {dObj.name.split(' / ')[0]}
                    {dKey === 'quartz' && <span className="ml-1 text-[9px] font-normal uppercase opacity-80">(Default)</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Clean Card (Cronhub style) */}
          <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/50 p-6 sm:p-7 shadow-sm backdrop-blur space-y-6">
            
            {/* Real-time Human Translation Output */}
            <div className="text-center space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Evaluated Schedule Output
              </span>
              <div className="text-xl sm:text-2xl font-extrabold text-blue-600 dark:text-blue-400 min-h-[2.5rem] flex items-center justify-center">
                {analysis.isValid ? (
                  <span>&ldquo;{analysis.humanDescription}&rdquo;</span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 text-base font-semibold">{analysis.error}</span>
                )}
              </div>
            </div>

            {/* Big Clean Expression Input Area */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="0 */15 * * * ?"
                className={`w-full text-center font-mono text-xl sm:text-3xl py-3 px-4 rounded-xl border bg-slate-50 dark:bg-slate-950/80 tracking-widest text-slate-900 dark:text-white transition focus:outline-none focus:ring-2 ${
                  analysis.isValid
                    ? 'border-slate-300 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20'
                    : 'border-rose-400 dark:border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                }`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  title="Copy expression"
                  className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => handleDialectChange(dialect)}
                  title="Reset to dialect default"
                  className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Asterisk Field Positions Breakdown & Explanation */}
            <ExpressionExplainer
              fields={analysis.fields}
              activeFieldIdx={activeFieldIdx}
              onFieldHover={setActiveFieldIdx}
            />

            {/* Quick Presets for Current Dialect */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 border-t border-slate-200 dark:border-slate-800/60 text-xs">
              <span className="text-slate-500 text-[11px] mr-1">Presets:</span>
              {DIALECTS[dialect].exampleExpressions.map((example) => (
                <button
                  key={example.expr}
                  onClick={() => handleApplyPreset(example.expr)}
                  className="rounded-lg bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 px-2.5 py-1 text-slate-700 dark:text-slate-300 font-mono border border-slate-200 dark:border-slate-800 text-[11px] font-medium transition"
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>

          {/* Edge-Case Warning Notice (if any traps detected) */}
          {analysis.warnings.length > 0 && (
            <div className="w-full">
              <EdgeCaseAlerts warnings={analysis.warnings} />
            </div>
          )}

          {/* Next Execution Projection Timetable */}
          <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/30 p-5 backdrop-blur shadow-xs">
            <VisualTimetable runs={analysis.nextRuns} />
          </div>

          {/* Plain English &rarr; Cron Expression Generator */}
          <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/30 p-5 backdrop-blur shadow-xs">
            <BiDirectionalTranslator
              currentDialect={dialect}
              onApplyExpression={handleApplyPreset}
            />
          </div>

          {/* Cheatsheet section */}
          <section
            id="cheatsheet-section"
            aria-labelledby="seo-reference"
            className="w-full space-y-4 pt-6 border-t border-slate-200 dark:border-slate-900"
          >
            <div className="flex items-center justify-between">
              <h2 id="seo-reference" className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Cron Syntax Cheatsheet &amp; Dialect Reference</span>
              </h2>
              <button
                onClick={() => setShowCheatsheet(!showCheatsheet)}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {showCheatsheet ? 'Collapse' : 'Expand Cheatsheet'}
              </button>
            </div>

            {showCheatsheet ? (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1.5 shadow-xs">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">Quartz Scheduler (6–7 fields)</span>
                    <p className="text-[11px] leading-relaxed">
                      Format: <code>Sec Min Hour DOM Month DOW [Year]</code>. Special characters include <code>?</code> (unspecified), <code>L</code> (last), <code>W</code> (nearest weekday), and <code>#</code> (nth day of week).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1.5 shadow-xs">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">AWS EventBridge / CloudWatch</span>
                    <p className="text-[11px] leading-relaxed">
                      Mandatory 6 fields: <code>Minutes Hours DOM Month DOW Year</code>. Exactly one wildcard between DOM and DOW must strictly be <code>?</code>.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </section>

          {/* Bottom Ad Slot */}
          <div className="w-full pt-4">
            <DeveloperAdSlot />
          </div>
        </main>

        {/* Right Side Rail: Quartz Syntax Guide + Cloud Sponsor Unit (3 cols on desktop) */}
        <aside className="hidden lg:flex lg:col-span-3 flex-col gap-5 sticky top-24">
          <QuartzCheatSheetRail />
          <SideAdRail side="right" />
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 py-6 text-xs text-slate-500 text-center transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>CronView &bull; Open-source Quartz &amp; multi-dialect cron evaluator.</p>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Tejas-2408/cron-expression-converter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-800 dark:hover:text-slate-300 transition"
            >
              GitHub Repository
            </a>
            <span>&bull;</span>
            <a href="https://cronview-six.vercel.app/sitemap.xml" className="hover:text-slate-800 dark:hover:text-slate-300 transition">
              Sitemap
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
