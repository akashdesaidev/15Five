import { z } from 'zod';
import { UserRole, UserStatus } from '../types/user';

export const userRoleSchema = z.nativeEnum(UserRole);
export const userStatusSchema = z.nativeEnum(UserStatus);

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  role: userRoleSchema,
  status: userStatusSchema,
  hireDate: z.date(),
  terminationDate: z.date().optional(),
  currentManagerId: z.string().uuid().optional(),
  organizationId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export const userCreateSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  role: userRoleSchema,
  hireDate: z.date(),
  currentManagerId: z.string().uuid().optional(),
  organizationId: z.string().uuid(),
});

export const userUpdateSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  role: userRoleSchema.optional(),
  status: userStatusSchema.optional(),
  currentManagerId: z.string().uuid().optional(),
  terminationDate: z.date().optional(),
}).strict();

export type User = z.infer<typeof userSchema>;
export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>; 