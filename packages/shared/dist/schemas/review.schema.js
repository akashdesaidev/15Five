"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewUpdateSchema = exports.reviewCycleUpdateSchema = exports.reviewCreateSchema = exports.reviewCycleCreateSchema = exports.reviewSchema = exports.reviewCycleSchema = exports.reviewStatusSchema = exports.reviewTypeSchema = exports.cycleStateSchema = exports.cycleTypeSchema = void 0;
const zod_1 = require("zod");
const review_1 = require("../types/review");
exports.cycleTypeSchema = zod_1.z.nativeEnum(review_1.CycleType);
exports.cycleStateSchema = zod_1.z.nativeEnum(review_1.CycleState);
exports.reviewTypeSchema = zod_1.z.nativeEnum(review_1.ReviewType);
exports.reviewStatusSchema = zod_1.z.nativeEnum(review_1.ReviewStatus);
exports.reviewCycleSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().min(1).max(200),
    type: exports.cycleTypeSchema,
    startDate: zod_1.z.date(),
    endDate: zod_1.z.date(),
    gracePeriodStart: zod_1.z.date().optional(),
    gracePeriodEnd: zod_1.z.date().optional(),
    isEmergencyCycle: zod_1.z.boolean(),
    parentCycleId: zod_1.z.string().uuid().optional(),
    state: exports.cycleStateSchema,
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.reviewSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    cycleId: zod_1.z.string().uuid(),
    reviewerId: zod_1.z.string().uuid(),
    revieweeId: zod_1.z.string().uuid(),
    reviewType: exports.reviewTypeSchema,
    isAnonymous: zod_1.z.boolean(),
    content: zod_1.z.record(zod_1.z.unknown()),
    status: exports.reviewStatusSchema,
    submittedAt: zod_1.z.date().optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    version: zod_1.z.number().int().min(1),
});
exports.reviewCycleCreateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200),
    type: exports.cycleTypeSchema,
    startDate: zod_1.z.date(),
    endDate: zod_1.z.date(),
    gracePeriodStart: zod_1.z.date().optional(),
    gracePeriodEnd: zod_1.z.date().optional(),
    isEmergencyCycle: zod_1.z.boolean().optional(),
    parentCycleId: zod_1.z.string().uuid().optional(),
}).strict();
exports.reviewCreateSchema = zod_1.z.object({
    cycleId: zod_1.z.string().uuid(),
    reviewerId: zod_1.z.string().uuid(),
    revieweeId: zod_1.z.string().uuid(),
    reviewType: exports.reviewTypeSchema,
    isAnonymous: zod_1.z.boolean().optional(),
    content: zod_1.z.record(zod_1.z.unknown()).optional(),
}).strict();
exports.reviewCycleUpdateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200).optional(),
    startDate: zod_1.z.date().optional(),
    endDate: zod_1.z.date().optional(),
    gracePeriodStart: zod_1.z.date().optional(),
    gracePeriodEnd: zod_1.z.date().optional(),
    state: exports.cycleStateSchema.optional(),
}).strict();
exports.reviewUpdateSchema = zod_1.z.object({
    content: zod_1.z.record(zod_1.z.unknown()).optional(),
    status: exports.reviewStatusSchema.optional(),
    isAnonymous: zod_1.z.boolean().optional(),
}).strict();
