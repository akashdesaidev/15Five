"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeUtilizationMetricsSchema = exports.timeEntryUpdateSchema = exports.timeEntryCreateSchema = exports.timeEntrySchema = exports.timeEntryCategorySchema = void 0;
const zod_1 = require("zod");
const time_1 = require("../types/time");
exports.timeEntryCategorySchema = zod_1.z.nativeEnum(time_1.TimeEntryCategory);
exports.timeEntrySchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
    okrId: zod_1.z.string().uuid(),
    keyResultId: zod_1.z.string().uuid().optional(),
    date: zod_1.z.date(),
    hoursSpent: zod_1.z.number().min(0).max(24),
    description: zod_1.z.string().max(500).optional(),
    category: exports.timeEntryCategorySchema,
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    deletedAt: zod_1.z.date().optional(),
});
exports.timeEntryCreateSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    okrId: zod_1.z.string().uuid(),
    keyResultId: zod_1.z.string().uuid().optional(),
    date: zod_1.z.date(),
    hoursSpent: zod_1.z.number().min(0).max(24),
    description: zod_1.z.string().max(500).optional(),
    category: exports.timeEntryCategorySchema,
}).strict();
exports.timeEntryUpdateSchema = zod_1.z.object({
    hoursSpent: zod_1.z.number().min(0).max(24).optional(),
    description: zod_1.z.string().max(500).optional(),
    category: exports.timeEntryCategorySchema.optional(),
}).strict();
exports.timeUtilizationMetricsSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    okrId: zod_1.z.string().uuid(),
    weekStarting: zod_1.z.date(),
    plannedHours: zod_1.z.number().min(0),
    actualHours: zod_1.z.number().min(0),
    efficiencyScore: zod_1.z.number().min(0).max(1),
});
