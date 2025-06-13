export declare enum CycleType {
    QUARTERLY = "quarterly",
    HALF_YEARLY = "half_yearly",
    ANNUAL = "annual",
    CUSTOM = "custom"
}
export declare enum CycleState {
    ACTIVE = "active",
    GRACE_PERIOD = "grace_period",
    CLOSED = "closed"
}
export interface ReviewCycle {
    id: string;
    title: string;
    type: 'quarterly' | 'half_yearly' | 'annual' | 'custom';
    startDate: Date;
    endDate: Date;
    gracePeriodStart?: Date;
    gracePeriodEnd?: Date;
    isEmergencyCycle: boolean;
    parentCycleId?: string;
    state: 'active' | 'grace_period' | 'closed';
    createdBy: string;
    organizationId: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum ReviewType {
    SELF = "self",
    PEER = "peer",
    MANAGER = "manager",
    UPWARD = "upward"
}
export declare enum ReviewStatus {
    DRAFT = "draft",
    SUBMITTED = "submitted",
    NOT_SUBMITTED = "not_submitted"
}
export interface Review {
    id: string;
    cycleId: string;
    reviewerId: string;
    revieweeId: string;
    reviewType: 'self' | 'peer' | 'manager' | 'upward';
    isAnonymous: boolean;
    content: Record<string, unknown>;
    aiGeneratedSuggestion?: string;
    summary?: string;
    recentFeedbackScore?: number;
    okrScore?: number;
    peerFeedbackScore?: number;
    managerFeedbackScore?: number;
    selfAssessmentScore?: number;
    tenureAdjustmentScore?: number;
    finalAiScore?: number;
    status: 'draft' | 'submitted' | 'not_submitted';
    submittedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}
export interface ReviewCycleCreateInput {
    title: string;
    type: CycleType;
    startDate: Date;
    endDate: Date;
    gracePeriodStart?: Date;
    gracePeriodEnd?: Date;
    isEmergencyCycle?: boolean;
    parentCycleId?: string;
}
export interface ReviewCreateInput {
    cycleId: string;
    reviewerId: string;
    revieweeId: string;
    reviewType: ReviewType;
    isAnonymous?: boolean;
    content?: Record<string, any>;
}
export interface ReviewCycleUpdateInput {
    title?: string;
    startDate?: Date;
    endDate?: Date;
    gracePeriodStart?: Date;
    gracePeriodEnd?: Date;
    state?: CycleState;
}
export interface ReviewUpdateInput {
    content?: Record<string, any>;
    status?: ReviewStatus;
    isAnonymous?: boolean;
}
