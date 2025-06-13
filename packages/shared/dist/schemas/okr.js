"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.okrWithRelationsSchema = exports.updateTimeEntrySchema = exports.createTimeEntrySchema = exports.updateKeyResultSchema = exports.createKeyResultSchema = exports.updateOKRSchema = exports.createOKRSchema = exports.timeUtilizationMetricsSchema = exports.timeAllocationSchema = exports.timeEntrySchema = exports.okrProgressSnapshotSchema = exports.keyResultSchema = exports.okrSchema = exports.snapshotTypeEnum = exports.timeEntryCategoryEnum = exports.okrStatusEnum = exports.okrTypeEnum = void 0;
const zod_1 = require("zod");
// Base enums/constants as Zod enums
exports.okrTypeEnum = zod_1.z.enum(['company', 'department', 'team', 'individual']);
exports.okrStatusEnum = zod_1.z.enum(['active', 'completed', 'archived']);
exports.timeEntryCategoryEnum = zod_1.z.enum(['direct_work', 'planning', 'collaboration', 'review', 'other']);
exports.snapshotTypeEnum = zod_1.z.enum(['manual', 'auto_weekly', 'cycle_end']);
// Base OKR schema
exports.okrSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().min(1).max(200),
    description: zod_1.z.string().max(2000).optional(),
    type: exports.okrTypeEnum,
    status: exports.okrStatusEnum,
    parentOkrId: zod_1.z.string().uuid().optional(),
    ownerUserId: zod_1.z.string().uuid(),
    organizationId: zod_1.z.string().uuid(),
    tags: zod_1.z.array(zod_1.z.string()),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    deletedAt: zod_1.z.date().optional()
});
// Key Result schema
exports.keyResultSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    okrId: zod_1.z.string().uuid(),
    description: zod_1.z.string().min(1).max(1000),
    targetScore: zod_1.z.number().min(1).max(10),
    currentScore: zod_1.z.number().min(1).max(10),
    progressNotes: zod_1.z.string().max(1000).optional(),
    dueDate: zod_1.z.date().optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    version: zod_1.z.number().int().positive()
});
// Progress Snapshot schema
exports.okrProgressSnapshotSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    keyResultId: zod_1.z.string().uuid(),
    score: zod_1.z.number().min(1).max(10),
    notes: zod_1.z.string().max(1000).optional(),
    recordedAt: zod_1.z.date(),
    recordedById: zod_1.z.string().uuid(),
    snapshotType: exports.snapshotTypeEnum
});
// Time Entry schema
exports.timeEntrySchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
    okrId: zod_1.z.string().uuid(),
    keyResultId: zod_1.z.string().uuid().optional(),
    date: zod_1.z.date(),
    hoursSpent: zod_1.z.number().positive().max(24),
    description: zod_1.z.string().max(500).optional(),
    category: exports.timeEntryCategoryEnum,
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    deletedAt: zod_1.z.date().optional()
});
// Time Allocation schema
exports.timeAllocationSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    okrId: zod_1.z.string().uuid(),
    expectedWeeklyHours: zod_1.z.number().positive().max(40),
    minimumAllocationPercentage: zod_1.z.number().min(0).max(100),
    startDate: zod_1.z.date(),
    endDate: zod_1.z.date().optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    deletedAt: zod_1.z.date().optional()
});
// Time Utilization Metrics schema
exports.timeUtilizationMetricsSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
    okrId: zod_1.z.string().uuid(),
    weekStarting: zod_1.z.date(),
    plannedHours: zod_1.z.number().nonnegative(),
    actualHours: zod_1.z.number().nonnegative(),
    efficiencyScore: zod_1.z.number().min(0).max(1),
    createdAt: zod_1.z.date()
});
// Request schemas
exports.createOKRSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200),
    description: zod_1.z.string().max(2000).optional(),
    type: exports.okrTypeEnum,
    parentOkrId: zod_1.z.string().uuid().optional(),
    ownerUserId: zod_1.z.string().uuid(),
    organizationId: zod_1.z.string().uuid(),
    tags: zod_1.z.array(zod_1.z.string()).optional()
}).strict();
exports.updateOKRSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200).optional(),
    description: zod_1.z.string().max(2000).optional(),
    status: exports.okrStatusEnum.optional(),
    parentOkrId: zod_1.z.string().uuid().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional()
}).strict();
exports.createKeyResultSchema = zod_1.z.object({
    okrId: zod_1.z.string().uuid(),
    description: zod_1.z.string().min(1).max(1000),
    targetScore: zod_1.z.number().min(1).max(10),
    dueDate: zod_1.z.date().optional()
}).strict();
exports.updateKeyResultSchema = zod_1.z.object({
    description: zod_1.z.string().min(1).max(1000).optional(),
    targetScore: zod_1.z.number().min(1).max(10).optional(),
    currentScore: zod_1.z.number().min(1).max(10).optional(),
    progressNotes: zod_1.z.string().max(1000).optional(),
    dueDate: zod_1.z.date().optional()
}).strict();
exports.createTimeEntrySchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    okrId: zod_1.z.string().uuid(),
    keyResultId: zod_1.z.string().uuid().optional(),
    date: zod_1.z.date(),
    hoursSpent: zod_1.z.number().positive().max(24),
    description: zod_1.z.string().max(500).optional(),
    category: exports.timeEntryCategoryEnum
}).strict();
exports.updateTimeEntrySchema = zod_1.z.object({
    hoursSpent: zod_1.z.number().positive().max(24).optional(),
    description: zod_1.z.string().max(500).optional(),
    category: exports.timeEntryCategoryEnum.optional()
}).strict();
// Response schemas with relations
exports.okrWithRelationsSchema = exports.okrSchema.extend({
    keyResults: zod_1.z.array(exports.keyResultSchema),
    parent: exports.okrSchema.optional(),
    children: zod_1.z.array(exports.okrSchema).optional(),
    owner: zod_1.z.object({
        id: zod_1.z.string().uuid(),
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
        email: zod_1.z.string().email()
    }),
    timeEntries: zod_1.z.array(exports.timeEntrySchema).optional(),
    timeAllocations: zod_1.z.array(exports.timeAllocationSchema).optional()
});
