import { z } from 'zod';
import { CycleType, CycleState, ReviewType, ReviewStatus } from '../types/review';

export const cycleTypeSchema = z.nativeEnum(CycleType);
export const cycleStateSchema = z.nativeEnum(CycleState);
export const reviewTypeSchema = z.nativeEnum(ReviewType);
export const reviewStatusSchema = z.nativeEnum(ReviewStatus);

export const reviewCycleSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  type: cycleTypeSchema,
  startDate: z.date(),
  endDate: z.date(),
  gracePeriodStart: z.date().optional(),
  gracePeriodEnd: z.date().optional(),
  isEmergencyCycle: z.boolean(),
  parentCycleId: z.string().uuid().optional(),
  state: cycleStateSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const reviewSchema = z.object({
  id: z.string().uuid(),
  cycleId: z.string().uuid(),
  reviewerId: z.string().uuid(),
  revieweeId: z.string().uuid(),
  reviewType: reviewTypeSchema,
  isAnonymous: z.boolean(),
  content: z.record(z.unknown()),
  status: reviewStatusSchema,
  submittedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  version: z.number().int().min(1),
});

export const reviewCycleCreateSchema = z.object({
  title: z.string().min(1).max(200),
  type: cycleTypeSchema,
  startDate: z.date(),
  endDate: z.date(),
  gracePeriodStart: z.date().optional(),
  gracePeriodEnd: z.date().optional(),
  isEmergencyCycle: z.boolean().optional(),
  parentCycleId: z.string().uuid().optional(),
}).strict();

export const reviewCreateSchema = z.object({
  cycleId: z.string().uuid(),
  reviewerId: z.string().uuid(),
  revieweeId: z.string().uuid(),
  reviewType: reviewTypeSchema,
  isAnonymous: z.boolean().optional(),
  content: z.record(z.unknown()).optional(),
}).strict();

export const reviewCycleUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  gracePeriodStart: z.date().optional(),
  gracePeriodEnd: z.date().optional(),
  state: cycleStateSchema.optional(),
}).strict();

export const reviewUpdateSchema = z.object({
  content: z.record(z.unknown()).optional(),
  status: reviewStatusSchema.optional(),
  isAnonymous: z.boolean().optional(),
}).strict();

export type ReviewCycle = z.infer<typeof reviewCycleSchema>;
export type Review = z.infer<typeof reviewSchema>;
export type ReviewCycleCreateInput = z.infer<typeof reviewCycleCreateSchema>;
export type ReviewCreateInput = z.infer<typeof reviewCreateSchema>;
export type ReviewCycleUpdateInput = z.infer<typeof reviewCycleUpdateSchema>;
export type ReviewUpdateInput = z.infer<typeof reviewUpdateSchema>; 