import { z } from 'zod';
import { TimeEntryCategory } from '../types/time';
export declare const timeEntryCategorySchema: z.ZodNativeEnum<typeof TimeEntryCategory>;
export declare const timeEntrySchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    okrId: z.ZodString;
    keyResultId: z.ZodOptional<z.ZodString>;
    date: z.ZodDate;
    hoursSpent: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodNativeEnum<typeof TimeEntryCategory>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    date: Date;
    userId: string;
    okrId: string;
    hoursSpent: number;
    category: TimeEntryCategory;
    deletedAt?: Date | undefined;
    keyResultId?: string | undefined;
    description?: string | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    date: Date;
    userId: string;
    okrId: string;
    hoursSpent: number;
    category: TimeEntryCategory;
    deletedAt?: Date | undefined;
    keyResultId?: string | undefined;
    description?: string | undefined;
}>;
export declare const timeEntryCreateSchema: z.ZodObject<{
    userId: z.ZodString;
    okrId: z.ZodString;
    keyResultId: z.ZodOptional<z.ZodString>;
    date: z.ZodDate;
    hoursSpent: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodNativeEnum<typeof TimeEntryCategory>;
}, "strict", z.ZodTypeAny, {
    date: Date;
    userId: string;
    okrId: string;
    hoursSpent: number;
    category: TimeEntryCategory;
    keyResultId?: string | undefined;
    description?: string | undefined;
}, {
    date: Date;
    userId: string;
    okrId: string;
    hoursSpent: number;
    category: TimeEntryCategory;
    keyResultId?: string | undefined;
    description?: string | undefined;
}>;
export declare const timeEntryUpdateSchema: z.ZodObject<{
    hoursSpent: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodNativeEnum<typeof TimeEntryCategory>>;
}, "strict", z.ZodTypeAny, {
    hoursSpent?: number | undefined;
    description?: string | undefined;
    category?: TimeEntryCategory | undefined;
}, {
    hoursSpent?: number | undefined;
    description?: string | undefined;
    category?: TimeEntryCategory | undefined;
}>;
export declare const timeUtilizationMetricsSchema: z.ZodObject<{
    userId: z.ZodString;
    okrId: z.ZodString;
    weekStarting: z.ZodDate;
    plannedHours: z.ZodNumber;
    actualHours: z.ZodNumber;
    efficiencyScore: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    userId: string;
    okrId: string;
    weekStarting: Date;
    plannedHours: number;
    actualHours: number;
    efficiencyScore: number;
}, {
    userId: string;
    okrId: string;
    weekStarting: Date;
    plannedHours: number;
    actualHours: number;
    efficiencyScore: number;
}>;
export type TimeEntry = z.infer<typeof timeEntrySchema>;
export type TimeEntryCreateInput = z.infer<typeof timeEntryCreateSchema>;
export type TimeEntryUpdateInput = z.infer<typeof timeEntryUpdateSchema>;
export type TimeUtilizationMetrics = z.infer<typeof timeUtilizationMetricsSchema>;
