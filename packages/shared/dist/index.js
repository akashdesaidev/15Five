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
exports.z = void 0;
// Types
__exportStar(require("./types/user"), exports);
__exportStar(require("./types/organization"), exports);
// Schemas
__exportStar(require("./schemas/user"), exports);
__exportStar(require("./schemas/organization"), exports);
// Re-export zod for convenience
var zod_1 = require("zod");
Object.defineProperty(exports, "z", { enumerable: true, get: function () { return zod_1.z; } });
// Export utility functions (to be added later)
__exportStar(require("./utils"), exports);
