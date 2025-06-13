export enum CycleType {
  QUARTERLY = 'quarterly',
  HALF_YEARLY = 'half_yearly',
  ANNUAL = 'annual',
  CUSTOM = 'custom'
}

export enum CycleState {
  ACTIVE = 'active',
  GRACE_PERIOD = 'grace_period',
  CLOSED = 'closed'
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

export enum ReviewType {
  SELF = 'self',
  PEER = 'peer',
  MANAGER = 'manager',
  UPWARD = 'upward'
}

export enum ReviewStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  NOT_SUBMITTED = 'not_submitted'
}

export interface Review {
  id: string;
  cycleId: string;
  reviewerId: string;
  revieweeId: string;
  reviewType: 'self' | 'peer' | 'manager' | 'upward';
  isAnonymous: boolean;
  content: Record<string, unknown>;
  
  // AI Features
  aiGeneratedSuggestion?: string;
  summary?: string;
  
  // AI Scoring Components
  recentFeedbackScore?: number;
  okrScore?: number;
  peerFeedbackScore?: number;
  managerFeedbackScore?: number;
  selfAssessmentScore?: number;
  tenureAdjustmentScore?: number;
  finalAiScore?: number;
  
  // Status tracking
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

interface ReviewParticipant {
  id: string;
  cycleId: string;
  userId: string;
  participationStatus: 'active' | 'removed';
  joinedAt: Date;
  exitedAt?: Date;
}

interface ReviewTemplate {
  id: string;
  name: string;
  questions: Record<string, unknown>;
  version: number;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateReviewCycleRequest {
  title: string;
  type: 'quarterly' | 'half_yearly' | 'annual' | 'custom';
  startDate: Date;
  endDate: Date;
  isEmergencyCycle?: boolean;
  parentCycleId?: string;
  organizationId: string;
}

interface UpdateReviewCycleRequest {
  title?: string;
  startDate?: Date;
  endDate?: Date;
  gracePeriodStart?: Date;
  gracePeriodEnd?: Date;
  state?: 'active' | 'grace_period' | 'closed';
}

interface CreateReviewRequest {
  cycleId: string;
  reviewerId: string;
  revieweeId: string;
  reviewType: 'self' | 'peer' | 'manager' | 'upward';
  isAnonymous: boolean;
  content: Record<string, unknown>;
}

interface UpdateReviewRequest {
  content?: Record<string, unknown>;
  status?: 'draft' | 'submitted';
}

interface CreateReviewTemplateRequest {
  name: string;
  questions: Record<string, unknown>;
  isActive: boolean;
}

interface UpdateReviewTemplateRequest {
  name?: string;
  questions?: Record<string, unknown>;
  isActive?: boolean;
}

interface ReviewCycleWithRelations extends ReviewCycle {
  participants: ReviewParticipant[];
  reviews: Review[];
  parentCycle?: ReviewCycle;
  template?: ReviewTemplate;
}

interface ReviewWithRelations extends Review {
  cycle: ReviewCycle;
  reviewer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  reviewee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
} 