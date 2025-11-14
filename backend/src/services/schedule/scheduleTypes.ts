export interface ScheduledTask {
  id: number;
  isActive: boolean;
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
  executionTime: string;
  dayOfWeek: number | null;
  dayOfMonth: number | null;
  cronExpression: string | null;
  directories: string; // JSON string of array
  cleaningConfig: string; // JSON string of criteria
  nextRun: Date | null;
  lastRun: Date | null;
}

export interface CreateScheduleDto {
  isActive: boolean;
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
  executionTime: string;
  dayOfWeek?: number;
  dayOfMonth?: number;
  cronExpression?: string;
  directories: string[];
  cleaningConfig: object;
}

export interface UpdateScheduleDto extends Partial<CreateScheduleDto> {}
