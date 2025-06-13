import { z } from 'zod';
export declare const organizationSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    timezone: z.ZodString;
    fiscalYearStartMonth: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    timezone: string;
    fiscalYearStartMonth: number;
    deletedAt?: Date | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    timezone: string;
    fiscalYearStartMonth: number;
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
    organizationId: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    organizationId: string;
    departmentId: string;
    name: string;
    deletedAt?: Date | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    organizationId: string;
    departmentId: string;
    name: string;
    deletedAt?: Date | undefined;
}>;
export declare const createOrganizationSchema: z.ZodObject<{
    name: z.ZodString;
    timezone: z.ZodString;
    fiscalYearStartMonth: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    name: string;
    timezone: string;
    fiscalYearStartMonth: number;
}, {
    name: string;
    timezone: string;
    fiscalYearStartMonth: number;
}>;
export declare const updateOrganizationSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    timezone: z.ZodOptional<z.ZodString>;
    fiscalYearStartMonth: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
    timezone?: string | undefined;
    fiscalYearStartMonth?: number | undefined;
}, {
    name?: string | undefined;
    timezone?: string | undefined;
    fiscalYearStartMonth?: number | undefined;
}>;
export declare const createDepartmentSchema: z.ZodObject<{
    name: z.ZodString;
    organizationId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    organizationId: string;
    name: string;
}, {
    organizationId: string;
    name: string;
}>;
export declare const updateDepartmentSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
}, {
    name?: string | undefined;
}>;
export declare const createTeamSchema: z.ZodObject<{
    name: z.ZodString;
    departmentId: z.ZodString;
    organizationId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    organizationId: string;
    departmentId: string;
    name: string;
}, {
    organizationId: string;
    departmentId: string;
    name: string;
}>;
export declare const updateTeamSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    departmentId?: string | undefined;
    name?: string | undefined;
}, {
    departmentId?: string | undefined;
    name?: string | undefined;
}>;
export declare const departmentWithTeamsSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    organizationId: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
} & {
    teams: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        departmentId: z.ZodString;
        organizationId: z.ZodString;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        departmentId: string;
        name: string;
        deletedAt?: Date | undefined;
    }, {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        departmentId: string;
        name: string;
        deletedAt?: Date | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    organizationId: string;
    name: string;
    teams: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        departmentId: string;
        name: string;
        deletedAt?: Date | undefined;
    }[];
    deletedAt?: Date | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    organizationId: string;
    name: string;
    teams: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        departmentId: string;
        name: string;
        deletedAt?: Date | undefined;
    }[];
    deletedAt?: Date | undefined;
}>;
export declare const organizationWithStructureSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    timezone: z.ZodString;
    fiscalYearStartMonth: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
} & {
    departments: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        organizationId: z.ZodString;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
    } & {
        teams: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            departmentId: z.ZodString;
            organizationId: z.ZodString;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
            deletedAt: z.ZodOptional<z.ZodDate>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            departmentId: string;
            name: string;
            deletedAt?: Date | undefined;
        }, {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            departmentId: string;
            name: string;
            deletedAt?: Date | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        name: string;
        teams: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            departmentId: string;
            name: string;
            deletedAt?: Date | undefined;
        }[];
        deletedAt?: Date | undefined;
    }, {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        name: string;
        teams: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            departmentId: string;
            name: string;
            deletedAt?: Date | undefined;
        }[];
        deletedAt?: Date | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    timezone: string;
    fiscalYearStartMonth: number;
    departments: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        name: string;
        teams: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            departmentId: string;
            name: string;
            deletedAt?: Date | undefined;
        }[];
        deletedAt?: Date | undefined;
    }[];
    deletedAt?: Date | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    timezone: string;
    fiscalYearStartMonth: number;
    departments: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        name: string;
        teams: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            departmentId: string;
            name: string;
            deletedAt?: Date | undefined;
        }[];
        deletedAt?: Date | undefined;
    }[];
    deletedAt?: Date | undefined;
}>;
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
