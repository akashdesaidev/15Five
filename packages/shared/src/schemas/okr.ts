import { z } from 'zod';

// Base enums/constants as Zod enums
export const okrTypeEnum = z.enum(['company', 'department', 'team', 'individual']);
export const okrStatusEnum = z.enum(['active', 'completed', 'archived']);
export const timeEntryCategoryEnum = z.enum(['direct_work', 'planning', 'collaboration', 'review', 'other']);
export const snapshotTypeEnum = z.enum(['manual', 'auto_weekly', 'cycle_end']);

// Base OKR schema
export const okrSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  type: okrTypeEnum,
  status: okrStatusEnum,
  parentOkrId: z.string().uuid().optional(),
  ownerUserId: z.string().uuid(),
  organizationId: z.string().uuid(),
  tags: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional()
});

// Key Result schema
export const keyResultSchema = z.object({
  id: z.string().uuid(),
  okrId: z.string().uuid(),
  description: z.string().min(1).max(1000),
  targetScore: z.number().min(1).max(10),
  currentScore: z.number().min(1).max(10),
  progressNotes: z.string().max(1000).optional(),
  dueDate: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  version: z.number().int().positive()
});

// Progress Snapshot schema
export const okrProgressSnapshotSchema = z.object({
  id: z.string().uuid(),
  keyResultId: z.string().uuid(),
  score: z.number().min(1).max(10),
  notes: z.string().max(1000).optional(),
  recordedAt: z.date(),
  recordedById: z.string().uuid(),
  snapshotType: snapshotTypeEnum
});

// Time Entry schema
export const timeEntrySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  okrId: z.string().uuid(),
  keyResultId: z.string().uuid().optional(),
  date: z.date(),
  hoursSpent: z.number().positive().max(24),
  description: z.string().max(500).optional(),
  category: timeEntryCategoryEnum,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional()
});

// Time Allocation schema
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

// Time Utilization Metrics schema
export const timeUtilizationMetricsSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  okrId: z.string().uuid(),
  weekStarting: z.date(),
  plannedHours: z.number().nonnegative(),
  actualHours: z.number().nonnegative(),
  efficiencyScore: z.number().min(0).max(1),
  createdAt: z.date()
});

// Request schemas
export const createOKRSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  type: okrTypeEnum,
  parentOkrId: z.string().uuid().optional(),
  ownerUserId: z.string().uuid(),
  organizationId: z.string().uuid(),
  tags: z.array(z.string()).optional()
}).strict();

export const updateOKRSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  status: okrStatusEnum.optional(),
  parentOkrId: z.string().uuid().optional(),
  tags: z.array(z.string()).optional()
}).strict();

export const createKeyResultSchema = z.object({
  okrId: z.string().uuid(),
  description: z.string().min(1).max(1000),
  targetScore: z.number().min(1).max(10),
  dueDate: z.date().optional()
}).strict();

export const updateKeyResultSchema = z.object({
  description: z.string().min(1).max(1000).optional(),
  targetScore: z.number().min(1).max(10).optional(),
  currentScore: z.number().min(1).max(10).optional(),
  progressNotes: z.string().max(1000).optional(),
  dueDate: z.date().optional()
}).strict();

export const createTimeEntrySchema = z.object({
  userId: z.string().uuid(),
  okrId: z.string().uuid(),
  keyResultId: z.string().uuid().optional(),
  date: z.date(),
  hoursSpent: z.number().positive().max(24),
  description: z.string().max(500).optional(),
  category: timeEntryCategoryEnum
}).strict();

export const updateTimeEntrySchema = z.object({
  hoursSpent: z.number().positive().max(24).optional(),
  description: z.string().max(500).optional(),
  category: timeEntryCategoryEnum.optional()
}).strict();

// Response schemas with relations
export const okrWithRelationsSchema = okrSchema.extend({
  keyResults: z.array(keyResultSchema),
  parent: okrSchema.optional(),
  children: z.array(okrSchema).optional(),
  owner: z.object({
    id: z.string().uuid(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email()
  }),
  timeEntries: z.array(timeEntrySchema).optional(),
  timeAllocations: z.array(timeAllocationSchema).optional()
});

// Types
export type OKRType = z.infer<typeof okrTypeEnum>;
export type OKRStatus = z.infer<typeof okrStatusEnum>;
export type TimeEntryCategory = z.infer<typeof timeEntryCategoryEnum>;
export type SnapshotType = z.infer<typeof snapshotTypeEnum>;

export type OKR = z.infer<typeof okrSchema>;
export type KeyResult = z.infer<typeof keyResultSchema>;
export type OKRProgressSnapshot = z.infer<typeof okrProgressSnapshotSchema>;
export type TimeEntry = z.infer<typeof timeEntrySchema>;
export type TimeAllocation = z.infer<typeof timeAllocationSchema>;
export type TimeUtilizationMetrics = z.infer<typeof timeUtilizationMetricsSchema>;

export type CreateOKRRequest = z.infer<typeof createOKRSchema>;
export type UpdateOKRRequest = z.infer<typeof updateOKRSchema>;
export type CreateKeyResultRequest = z.infer<typeof createKeyResultSchema>;
export type UpdateKeyResultRequest = z.infer<typeof updateKeyResultSchema>;
export type CreateTimeEntryRequest = z.infer<typeof createTimeEntrySchema>;
export type UpdateTimeEntryRequest = z.infer<typeof updateTimeEntrySchema>;

export type OKRWithRelations = z.infer<typeof okrWithRelationsSchema>; 