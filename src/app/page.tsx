'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
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
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers,
  ChevronDown
} from 'lucide-react';

export default function HomePage() {
  // Set Quartz as default dialect and default Quartz expression
  const [dialect, setDialect] = useState<CronDialect>('quartz');
  const [expression, setExpression] = useState<string>('0 */15 * * * ?');
  const [activeFieldIdx, setActiveFieldIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showCheatsheet, setShowCheatsheet] = useState<boolean>(true);

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
      <Header onCheatsheetClick={scrollToCheatsheet} />

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

            {/* Dialect Switcher Tabs strictly in a single horizontal line */}
            <div className="w-full overflow-x-auto pb-1 scrollbar-none">
              <div className="inline-flex items-center justify-center gap-1 p-1 rounded-xl bg-slate-200/80 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-800 text-xs shadow-xs whitespace-nowrap">
                {(Object.keys(DIALECTS) as CronDialect[]).map((dKey) => {
                  const dObj = DIALECTS[dKey];
                  const isActive = dialect === dKey;
                  return (
                    <button
                      key={dKey}
                      onClick={() => handleDialectChange(dKey)}
                      className={`px-3 sm:px-3.5 py-1.5 rounded-lg font-bold transition-all shrink-0 ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {dObj.name.split(' / ')[0]}
                    </button>
                  );
                })}
              </div>
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

            {/* Asterisk Field Positions Breakdown & Explanation (Single line row) */}
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

          {/* Next Execution Projection Timetable (Clean List of 5 runs) */}
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
                {showCheatsheet ? 'Collapse Cheatsheet' : 'Expand Cheatsheet'}
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
                    <Link href="/guides/quartz-cron-tutorial" className="text-blue-600 dark:text-blue-400 text-[11px] font-semibold hover:underline block pt-1">
                      Read full Quartz guide &rarr;
                    </Link>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1.5 shadow-xs">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">AWS EventBridge / CloudWatch</span>
                    <p className="text-[11px] leading-relaxed">
                      Mandatory 6 fields: <code>Minutes Hours DOM Month DOW Year</code>. Exactly one wildcard between DOM and DOW must strictly be <code>?</code>.
                    </p>
                    <Link href="/guides/aws-eventbridge-cron-guide" className="text-blue-600 dark:text-blue-400 text-[11px] font-semibold hover:underline block pt-1">
                      Read AWS CloudWatch guide &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </section>

          {/* Substantial Publisher Content & Educational Section (Crucial for AdSense) */}
          <section className="w-full space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-left">
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                How Cron Scheduling Works Across Cloud Platforms
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Cron expressions are compact string definitions that encode automated schedule triggers. While originally created for Unix workstations, modern cloud architectures rely on multiple distinct dialect specifications:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1.5">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">POSIX Standard UNIX Cron</h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Used in Linux, macOS, and Docker containers. Contains 5 fields: <code>Minute Hour DOM Month DOW</code>. It executes with an <em>OR</em> relationship when both day-of-month and day-of-week are specified.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1.5">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Quartz Java Scheduler</h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Default format in Spring Boot and Java services. Evaluates seconds at position 1 and requires the <code>?</code> operator to resolve weekday vs calendar day ambiguities.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1.5">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">AWS EventBridge Rules</h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Mandates 6 fields including a required Year token. All schedules strictly evaluate in UTC, necessitating offset conversions for local business hours.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1.5">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Jenkins CI/CD Hashing</h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Introduces the <code>H</code> token (e.g. <code>H/15</code>) which computes a deterministic hash of the job name to prevent resource spikes across build executors.
                </p>
              </div>
            </div>

            {/* In-depth FAQ */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Frequently Asked Questions (FAQ)
              </h3>
              <div className="space-y-2 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">What does &quot;0 */15 * * * ?&quot; mean?</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    In Quartz, this triggers at second 0, every 15 minutes of every hour, every day. The <code>?</code> specifies &quot;no specific day of week&quot;.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">Why does my AWS cron rule fail to save?</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    AWS EventBridge throws an error if you use <code>*</code> in both Day-of-month and Day-of-week. One must be <code>?</code>. Also, make sure you include the 6th field (Year).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">How do I prevent cron jobs from running twice during Daylight Saving Time?</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Always set your server, container, or cloud schedule timezone to UTC. Since UTC does not observe Daylight Saving Time, your jobs will execute exactly once without skipping or repeating.
                  </p>
                </div>
              </div>
            </div>
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

      <Footer />
    </div>
  );
}
