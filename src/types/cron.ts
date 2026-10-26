export type CronDialect = 'unix' | 'quartz' | 'aws' | 'jenkins' | 'kubernetes';

export interface FieldDefinition {
  name: string;
  position: number;
  allowedValues: string;
  specialChars: string;
  description: string;
  example: string;
  currentValue?: string;
  isActive?: boolean;
}

export interface DialectConfig {
  id: CronDialect;
  name: string;
  description: string;
  fieldsCount: number | number[]; // e.g. 5, [6, 7], 6
  fields: {
    name: string;
    allowed: string;
    special: string;
    details: string;
  }[];
  exampleExpressions: {
    label: string;
    expr: string;
    explanation: string;
  }[];
  documentationUrl?: string;
}

export interface EdgeCaseWarning {
  severity: 'warning' | 'info' | 'critical';
  title: string;
  message: string;
  recommendation?: string;
}

export interface CronAnalysisResult {
  isValid: boolean;
  error?: string;
  humanDescription: string;
  fields: FieldDefinition[];
  warnings: EdgeCaseWarning[];
  nextRuns: TriggerRun[];
}

export interface TriggerRun {
  date: Date;
  utcString: string;
  localString: string;
  relativeTime: string;
  daylightSavingsImpact?: string;
}
