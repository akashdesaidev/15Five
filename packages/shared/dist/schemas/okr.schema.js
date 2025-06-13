"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyResultUpdateSchema = exports.okrUpdateSchema = exports.keyResultCreateSchema = exports.okrCreateSchema = exports.okrProgressSnapshotSchema = exports.keyResultSchema = exports.okrSchema = exports.snapshotTypeSchema = exports.okrStatusSchema = exports.okrTypeSchema = void 0;
const zod_1 = require("zod");
const okr_1 = require("../types/okr");
exports.okrTypeSchema = zod_1.z.nativeEnum(okr_1.OkrType);
exports.okrStatusSchema = zod_1.z.nativeEnum(okr_1.OkrStatus);
exports.snapshotTypeSchema = zod_1.z.nativeEnum(okr_1.SnapshotType);
exports.okrSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().min(1).max(200),
    description: zod_1.z.string().max(1000).optional(),
    type: exports.okrTypeSchema,
    status: exports.okrStatusSchema,
    parentOkrId: zod_1.z.string().uuid().optional(),
    ownerId: zod_1.z.string().uuid(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    deletedAt: zod_1.z.date().optional(),
});
exports.keyResultSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    okrId: zod_1.z.string().uuid(),
    description: zod_1.z.string().min(1).max(500),
    targetScore: zod_1.z.number().int().min(1).max(10),
    currentScore: zod_1.z.number().int().min(1).max(10),
    progressNotes: zod_1.z.string().max(1000).optional(),
    dueDate: zod_1.z.date().optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    version: zod_1.z.number().int().min(1),
});
exports.okrProgressSnapshotSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    keyResultId: zod_1.z.string().uuid(),
    score: zod_1.z.number().int().min(1).max(10),
    notes: zod_1.z.string().max(1000).optional(),
    recordedAt: zod_1.z.date(),
    recordedById: zod_1.z.string().uuid(),
    snapshotType: exports.snapshotTypeSchema,
});
exports.okrCreateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200),
    description: zod_1.z.string().max(1000).optional(),
    type: exports.okrTypeSchema,
    parentOkrId: zod_1.z.string().uuid().optional(),
    ownerId: zod_1.z.string().uuid(),
}).strict();
exports.keyResultCreateSchema = zod_1.z.object({
    okrId: zod_1.z.string().uuid(),
    description: zod_1.z.string().min(1).max(500),
    targetScore: zod_1.z.number().int().min(1).max(10).optional(),
    dueDate: zod_1.z.date().optional(),
}).strict();
exports.okrUpdateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200).optional(),
    description: zod_1.z.string().max(1000).optional(),
    status: exports.okrStatusSchema.optional(),
    parentOkrId: zod_1.z.string().uuid().optional(),
}).strict();
exports.keyResultUpdateSchema = zod_1.z.object({
    description: zod_1.z.string().min(1).max(500).optional(),
    targetScore: zod_1.z.number().int().min(1).max(10).optional(),
    currentScore: zod_1.z.number().int().min(1).max(10).optional(),
    progressNotes: zod_1.z.string().max(1000).optional(),
    dueDate: zod_1.z.date().optional(),
}).strict();
