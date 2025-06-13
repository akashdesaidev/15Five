"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResponseSchema = exports.teamResponseSchema = exports.departmentResponseSchema = exports.updateUserSchema = exports.createUserSchema = exports.userSchema = exports.notificationFrequencyEnum = exports.userStatusEnum = exports.userRoleEnum = void 0;
const zod_1 = require("zod");
// Base enums/constants as Zod enums
exports.userRoleEnum = zod_1.z.enum(['admin', 'hr', 'manager', 'employee']);
exports.userStatusEnum = zod_1.z.enum(['active', 'inactive', 'departed']);
exports.notificationFrequencyEnum = zod_1.z.enum(['daily', 'weekly', 'monthly']);
// Base user schema
exports.userSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string().min(1).max(100),
    lastName: zod_1.z.string().min(1).max(100),
    role: exports.userRoleEnum,
    status: exports.userStatusEnum,
    // Employment info
    hireDate: zod_1.z.date(),
    terminationDate: zod_1.z.date().optional(),
    currentManagerId: zod_1.z.string().uuid().optional(),
    // Notification preferences
    emailNotificationsEnabled: zod_1.z.boolean(),
    notificationFrequency: exports.notificationFrequencyEnum,
    // Metadata
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    deletedAt: zod_1.z.date().optional(),
    organizationId: zod_1.z.string().uuid()
});
// Create user request schema
exports.createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string().min(1).max(100),
    lastName: zod_1.z.string().min(1).max(100),
    role: exports.userRoleEnum,
    hireDate: zod_1.z.date(),
    currentManagerId: zod_1.z.string().uuid().optional(),
    departmentId: zod_1.z.string().uuid().optional(),
    teamId: zod_1.z.string().uuid().optional(),
    organizationId: zod_1.z.string().uuid()
});
// Update user request schema
exports.updateUserSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(100).optional(),
    lastName: zod_1.z.string().min(1).max(100).optional(),
    role: exports.userRoleEnum.optional(),
    status: exports.userStatusEnum.optional(),
    currentManagerId: zod_1.z.string().uuid().optional(),
    departmentId: zod_1.z.string().uuid().optional(),
    teamId: zod_1.z.string().uuid().optional(),
    emailNotificationsEnabled: zod_1.z.boolean().optional(),
    notificationFrequency: exports.notificationFrequencyEnum.optional()
}).strict();
// Response schemas
exports.departmentResponseSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string()
});
exports.teamResponseSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string()
});
exports.userResponseSchema = exports.userSchema.extend({
    manager: exports.userSchema.optional(),
    department: exports.departmentResponseSchema.optional(),
    team: exports.teamResponseSchema.optional()
});
