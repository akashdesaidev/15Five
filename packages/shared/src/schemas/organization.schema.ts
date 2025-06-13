import { z } from 'zod';

export const organizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export const departmentSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  organizationId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export const teamSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  departmentId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export const organizationCreateSchema = z.object({
  name: z.string().min(1).max(100),
}).strict();

export const departmentCreateSchema = z.object({
  name: z.string().min(1).max(100),
  organizationId: z.string().uuid(),
}).strict();

export const teamCreateSchema = z.object({
  name: z.string().min(1).max(100),
  departmentId: z.string().uuid(),
}).strict();

export const organizationUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
}).strict();

export const departmentUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
}).strict();

export const teamUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  departmentId: z.string().uuid().optional(),
}).strict();

export type Organization = z.infer<typeof organizationSchema>;
export type Department = z.infer<typeof departmentSchema>;
export type Team = z.infer<typeof teamSchema>;
export type OrganizationCreateInput = z.infer<typeof organizationCreateSchema>;
export type DepartmentCreateInput = z.infer<typeof departmentCreateSchema>;
export type TeamCreateInput = z.infer<typeof teamCreateSchema>;
export type OrganizationUpdateInput = z.infer<typeof organizationUpdateSchema>;
export type DepartmentUpdateInput = z.infer<typeof departmentUpdateSchema>;
export type TeamUpdateInput = z.infer<typeof teamUpdateSchema>; 