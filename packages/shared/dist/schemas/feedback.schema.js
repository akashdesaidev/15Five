"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackUpdateSchema = exports.feedbackCreateSchema = exports.feedbackSchema = exports.sentimentSchema = exports.visibilitySchema = void 0;
const zod_1 = require("zod");
const feedback_1 = require("../types/feedback");
exports.visibilitySchema = zod_1.z.nativeEnum(feedback_1.Visibility);
exports.sentimentSchema = zod_1.z.nativeEnum(feedback_1.Sentiment);
exports.feedbackSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    authorId: zod_1.z.string().uuid(),
    receiverId: zod_1.z.string().uuid(),
    visibility: exports.visibilitySchema,
    feedbackText: zod_1.z.string().min(1).max(2000),
    skillTags: zod_1.z.array(zod_1.z.string()),
    companyValueTags: zod_1.z.array(zod_1.z.string()),
    initiativeTags: zod_1.z.array(zod_1.z.string()),
    sentiment: exports.sentimentSchema.optional(),
    aiFlags: zod_1.z.record(zod_1.z.unknown()),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    deletedAt: zod_1.z.date().optional(),
});
exports.feedbackCreateSchema = zod_1.z.object({
    authorId: zod_1.z.string().uuid(),
    receiverId: zod_1.z.string().uuid(),
    visibility: exports.visibilitySchema.optional(),
    feedbackText: zod_1.z.string().min(1).max(2000),
    skillTags: zod_1.z.array(zod_1.z.string()).optional(),
    companyValueTags: zod_1.z.array(zod_1.z.string()).optional(),
    initiativeTags: zod_1.z.array(zod_1.z.string()).optional(),
}).strict();
exports.feedbackUpdateSchema = zod_1.z.object({
    visibility: exports.visibilitySchema.optional(),
    feedbackText: zod_1.z.string().min(1).max(2000).optional(),
    skillTags: zod_1.z.array(zod_1.z.string()).optional(),
    companyValueTags: zod_1.z.array(zod_1.z.string()).optional(),
    initiativeTags: zod_1.z.array(zod_1.z.string()).optional(),
    sentiment: exports.sentimentSchema.optional(),
    aiFlags: zod_1.z.record(zod_1.z.unknown()).optional(),
}).strict();
