import cronstrue from 'cronstrue';
import { CronDialect, CronAnalysisResult, FieldDefinition, EdgeCaseWarning, TriggerRun } from '../types/cron';
import { DIALECTS } from './dialects';

export function analyzeCronExpression(expression: string, dialect: CronDialect): CronAnalysisResult {
  const cleaned = expression.trim();
  const dialectConfig = DIALECTS[dialect];

  if (!cleaned) {
    return {
      isValid: false,
      error: 'Please enter a cron expression.',
      humanDescription: '',
      fields: [],
      warnings: [],
      nextRuns: [],
    };
  }

  // Handle AWS wrapper syntax if user pasted `cron(...)`
  let normalizedExpr = cleaned;
  if (dialect === 'aws' && normalizedExpr.startsWith('cron(') && normalizedExpr.endsWith(')')) {
    normalizedExpr = normalizedExpr.slice(5, -1).trim();
  }

  const parts = normalizedExpr.split(/\s+/);
  const expectedCount = dialectConfig.fieldsCount;

  const isCountValid = Array.isArray(expectedCount)
    ? expectedCount.includes(parts.length)
    : parts.length === expectedCount;

  if (!isCountValid) {
    const expectedStr = Array.isArray(expectedCount) ? expectedCount.join(' or ') : expectedCount.toString();
    return {
      isValid: false,
      error: `Invalid field count for ${dialectConfig.name}. Expected ${expectedStr} fields, but received ${parts.length}.`,
      humanDescription: '',
      fields: [],
      warnings: [],
      nextRuns: [],
    };
  }

  // Construct Field Definitions
  const fields: FieldDefinition[] = parts.map((part, index) => {
    const fieldDef = dialectConfig.fields[index] || {
      name: `Field ${index + 1}`,
      allowed: 'Unknown',
      special: '*',
      details: 'Extension field',
    };
    return {
      name: fieldDef.name,
      position: index + 1,
      allowedValues: fieldDef.allowed,
      specialChars: fieldDef.special,
      description: fieldDef.details,
      example: part,
      currentValue: part,
    };
  });

  // Evaluate Edge Case Warnings
  const warnings = detectEdgeCases(parts, dialect);

  // Human Readable Description
  let humanDescription = '';
  try {
    humanDescription = generateHumanExplanation(normalizedExpr, dialect, parts);
  } catch (err: any) {
    humanDescription = 'Custom scheduled job pattern';
  }

  // Calculate Next Runs
  const nextRuns = calculateNextRuns(normalizedExpr, dialect, 8);

  return {
    isValid: true,
    humanDescription,
    fields,
    warnings,
    nextRuns,
  };
}

function detectEdgeCases(parts: string[], dialect: CronDialect): EdgeCaseWarning[] {
  const warnings: EdgeCaseWarning[] = [];

  // 1. Day of Month vs Day of Week in Standard UNIX / K8s
  if (dialect === 'unix' || dialect === 'kubernetes') {
    const dom = parts[2];
    const dow = parts[4];
    if (dom !== '*' && dow !== '*') {
      warnings.push({
        severity: 'critical',
        title: 'OR Relationship Hazard (DOM vs DOW)',
        message: 'In standard UNIX cron, when both Day of Month and Day of Week are explicitly specified, standard POSIX executes the job if EITHER condition matches (logical OR, not AND).',
        recommendation: 'If you intended "Friday the 13th only", standard cron will instead trigger every Friday AND on the 13th of each month. A script-level check is required for true AND logic.',
      });
    }
  }

  // 2. AWS EventBridge ? requirement
  if (dialect === 'aws') {
    const dom = parts[2];
    const dow = parts[4];
    if (dom !== '?' && dow !== '?') {
      warnings.push({
        severity: 'critical',
        title: 'AWS EventBridge Syntax Violation',
        message: 'AWS EventBridge strictly requires one of "Day of month" or "Day of week" to be the question mark (?) character.',
        recommendation: `Change either "${dom}" or "${dow}" to '?' depending on whether you want a monthly calendar day or weekday schedule.`,
      });
    }
    if (dom === '?' && dow === '?') {
      warnings.push({
        severity: 'critical',
        title: 'Ambiguous AWS Wildcard',
        message: 'Both Day-of-month and Day-of-week cannot be "?". One must specify a schedule or wildcard.',
      });
    }
  }

  // 3. 31st Day or 29-30th day monthly triggers
  const domPart = dialect === 'quartz' ? parts[3] : parts[2];
  if (domPart && (domPart === '31' || domPart.includes('31') || domPart === '30' || domPart.includes('30'))) {
    warnings.push({
      severity: 'warning',
      title: 'Short Months Skipping Trap',
      message: `Triggering specifically on day "${domPart}" will completely fail to execute in shorter months (February has 28/29 days; April, June, Sept, Nov have 30 days).`,
      recommendation: dialect === 'quartz' || dialect === 'aws'
        ? 'Consider using the "L" (Last Day of Month) operator if you need month-end execution.'
        : 'Run the job on the 1st of every month and adjust logic, or schedule for the 28th.',
    });
  }

  // 4. Daylight Saving Time (DST) Shift Warnings
  const hourPart = dialect === 'quartz' ? parts[2] : parts[1];
  if (hourPart && (hourPart.includes('2') || hourPart.includes('3') || hourPart === '2' || hourPart === '3')) {
    warnings.push({
      severity: 'warning',
      title: 'Daylight Saving Time (DST) Clock Shift Risk',
      message: 'Running between 02:00 and 03:00 local time can trigger twice in Autumn (clock jumps back) or be completely skipped in Spring (clock jumps forward).',
      recommendation: 'In cloud infrastructures (AWS, K8s, GCP), always pin your scheduler to UTC (e.g., UTC+0) to guarantee idempotent single executions.',
    });
  }

  // 5. Jenkins Hashing Feature info
  if (dialect === 'jenkins' && parts.some(p => p.includes('H'))) {
    warnings.push({
      severity: 'info',
      title: 'Deterministic Jenkins Hashing Active',
      message: 'Tokens using "H" will hash against the Jenkins job name / pipeline identifier to select an exact stable minute or hour, smoothing cluster load.',
      recommendation: 'Do not use fixed minutes if multiple jobs share the same slave executor pool.',
    });
  }

  return warnings;
}

