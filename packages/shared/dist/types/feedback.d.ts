export declare enum Visibility {
    PUBLIC = "public",
    PRIVATE = "private"
}
export declare enum Sentiment {
    POSITIVE = "positive",
    NEUTRAL = "neutral",
    NEGATIVE = "negative"
}
export interface Feedback {
    id: string;
    authorId: string;
    receiverId: string;
    visibility: Visibility;
    feedbackText: string;
    skillTags: string[];
    companyValueTags: string[];
    initiativeTags: string[];
    sentiment?: Sentiment;
    aiFlags: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
export interface FeedbackCreateInput {
    authorId: string;
    receiverId: string;
    visibility?: Visibility;
    feedbackText: string;
    skillTags?: string[];
    companyValueTags?: string[];
    initiativeTags?: string[];
}
export interface FeedbackUpdateInput {
    visibility?: Visibility;
    feedbackText?: string;
    skillTags?: string[];
    companyValueTags?: string[];
    initiativeTags?: string[];
    sentiment?: Sentiment;
    aiFlags?: Record<string, any>;
}
