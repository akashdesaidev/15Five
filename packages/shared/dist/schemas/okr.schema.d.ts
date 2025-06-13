import { z } from 'zod';
import { OkrType, OkrStatus, SnapshotType } from '../types/okr';
export declare const okrTypeSchema: z.ZodNativeEnum<typeof OkrType>;
export declare const okrStatusSchema: z.ZodNativeEnum<typeof OkrStatus>;
export declare const snapshotTypeSchema: z.ZodNativeEnum<typeof SnapshotType>;
export declare const okrSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodNativeEnum<typeof OkrType>;
    status: z.ZodNativeEnum<typeof OkrStatus>;
    parentOkrId: z.ZodOptional<z.ZodString>;
    ownerId: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: OkrStatus;
    createdAt: Date;
    updatedAt: Date;
    type: OkrType;
    title: string;
    ownerId: string;
    deletedAt?: Date | undefined;
    description?: string | undefined;
    parentOkrId?: string | undefined;
}, {
    id: string;
    status: OkrStatus;
    createdAt: Date;
    updatedAt: Date;
    type: OkrType;
    title: string;
    ownerId: string;
    deletedAt?: Date | undefined;
    description?: string | undefined;
    parentOkrId?: string | undefined;
}>;
export declare const keyResultSchema: z.ZodObject<{
    id: z.ZodString;
    okrId: z.ZodString;
    description: z.ZodString;
    targetScore: z.ZodNumber;
    currentScore: z.ZodNumber;
    progressNotes: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    version: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
    okrId: string;
    description: string;
    targetScore: number;
    currentScore: number;
    progressNotes?: string | undefined;
    dueDate?: Date | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
    okrId: string;
    description: string;
    targetScore: number;
    currentScore: number;
    progressNotes?: string | undefined;
    dueDate?: Date | undefined;
}>;
export declare const okrProgressSnapshotSchema: z.ZodObject<{
    id: z.ZodString;
    keyResultId: z.ZodString;
    score: z.ZodNumber;
    notes: z.ZodOptional<z.ZodString>;
    recordedAt: z.ZodDate;
    recordedById: z.ZodString;
    snapshotType: z.ZodNativeEnum<typeof SnapshotType>;
}, "strip", z.ZodTypeAny, {
    id: string;
    keyResultId: string;
    score: number;
    recordedAt: Date;
    recordedById: string;
    snapshotType: SnapshotType;
    notes?: string | undefined;
}, {
    id: string;
    keyResultId: string;
    score: number;
    recordedAt: Date;
    recordedById: string;
    snapshotType: SnapshotType;
    notes?: string | undefined;
}>;
export declare const okrCreateSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodNativeEnum<typeof OkrType>;
    parentOkrId: z.ZodOptional<z.ZodString>;
    ownerId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    type: OkrType;
    title: string;
    ownerId: string;
    description?: string | undefined;
    parentOkrId?: string | undefined;
}, {
    type: OkrType;
    title: string;
    ownerId: string;
    description?: string | undefined;
    parentOkrId?: string | undefined;
}>;
export declare const keyResultCreateSchema: z.ZodObject<{
    okrId: z.ZodString;
    description: z.ZodString;
    targetScore: z.ZodOptional<z.ZodNumber>;
    dueDate: z.ZodOptional<z.ZodDate>;
}, "strict", z.ZodTypeAny, {
    okrId: string;
    description: string;
    targetScore?: number | undefined;
    dueDate?: Date | undefined;
}, {
    okrId: string;
    description: string;
    targetScore?: number | undefined;
    dueDate?: Date | undefined;
}>;
export declare const okrUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof OkrStatus>>;
    parentOkrId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    status?: OkrStatus | undefined;
    title?: string | undefined;
    description?: string | undefined;
    parentOkrId?: string | undefined;
}, {
    status?: OkrStatus | undefined;
    title?: string | undefined;
    description?: string | undefined;
    parentOkrId?: string | undefined;
}>;
export declare const keyResultUpdateSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    targetScore: z.ZodOptional<z.ZodNumber>;
    currentScore: z.ZodOptional<z.ZodNumber>;
    progressNotes: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodDate>;
}, "strict", z.ZodTypeAny, {
    description?: string | undefined;
    targetScore?: number | undefined;
    currentScore?: number | undefined;
    progressNotes?: string | undefined;
    dueDate?: Date | undefined;
}, {
    description?: string | undefined;
    targetScore?: number | undefined;
    currentScore?: number | undefined;
    progressNotes?: string | undefined;
    dueDate?: Date | undefined;
}>;
export type Okr = z.infer<typeof okrSchema>;
export type KeyResult = z.infer<typeof keyResultSchema>;
export type OkrProgressSnapshot = z.infer<typeof okrProgressSnapshotSchema>;
export type OkrCreateInput = z.infer<typeof okrCreateSchema>;
export type KeyResultCreateInput = z.infer<typeof keyResultCreateSchema>;
export type OkrUpdateInput = z.infer<typeof okrUpdateSchema>;
export type KeyResultUpdateInput = z.infer<typeof keyResultUpdateSchema>;
