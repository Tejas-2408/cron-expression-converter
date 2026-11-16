import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Cpu, ArrowLeft, CheckCircle2, AlertOctagon, Terminal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AWS EventBridge & CloudWatch Cron Expression Guide | CronView',
  description: 'Complete guide to configuring cron expressions in AWS EventBridge and CloudWatch. Master the mandatory ? rule, 6-field layout, and Lambda trigger patterns.',
  alternates: {
    canonical: 'https://cronview-six.vercel.app/guides/aws-eventbridge-cron-guide',
  },
};

export default function AwsEventBridgeCronGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Guides</span>
          </Link>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Cpu className="h-4 w-4" />
            <span>Cloud Architecture &bull; Amazon Web Services</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            AWS EventBridge &amp; CloudWatch Cron Expression Guide
          </h1>
          <p className="text-xs text-slate-500">
            Published by Senior Cloud Infrastructure Engineering Team &bull; 7 min read
          </p>
        </div>

        <article className="prose dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <p className="text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
            Amazon EventBridge (formerly CloudWatch Events) enables developers to trigger serverless AWS Lambda functions, ECS Fargate tasks, Step Functions state machines, and SNS/SQS messaging pipelines on automated schedules. However, AWS enforces unique syntax constraints that frequently surprise experienced Linux engineers.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              The AWS 6-Field Anatomy
            </h2>
            <p>
              In AWS EventBridge, cron expressions are wrapped in <code>cron(...)</code> and must contain exactly <strong>6 mandatory fields</strong>:
            </p>

            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
              <pre className="text-amber-400">{`cron(Minutes Hours Day-of-month Month Day-of-week Year)
       │       │         │        │         │      │
       │       │         │        │         │      └─── Year (1970 - 2199)
       │       │         │        │         └────────── Day-of-week (1-7 or SUN-SAT)
       │       │         │        └──────────────────── Month (1-12 or JAN-DEC)
       │       │         └───────────────────────────── Day-of-month (1-31, ?, L, W)
       │       └─────────────────────────────────────── Hours (0-23 UTC)
       └─────────────────────────────────────────────── Minutes (0-59)`}</pre>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              The 3 Strict AWS EventBridge Rules
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/60 dark:bg-rose-950/20 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <AlertOctagon className="h-4 w-4" />
                  <span>Rule 1: Exactly One Question Mark (?) is Required</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  You <strong>cannot</strong> specify <code>*</code> in both Day-of-month and Day-of-week. AWS will throw a validation error. You must specify a schedule in one of the fields and use <code>?</code> in the other.
                </p>
                <div className="text-xs font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-2 rounded border border-rose-200 dark:border-rose-500/20">
                  Valid: <code>0 18 ? * MON-FRI *</code> &nbsp;|&nbsp; Invalid: <code>0 18 * * MON-FRI *</code>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Rule 2: Mandatory Year Field</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Unlike standard Linux cron (5 fields) or Quartz (where year is optional), AWS EventBridge <strong>strictly requires the 6th Year field</strong>. If you want the rule to run indefinitely, you must pass <code>*</code> as the final field.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Rule 3: All Times Evaluate in UTC</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  AWS EventBridge evaluates all cron expressions strictly in <strong>Coordinated Universal Time (UTC)</strong>. If your application operates in New York (EST/EDT) or London (GMT/BST), you must calculate the UTC offset manually or account for seasonal Daylight Saving Time shifts.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Terraform &amp; AWS CDK Infrastructure Examples
            </h2>

            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
              <pre className="text-emerald-400">{`# Terraform EventBridge Rule (Every weekday at 6:00 PM UTC)
resource "aws_cloudwatch_event_rule" "daily_reconciliation" {
  name                = "daily-reconciliation-job"
  description         = "Triggers Lambda for end-of-day billing"
  schedule_expression = "cron(0 18 ? * MON-FRI *)"
}

resource "aws_cloudwatch_event_target" "lambda_target" {
  rule      = aws_cloudwatch_event_rule.daily_reconciliation.name
  target_id = "TriggerBillingLambda"
  arn       = aws_lambda_function.billing.arn
}`}</pre>
            </div>
          </section>

          <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Verify Your AWS Cron Rules
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                CronView validates AWS EventBridge syntax and checks for the mandatory <code>?</code> constraint automatically.
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 transition"
            >
              Test AWS Rule on CronView &rarr;
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
