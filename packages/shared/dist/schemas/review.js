"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewWithRelationsSchema = exports.reviewCycleWithRelationsSchema = exports.userBasicSchema = exports.updateReviewTemplateSchema = exports.createReviewTemplateSchema = exports.updateReviewSchema = exports.createReviewSchema = exports.updateReviewCycleSchema = exports.createReviewCycleSchema = exports.reviewTemplateSchema = exports.reviewSchema = exports.reviewParticipantSchema = exports.reviewCycleSchema = exports.participationStatusEnum = exports.reviewStatusEnum = exports.reviewTypeEnum = exports.cycleStateEnum = exports.cycleTypeEnum = void 0;
const zod_1 = require("zod");
// Base enums/constants as Zod enums
exports.cycleTypeEnum = zod_1.z.enum(['quarterly', 'half_yearly', 'annual', 'custom']);
exports.cycleStateEnum = zod_1.z.enum(['active', 'grace_period', 'closed']);
exports.reviewTypeEnum = zod_1.z.enum(['self', 'peer', 'manager', 'upward']);
exports.reviewStatusEnum = zod_1.z.enum(['draft', 'submitted', 'not_submitted']);
exports.participationStatusEnum = zod_1.z.enum(['active', 'removed']);
// Base review cycle schema
exports.reviewCycleSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().min(1).max(200),
    type: exports.cycleTypeEnum,
    startDate: zod_1.z.date(),
    endDate: zod_1.z.date(),
    gracePeriodStart: zod_1.z.date().optional(),
    gracePeriodEnd: zod_1.z.date().optional(),
    isEmergencyCycle: zod_1.z.boolean(),
    parentCycleId: zod_1.z.string().uuid().optional(),
    state: exports.cycleStateEnum,
    createdBy: zod_1.z.string().uuid(),
    organizationId: zod_1.z.string().uuid(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date()
});
// Review participant schema
exports.reviewParticipantSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    cycleId: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
    participationStatus: exports.participationStatusEnum,
    joinedAt: zod_1.z.date(),
    exitedAt: zod_1.z.date().optional()
});
// Review schema
exports.reviewSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    cycleId: zod_1.z.string().uuid(),
    reviewerId: zod_1.z.string().uuid(),
    revieweeId: zod_1.z.string().uuid(),
    reviewType: exports.reviewTypeEnum,
    isAnonymous: zod_1.z.boolean(),
    content: zod_1.z.record(zod_1.z.unknown()),
    // AI Features
    aiGeneratedSuggestion: zod_1.z.string().optional(),
    summary: zod_1.z.string().optional(),
    // AI Scoring Components
    recentFeedbackScore: zod_1.z.number().min(0).max(1).optional(),
    okrScore: zod_1.z.number().min(0).max(1).optional(),
    peerFeedbackScore: zod_1.z.number().min(0).max(1).optional(),
    managerFeedbackScore: zod_1.z.number().min(0).max(1).optional(),
    selfAssessmentScore: zod_1.z.number().min(0).max(1).optional(),
    tenureAdjustmentScore: zod_1.z.number().min(0).max(1).optional(),
    finalAiScore: zod_1.z.number().min(0).max(1).optional(),
    // Status tracking
    status: exports.reviewStatusEnum,
    submittedAt: zod_1.z.date().optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    version: zod_1.z.number().int().positive()
});
// Review template schema
exports.reviewTemplateSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1).max(200),
    questions: zod_1.z.record(zod_1.z.unknown()),
    version: zod_1.z.number().int().positive(),
    isActive: zod_1.z.boolean(),
    createdBy: zod_1.z.string().uuid(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date()
});
// Request schemas
exports.createReviewCycleSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200),
    type: exports.cycleTypeEnum,
    startDate: zod_1.z.date(),
    endDate: zod_1.z.date(),
    isEmergencyCycle: zod_1.z.boolean().optional(),
    parentCycleId: zod_1.z.string().uuid().optional(),
    organizationId: zod_1.z.string().uuid()
}).strict();
exports.updateReviewCycleSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200).optional(),
    startDate: zod_1.z.date().optional(),
    endDate: zod_1.z.date().optional(),
    gracePeriodStart: zod_1.z.date().optional(),
    gracePeriodEnd: zod_1.z.date().optional(),
    state: exports.cycleStateEnum.optional()
}).strict();
exports.createReviewSchema = zod_1.z.object({
    cycleId: zod_1.z.string().uuid(),
    reviewerId: zod_1.z.string().uuid(),
    revieweeId: zod_1.z.string().uuid(),
    reviewType: exports.reviewTypeEnum,
    isAnonymous: zod_1.z.boolean(),
    content: zod_1.z.record(zod_1.z.unknown())
}).strict();
exports.updateReviewSchema = zod_1.z.object({
    content: zod_1.z.record(zod_1.z.unknown()).optional(),
    status: zod_1.z.enum(['draft', 'submitted']).optional()
}).strict();
exports.createReviewTemplateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(200),
    questions: zod_1.z.record(zod_1.z.unknown()),
    isActive: zod_1.z.boolean()
}).strict();
exports.updateReviewTemplateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(200).optional(),
    questions: zod_1.z.record(zod_1.z.unknown()).optional(),
    isActive: zod_1.z.boolean().optional()
}).strict();
// Response schemas with relations
exports.userBasicSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string().email()
});
exports.reviewCycleWithRelationsSchema = exports.reviewCycleSchema.extend({
    participants: zod_1.z.array(exports.reviewParticipantSchema),
    reviews: zod_1.z.array(exports.reviewSchema),
    parentCycle: exports.reviewCycleSchema.optional(),
    template: exports.reviewTemplateSchema.optional()
});
exports.reviewWithRelationsSchema = exports.reviewSchema.extend({
    cycle: exports.reviewCycleSchema,
    reviewer: exports.userBasicSchema,
    reviewee: exports.userBasicSchema
});
