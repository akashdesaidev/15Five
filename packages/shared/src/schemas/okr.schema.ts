import { z } from 'zod';
import { OkrType, OkrStatus, SnapshotType } from '../types/okr';

export const okrTypeSchema = z.nativeEnum(OkrType);
export const okrStatusSchema = z.nativeEnum(OkrStatus);
export const snapshotTypeSchema = z.nativeEnum(SnapshotType);

export const okrSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: okrTypeSchema,
  status: okrStatusSchema,
  parentOkrId: z.string().uuid().optional(),
  ownerId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export const keyResultSchema = z.object({
  id: z.string().uuid(),
  okrId: z.string().uuid(),
  description: z.string().min(1).max(500),
  targetScore: z.number().int().min(1).max(10),
  currentScore: z.number().int().min(1).max(10),
  progressNotes: z.string().max(1000).optional(),
  dueDate: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  version: z.number().int().min(1),
});

export const okrProgressSnapshotSchema = z.object({
  id: z.string().uuid(),
  keyResultId: z.string().uuid(),
  score: z.number().int().min(1).max(10),
  notes: z.string().max(1000).optional(),
  recordedAt: z.date(),
  recordedById: z.string().uuid(),
  snapshotType: snapshotTypeSchema,
});

export const okrCreateSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: okrTypeSchema,
  parentOkrId: z.string().uuid().optional(),
  ownerId: z.string().uuid(),
}).strict();

export const keyResultCreateSchema = z.object({
  okrId: z.string().uuid(),
  description: z.string().min(1).max(500),
  targetScore: z.number().int().min(1).max(10).optional(),
  dueDate: z.date().optional(),
}).strict();

export const okrUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  status: okrStatusSchema.optional(),
  parentOkrId: z.string().uuid().optional(),
}).strict();

export const keyResultUpdateSchema = z.object({
  description: z.string().min(1).max(500).optional(),
  targetScore: z.number().int().min(1).max(10).optional(),
  currentScore: z.number().int().min(1).max(10).optional(),
  progressNotes: z.string().max(1000).optional(),
  dueDate: z.date().optional(),
}).strict();

export type Okr = z.infer<typeof okrSchema>;
export type KeyResult = z.infer<typeof keyResultSchema>;
export type OkrProgressSnapshot = z.infer<typeof okrProgressSnapshotSchema>;
export type OkrCreateInput = z.infer<typeof okrCreateSchema>;
export type KeyResultCreateInput = z.infer<typeof keyResultCreateSchema>;
export type OkrUpdateInput = z.infer<typeof okrUpdateSchema>;
export type KeyResultUpdateInput = z.infer<typeof keyResultUpdateSchema>; 