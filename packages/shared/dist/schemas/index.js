"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortQuerySchema = exports.paginationQuerySchema = exports.errorResponseSchema = exports.paginatedResponseSchema = exports.urlSchema = exports.phoneSchema = exports.emailSchema = exports.isoDateSchema = exports.uuidSchema = void 0;
// Re-export all schemas
__exportStar(require("./review"), exports);
__exportStar(require("./time"), exports);
// Export common validation patterns
const zod_1 = require("zod");
exports.uuidSchema = zod_1.z.string().uuid();
exports.isoDateSchema = zod_1.z.string().datetime();
exports.emailSchema = zod_1.z.string().email();
exports.phoneSchema = zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/);
exports.urlSchema = zod_1.z.string().url();
// Common response schemas
const paginatedResponseSchema = (schema) => zod_1.z.object({
    items: zod_1.z.array(schema),
    total: zod_1.z.number().int().nonnegative(),
    page: zod_1.z.number().int().positive(),
    pageSize: zod_1.z.number().int().positive(),
    hasMore: zod_1.z.boolean()
});
exports.paginatedResponseSchema = paginatedResponseSchema;
exports.errorResponseSchema = zod_1.z.object({
    message: zod_1.z.string(),
    code: zod_1.z.string(),
    details: zod_1.z.record(zod_1.z.unknown()).optional()
});
// Common request schemas
exports.paginationQuerySchema = zod_1.z.object({
    page: zod_1.z.number().int().positive().default(1),
    pageSize: zod_1.z.number().int().positive().max(100).default(20)
});
exports.sortQuerySchema = zod_1.z.object({
    sortBy: zod_1.z.string(),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('asc')
});
