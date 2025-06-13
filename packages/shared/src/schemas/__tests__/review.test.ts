import { describe, it, expect } from 'vitest';
import {
  reviewCycleSchema,
  reviewParticipantSchema,
  reviewSchema,
  reviewTemplateSchema,
  createReviewCycleSchema,
  updateReviewCycleSchema,
  createReviewSchema,
  updateReviewSchema
} from '../review';

describe('Review Schemas', () => {
  const validUUID = '123e4567-e89b-12d3-a456-426614174000';
  const futureDate = new Date(Date.now() + 86400000); // Tomorrow
  const pastDate = new Date(Date.now() - 86400000); // Yesterday

  describe('reviewCycleSchema', () => {
    const validCycle = {
      id: validUUID,
      title: 'Q1 2024 Review',
      type: 'quarterly',
      startDate: pastDate,
      endDate: futureDate,
      isEmergencyCycle: false,
      state: 'active',
      createdBy: validUUID,
      organizationId: validUUID,
      createdAt: pastDate,
      updatedAt: pastDate
    };

    it('should validate a valid review cycle', () => {
      expect(() => reviewCycleSchema.parse(validCycle)).not.toThrow();
    });

    it('should validate with optional grace period dates', () => {
      const withGracePeriod = {
        ...validCycle,
        gracePeriodStart: pastDate,
        gracePeriodEnd: futureDate
      };
      expect(() => reviewCycleSchema.parse(withGracePeriod)).not.toThrow();
    });

    it('should validate with optional parent cycle', () => {
      const withParent = {
        ...validCycle,
        parentCycleId: validUUID
      };
      expect(() => reviewCycleSchema.parse(withParent)).not.toThrow();
    });

    it('should fail with invalid cycle type', () => {
      const invalidType = {
        ...validCycle,
        type: 'invalid'
      };
      expect(() => reviewCycleSchema.parse(invalidType)).toThrow();
    });

    it('should fail with invalid state', () => {
      const invalidState = {
        ...validCycle,
        state: 'invalid'
      };
      expect(() => reviewCycleSchema.parse(invalidState)).toThrow();
    });
  });

  describe('reviewParticipantSchema', () => {
    const validParticipant = {
      id: validUUID,
      cycleId: validUUID,
      userId: validUUID,
      participationStatus: 'active',
      joinedAt: pastDate
    };

    it('should validate a valid participant', () => {
      expect(() => reviewParticipantSchema.parse(validParticipant)).not.toThrow();
    });

    it('should validate with exit date', () => {
      const withExit = {
        ...validParticipant,
        exitedAt: futureDate
      };
      expect(() => reviewParticipantSchema.parse(withExit)).not.toThrow();
    });

    it('should fail with invalid status', () => {
      const invalidStatus = {
        ...validParticipant,
        participationStatus: 'invalid'
      };
      expect(() => reviewParticipantSchema.parse(invalidStatus)).toThrow();
    });
  });

  describe('reviewSchema', () => {
    const validReview = {
      id: validUUID,
      cycleId: validUUID,
      reviewerId: validUUID,
      revieweeId: validUUID,
      reviewType: 'self',
      isAnonymous: false,
      content: {},
      status: 'draft',
      createdAt: pastDate,
      updatedAt: pastDate,
      version: 1
    };

    it('should validate a valid review', () => {
      expect(() => reviewSchema.parse(validReview)).not.toThrow();
    });

    it('should validate with AI features', () => {
      const withAI = {
        ...validReview,
        aiGeneratedSuggestion: 'AI suggestion',
        summary: 'AI summary',
        recentFeedbackScore: 0.8,
        okrScore: 0.7,
        peerFeedbackScore: 0.9,
        managerFeedbackScore: 0.85,
        selfAssessmentScore: 0.75,
        tenureAdjustmentScore: 0.95,
        finalAiScore: 0.82
      };
      expect(() => reviewSchema.parse(withAI)).not.toThrow();
    });

    it('should fail with invalid review type', () => {
      const invalidType = {
        ...validReview,
        reviewType: 'invalid'
      };
      expect(() => reviewSchema.parse(invalidType)).toThrow();
    });

    it('should fail with invalid status', () => {
      const invalidStatus = {
        ...validReview,
        status: 'invalid'
      };
      expect(() => reviewSchema.parse(invalidStatus)).toThrow();
    });

    it('should fail with invalid score range', () => {
      const invalidScore = {
        ...validReview,
        finalAiScore: 1.5
      };
      expect(() => reviewSchema.parse(invalidScore)).toThrow();
    });
  });

  describe('reviewTemplateSchema', () => {
    const validTemplate = {
      id: validUUID,
      name: 'Performance Review Template',
      questions: {},
      version: 1,
      isActive: true,
      createdBy: validUUID,
      createdAt: pastDate,
      updatedAt: pastDate
    };

    it('should validate a valid template', () => {
      expect(() => reviewTemplateSchema.parse(validTemplate)).not.toThrow();
    });

    it('should fail with empty name', () => {
      const emptyName = {
        ...validTemplate,
        name: ''
      };
      expect(() => reviewTemplateSchema.parse(emptyName)).toThrow();
    });

    it('should fail with invalid version', () => {
      const invalidVersion = {
        ...validTemplate,
        version: 0
      };
      expect(() => reviewTemplateSchema.parse(invalidVersion)).toThrow();
    });
  });

  describe('Request Schemas', () => {
    describe('createReviewCycleSchema', () => {
      const validCreate = {
        title: 'Q1 2024 Review',
        type: 'quarterly',
        startDate: futureDate,
        endDate: new Date(futureDate.getTime() + 86400000),
        organizationId: validUUID
      };

      it('should validate a valid create request', () => {
        expect(() => createReviewCycleSchema.parse(validCreate)).not.toThrow();
      });

      it('should validate with optional fields', () => {
        const withOptional = {
          ...validCreate,
          isEmergencyCycle: true,
          parentCycleId: validUUID
        };
        expect(() => createReviewCycleSchema.parse(withOptional)).not.toThrow();
      });

      it('should fail with extra fields', () => {
        const extraFields = {
          ...validCreate,
          extra: 'field'
        };
        expect(() => createReviewCycleSchema.parse(extraFields)).toThrow();
      });
    });

    describe('updateReviewCycleSchema', () => {
      it('should validate partial updates', () => {
        const partialUpdate = {
          title: 'Updated Title'
        };
        expect(() => updateReviewCycleSchema.parse(partialUpdate)).not.toThrow();
      });

      it('should validate state update', () => {
        const stateUpdate = {
          state: 'grace_period'
        };
        expect(() => updateReviewCycleSchema.parse(stateUpdate)).not.toThrow();
      });

      it('should fail with invalid state', () => {
        const invalidState = {
          state: 'invalid'
        };
        expect(() => updateReviewCycleSchema.parse(invalidState)).toThrow();
      });
    });

    describe('createReviewSchema', () => {
      const validCreate = {
        cycleId: validUUID,
        reviewerId: validUUID,
        revieweeId: validUUID,
        reviewType: 'peer',
        isAnonymous: true,
        content: {}
      };

      it('should validate a valid create request', () => {
        expect(() => createReviewSchema.parse(validCreate)).not.toThrow();
      });

      it('should fail with extra fields', () => {
        const extraFields = {
          ...validCreate,
          extra: 'field'
        };
        expect(() => createReviewSchema.parse(extraFields)).toThrow();
      });
    });

    describe('updateReviewSchema', () => {
      it('should validate content update', () => {
        const contentUpdate = {
          content: { answers: {} }
        };
        expect(() => updateReviewSchema.parse(contentUpdate)).not.toThrow();
      });

      it('should validate status update', () => {
        const statusUpdate = {
          status: 'submitted'
        };
        expect(() => updateReviewSchema.parse(statusUpdate)).not.toThrow();
      });

      it('should fail with invalid status', () => {
        const invalidStatus = {
          status: 'invalid'
        };
        expect(() => updateReviewSchema.parse(invalidStatus)).toThrow();
      });
    });
  });
}); 