function generateHumanExplanation(expression: string, dialect: CronDialect, parts: string[]): string {
  // Convert dialects into cronstrue compatible expressions when possible
  try {
    if (dialect === 'unix' || dialect === 'kubernetes') {
      return cronstrue.toString(expression, { throwExceptionOnParseError: true, verbose: true });
    }

    if (dialect === 'quartz') {
      return cronstrue.toString(expression, { throwExceptionOnParseError: true, verbose: true });
    }

    if (dialect === 'aws') {
      // AWS: Min Hour DOM Month DOW Year
      // For cronstrue, quartz format is Sec Min Hour DOM Month DOW Year
      // We can synthesize a standard quartz expression
      const min = parts[0];
      const hr = parts[1];
      const dom = parts[2];
      const mon = parts[3];
      const dow = parts[4];
      const yr = parts[5];
      const syntheticQuartz = `0 ${min} ${hr} ${dom} ${mon} ${dow} ${yr}`;
      return cronstrue.toString(syntheticQuartz, { throwExceptionOnParseError: true, verbose: true });
    }

    if (dialect === 'jenkins') {
      // Replace H with 0 or interval equivalent for human-readable approximation
      const simulated = parts.map(p => {
        if (p === 'H') return '0 (hashed)';
        if (p.startsWith('H/')) return `*/${p.slice(2)}`;
        if (p.startsWith('H(')) return p.replace('H(', '').replace(')', '');
        return p;
      }).join(' ');

      const readableApprox = simulated.replace('0 (hashed)', '0');
      try {
        const text = cronstrue.toString(readableApprox, { throwExceptionOnParseError: false });
        return `${text} (Jenkins distributed hash scheduled)`;
      } catch {
        return `Runs on Jenkins hash schedule across ${expression}`;
      }
    }
  } catch (err: any) {
    // fallback
  }

  return `Custom recurring schedule: ${expression}`;
}

