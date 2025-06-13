import { z } from 'zod';

// Base enums/constants as Zod enums
export const cycleTypeEnum = z.enum(['quarterly', 'half_yearly', 'annual', 'custom']);
export const cycleStateEnum = z.enum(['active', 'grace_period', 'closed']);
export const reviewTypeEnum = z.enum(['self', 'peer', 'manager', 'upward']);
export const reviewStatusEnum = z.enum(['draft', 'submitted', 'not_submitted']);
export const participationStatusEnum = z.enum(['active', 'removed']);

// Base review cycle schema
export const reviewCycleSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  type: cycleTypeEnum,
  startDate: z.date(),
  endDate: z.date(),
  gracePeriodStart: z.date().optional(),
  gracePeriodEnd: z.date().optional(),
  isEmergencyCycle: z.boolean(),
  parentCycleId: z.string().uuid().optional(),
  state: cycleStateEnum,
  createdBy: z.string().uuid(),
  organizationId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date()
});

// Review participant schema
export const reviewParticipantSchema = z.object({
  id: z.string().uuid(),
  cycleId: z.string().uuid(),
  userId: z.string().uuid(),
  participationStatus: participationStatusEnum,
  joinedAt: z.date(),
  exitedAt: z.date().optional()
});

// Review schema
export const reviewSchema = z.object({
  id: z.string().uuid(),
  cycleId: z.string().uuid(),
  reviewerId: z.string().uuid(),
  revieweeId: z.string().uuid(),
  reviewType: reviewTypeEnum,
  isAnonymous: z.boolean(),
  content: z.record(z.unknown()),
  
  // AI Features
  aiGeneratedSuggestion: z.string().optional(),
  summary: z.string().optional(),
  
  // AI Scoring Components
  recentFeedbackScore: z.number().min(0).max(1).optional(),
  okrScore: z.number().min(0).max(1).optional(),
  peerFeedbackScore: z.number().min(0).max(1).optional(),
  managerFeedbackScore: z.number().min(0).max(1).optional(),
  selfAssessmentScore: z.number().min(0).max(1).optional(),
  tenureAdjustmentScore: z.number().min(0).max(1).optional(),
  finalAiScore: z.number().min(0).max(1).optional(),
  
  // Status tracking
  status: reviewStatusEnum,
  submittedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  version: z.number().int().positive()
});

// Review template schema
export const reviewTemplateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  questions: z.record(z.unknown()),
  version: z.number().int().positive(),
  isActive: z.boolean(),
  createdBy: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date()
});

// Request schemas
export const createReviewCycleSchema = z.object({
  title: z.string().min(1).max(200),
  type: cycleTypeEnum,
  startDate: z.date(),
  endDate: z.date(),
  isEmergencyCycle: z.boolean().optional(),
  parentCycleId: z.string().uuid().optional(),
  organizationId: z.string().uuid()
}).strict();

export const updateReviewCycleSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  gracePeriodStart: z.date().optional(),
  gracePeriodEnd: z.date().optional(),
  state: cycleStateEnum.optional()
}).strict();

export const createReviewSchema = z.object({
  cycleId: z.string().uuid(),
  reviewerId: z.string().uuid(),
  revieweeId: z.string().uuid(),
  reviewType: reviewTypeEnum,
  isAnonymous: z.boolean(),
  content: z.record(z.unknown())
}).strict();

export const updateReviewSchema = z.object({
  content: z.record(z.unknown()).optional(),
  status: z.enum(['draft', 'submitted']).optional()
}).strict();

export const createReviewTemplateSchema = z.object({
  name: z.string().min(1).max(200),
  questions: z.record(z.unknown()),
  isActive: z.boolean()
}).strict();

export const updateReviewTemplateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  questions: z.record(z.unknown()).optional(),
  isActive: z.boolean().optional()
}).strict();

// Response schemas with relations
export const userBasicSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email()
});

export const reviewCycleWithRelationsSchema = reviewCycleSchema.extend({
  participants: z.array(reviewParticipantSchema),
  reviews: z.array(reviewSchema),
  parentCycle: reviewCycleSchema.optional(),
  template: reviewTemplateSchema.optional()
});

export const reviewWithRelationsSchema = reviewSchema.extend({
  cycle: reviewCycleSchema,
  reviewer: userBasicSchema,
  reviewee: userBasicSchema
});

// Types
export type CycleType = z.infer<typeof cycleTypeEnum>;
export type CycleState = z.infer<typeof cycleStateEnum>;
export type ReviewType = z.infer<typeof reviewTypeEnum>;
export type ReviewStatus = z.infer<typeof reviewStatusEnum>;
export type ParticipationStatus = z.infer<typeof participationStatusEnum>;

export type ReviewCycle = z.infer<typeof reviewCycleSchema>;
export type ReviewParticipant = z.infer<typeof reviewParticipantSchema>;
export type Review = z.infer<typeof reviewSchema>;
export type ReviewTemplate = z.infer<typeof reviewTemplateSchema>;

export type CreateReviewCycleRequest = z.infer<typeof createReviewCycleSchema>;
export type UpdateReviewCycleRequest = z.infer<typeof updateReviewCycleSchema>;
export type CreateReviewRequest = z.infer<typeof createReviewSchema>;
export type UpdateReviewRequest = z.infer<typeof updateReviewSchema>;
export type CreateReviewTemplateRequest = z.infer<typeof createReviewTemplateSchema>;
export type UpdateReviewTemplateRequest = z.infer<typeof updateReviewTemplateSchema>;

export type ReviewCycleWithRelations = z.infer<typeof reviewCycleWithRelationsSchema>;
export type ReviewWithRelations = z.infer<typeof reviewWithRelationsSchema>; 