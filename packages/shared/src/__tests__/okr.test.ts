import { describe, it, expect } from 'vitest';
import {
  createOKRSchema,
  createKeyResultSchema,
  createTimeEntrySchema,
  okrTypeEnum,
  timeEntryCategoryEnum
} from '../schemas/okr';

describe('OKR Schema Validation', () => {
  it('should validate a valid create OKR request', () => {
    const validOKR = {
      title: 'Increase Revenue',
      description: 'Increase company revenue by 20% YoY',
      type: 'company' as const,
      ownerUserId: '123e4567-e89b-12d3-a456-426614174000',
      organizationId: '123e4567-e89b-12d3-a456-426614174000',
      tags: ['revenue', 'growth']
    };

    const result = createOKRSchema.safeParse(validOKR);
    expect(result.success).toBe(true);
  });

  it('should reject an invalid OKR type', () => {
    const invalidOKR = {
      title: 'Increase Revenue',
      description: 'Increase company revenue by 20% YoY',
      type: 'invalid-type',
      ownerUserId: '123e4567-e89b-12d3-a456-426614174000',
      organizationId: '123e4567-e89b-12d3-a456-426614174000'
    };

    const result = createOKRSchema.safeParse(invalidOKR);
    expect(result.success).toBe(false);
  });

  it('should validate all possible OKR types', () => {
    const validTypes = ['company', 'department', 'team', 'individual'];
    validTypes.forEach(type => {
      expect(okrTypeEnum.safeParse(type).success).toBe(true);
    });
  });
});

describe('Key Result Schema Validation', () => {
  it('should validate a valid create key result request', () => {
    const validKeyResult = {
      okrId: '123e4567-e89b-12d3-a456-426614174000',
      description: 'Achieve $10M in annual recurring revenue',
      targetScore: 10,
      dueDate: new Date('2024-12-31')
    };

    const result = createKeyResultSchema.safeParse(validKeyResult);
    expect(result.success).toBe(true);
  });

  it('should reject invalid score values', () => {
    const invalidKeyResult = {
      okrId: '123e4567-e89b-12d3-a456-426614174000',
      description: 'Achieve $10M in annual recurring revenue',
      targetScore: 11, // Invalid: must be 1-10
      dueDate: new Date('2024-12-31')
    };

    const result = createKeyResultSchema.safeParse(invalidKeyResult);
    expect(result.success).toBe(false);
  });
});

describe('Time Entry Schema Validation', () => {
  it('should validate a valid create time entry request', () => {
    const validTimeEntry = {
      userId: '123e4567-e89b-12d3-a456-426614174000',
      okrId: '123e4567-e89b-12d3-a456-426614174000',
      date: new Date(),
      hoursSpent: 8,
      category: 'direct_work' as const
    };

    const result = createTimeEntrySchema.safeParse(validTimeEntry);
    expect(result.success).toBe(true);
  });

  it('should reject invalid hours spent', () => {
    const invalidTimeEntry = {
      userId: '123e4567-e89b-12d3-a456-426614174000',
      okrId: '123e4567-e89b-12d3-a456-426614174000',
      date: new Date(),
      hoursSpent: 25, // Invalid: must be <= 24
      category: 'direct_work' as const
    };

    const result = createTimeEntrySchema.safeParse(invalidTimeEntry);
    expect(result.success).toBe(false);
  });

  it('should validate all possible time entry categories', () => {
    const validCategories = ['direct_work', 'planning', 'collaboration', 'review', 'other'];
    validCategories.forEach(category => {
      expect(timeEntryCategoryEnum.safeParse(category).success).toBe(true);
    });
  });
}); 