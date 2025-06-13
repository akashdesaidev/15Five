import { z } from 'zod';
export declare const organizationSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    deletedAt?: Date | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    deletedAt?: Date | undefined;
}>;
export declare const departmentSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    organizationId: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    organizationId: string;
    name: string;
    deletedAt?: Date | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    organizationId: string;
    name: string;
    deletedAt?: Date | undefined;
}>;
export declare const teamSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    departmentId: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    departmentId: string;
    name: string;
    deletedAt?: Date | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    departmentId: string;
    name: string;
    deletedAt?: Date | undefined;
}>;
export declare const organizationCreateSchema: z.ZodObject<{
    name: z.ZodString;
}, "strict", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export declare const departmentCreateSchema: z.ZodObject<{
    name: z.ZodString;
    organizationId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    organizationId: string;
    name: string;
}, {
    organizationId: string;
    name: string;
}>;
export declare const teamCreateSchema: z.ZodObject<{
    name: z.ZodString;
    departmentId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    departmentId: string;
    name: string;
}, {
    departmentId: string;
    name: string;
}>;
export declare const organizationUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
}, {
    name?: string | undefined;
}>;
export declare const departmentUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
}, {
    name?: string | undefined;
}>;
export declare const teamUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    departmentId?: string | undefined;
    name?: string | undefined;
}, {
    departmentId?: string | undefined;
    name?: string | undefined;
}>;
export type Organization = z.infer<typeof organizationSchema>;
export type Department = z.infer<typeof departmentSchema>;
export type Team = z.infer<typeof teamSchema>;
export type OrganizationCreateInput = z.infer<typeof organizationCreateSchema>;
export type DepartmentCreateInput = z.infer<typeof departmentCreateSchema>;
export type TeamCreateInput = z.infer<typeof teamCreateSchema>;
export type OrganizationUpdateInput = z.infer<typeof organizationUpdateSchema>;
export type DepartmentUpdateInput = z.infer<typeof departmentUpdateSchema>;
export type TeamUpdateInput = z.infer<typeof teamUpdateSchema>;