// Lightweight deterministic next-run calculation supporting Quartz/AWS/Unix/K8s/Jenkins
export function calculateNextRuns(expression: string, dialect: CronDialect, count = 8): TriggerRun[] {
  const runs: TriggerRun[] = [];
  const parts = expression.trim().split(/\s+/);
  const now = new Date();

  // Normalize parts to standard 5/6 components
  let minutePart = '*';
  let hourPart = '*';
  let domPart = '*';
  let monthPart = '*';
  let dowPart = '*';

  if (dialect === 'quartz') {
    // 0:sec, 1:min, 2:hr, 3:dom, 4:mon, 5:dow
    minutePart = parts[1] || '*';
    hourPart = parts[2] || '*';
    domPart = parts[3] || '*';
    monthPart = parts[4] || '*';
    dowPart = parts[5] || '*';
  } else if (dialect === 'aws') {
    // 0:min, 1:hr, 2:dom, 3:mon, 4:dow, 5:yr
    minutePart = parts[0] || '*';
    hourPart = parts[1] || '*';
    domPart = parts[2] || '*';
    monthPart = parts[3] || '*';
    dowPart = parts[4] || '*';
  } else {
    // unix, jenkins, kubernetes
    minutePart = parts[0] || '*';
    hourPart = parts[1] || '*';
    domPart = parts[2] || '*';
    monthPart = parts[3] || '*';
    dowPart = parts[4] || '*';
  }

  // Clean Jenkins 'H'
  if (minutePart.startsWith('H/')) {
    minutePart = '*/' + minutePart.slice(2);
  } else if (minutePart === 'H') {
    minutePart = '15'; // deterministic representation for preview
  }

  // Helper parser for sets
  const parseList = (expr: string, max: number, min = 0): number[] => {
    if (expr === '*' || expr === '?') {
      const all: number[] = [];
      for (let i = min; i <= max; i++) all.push(i);
      return all;
    }
    if (expr.startsWith('*/') || expr.startsWith('0/')) {
      const step = parseInt(expr.split('/')[1], 10) || 1;
      const res: number[] = [];
      for (let i = min; i <= max; i += step) res.push(i);
      return res;
    }
    if (expr.includes('-')) {
      const [start, end] = expr.split('-').map(Number);
      const res: number[] = [];
      for (let i = start; i <= end; i++) res.push(i);
      return res;
    }
    if (expr.includes(',')) {
      return expr.split(',').map(Number).filter(n => !isNaN(n));
    }
    const single = parseInt(expr, 10);
    return isNaN(single) ? [min] : [single];
  };

  const allowedMinutes = parseList(minutePart, 59, 0);
  const allowedHours = parseList(hourPart, 23, 0);

  // Iterate forward up to 365 days to find next matching timestamps
  const cursor = new Date(now.getTime() + 60000);
  cursor.setSeconds(0, 0);

  let iterations = 0;
  while (runs.length < count && iterations < 50000) {
    iterations++;
    const curMin = cursor.getMinutes();
    const curHr = cursor.getHours();
    const curDom = cursor.getDate();
    const curMon = cursor.getMonth() + 1;
    const curDow = cursor.getDay(); // 0 is Sun

    const matchMin = allowedMinutes.includes(curMin);
    const matchHr = allowedHours.includes(curHr);

    let matchDom = true;
    if (domPart !== '*' && domPart !== '?') {
      if (domPart === 'L') {
        const lastDayOfCurMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
        matchDom = curDom === lastDayOfCurMonth;
      } else {
        const domList = parseList(domPart, 31, 1);
        matchDom = domList.includes(curDom);
      }
    }

    let matchDow = true;
    if (dowPart !== '*' && dowPart !== '?') {
      // Quartz/AWS: 1=Sun, 7=Sat; Unix: 0=Sun, 6=Sat
      const targetDow = (dialect === 'quartz' || dialect === 'aws') ? curDow + 1 : curDow;
      const dowList = parseList(dowPart, 7, (dialect === 'quartz' || dialect === 'aws') ? 1 : 0);
      matchDow = dowList.includes(targetDow);
    }

    let matchMonth = true;
    if (monthPart !== '*' && monthPart !== '?') {
      const monList = parseList(monthPart, 12, 1);
      matchMonth = monList.includes(curMon);
    }

    // Match condition
    let dateMatches = false;
    if ((domPart !== '*' && domPart !== '?') && (dowPart !== '*' && dowPart !== '?')) {
      if (dialect === 'unix' || dialect === 'kubernetes') {
        // POSIX OR logic
        dateMatches = (matchDom || matchDow) && matchMonth;
      } else {
        // Quartz / AWS AND logic
        dateMatches = matchDom && matchDow && matchMonth;
      }
    } else {
      dateMatches = matchDom && matchDow && matchMonth;
    }

    if (matchMin && matchHr && dateMatches) {
      const runDate = new Date(cursor.getTime());
      runs.push({
        date: runDate,
        utcString: runDate.toUTCString(),
        localString: runDate.toLocaleString(undefined, {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        }),
        relativeTime: formatRelativeTime(runDate, now),
        daylightSavingsImpact: checkDstEdge(runDate),
      });

      // Jump 1 minute forward to avoid duplicate trigger
      cursor.setTime(cursor.getTime() + 60000);
      continue;
    }

    // Fast-forward cursor
    if (!matchHr && allowedHours.length > 0) {
      cursor.setTime(cursor.getTime() + 60000);
    } else {
      cursor.setTime(cursor.getTime() + 60000);
    }
  }

  return runs;
}

function formatRelativeTime(target: Date, base: Date): string {
  const diffMs = target.getTime() - base.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
  if (diffHours > 0) return `in ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
  if (diffMin > 0) return `in ${diffMin} minute${diffMin > 1 ? 's' : ''}`;
  return 'in < 1 minute';
}

function checkDstEdge(date: Date): string | undefined {
  const month = date.getMonth(); // March is 2, Nov is 10
  const hour = date.getHours();
  if ((month === 2 || month === 10) && (hour >= 1 && hour <= 3)) {
    return 'DST transition window risk in US/EU timezones';
  }
  return undefined;
}
