"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateSchema = exports.userCreateSchema = exports.userSchema = exports.userStatusSchema = exports.userRoleSchema = void 0;
const zod_1 = require("zod");
const user_1 = require("../types/user");
exports.userRoleSchema = zod_1.z.nativeEnum(user_1.UserRole);
exports.userStatusSchema = zod_1.z.nativeEnum(user_1.UserStatus);
exports.userSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string().min(1).max(100),
    lastName: zod_1.z.string().min(1).max(100),
    role: exports.userRoleSchema,
    status: exports.userStatusSchema,
    hireDate: zod_1.z.date(),
    terminationDate: zod_1.z.date().optional(),
    currentManagerId: zod_1.z.string().uuid().optional(),
    organizationId: zod_1.z.string().uuid(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    deletedAt: zod_1.z.date().optional(),
});
exports.userCreateSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string().min(1).max(100),
    lastName: zod_1.z.string().min(1).max(100),
    role: exports.userRoleSchema,
    hireDate: zod_1.z.date(),
    currentManagerId: zod_1.z.string().uuid().optional(),
    organizationId: zod_1.z.string().uuid(),
});
exports.userUpdateSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(100).optional(),
    lastName: zod_1.z.string().min(1).max(100).optional(),
    role: exports.userRoleSchema.optional(),
    status: exports.userStatusSchema.optional(),
    currentManagerId: zod_1.z.string().uuid().optional(),
    terminationDate: zod_1.z.date().optional(),
}).strict();
