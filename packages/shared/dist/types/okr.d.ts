export declare enum OkrType {
    COMPANY = "COMPANY",
    DEPARTMENT = "DEPARTMENT",
    TEAM = "TEAM",
    INDIVIDUAL = "INDIVIDUAL"
}
export declare enum OkrStatus {
    ACTIVE = "active",
    COMPLETED = "completed",
    ARCHIVED = "archived"
}
export interface Okr {
    id: string;
    title: string;
    description?: string;
    type: OkrType;
    status: OkrStatus;
    parentOkrId?: string;
    ownerId: string;
    organizationId: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
export interface KeyResult {
    id: string;
    okrId: string;
    description: string;
    targetScore: number;
    currentScore: number;
    progressNotes?: string;
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}
export declare enum SnapshotType {
    MANUAL = "manual",
    AUTO_WEEKLY = "auto_weekly",
    CYCLE_END = "cycle_end"
}
export interface OkrProgressSnapshot {
    id: string;
    keyResultId: string;
    score: number;
    notes?: string;
    recordedAt: Date;
    recordedById: string;
    snapshotType: SnapshotType;
}
export interface OkrCreateInput {
    title: string;
    description?: string;
    type: OkrType;
    parentOkrId?: string;
    ownerId: string;
    organizationId: string;
    tags?: string[];
}
export interface KeyResultCreateInput {
    okrId: string;
    description: string;
    targetScore?: number;
    dueDate?: Date;
}
export interface OkrUpdateInput {
    title?: string;
    description?: string;
    status?: OkrStatus;
    parentOkrId?: string;
    tags?: string[];
}
export interface KeyResultUpdateInput {
    description?: string;
    targetScore?: number;
    currentScore?: number;
    progressNotes?: string;
    dueDate?: Date;
}
export interface TimeEntry {
    id: string;
    userId: string;
    okrId: string;
    keyResultId?: string;
    date: Date;
    hoursSpent: number;
    description?: string;
    category: 'direct_work' | 'planning' | 'collaboration' | 'review' | 'other';
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
export interface TimeAllocation {
    id: string;
    okrId: string;
    expectedWeeklyHours: number;
    minimumAllocationPercentage: number;
    startDate: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
export interface TimeUtilizationMetrics {
    id: string;
    userId: string;
    okrId: string;
    weekStarting: Date;
    plannedHours: number;
    actualHours: number;
    efficiencyScore: number;
    createdAt: Date;
}
export interface CreateOKRRequest {
    title: string;
    description?: string;
    type: OkrType;
    parentOkrId?: string;
    ownerId: string;
    organizationId: string;
    tags?: string[];
}
export interface UpdateOKRRequest {
    title?: string;
    description?: string;
    status?: OkrStatus;
    parentOkrId?: string;
    tags?: string[];
}
export interface CreateKeyResultRequest {
    okrId: string;
    description: string;
    targetScore: number;
    dueDate?: Date;
}
export interface UpdateKeyResultRequest {
    description?: string;
    targetScore?: number;
    currentScore?: number;
    progressNotes?: string;
    dueDate?: Date;
}
