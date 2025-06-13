export * from './review';
export * from './time';
export type UUID = string;
export type ISODateString = string;
import { z } from 'zod';
export declare const uuidSchema: z.ZodString;
export declare const isoDateSchema: z.ZodString;
export declare const emailSchema: z.ZodString;
export declare const phoneSchema: z.ZodString;
export declare const urlSchema: z.ZodString;
export declare const paginatedResponseSchema: <T extends z.ZodType>(schema: T) => z.ZodObject<{
    items: z.ZodArray<T, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
    hasMore: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    items: T["_output"][];
    total: number;
    hasMore: boolean;
}, {
    page: number;
    pageSize: number;
    items: T["_input"][];
    total: number;
    hasMore: boolean;
}>;
export declare const errorResponseSchema: z.ZodObject<{
    message: z.ZodString;
    code: z.ZodString;
    details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
    details?: Record<string, unknown> | undefined;
}, {
    code: string;
    message: string;
    details?: Record<string, unknown> | undefined;
}>;
export declare const paginationQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
}, {
    page?: number | undefined;
    pageSize?: number | undefined;
}>;
export declare const sortQuerySchema: z.ZodObject<{
    sortBy: z.ZodString;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    sortBy: string;
    sortOrder: "asc" | "desc";
}, {
    sortBy: string;
    sortOrder?: "asc" | "desc" | undefined;
}>;
export type PaginatedResponse<T> = z.infer<ReturnType<typeof paginatedResponseSchema<z.ZodType<T>>>>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
export type SortQuery = z.infer<typeof sortQuerySchema>;
