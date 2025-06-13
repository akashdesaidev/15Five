import { z } from 'zod';
export declare const userRoleEnum: z.ZodEnum<["admin", "hr", "manager", "employee"]>;
export declare const userStatusEnum: z.ZodEnum<["active", "inactive", "departed"]>;
export declare const notificationFrequencyEnum: z.ZodEnum<["daily", "weekly", "monthly"]>;
export declare const userSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    role: z.ZodEnum<["admin", "hr", "manager", "employee"]>;
    status: z.ZodEnum<["active", "inactive", "departed"]>;
    hireDate: z.ZodDate;
    terminationDate: z.ZodOptional<z.ZodDate>;
    currentManagerId: z.ZodOptional<z.ZodString>;
    emailNotificationsEnabled: z.ZodBoolean;
    notificationFrequency: z.ZodEnum<["daily", "weekly", "monthly"]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
    organizationId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "admin" | "hr" | "manager" | "employee";
    status: "active" | "inactive" | "departed";
    hireDate: Date;
    emailNotificationsEnabled: boolean;
    notificationFrequency: "daily" | "weekly" | "monthly";
    createdAt: Date;
    updatedAt: Date;
    organizationId: string;
    terminationDate?: Date | undefined;
    currentManagerId?: string | undefined;
    deletedAt?: Date | undefined;
}, {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "admin" | "hr" | "manager" | "employee";
    status: "active" | "inactive" | "departed";
    hireDate: Date;
    emailNotificationsEnabled: boolean;
    notificationFrequency: "daily" | "weekly" | "monthly";
    createdAt: Date;
    updatedAt: Date;
    organizationId: string;
    terminationDate?: Date | undefined;
    currentManagerId?: string | undefined;
    deletedAt?: Date | undefined;
}>;
export declare const createUserSchema: z.ZodObject<{
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    role: z.ZodEnum<["admin", "hr", "manager", "employee"]>;
    hireDate: z.ZodDate;
    currentManagerId: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodString>;
    teamId: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    firstName: string;
    lastName: string;
    role: "admin" | "hr" | "manager" | "employee";
    hireDate: Date;
    organizationId: string;
    currentManagerId?: string | undefined;
    departmentId?: string | undefined;
    teamId?: string | undefined;
}, {
    email: string;
    firstName: string;
    lastName: string;
    role: "admin" | "hr" | "manager" | "employee";
    hireDate: Date;
    organizationId: string;
    currentManagerId?: string | undefined;
    departmentId?: string | undefined;
    teamId?: string | undefined;
}>;
export declare const updateUserSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["admin", "hr", "manager", "employee"]>>;
    status: z.ZodOptional<z.ZodEnum<["active", "inactive", "departed"]>>;
    currentManagerId: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodString>;
    teamId: z.ZodOptional<z.ZodString>;
    emailNotificationsEnabled: z.ZodOptional<z.ZodBoolean>;
    notificationFrequency: z.ZodOptional<z.ZodEnum<["daily", "weekly", "monthly"]>>;
}, "strict", z.ZodTypeAny, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    role?: "admin" | "hr" | "manager" | "employee" | undefined;
    status?: "active" | "inactive" | "departed" | undefined;
    currentManagerId?: string | undefined;
    emailNotificationsEnabled?: boolean | undefined;
    notificationFrequency?: "daily" | "weekly" | "monthly" | undefined;
    departmentId?: string | undefined;
    teamId?: string | undefined;
}, {
    firstName?: string | undefined;
    lastName?: string | undefined;
    role?: "admin" | "hr" | "manager" | "employee" | undefined;
    status?: "active" | "inactive" | "departed" | undefined;
    currentManagerId?: string | undefined;
    emailNotificationsEnabled?: boolean | undefined;
    notificationFrequency?: "daily" | "weekly" | "monthly" | undefined;
    departmentId?: string | undefined;
    teamId?: string | undefined;
}>;
export declare const departmentResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
}, {
    id: string;
    name: string;
}>;
export declare const teamResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
}, {
    id: string;
    name: string;
}>;
export declare const userResponseSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    role: z.ZodEnum<["admin", "hr", "manager", "employee"]>;
    status: z.ZodEnum<["active", "inactive", "departed"]>;
    hireDate: z.ZodDate;
    terminationDate: z.ZodOptional<z.ZodDate>;
    currentManagerId: z.ZodOptional<z.ZodString>;
    emailNotificationsEnabled: z.ZodBoolean;
    notificationFrequency: z.ZodEnum<["daily", "weekly", "monthly"]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
    organizationId: z.ZodString;
} & {
    manager: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        role: z.ZodEnum<["admin", "hr", "manager", "employee"]>;
        status: z.ZodEnum<["active", "inactive", "departed"]>;
        hireDate: z.ZodDate;
        terminationDate: z.ZodOptional<z.ZodDate>;
        currentManagerId: z.ZodOptional<z.ZodString>;
        emailNotificationsEnabled: z.ZodBoolean;
        notificationFrequency: z.ZodEnum<["daily", "weekly", "monthly"]>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        deletedAt: z.ZodOptional<z.ZodDate>;
        organizationId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: "admin" | "hr" | "manager" | "employee";
        status: "active" | "inactive" | "departed";
        hireDate: Date;
        emailNotificationsEnabled: boolean;
        notificationFrequency: "daily" | "weekly" | "monthly";
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        terminationDate?: Date | undefined;
        currentManagerId?: string | undefined;
        deletedAt?: Date | undefined;
    }, {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: "admin" | "hr" | "manager" | "employee";
        status: "active" | "inactive" | "departed";
        hireDate: Date;
        emailNotificationsEnabled: boolean;
        notificationFrequency: "daily" | "weekly" | "monthly";
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        terminationDate?: Date | undefined;
        currentManagerId?: string | undefined;
        deletedAt?: Date | undefined;
    }>>;
    department: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
    }, {
        id: string;
        name: string;
    }>>;
    team: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
    }, {
        id: string;
        name: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "admin" | "hr" | "manager" | "employee";
    status: "active" | "inactive" | "departed";
    hireDate: Date;
    emailNotificationsEnabled: boolean;
    notificationFrequency: "daily" | "weekly" | "monthly";
    createdAt: Date;
    updatedAt: Date;
    organizationId: string;
    manager?: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: "admin" | "hr" | "manager" | "employee";
        status: "active" | "inactive" | "departed";
        hireDate: Date;
        emailNotificationsEnabled: boolean;
        notificationFrequency: "daily" | "weekly" | "monthly";
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        terminationDate?: Date | undefined;
        currentManagerId?: string | undefined;
        deletedAt?: Date | undefined;
    } | undefined;
    terminationDate?: Date | undefined;
    currentManagerId?: string | undefined;
    deletedAt?: Date | undefined;
    department?: {
        id: string;
        name: string;
    } | undefined;
    team?: {
        id: string;
        name: string;
    } | undefined;
}, {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "admin" | "hr" | "manager" | "employee";
    status: "active" | "inactive" | "departed";
    hireDate: Date;
    emailNotificationsEnabled: boolean;
    notificationFrequency: "daily" | "weekly" | "monthly";
    createdAt: Date;
    updatedAt: Date;
    organizationId: string;
    manager?: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: "admin" | "hr" | "manager" | "employee";
        status: "active" | "inactive" | "departed";
        hireDate: Date;
        emailNotificationsEnabled: boolean;
        notificationFrequency: "daily" | "weekly" | "monthly";
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        terminationDate?: Date | undefined;
        currentManagerId?: string | undefined;
        deletedAt?: Date | undefined;
    } | undefined;
    terminationDate?: Date | undefined;
    currentManagerId?: string | undefined;
    deletedAt?: Date | undefined;
    department?: {
        id: string;
        name: string;
    } | undefined;
    team?: {
        id: string;
        name: string;
    } | undefined;
}>;
export type UserRole = z.infer<typeof userRoleEnum>;
export type UserStatus = z.infer<typeof userStatusEnum>;
export type NotificationFrequency = z.infer<typeof notificationFrequencyEnum>;
export type User = z.infer<typeof userSchema>;
export type CreateUserRequest = z.infer<typeof createUserSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
