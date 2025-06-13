import { z } from 'zod';
export declare const timeEntryCategoryEnum: z.ZodEnum<["direct_work", "planning", "collaboration", "review", "other"]>;
export declare const timeEntrySchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    okrId: z.ZodString;
    keyResultId: z.ZodOptional<z.ZodString>;
    date: z.ZodDate;
    hoursSpent: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodEnum<["direct_work", "planning", "collaboration", "review", "other"]>;
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
    category: "direct_work" | "planning" | "collaboration" | "review" | "other";
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
    category: "direct_work" | "planning" | "collaboration" | "review" | "other";
    deletedAt?: Date | undefined;
    keyResultId?: string | undefined;
    description?: string | undefined;
}>;
export declare const timeAllocationSchema: z.ZodObject<{
    id: z.ZodString;
    okrId: z.ZodString;
    expectedWeeklyHours: z.ZodNumber;
    minimumAllocationPercentage: z.ZodNumber;
    startDate: z.ZodDate;
    endDate: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    startDate: Date;
    okrId: string;
    expectedWeeklyHours: number;
    minimumAllocationPercentage: number;
    deletedAt?: Date | undefined;
    endDate?: Date | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    startDate: Date;
    okrId: string;
    expectedWeeklyHours: number;
    minimumAllocationPercentage: number;
    deletedAt?: Date | undefined;
    endDate?: Date | undefined;
}>;
export declare const timeUtilizationMetricsSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    okrId: z.ZodString;
    weekStarting: z.ZodDate;
    plannedHours: z.ZodOptional<z.ZodNumber>;
    actualHours: z.ZodOptional<z.ZodNumber>;
    efficiencyScore: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    userId: string;
    okrId: string;
    weekStarting: Date;
    plannedHours?: number | undefined;
    actualHours?: number | undefined;
    efficiencyScore?: number | undefined;
}, {
    id: string;
    createdAt: Date;
    userId: string;
    okrId: string;
    weekStarting: Date;
    plannedHours?: number | undefined;
    actualHours?: number | undefined;
    efficiencyScore?: number | undefined;
}>;
export declare const createTimeEntrySchema: z.ZodObject<{
    okrId: z.ZodString;
    keyResultId: z.ZodOptional<z.ZodString>;
    date: z.ZodDate;
    hoursSpent: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodEnum<["direct_work", "planning", "collaboration", "review", "other"]>;
}, "strict", z.ZodTypeAny, {
    date: Date;
    okrId: string;
    hoursSpent: number;
    category: "direct_work" | "planning" | "collaboration" | "review" | "other";
    keyResultId?: string | undefined;
    description?: string | undefined;
}, {
    date: Date;
    okrId: string;
    hoursSpent: number;
    category: "direct_work" | "planning" | "collaboration" | "review" | "other";
    keyResultId?: string | undefined;
    description?: string | undefined;
}>;
export declare const updateTimeEntrySchema: z.ZodObject<{
    hoursSpent: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEnum<["direct_work", "planning", "collaboration", "review", "other"]>>;
}, "strict", z.ZodTypeAny, {
    hoursSpent?: number | undefined;
    description?: string | undefined;
    category?: "direct_work" | "planning" | "collaboration" | "review" | "other" | undefined;
}, {
    hoursSpent?: number | undefined;
    description?: string | undefined;
    category?: "direct_work" | "planning" | "collaboration" | "review" | "other" | undefined;
}>;
export declare const createTimeAllocationSchema: z.ZodObject<{
    okrId: z.ZodString;
    expectedWeeklyHours: z.ZodNumber;
    minimumAllocationPercentage: z.ZodNumber;
    startDate: z.ZodDate;
    endDate: z.ZodOptional<z.ZodDate>;
}, "strict", z.ZodTypeAny, {
    startDate: Date;
    okrId: string;
    expectedWeeklyHours: number;
    minimumAllocationPercentage: number;
    endDate?: Date | undefined;
}, {
    startDate: Date;
    okrId: string;
    expectedWeeklyHours: number;
    minimumAllocationPercentage: number;
    endDate?: Date | undefined;
}>;
export declare const updateTimeAllocationSchema: z.ZodObject<{
    expectedWeeklyHours: z.ZodOptional<z.ZodNumber>;
    minimumAllocationPercentage: z.ZodOptional<z.ZodNumber>;
    endDate: z.ZodOptional<z.ZodDate>;
}, "strict", z.ZodTypeAny, {
    endDate?: Date | undefined;
    expectedWeeklyHours?: number | undefined;
    minimumAllocationPercentage?: number | undefined;
}, {
    endDate?: Date | undefined;
    expectedWeeklyHours?: number | undefined;
    minimumAllocationPercentage?: number | undefined;
}>;
export declare const timeEntryWithRelationsSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    okrId: z.ZodString;
    keyResultId: z.ZodOptional<z.ZodString>;
    date: z.ZodDate;
    hoursSpent: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodEnum<["direct_work", "planning", "collaboration", "review", "other"]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
} & {
    okr: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
    }, {
        id: string;
        title: string;
    }>;
    keyResult: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        description: string;
    }, {
        id: string;
        description: string;
    }>>;
    user: z.ZodObject<{
        id: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        firstName: string;
        lastName: string;
    }, {
        id: string;
        firstName: string;
        lastName: string;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    date: Date;
    userId: string;
    okrId: string;
    hoursSpent: number;
    category: "direct_work" | "planning" | "collaboration" | "review" | "other";
    okr: {
        id: string;
        title: string;
    };
    user: {
        id: string;
        firstName: string;
        lastName: string;
    };
    deletedAt?: Date | undefined;
    keyResultId?: string | undefined;
    description?: string | undefined;
    keyResult?: {
        id: string;
        description: string;
    } | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    date: Date;
    userId: string;
    okrId: string;
    hoursSpent: number;
    category: "direct_work" | "planning" | "collaboration" | "review" | "other";
    okr: {
        id: string;
        title: string;
    };
    user: {
        id: string;
        firstName: string;
        lastName: string;
    };
    deletedAt?: Date | undefined;
    keyResultId?: string | undefined;
    description?: string | undefined;
    keyResult?: {
        id: string;
        description: string;
    } | undefined;
}>;
export declare const timeAllocationWithRelationsSchema: z.ZodObject<{
    id: z.ZodString;
    okrId: z.ZodString;
    expectedWeeklyHours: z.ZodNumber;
    minimumAllocationPercentage: z.ZodNumber;
    startDate: z.ZodDate;
    endDate: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodDate>;
} & {
    okr: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
    }, {
        id: string;
        title: string;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    startDate: Date;
    okrId: string;
    expectedWeeklyHours: number;
    minimumAllocationPercentage: number;
    okr: {
        id: string;
        title: string;
    };
    deletedAt?: Date | undefined;
    endDate?: Date | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    startDate: Date;
    okrId: string;
    expectedWeeklyHours: number;
    minimumAllocationPercentage: number;
    okr: {
        id: string;
        title: string;
    };
    deletedAt?: Date | undefined;
    endDate?: Date | undefined;
}>;
export type TimeEntryCategory = z.infer<typeof timeEntryCategoryEnum>;
export type TimeEntry = z.infer<typeof timeEntrySchema>;
export type TimeAllocation = z.infer<typeof timeAllocationSchema>;
export type TimeUtilizationMetrics = z.infer<typeof timeUtilizationMetricsSchema>;
export type CreateTimeEntryRequest = z.infer<typeof createTimeEntrySchema>;
export type UpdateTimeEntryRequest = z.infer<typeof updateTimeEntrySchema>;
export type CreateTimeAllocationRequest = z.infer<typeof createTimeAllocationSchema>;
export type UpdateTimeAllocationRequest = z.infer<typeof updateTimeAllocationSchema>;
export type TimeEntryWithRelations = z.infer<typeof timeEntryWithRelationsSchema>;
export type TimeAllocationWithRelations = z.infer<typeof timeAllocationWithRelationsSchema>;
