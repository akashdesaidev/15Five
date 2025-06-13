"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewStatus = exports.ReviewType = exports.CycleState = exports.CycleType = void 0;
var CycleType;
(function (CycleType) {
    CycleType["QUARTERLY"] = "quarterly";
    CycleType["HALF_YEARLY"] = "half_yearly";
    CycleType["ANNUAL"] = "annual";
    CycleType["CUSTOM"] = "custom";
})(CycleType || (exports.CycleType = CycleType = {}));
var CycleState;
(function (CycleState) {
    CycleState["ACTIVE"] = "active";
    CycleState["GRACE_PERIOD"] = "grace_period";
    CycleState["CLOSED"] = "closed";
})(CycleState || (exports.CycleState = CycleState = {}));
var ReviewType;
(function (ReviewType) {
    ReviewType["SELF"] = "self";
    ReviewType["PEER"] = "peer";
    ReviewType["MANAGER"] = "manager";
    ReviewType["UPWARD"] = "upward";
})(ReviewType || (exports.ReviewType = ReviewType = {}));
var ReviewStatus;
(function (ReviewStatus) {
    ReviewStatus["DRAFT"] = "draft";
    ReviewStatus["SUBMITTED"] = "submitted";
    ReviewStatus["NOT_SUBMITTED"] = "not_submitted";
})(ReviewStatus || (exports.ReviewStatus = ReviewStatus = {}));
