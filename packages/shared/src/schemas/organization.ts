import { z } from 'zod';

// Base organization schema
export const organizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  timezone: z.string().regex(/^[A-Za-z_/]+$/), // e.g., "America/New_York"
  fiscalYearStartMonth: z.number().min(1).max(12),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional()
});

// Department schema
export const departmentSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  organizationId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional()
});

// Team schema
export const teamSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  departmentId: z.string().uuid(),
  organizationId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional()
});

// Request schemas
export const createOrganizationSchema = z.object({
  name: z.string().min(1).max(200),
  timezone: z.string().regex(/^[A-Za-z_/]+$/),
  fiscalYearStartMonth: z.number().min(1).max(12)
}).strict();

export const updateOrganizationSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  timezone: z.string().regex(/^[A-Za-z_/]+$/).optional(),
  fiscalYearStartMonth: z.number().min(1).max(12).optional()
}).strict();

export const createDepartmentSchema = z.object({
  name: z.string().min(1).max(200),
  organizationId: z.string().uuid()
}).strict();

export const updateDepartmentSchema = z.object({
  name: z.string().min(1).max(200).optional()
}).strict();

export const createTeamSchema = z.object({
  name: z.string().min(1).max(200),
  departmentId: z.string().uuid(),
  organizationId: z.string().uuid()
}).strict();

export const updateTeamSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  departmentId: z.string().uuid().optional()
}).strict();

// Response schemas with relations
export const departmentWithTeamsSchema = departmentSchema.extend({
  teams: z.array(teamSchema)
});

export const organizationWithStructureSchema = organizationSchema.extend({
  departments: z.array(departmentWithTeamsSchema)
});

// Types
export type Organization = z.infer<typeof organizationSchema>;
export type Department = z.infer<typeof departmentSchema>;
export type Team = z.infer<typeof teamSchema>;
export type CreateOrganizationRequest = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationRequest = z.infer<typeof updateOrganizationSchema>;
export type CreateDepartmentRequest = z.infer<typeof createDepartmentSchema>;
export type UpdateDepartmentRequest = z.infer<typeof updateDepartmentSchema>;
export type CreateTeamRequest = z.infer<typeof createTeamSchema>;
export type UpdateTeamRequest = z.infer<typeof updateTeamSchema>;
export type DepartmentWithTeams = z.infer<typeof departmentWithTeamsSchema>;
export type OrganizationWithStructure = z.infer<typeof organizationWithStructureSchema>; 