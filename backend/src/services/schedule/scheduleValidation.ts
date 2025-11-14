import { z } from 'zod';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const scheduleSchema = z
  .object({
    isActive: z.boolean().default(true),
    frequency: z.enum(['daily', 'weekly', 'monthly', 'custom']),
    executionTime: z.string().regex(timeRegex, 'Invalid time format. Use HH:MM'),
    dayOfWeek: z.number().int().min(1).max(7).optional().nullable(),
    dayOfMonth: z.number().int().min(1).max(31).optional().nullable(),
    cronExpression: z.string().optional().nullable(),
    directories: z.array(z.string().min(1)).min(1, 'At least one directory is required'),
    cleaningConfig: z.object({
      extensions: z.array(z.string()).optional(),
      patterns: z.array(z.string()).optional(),
      minAgeDays: z.number().int().min(0).default(7),
      minSizeBytes: z.number().int().min(0).default(0),
    }),
  })
  .refine(
    (data) => {
      if (data.frequency === 'weekly' && data.dayOfWeek == null) {
        return false;
      }
      return true;
    },
    { message: 'dayOfWeek is required for weekly frequency' }
  )
  .refine(
    (data) => {
      if (data.frequency === 'monthly' && data.dayOfMonth == null) {
        return false;
      }
      return true;
    },
    { message: 'dayOfMonth is required for monthly frequency' }
  )
  .refine(
    (data) => {
      if (
        data.frequency === 'custom' &&
        (data.cronExpression == null || data.cronExpression.trim() === '')
      ) {
        return false;
      }
      return true;
    },
    { message: 'cronExpression is required for custom frequency' }
  );

export const createScheduleSchema = scheduleSchema;
export const updateScheduleSchema = scheduleSchema.partial();

export type CreateScheduleInput = z.infer<typeof createScheduleSchema>;
export type UpdateScheduleInput = z.infer<typeof updateScheduleSchema>;
