import { z } from 'zod';
import { TimeEntryCategory } from '../types/time';

export const timeEntryCategorySchema = z.nativeEnum(TimeEntryCategory);

export const timeEntrySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  okrId: z.string().uuid(),
  keyResultId: z.string().uuid().optional(),
  date: z.date(),
  hoursSpent: z.number().min(0).max(24),
  description: z.string().max(500).optional(),
  category: timeEntryCategorySchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export const timeEntryCreateSchema = z.object({
  userId: z.string().uuid(),
  okrId: z.string().uuid(),
  keyResultId: z.string().uuid().optional(),
  date: z.date(),
  hoursSpent: z.number().min(0).max(24),
  description: z.string().max(500).optional(),
  category: timeEntryCategorySchema,
}).strict();

export const timeEntryUpdateSchema = z.object({
  hoursSpent: z.number().min(0).max(24).optional(),
  description: z.string().max(500).optional(),
  category: timeEntryCategorySchema.optional(),
}).strict();

export const timeUtilizationMetricsSchema = z.object({
  userId: z.string().uuid(),
  okrId: z.string().uuid(),
  weekStarting: z.date(),
  plannedHours: z.number().min(0),
  actualHours: z.number().min(0),
  efficiencyScore: z.number().min(0).max(1),
});

export type TimeEntry = z.infer<typeof timeEntrySchema>;
export type TimeEntryCreateInput = z.infer<typeof timeEntryCreateSchema>;
export type TimeEntryUpdateInput = z.infer<typeof timeEntryUpdateSchema>;
export type TimeUtilizationMetrics = z.infer<typeof timeUtilizationMetricsSchema>; 