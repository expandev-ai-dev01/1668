import { executeProcedure } from '@/utils/database';
import { CreateScheduleDto, ScheduledTask, UpdateScheduleDto } from './scheduleTypes';

export async function createSchedule(data: CreateScheduleDto): Promise<ScheduledTask> {
  const params = {
    isActive: data.isActive,
    frequency: data.frequency,
    executionTime: data.executionTime,
    dayOfWeek: data.dayOfWeek,
    dayOfMonth: data.dayOfMonth,
    cronExpression: data.cronExpression,
    directories: JSON.stringify(data.directories),
    cleaningConfig: JSON.stringify(data.cleaningConfig),
  };
  const result = await executeProcedure<ScheduledTask>('functional.spScheduledTaskCreate', params);
  return result[0];
}

export async function listSchedules(): Promise<ScheduledTask[]> {
  return await executeProcedure<ScheduledTask>('functional.spScheduledTaskList', {});
}

export async function getScheduleById(id: number): Promise<ScheduledTask | undefined> {
  const result = await executeProcedure<ScheduledTask>('functional.spScheduledTaskGet', { id });
  return result[0];
}

export async function updateSchedule(
  id: number,
  data: UpdateScheduleDto
): Promise<ScheduledTask | undefined> {
  const params = {
    id,
    isActive: data.isActive,
    frequency: data.frequency,
    executionTime: data.executionTime,
    dayOfWeek: data.dayOfWeek,
    dayOfMonth: data.dayOfMonth,
    cronExpression: data.cronExpression,
    directories: data.directories ? JSON.stringify(data.directories) : undefined,
    cleaningConfig: data.cleaningConfig ? JSON.stringify(data.cleaningConfig) : undefined,
  };
  const result = await executeProcedure<ScheduledTask>('functional.spScheduledTaskUpdate', params);
  return result[0];
}

export async function deleteSchedule(id: number): Promise<void> {
  await executeProcedure('functional.spScheduledTaskDelete', { id });
}
