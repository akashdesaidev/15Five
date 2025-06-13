export declare enum TimeEntryCategory {
    DIRECT_WORK = "direct_work",
    PLANNING = "planning",
    COLLABORATION = "collaboration",
    REVIEW = "review",
    OTHER = "other"
}
export interface TimeEntry {
    id: string;
    userId: string;
    okrId: string;
    keyResultId?: string;
    date: Date;
    hoursSpent: number;
    description?: string;
    category: TimeEntryCategory;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
export interface TimeEntryCreateInput {
    userId: string;
    okrId: string;
    keyResultId?: string;
    date: Date;
    hoursSpent: number;
    description?: string;
    category: TimeEntryCategory;
}
export interface TimeEntryUpdateInput {
    hoursSpent?: number;
    description?: string;
    category?: TimeEntryCategory;
}
export interface TimeUtilizationMetrics {
    userId: string;
    okrId: string;
    weekStarting: Date;
    plannedHours: number;
    actualHours: number;
    efficiencyScore: number;
}
