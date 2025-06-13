"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamUpdateSchema = exports.departmentUpdateSchema = exports.organizationUpdateSchema = exports.teamCreateSchema = exports.departmentCreateSchema = exports.organizationCreateSchema = exports.teamSchema = exports.departmentSchema = exports.organizationSchema = void 0;
const zod_1 = require("zod");
exports.organizationSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1).max(100),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    deletedAt: zod_1.z.date().optional(),
});
exports.departmentSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1).max(100),
    organizationId: zod_1.z.string().uuid(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    deletedAt: zod_1.z.date().optional(),
});
exports.teamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1).max(100),
    departmentId: zod_1.z.string().uuid(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    deletedAt: zod_1.z.date().optional(),
});
exports.organizationCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
}).strict();
exports.departmentCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    organizationId: zod_1.z.string().uuid(),
}).strict();
exports.teamCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    departmentId: zod_1.z.string().uuid(),
}).strict();
exports.organizationUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100).optional(),
}).strict();
exports.departmentUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100).optional(),
}).strict();
exports.teamUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100).optional(),
    departmentId: zod_1.z.string().uuid().optional(),
}).strict();
