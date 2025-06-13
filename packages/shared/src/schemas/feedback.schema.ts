import { z } from 'zod';
import { Visibility, Sentiment } from '../types/feedback';

export const visibilitySchema = z.nativeEnum(Visibility);
export const sentimentSchema = z.nativeEnum(Sentiment);

export const feedbackSchema = z.object({
  id: z.string().uuid(),
  authorId: z.string().uuid(),
  receiverId: z.string().uuid(),
  visibility: visibilitySchema,
  feedbackText: z.string().min(1).max(2000),
  skillTags: z.array(z.string()),
  companyValueTags: z.array(z.string()),
  initiativeTags: z.array(z.string()),
  sentiment: sentimentSchema.optional(),
  aiFlags: z.record(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export const feedbackCreateSchema = z.object({
  authorId: z.string().uuid(),
  receiverId: z.string().uuid(),
  visibility: visibilitySchema.optional(),
  feedbackText: z.string().min(1).max(2000),
  skillTags: z.array(z.string()).optional(),
  companyValueTags: z.array(z.string()).optional(),
  initiativeTags: z.array(z.string()).optional(),
}).strict();

export const feedbackUpdateSchema = z.object({
  visibility: visibilitySchema.optional(),
  feedbackText: z.string().min(1).max(2000).optional(),
  skillTags: z.array(z.string()).optional(),
  companyValueTags: z.array(z.string()).optional(),
  initiativeTags: z.array(z.string()).optional(),
  sentiment: sentimentSchema.optional(),
  aiFlags: z.record(z.unknown()).optional(),
}).strict();

export type Feedback = z.infer<typeof feedbackSchema>;
export type FeedbackCreateInput = z.infer<typeof feedbackCreateSchema>;
export type FeedbackUpdateInput = z.infer<typeof feedbackUpdateSchema>; 