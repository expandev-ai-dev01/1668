import { z } from 'zod';

export const analyzeSchema = z.object({
  directoryPath: z.string().min(1, 'Directory path is required'),
  includeSubdirectories: z.boolean().default(true),
  criteria: z.object({
    extensions: z.array(z.string()).optional(),
    patterns: z.array(z.string()).optional(),
    minAgeDays: z.number().int().min(0).default(7),
    minSizeBytes: z.number().int().min(0).default(0),
  }),
});

export const cleanSchema = z.object({
  files: z.array(z.string().min(1)).min(1, 'At least one file must be selected for cleaning'),
  mode: z.enum(['trash', 'permanent']).default('trash'),
  scanResult: z.object({
    totalFilesScanned: z.number(),
    potentialSpaceToSave: z.number(),
  }),
  criteriaUsed: analyzeSchema.shape.criteria,
  directoryPath: z.string(),
});

export type AnalyzeInput = z.infer<typeof analyzeSchema>;
export type CleanInput = z.infer<typeof cleanSchema>;
