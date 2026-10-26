import { CronDialect } from '../types/cron';

export interface NaturalLanguageResult {
  expression: string;
  dialect: CronDialect;
  confidence: 'high' | 'medium' | 'fallback';
  explanation: string;
}

export function naturalLanguageToCron(input: string, targetDialect: CronDialect = 'unix'): NaturalLanguageResult {
  const text = input.trim().toLowerCase();

  // Preset dictionary and regex matching patterns
  if (text.includes('every 15 min') || text.includes('every 15-minute') || text.includes('every fifteen min')) {
    return formatDialectResponse('*/15 * * * *', '0 */15 * * * ?', '0/15 * ? * * *', 'H/15 * * * *', targetDialect, 'Runs every 15 minutes.');
  }

  if (text.includes('every 5 min') || text.includes('every five min')) {
    return formatDialectResponse('*/5 * * * *', '0 */5 * * * ?', '0/5 * ? * * *', 'H/5 * * * *', targetDialect, 'Runs every 5 minutes.');
  }

  if (text.includes('every 10 min') || text.includes('every ten min')) {
    return formatDialectResponse('*/10 * * * *', '0 */10 * * * ?', '0/10 * ? * * *', 'H/10 * * * *', targetDialect, 'Runs every 10 minutes.');
  }

  if (text.includes('every 30 min') || text.includes('half hour') || text.includes('every thirty min')) {
    return formatDialectResponse('*/30 * * * *', '0 */30 * * * ?', '0/30 * ? * * *', 'H/30 * * * *', targetDialect, 'Runs every 30 minutes.');
  }

  if (text.includes('every hour') || text.includes('hourly')) {
    return formatDialectResponse('0 * * * *', '0 0 * * * ?', '0 * ? * * *', 'H * * * *', targetDialect, 'Runs at the beginning of every hour.');
  }

  if (text.includes('every 2 hours') || text.includes('every two hours')) {
    return formatDialectResponse('0 */2 * * *', '0 0 */2 * * ?', '0 0/2 ? * * *', 'H H/2 * * *', targetDialect, 'Runs every 2 hours.');
  }

  if (text.includes('every alternate tuesday') || text.includes('alternate tuesday') || text.includes('every other tuesday')) {
    // Alternate tuesdays: generally scheduled on Tuesdays (2) with an application check or week interval
    if (text.includes('4:30 pm') || text.includes('16:30')) {
      return formatDialectResponse('30 16 * * 2', '0 30 16 ? * 3', '30 16 ? * 3 *', '30 16 * * 2', targetDialect, 'Runs at 4:30 PM every Tuesday (add application-level bi-weekly guard or run on odd/even calendar weeks).');
    }
    return formatDialectResponse('0 0 * * 2', '0 0 0 ? * 3', '0 0 ? * 3 *', '0 0 * * 2', targetDialect, 'Runs on Tuesdays (requires app check for alternate week parity).');
  }

  if (text.includes('midnight') || text.includes('every night') || text.includes('every day at midnight')) {
    return formatDialectResponse('0 0 * * *', '0 0 0 * * ?', '0 0 ? * * *', 'H 0 * * *', targetDialect, 'Runs every day at midnight (00:00).');
  }

  if (text.includes('every weekday') || text.includes('monday to friday') || text.includes('monday through friday') || text.includes('workdays')) {
    if (text.includes('9 am') || text.includes('9:00 am')) {
      return formatDialectResponse('0 9 * * 1-5', '0 0 9 ? * 2-6', '0 9 ? * MON-FRI *', 'H 9 * * 1-5', targetDialect, 'Runs at 9:00 AM on Monday through Friday.');
    }
    if (text.includes('5 pm') || text.includes('17:00')) {
      return formatDialectResponse('0 17 * * 1-5', '0 0 17 ? * 2-6', '0 17 ? * MON-FRI *', 'H 17 * * 1-5', targetDialect, 'Runs at 5:00 PM on Monday through Friday.');
    }
    return formatDialectResponse('0 0 * * 1-5', '0 0 0 ? * 2-6', '0 0 ? * MON-FRI *', 'H 0 * * 1-5', targetDialect, 'Runs at midnight every Monday through Friday.');
  }

  if (text.includes('first of every month') || text.includes('1st of every month') || text.includes('monthly')) {
    return formatDialectResponse('0 0 1 * *', '0 0 0 1 * ?', '0 0 1 * ? *', 'H 0 1 * *', targetDialect, 'Runs at midnight on the first day of every month.');
  }

  if (text.includes('last day of every month') || text.includes('end of month') || text.includes('month end')) {
    return {
      expression: targetDialect === 'quartz' ? '0 0 23 L * ?' : (targetDialect === 'aws' ? '0 23 L * ? *' : '0 23 28-31 * *'),
      dialect: targetDialect,
      confidence: 'high',
      explanation: 'Runs at month end (using L operator for Quartz/AWS).',
    };
  }

  // Time extraction regex (e.g. 4:30 pm, 16:30, 8:15 am)
  const timeRegex = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i;
  const timeMatch = text.match(timeRegex);

  let minute = '0';
  let hour = '0';

  if (timeMatch) {
    let rawHour = parseInt(timeMatch[1], 10);
    const rawMin = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
    const modifier = timeMatch[3] ? timeMatch[3].toLowerCase() : null;

    if (modifier === 'pm' && rawHour < 12) rawHour += 12;
    if (modifier === 'am' && rawHour === 12) rawHour = 0;

    minute = rawMin.toString();
    hour = rawHour.toString();
  }

  // Day extraction
  let dow = '*';
  let quartzDow = '?';
  let awsDow = '?';

  if (text.includes('sunday') || text.includes('sun')) {
    dow = '0';
    quartzDow = '1';
    awsDow = '1';
  } else if (text.includes('monday') || text.includes('mon')) {
    dow = '1';
    quartzDow = '2';
    awsDow = '2';
  } else if (text.includes('tuesday') || text.includes('tue')) {
    dow = '2';
    quartzDow = '3';
    awsDow = '3';
  } else if (text.includes('wednesday') || text.includes('wed')) {
    dow = '3';
    quartzDow = '4';
    awsDow = '4';
  } else if (text.includes('thursday') || text.includes('thu')) {
    dow = '4';
    quartzDow = '5';
    awsDow = '5';
  } else if (text.includes('friday') || text.includes('fri')) {
    dow = '5';
    quartzDow = '6';
    awsDow = '6';
  } else if (text.includes('saturday') || text.includes('sat')) {
    dow = '6';
    quartzDow = '7';
    awsDow = '7';
  }

  if (dow !== '*') {
    return {
      expression: getCustomDialectExpr(minute, hour, '*', '*', dow, quartzDow, awsDow, targetDialect),
      dialect: targetDialect,
      confidence: 'medium',
      explanation: `Parsed to run at ${hour.padStart(2, '0')}:${minute.padStart(2, '0')} on target day of the week.`,
    };
  }

  // Default fallback
  return {
    expression: targetDialect === 'quartz' ? '0 0 12 * * ?' : (targetDialect === 'aws' ? '0 12 ? * * *' : '0 12 * * *'),
    dialect: targetDialect,
    confidence: 'fallback',
    explanation: 'Could not resolve exact query pattern; defaulted to daily run at 12:00 PM.',
  };
}

function formatDialectResponse(
  unix: string,
  quartz: string,
  aws: string,
  jenkins: string,
  target: CronDialect,
  explanation: string
): NaturalLanguageResult {
  let expression = unix;
  if (target === 'quartz') expression = quartz;
  else if (target === 'aws') expression = aws;
  else if (target === 'jenkins') expression = jenkins;
  else if (target === 'kubernetes') expression = unix;

  return {
    expression,
    dialect: target,
    confidence: 'high',
    explanation,
  };
}

function getCustomDialectExpr(
  min: string,
  hr: string,
  dom: string,
  month: string,
  dow: string,
  quartzDow: string,
  awsDow: string,
  target: CronDialect
): string {
  switch (target) {
    case 'quartz':
      return `0 ${min} ${hr} ? ${month} ${quartzDow}`;
    case 'aws':
      return `${min} ${hr} ? ${month} ${awsDow} *`;
    case 'jenkins':
      return `${min} ${hr} * * ${dow}`;
    case 'kubernetes':
    case 'unix':
    default:
      return `${min} ${hr} * * ${dow}`;
  }
}
