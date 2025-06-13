"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationWithStructureSchema = exports.departmentWithTeamsSchema = exports.updateTeamSchema = exports.createTeamSchema = exports.updateDepartmentSchema = exports.createDepartmentSchema = exports.updateOrganizationSchema = exports.createOrganizationSchema = exports.teamSchema = exports.departmentSchema = exports.organizationSchema = void 0;
const zod_1 = require("zod");
// Base organization schema
exports.organizationSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1).max(200),
    timezone: zod_1.z.string().regex(/^[A-Za-z_/]+$/), // e.g., "America/New_York"
    fiscalYearStartMonth: zod_1.z.number().min(1).max(12),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    deletedAt: zod_1.z.date().optional()
});
// Department schema
exports.departmentSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1).max(200),
    organizationId: zod_1.z.string().uuid(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    deletedAt: zod_1.z.date().optional()
});
// Team schema
exports.teamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1).max(200),
    departmentId: zod_1.z.string().uuid(),
    organizationId: zod_1.z.string().uuid(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    deletedAt: zod_1.z.date().optional()
});
// Request schemas
exports.createOrganizationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(200),
    timezone: zod_1.z.string().regex(/^[A-Za-z_/]+$/),
    fiscalYearStartMonth: zod_1.z.number().min(1).max(12)
}).strict();
exports.updateOrganizationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(200).optional(),
    timezone: zod_1.z.string().regex(/^[A-Za-z_/]+$/).optional(),
    fiscalYearStartMonth: zod_1.z.number().min(1).max(12).optional()
}).strict();
exports.createDepartmentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(200),
    organizationId: zod_1.z.string().uuid()
}).strict();
exports.updateDepartmentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(200).optional()
}).strict();
exports.createTeamSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(200),
    departmentId: zod_1.z.string().uuid(),
    organizationId: zod_1.z.string().uuid()
}).strict();
exports.updateTeamSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(200).optional(),
    departmentId: zod_1.z.string().uuid().optional()
}).strict();
// Response schemas with relations
exports.departmentWithTeamsSchema = exports.departmentSchema.extend({
    teams: zod_1.z.array(exports.teamSchema)
});
exports.organizationWithStructureSchema = exports.organizationSchema.extend({
    departments: zod_1.z.array(exports.departmentWithTeamsSchema)
});
