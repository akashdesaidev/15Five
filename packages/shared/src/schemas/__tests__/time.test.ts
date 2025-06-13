import { describe, it, expect } from 'vitest';
import {
  timeEntrySchema,
  timeAllocationSchema,
  timeUtilizationMetricsSchema,
  createTimeEntrySchema,
  updateTimeEntrySchema,
  createTimeAllocationSchema,
  updateTimeAllocationSchema
} from '../time';

describe('Time Tracking Schemas', () => {
  const validUUID = '123e4567-e89b-12d3-a456-426614174000';
  const futureDate = new Date(Date.now() + 86400000); // Tomorrow
  const pastDate = new Date(Date.now() - 86400000); // Yesterday

  describe('timeEntrySchema', () => {
    const validTimeEntry = {
      id: validUUID,
      userId: validUUID,
      okrId: validUUID,
      date: pastDate,
      hoursSpent: 8,
      category: 'direct_work',
      createdAt: pastDate,
      updatedAt: pastDate
    };

    it('should validate a valid time entry', () => {
      expect(() => timeEntrySchema.parse(validTimeEntry)).not.toThrow();
    });

    it('should validate with optional fields', () => {
      const withOptional = {
        ...validTimeEntry,
        keyResultId: validUUID,
        description: 'Working on feature X',
        deletedAt: futureDate
      };
      expect(() => timeEntrySchema.parse(withOptional)).not.toThrow();
    });

    it('should fail with invalid hours', () => {
      const invalidHours = {
        ...validTimeEntry,
        hoursSpent: 25
      };
      expect(() => timeEntrySchema.parse(invalidHours)).toThrow();
    });

    it('should fail with negative hours', () => {
      const negativeHours = {
        ...validTimeEntry,
        hoursSpent: -1
      };
      expect(() => timeEntrySchema.parse(negativeHours)).toThrow();
    });

    it('should fail with invalid category', () => {
      const invalidCategory = {
        ...validTimeEntry,
        category: 'invalid'
      };
      expect(() => timeEntrySchema.parse(invalidCategory)).toThrow();
    });
  });

  describe('timeAllocationSchema', () => {
    const validAllocation = {
      id: validUUID,
      okrId: validUUID,
      expectedWeeklyHours: 20,
      minimumAllocationPercentage: 50,
      startDate: pastDate,
      createdAt: pastDate,
      updatedAt: pastDate
    };

    it('should validate a valid time allocation', () => {
      expect(() => timeAllocationSchema.parse(validAllocation)).not.toThrow();
    });

    it('should validate with optional fields', () => {
      const withOptional = {
        ...validAllocation,
        endDate: futureDate,
        deletedAt: futureDate
      };
      expect(() => timeAllocationSchema.parse(withOptional)).not.toThrow();
    });

    it('should fail with invalid weekly hours', () => {
      const invalidHours = {
        ...validAllocation,
        expectedWeeklyHours: 41
      };
      expect(() => timeAllocationSchema.parse(invalidHours)).toThrow();
    });

    it('should fail with invalid allocation percentage', () => {
      const invalidPercentage = {
        ...validAllocation,
        minimumAllocationPercentage: 101
      };
      expect(() => timeAllocationSchema.parse(invalidPercentage)).toThrow();
    });
  });

  describe('timeUtilizationMetricsSchema', () => {
    const validMetrics = {
      id: validUUID,
      userId: validUUID,
      okrId: validUUID,
      weekStarting: pastDate,
      createdAt: pastDate
    };

    it('should validate a valid metrics entry', () => {
      expect(() => timeUtilizationMetricsSchema.parse(validMetrics)).not.toThrow();
    });

    it('should validate with optional fields', () => {
      const withOptional = {
        ...validMetrics,
        plannedHours: 40,
        actualHours: 38,
        efficiencyScore: 0.95
      };
      expect(() => timeUtilizationMetricsSchema.parse(withOptional)).not.toThrow();
    });

    it('should fail with invalid efficiency score', () => {
      const invalidScore = {
        ...validMetrics,
        efficiencyScore: 1.5
      };
      expect(() => timeUtilizationMetricsSchema.parse(invalidScore)).toThrow();
    });
  });

  describe('Request Schemas', () => {
    describe('createTimeEntrySchema', () => {
      const validCreate = {
        okrId: validUUID,
        date: pastDate,
        hoursSpent: 8,
        category: 'direct_work'
      };

      it('should validate a valid create request', () => {
        expect(() => createTimeEntrySchema.parse(validCreate)).not.toThrow();
      });

      it('should validate with optional fields', () => {
        const withOptional = {
          ...validCreate,
          keyResultId: validUUID,
          description: 'Working on feature X'
        };
        expect(() => createTimeEntrySchema.parse(withOptional)).not.toThrow();
      });

      it('should fail with extra fields', () => {
        const extraFields = {
          ...validCreate,
          extra: 'field'
        };
        expect(() => createTimeEntrySchema.parse(extraFields)).toThrow();
      });
    });

    describe('updateTimeEntrySchema', () => {
      it('should validate partial updates', () => {
        const partialUpdate = {
          hoursSpent: 4
        };
        expect(() => updateTimeEntrySchema.parse(partialUpdate)).not.toThrow();
      });

      it('should validate category update', () => {
        const categoryUpdate = {
          category: 'planning'
        };
        expect(() => updateTimeEntrySchema.parse(categoryUpdate)).not.toThrow();
      });

      it('should fail with invalid category', () => {
        const invalidCategory = {
          category: 'invalid'
        };
        expect(() => updateTimeEntrySchema.parse(invalidCategory)).toThrow();
      });
    });

    describe('createTimeAllocationSchema', () => {
      const validCreate = {
        okrId: validUUID,
        expectedWeeklyHours: 20,
        minimumAllocationPercentage: 50,
        startDate: pastDate
      };

      it('should validate a valid create request', () => {
        expect(() => createTimeAllocationSchema.parse(validCreate)).not.toThrow();
      });

      it('should validate with end date', () => {
        const withEndDate = {
          ...validCreate,
          endDate: futureDate
        };
        expect(() => createTimeAllocationSchema.parse(withEndDate)).not.toThrow();
      });

      it('should fail with extra fields', () => {
        const extraFields = {
          ...validCreate,
          extra: 'field'
        };
        expect(() => createTimeAllocationSchema.parse(extraFields)).toThrow();
      });
    });

    describe('updateTimeAllocationSchema', () => {
      it('should validate partial updates', () => {
        const partialUpdate = {
          expectedWeeklyHours: 30
        };
        expect(() => updateTimeAllocationSchema.parse(partialUpdate)).not.toThrow();
      });

      it('should validate percentage update', () => {
        const percentageUpdate = {
          minimumAllocationPercentage: 75
        };
        expect(() => updateTimeAllocationSchema.parse(percentageUpdate)).not.toThrow();
      });

      it('should fail with invalid percentage', () => {
        const invalidPercentage = {
          minimumAllocationPercentage: 101
        };
        expect(() => updateTimeAllocationSchema.parse(invalidPercentage)).toThrow();
      });
    });
  });
}); 