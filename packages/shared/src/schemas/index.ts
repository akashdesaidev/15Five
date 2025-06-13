// Re-export all schemas
export * from './review';
export * from './time';

// Export common types
export type UUID = string;
export type ISODateString = string;

// Export common validation patterns
import { z } from 'zod';

export const uuidSchema = z.string().uuid();
export const isoDateSchema = z.string().datetime();
export const emailSchema = z.string().email();
export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/);
export const urlSchema = z.string().url();

// Common response schemas
export const paginatedResponseSchema = <T extends z.ZodType>(schema: T) =>
  z.object({
    items: z.array(schema),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    pageSize: z.number().int().positive(),
    hasMore: z.boolean()
  });

export const errorResponseSchema = z.object({
  message: z.string(),
  code: z.string(),
  details: z.record(z.unknown()).optional()
});

// Common request schemas
export const paginationQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(20)
});

export const sortQuerySchema = z.object({
  sortBy: z.string(),
  sortOrder: z.enum(['asc', 'desc']).default('asc')
});

// Types
export type PaginatedResponse<T> = z.infer<ReturnType<typeof paginatedResponseSchema<z.ZodType<T>>>>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
export type SortQuery = z.infer<typeof sortQuerySchema>; 