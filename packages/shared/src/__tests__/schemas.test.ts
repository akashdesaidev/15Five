import { describe, it, expect } from 'vitest';
import { createUserSchema } from '../schemas/user';
import {
  createOrganizationSchema,
  createDepartmentSchema,
  createTeamSchema
} from '../schemas/organization';

describe('User Schema Validation', () => {
  it('should validate a valid create user request', () => {
    const validUser = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'employee',
      hireDate: new Date(),
      organizationId: '123e4567-e89b-12d3-a456-426614174000'
    };

    const result = createUserSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it('should reject an invalid email', () => {
    const invalidUser = {
      email: 'not-an-email',
      firstName: 'John',
      lastName: 'Doe',
      role: 'employee',
      hireDate: new Date(),
      organizationId: '123e4567-e89b-12d3-a456-426614174000'
    };

    const result = createUserSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });
});

describe('Organization Schema Validation', () => {
  it('should validate a valid create organization request', () => {
    const validOrg = {
      name: 'Test Org',
      timezone: 'America/New_York',
      fiscalYearStartMonth: 1
    };

    const result = createOrganizationSchema.safeParse(validOrg);
    expect(result.success).toBe(true);
  });

  it('should reject an invalid timezone', () => {
    const invalidOrg = {
      name: 'Test Org',
      timezone: 'Invalid/Timezone!',
      fiscalYearStartMonth: 1
    };

    const result = createOrganizationSchema.safeParse(invalidOrg);
    expect(result.success).toBe(false);
  });
});

describe('Department Schema Validation', () => {
  it('should validate a valid create department request', () => {
    const validDept = {
      name: 'Engineering',
      organizationId: '123e4567-e89b-12d3-a456-426614174000'
    };

    const result = createDepartmentSchema.safeParse(validDept);
    expect(result.success).toBe(true);
  });

  it('should reject an invalid organization ID', () => {
    const invalidDept = {
      name: 'Engineering',
      organizationId: 'not-a-uuid'
    };

    const result = createDepartmentSchema.safeParse(invalidDept);
    expect(result.success).toBe(false);
  });
});

describe('Team Schema Validation', () => {
  it('should validate a valid create team request', () => {
    const validTeam = {
      name: 'Frontend',
      departmentId: '123e4567-e89b-12d3-a456-426614174000',
      organizationId: '123e4567-e89b-12d3-a456-426614174000'
    };

    const result = createTeamSchema.safeParse(validTeam);
    expect(result.success).toBe(true);
  });

  it('should reject missing required fields', () => {
    const invalidTeam = {
      name: 'Frontend'
    };

    const result = createTeamSchema.safeParse(invalidTeam);
    expect(result.success).toBe(false);
  });
}); 