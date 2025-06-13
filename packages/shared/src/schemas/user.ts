import { z } from 'zod';

// Base enums/constants as Zod enums
export const userRoleEnum = z.enum(['admin', 'hr', 'manager', 'employee']);
export const userStatusEnum = z.enum(['active', 'inactive', 'departed']);
export const notificationFrequencyEnum = z.enum(['daily', 'weekly', 'monthly']);

// Base user schema
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  role: userRoleEnum,
  status: userStatusEnum,
  
  // Employment info
  hireDate: z.date(),
  terminationDate: z.date().optional(),
  currentManagerId: z.string().uuid().optional(),
  
  // Notification preferences
  emailNotificationsEnabled: z.boolean(),
  notificationFrequency: notificationFrequencyEnum,
  
  // Metadata
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
  organizationId: z.string().uuid()
});

// Create user request schema
export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  role: userRoleEnum,
  hireDate: z.date(),
  currentManagerId: z.string().uuid().optional(),
  departmentId: z.string().uuid().optional(),
  teamId: z.string().uuid().optional(),
  organizationId: z.string().uuid()
});

// Update user request schema
export const updateUserSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  role: userRoleEnum.optional(),
  status: userStatusEnum.optional(),
  currentManagerId: z.string().uuid().optional(),
  departmentId: z.string().uuid().optional(),
  teamId: z.string().uuid().optional(),
  emailNotificationsEnabled: z.boolean().optional(),
  notificationFrequency: notificationFrequencyEnum.optional()
}).strict();

// Response schemas
export const departmentResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
});

export const teamResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
});

export const userResponseSchema = userSchema.extend({
  manager: userSchema.optional(),
  department: departmentResponseSchema.optional(),
  team: teamResponseSchema.optional()
});

// Types
export type UserRole = z.infer<typeof userRoleEnum>;
export type UserStatus = z.infer<typeof userStatusEnum>;
export type NotificationFrequency = z.infer<typeof notificationFrequencyEnum>;
export type User = z.infer<typeof userSchema>;
export type CreateUserRequest = z.infer<typeof createUserSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>; 