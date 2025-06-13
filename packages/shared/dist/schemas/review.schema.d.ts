import { z } from 'zod';
import { CycleType, CycleState, ReviewType, ReviewStatus } from '../types/review';
export declare const cycleTypeSchema: z.ZodNativeEnum<typeof CycleType>;
export declare const cycleStateSchema: z.ZodNativeEnum<typeof CycleState>;
export declare const reviewTypeSchema: z.ZodNativeEnum<typeof ReviewType>;
export declare const reviewStatusSchema: z.ZodNativeEnum<typeof ReviewStatus>;
export declare const reviewCycleSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    type: z.ZodNativeEnum<typeof CycleType>;
    startDate: z.ZodDate;
    endDate: z.ZodDate;
    gracePeriodStart: z.ZodOptional<z.ZodDate>;
    gracePeriodEnd: z.ZodOptional<z.ZodDate>;
    isEmergencyCycle: z.ZodBoolean;
    parentCycleId: z.ZodOptional<z.ZodString>;
    state: z.ZodNativeEnum<typeof CycleState>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: CycleType;
    title: string;
    startDate: Date;
    endDate: Date;
    isEmergencyCycle: boolean;
    state: CycleState;
    gracePeriodStart?: Date | undefined;
    gracePeriodEnd?: Date | undefined;
    parentCycleId?: string | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: CycleType;
    title: string;
    startDate: Date;
    endDate: Date;
    isEmergencyCycle: boolean;
    state: CycleState;
    gracePeriodStart?: Date | undefined;
    gracePeriodEnd?: Date | undefined;
    parentCycleId?: string | undefined;
}>;
export declare const reviewSchema: z.ZodObject<{
    id: z.ZodString;
    cycleId: z.ZodString;
    reviewerId: z.ZodString;
    revieweeId: z.ZodString;
    reviewType: z.ZodNativeEnum<typeof ReviewType>;
    isAnonymous: z.ZodBoolean;
    content: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    status: z.ZodNativeEnum<typeof ReviewStatus>;
    submittedAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    version: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: ReviewStatus;
    createdAt: Date;
    updatedAt: Date;
    cycleId: string;
    reviewerId: string;
    revieweeId: string;
    reviewType: ReviewType;
    isAnonymous: boolean;
    content: Record<string, unknown>;
    version: number;
    submittedAt?: Date | undefined;
}, {
    id: string;
    status: ReviewStatus;
    createdAt: Date;
    updatedAt: Date;
    cycleId: string;
    reviewerId: string;
    revieweeId: string;
    reviewType: ReviewType;
    isAnonymous: boolean;
    content: Record<string, unknown>;
    version: number;
    submittedAt?: Date | undefined;
}>;
export declare const reviewCycleCreateSchema: z.ZodObject<{
    title: z.ZodString;
    type: z.ZodNativeEnum<typeof CycleType>;
    startDate: z.ZodDate;
    endDate: z.ZodDate;
    gracePeriodStart: z.ZodOptional<z.ZodDate>;
    gracePeriodEnd: z.ZodOptional<z.ZodDate>;
    isEmergencyCycle: z.ZodOptional<z.ZodBoolean>;
    parentCycleId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    type: CycleType;
    title: string;
    startDate: Date;
    endDate: Date;
    gracePeriodStart?: Date | undefined;
    gracePeriodEnd?: Date | undefined;
    isEmergencyCycle?: boolean | undefined;
    parentCycleId?: string | undefined;
}, {
    type: CycleType;
    title: string;
    startDate: Date;
    endDate: Date;
    gracePeriodStart?: Date | undefined;
    gracePeriodEnd?: Date | undefined;
    isEmergencyCycle?: boolean | undefined;
    parentCycleId?: string | undefined;
}>;
export declare const reviewCreateSchema: z.ZodObject<{
    cycleId: z.ZodString;
    reviewerId: z.ZodString;
    revieweeId: z.ZodString;
    reviewType: z.ZodNativeEnum<typeof ReviewType>;
    isAnonymous: z.ZodOptional<z.ZodBoolean>;
    content: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strict", z.ZodTypeAny, {
    cycleId: string;
    reviewerId: string;
    revieweeId: string;
    reviewType: ReviewType;
    isAnonymous?: boolean | undefined;
    content?: Record<string, unknown> | undefined;
}, {
    cycleId: string;
    reviewerId: string;
    revieweeId: string;
    reviewType: ReviewType;
    isAnonymous?: boolean | undefined;
    content?: Record<string, unknown> | undefined;
}>;
export declare const reviewCycleUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodDate>;
    endDate: z.ZodOptional<z.ZodDate>;
    gracePeriodStart: z.ZodOptional<z.ZodDate>;
    gracePeriodEnd: z.ZodOptional<z.ZodDate>;
    state: z.ZodOptional<z.ZodNativeEnum<typeof CycleState>>;
}, "strict", z.ZodTypeAny, {
    title?: string | undefined;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    gracePeriodStart?: Date | undefined;
    gracePeriodEnd?: Date | undefined;
    state?: CycleState | undefined;
}, {
    title?: string | undefined;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    gracePeriodStart?: Date | undefined;
    gracePeriodEnd?: Date | undefined;
    state?: CycleState | undefined;
}>;
export declare const reviewUpdateSchema: z.ZodObject<{
    content: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof ReviewStatus>>;
    isAnonymous: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    status?: ReviewStatus | undefined;
    isAnonymous?: boolean | undefined;
    content?: Record<string, unknown> | undefined;
}, {
    status?: ReviewStatus | undefined;
    isAnonymous?: boolean | undefined;
    content?: Record<string, unknown> | undefined;
}>;
export type ReviewCycle = z.infer<typeof reviewCycleSchema>;
export type Review = z.infer<typeof reviewSchema>;
export type ReviewCycleCreateInput = z.infer<typeof reviewCycleCreateSchema>;
export type ReviewCreateInput = z.infer<typeof reviewCreateSchema>;
export type ReviewCycleUpdateInput = z.infer<typeof reviewCycleUpdateSchema>;
export type ReviewUpdateInput = z.infer<typeof reviewUpdateSchema>;
