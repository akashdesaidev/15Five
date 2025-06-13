import { z } from 'zod';

// Base enums/constants as Zod enums
export const timeEntryCategoryEnum = z.enum([
  'direct_work',
  'planning',
  'collaboration',
  'review',
  'other'
]);

// Time entry schema
export const timeEntrySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  okrId: z.string().uuid(),
  keyResultId: z.string().uuid().optional(),
  date: z.date(),
  hoursSpent: z.number().positive().max(24),
  description: z.string().optional(),
  category: timeEntryCategoryEnum,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional()
});

// Time allocation schema
export const timeAllocationSchema = z.object({
  id: z.string().uuid(),
  okrId: z.string().uuid(),
  expectedWeeklyHours: z.number().positive().max(40),
  minimumAllocationPercentage: z.number().min(0).max(100),
  startDate: z.date(),
  endDate: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional()
});

// Time utilization metrics schema
export const timeUtilizationMetricsSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  okrId: z.string().uuid(),
  weekStarting: z.date(),
  plannedHours: z.number().optional(),
  actualHours: z.number().optional(),
  efficiencyScore: z.number().min(0).max(1).optional(),
  createdAt: z.date()
});

// Request schemas
export const createTimeEntrySchema = z.object({
  okrId: z.string().uuid(),
  keyResultId: z.string().uuid().optional(),
  date: z.date(),
  hoursSpent: z.number().positive().max(24),
  description: z.string().optional(),
  category: timeEntryCategoryEnum
}).strict();

export const updateTimeEntrySchema = z.object({
  hoursSpent: z.number().positive().max(24).optional(),
  description: z.string().optional(),
  category: timeEntryCategoryEnum.optional()
}).strict();

export const createTimeAllocationSchema = z.object({
  okrId: z.string().uuid(),
  expectedWeeklyHours: z.number().positive().max(40),
  minimumAllocationPercentage: z.number().min(0).max(100),
  startDate: z.date(),
  endDate: z.date().optional()
}).strict();

export const updateTimeAllocationSchema = z.object({
  expectedWeeklyHours: z.number().positive().max(40).optional(),
  minimumAllocationPercentage: z.number().min(0).max(100).optional(),
  endDate: z.date().optional()
}).strict();

// Response schemas with relations
export const timeEntryWithRelationsSchema = timeEntrySchema.extend({
  okr: z.object({
    id: z.string().uuid(),
    title: z.string()
  }),
  keyResult: z.object({
    id: z.string().uuid(),
    description: z.string()
  }).optional(),
  user: z.object({
    id: z.string().uuid(),
    firstName: z.string(),
    lastName: z.string()
  })
});

export const timeAllocationWithRelationsSchema = timeAllocationSchema.extend({
  okr: z.object({
    id: z.string().uuid(),
    title: z.string()
  })
});

// Types
export type TimeEntryCategory = z.infer<typeof timeEntryCategoryEnum>;
export type TimeEntry = z.infer<typeof timeEntrySchema>;
export type TimeAllocation = z.infer<typeof timeAllocationSchema>;
export type TimeUtilizationMetrics = z.infer<typeof timeUtilizationMetricsSchema>;

export type CreateTimeEntryRequest = z.infer<typeof createTimeEntrySchema>;
export type UpdateTimeEntryRequest = z.infer<typeof updateTimeEntrySchema>;
export type CreateTimeAllocationRequest = z.infer<typeof createTimeAllocationSchema>;
export type UpdateTimeAllocationRequest = z.infer<typeof updateTimeAllocationSchema>;

export type TimeEntryWithRelations = z.infer<typeof timeEntryWithRelationsSchema>;
export type TimeAllocationWithRelations = z.infer<typeof timeAllocationWithRelationsSchema>; 