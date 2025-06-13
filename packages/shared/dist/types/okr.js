"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapshotType = exports.OkrStatus = exports.OkrType = void 0;
var OkrType;
(function (OkrType) {
    OkrType["COMPANY"] = "COMPANY";
    OkrType["DEPARTMENT"] = "DEPARTMENT";
    OkrType["TEAM"] = "TEAM";
    OkrType["INDIVIDUAL"] = "INDIVIDUAL";
})(OkrType || (exports.OkrType = OkrType = {}));
var OkrStatus;
(function (OkrStatus) {
    OkrStatus["ACTIVE"] = "active";
    OkrStatus["COMPLETED"] = "completed";
    OkrStatus["ARCHIVED"] = "archived";
})(OkrStatus || (exports.OkrStatus = OkrStatus = {}));
var SnapshotType;
(function (SnapshotType) {
    SnapshotType["MANUAL"] = "manual";
    SnapshotType["AUTO_WEEKLY"] = "auto_weekly";
    SnapshotType["CYCLE_END"] = "cycle_end";
})(SnapshotType || (exports.SnapshotType = SnapshotType = {}));
