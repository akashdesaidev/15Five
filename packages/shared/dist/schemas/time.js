"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeAllocationWithRelationsSchema = exports.timeEntryWithRelationsSchema = exports.updateTimeAllocationSchema = exports.createTimeAllocationSchema = exports.updateTimeEntrySchema = exports.createTimeEntrySchema = exports.timeUtilizationMetricsSchema = exports.timeAllocationSchema = exports.timeEntrySchema = exports.timeEntryCategoryEnum = void 0;
const zod_1 = require("zod");
// Base enums/constants as Zod enums
exports.timeEntryCategoryEnum = zod_1.z.enum([
    'direct_work',
    'planning',
    'collaboration',
    'review',
    'other'
]);
// Time entry schema
exports.timeEntrySchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
    okrId: zod_1.z.string().uuid(),
    keyResultId: zod_1.z.string().uuid().optional(),
    date: zod_1.z.date(),
    hoursSpent: zod_1.z.number().positive().max(24),
    description: zod_1.z.string().optional(),
    category: exports.timeEntryCategoryEnum,
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    deletedAt: zod_1.z.date().optional()
});
// Time allocation schema
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
// Time utilization metrics schema
exports.timeUtilizationMetricsSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
    okrId: zod_1.z.string().uuid(),
    weekStarting: zod_1.z.date(),
    plannedHours: zod_1.z.number().optional(),
    actualHours: zod_1.z.number().optional(),
    efficiencyScore: zod_1.z.number().min(0).max(1).optional(),
    createdAt: zod_1.z.date()
});
// Request schemas
exports.createTimeEntrySchema = zod_1.z.object({
    okrId: zod_1.z.string().uuid(),
    keyResultId: zod_1.z.string().uuid().optional(),
    date: zod_1.z.date(),
    hoursSpent: zod_1.z.number().positive().max(24),
    description: zod_1.z.string().optional(),
    category: exports.timeEntryCategoryEnum
}).strict();
exports.updateTimeEntrySchema = zod_1.z.object({
    hoursSpent: zod_1.z.number().positive().max(24).optional(),
    description: zod_1.z.string().optional(),
    category: exports.timeEntryCategoryEnum.optional()
}).strict();
exports.createTimeAllocationSchema = zod_1.z.object({
    okrId: zod_1.z.string().uuid(),
    expectedWeeklyHours: zod_1.z.number().positive().max(40),
    minimumAllocationPercentage: zod_1.z.number().min(0).max(100),
    startDate: zod_1.z.date(),
    endDate: zod_1.z.date().optional()
}).strict();
exports.updateTimeAllocationSchema = zod_1.z.object({
    expectedWeeklyHours: zod_1.z.number().positive().max(40).optional(),
    minimumAllocationPercentage: zod_1.z.number().min(0).max(100).optional(),
    endDate: zod_1.z.date().optional()
}).strict();
// Response schemas with relations
exports.timeEntryWithRelationsSchema = exports.timeEntrySchema.extend({
    okr: zod_1.z.object({
        id: zod_1.z.string().uuid(),
        title: zod_1.z.string()
    }),
    keyResult: zod_1.z.object({
        id: zod_1.z.string().uuid(),
        description: zod_1.z.string()
    }).optional(),
    user: zod_1.z.object({
        id: zod_1.z.string().uuid(),
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string()
    })
});
exports.timeAllocationWithRelationsSchema = exports.timeAllocationSchema.extend({
    okr: zod_1.z.object({
        id: zod_1.z.string().uuid(),
        title: zod_1.z.string()
    })
});
