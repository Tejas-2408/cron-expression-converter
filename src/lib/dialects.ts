import { CronDialect, DialectConfig } from '../types/cron';

export const DIALECTS: Record<CronDialect, DialectConfig> = {
  unix: {
    id: 'unix',
    name: 'UNIX / Standard Cron',
    description: 'Standard 5-part POSIX crontab format used in Linux/macOS and widespread cron daemons.',
    fieldsCount: 5,
    fields: [
      { name: 'Minute', allowed: '0-59', special: '* , - /', details: 'Minute of the hour' },
      { name: 'Hour', allowed: '0-23', special: '* , - /', details: 'Hour in 24-hr format (0 = midnight)' },
      { name: 'Day of Month', allowed: '1-31', special: '* , - /', details: 'Calendar day of the month' },
      { name: 'Month', allowed: '1-12 or JAN-DEC', special: '* , - /', details: 'Month of the year' },
      { name: 'Day of Week', allowed: '0-7 or SUN-SAT', special: '* , - /', details: '0 or 7 is Sunday' },
    ],
    exampleExpressions: [
      { label: 'Every 15 minutes', expr: '*/15 * * * *', explanation: 'Runs at minute 0, 15, 30, and 45 of every hour' },
      { label: 'Every weekday at 9:30 AM', expr: '30 9 * * 1-5', explanation: 'Runs at 09:30 UTC/local Monday through Friday' },
      { label: 'Midnight on the 1st of every month', expr: '0 0 1 * *', explanation: 'Monthly billing or reconciliation run' },
      { label: 'Every Sunday at 3:00 AM', expr: '0 3 * * 0', explanation: 'Weekly maintenance or backup schedule' },
    ]
  },
  quartz: {
    id: 'quartz',
    name: 'Quartz / Java Scheduler',
    description: 'Enterprise 6 to 7-part format supporting seconds, year, and ?, L, W, # special characters.',
    fieldsCount: [6, 7],
    fields: [
      { name: 'Seconds', allowed: '0-59', special: '* , - /', details: 'Second of the minute' },
      { name: 'Minute', allowed: '0-59', special: '* , - /', details: 'Minute of the hour' },
      { name: 'Hour', allowed: '0-23', special: '* , - /', details: 'Hour in 24-hr format' },
      { name: 'Day of Month', allowed: '1-31', special: '* , - / ? L W', details: '? means no specific value, L=last, W=weekday' },
      { name: 'Month', allowed: '1-12 or JAN-DEC', special: '* , - /', details: 'Month of the year' },
      { name: 'Day of Week', allowed: '1-7 or SUN-SAT', special: '* , - / ? L #', details: '1=SUN, 2=MON... # means nth weekday' },
      { name: 'Year (Optional)', allowed: '1970-2099', special: '* , - /', details: 'Optional 7th field' },
    ],
    exampleExpressions: [
      { label: 'Every 5 seconds', expr: '*/5 * * * * ?', explanation: 'Runs every 5 seconds indefinitely' },
      { label: 'Last Friday of every month at 10 PM', expr: '0 0 22 ? * 6L', explanation: 'Quartz special modifier 6L (Last Friday)' },
      { label: 'Nearest weekday to the 15th at 8 AM', expr: '0 0 8 15W * ?', explanation: 'Runs on 15W (nearest weekday to 15th)' },
      { label: 'Second Sunday of every month at noon', expr: '0 0 12 ? * 1#2', explanation: 'Uses 1#2 for 2nd Sunday of the month' },
    ]
  },
  aws: {
    id: 'aws',
    name: 'AWS EventBridge / CloudWatch',
    description: 'AWS 6-part cron format (cron(Minutes Hours Day-of-month Month Day-of-week Year)). Exact ? required in one of Day-of-month or Day-of-week.',
    fieldsCount: 6,
    fields: [
      { name: 'Minutes', allowed: '0-59', special: '* , - /', details: 'Minute of the hour' },
      { name: 'Hours', allowed: '0-23', special: '* , - /', details: 'Hour of day (AWS default is UTC)' },
      { name: 'Day of Month', allowed: '1-31', special: '* , - / ? L W', details: 'Requires ? if Day-of-week is specified' },
      { name: 'Month', allowed: '1-12 or JAN-DEC', special: '* , - /', details: 'Month of the year' },
      { name: 'Day of Week', allowed: '1-7 or SUN-SAT', special: '* , - / ? L #', details: 'Requires ? if Day-of-month is specified. 1=SUN.' },
      { name: 'Year', allowed: '1970-2199', special: '* , - /', details: 'Mandatory year field in AWS' },
    ],
    exampleExpressions: [
      { label: 'AWS Lambda daily at 18:00 UTC', expr: '0 18 ? * MON-FRI *', explanation: 'Weekdays at 18:00 UTC with mandatory year *' },
      { label: 'CloudWatch every 10 mins', expr: '0/10 * ? * * *', explanation: 'Every 10 minutes all year round' },
      { label: 'Last day of every month at 23:45 UTC', expr: '45 23 L * ? *', explanation: 'Uses L for last day of month' },
      { label: '3rd Wednesday of every month at 9 AM', expr: '0 9 ? * 4#3 *', explanation: 'Uses 4#3 (Wednesday is 4 in AWS EventBridge)' },
    ]
  },
  jenkins: {
    id: 'jenkins',
    name: 'Jenkins CI/CD (Hashed Cron)',
    description: 'Supports Jenkins "H" (Hash) token to evenly distribute build agent loads and prevent spikes.',
    fieldsCount: 5,
    fields: [
      { name: 'Minute', allowed: '0-59 or H or H/xx', special: 'H * , - /', details: 'H spreads builds across 0-59 based on job name' },
      { name: 'Hour', allowed: '0-23 or H or H(start-end)', special: 'H * , - /', details: 'H(0-7) hashes build between midnight and 7am' },
      { name: 'Day of Month', allowed: '1-31', special: '* , - /', details: 'Calendar day' },
      { name: 'Month', allowed: '1-12', special: '* , - /', details: 'Calendar month' },
      { name: 'Day of Week', allowed: '0-7 (0 and 7 = SUN)', special: '* , - /', details: 'Day of week' },
    ],
    exampleExpressions: [
      { label: 'Distributed every 15 minutes', expr: 'H/15 * * * *', explanation: 'Runs every 15 mins with a stable offset (e.g. at :07, :22, :37, :52)' },
      { label: 'Nightly build load-balanced 0-5 AM', expr: 'H H(0-5) * * *', explanation: 'Evenly distributes builds across nighttime hours' },
      { label: 'Twice daily staggered builds', expr: 'H 4,16 * * 1-5', explanation: 'Builds twice on weekdays with hashed minutes' },
    ]
  },
  kubernetes: {
    id: 'kubernetes',
    name: 'Kubernetes CronJob',
    description: 'K8s CronJob spec v1/v1beta1 format with standard 5 fields and timezone awareness support (spec.timeZone).',
    fieldsCount: 5,
    fields: [
      { name: 'Minute', allowed: '0-59', special: '* , - /', details: 'Minute' },
      { name: 'Hour', allowed: '0-23', special: '* , - /', details: 'Hour (runs in Job Controller timezone)' },
      { name: 'Day of Month', allowed: '1-31', special: '* , - /', details: 'Calendar day' },
      { name: 'Month', allowed: '1-12', special: '* , - /', details: 'Month' },
      { name: 'Day of Week', allowed: '0-6 or SUN-SAT', special: '* , - /', details: '0=SUN, 6=SAT' },
    ],
    exampleExpressions: [
      { label: 'K8s hourly pod cleanup', expr: '0 * * * *', explanation: 'At the start of every hour' },
      { label: 'Weekly DB snapshot Sundays at 2 AM', expr: '0 2 * * 0', explanation: 'Sunday 02:00 UTC' },
      { label: 'Every 30 minutes on work hours', expr: '*/30 9-17 * * 1-5', explanation: 'From 9:00 to 17:30 Monday-Friday' },
    ]
  }
};
