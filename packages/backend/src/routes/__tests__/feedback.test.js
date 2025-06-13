const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const app = require('../../index');
const { generateToken } = require('../../utils/auth');

const prisma = new PrismaClient();

describe('Feedback Routes', () => {
  let organization;
  let adminUser;
  let hrUser;
  let managerUser;
  let employeeUser;
  let adminToken;
  let hrToken;
  let managerToken;
  let employeeToken;

  beforeAll(async () => {
    // Create test organization
    organization = await prisma.organization.create({
      data: {
        name: 'Test Organization',
      },
    });

    // Create test users
    adminUser = await prisma.user.create({
      data: {
        email: 'admin@test.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        organizationId: organization.id,
      },
    });

    hrUser = await prisma.user.create({
      data: {
        email: 'hr@test.com',
        firstName: 'HR',
        lastName: 'User',
        role: 'HR',
        organizationId: organization.id,
      },
    });

    managerUser = await prisma.user.create({
      data: {
        email: 'manager@test.com',
        firstName: 'Manager',
        lastName: 'User',
        role: 'MANAGER',
        organizationId: organization.id,
      },
    });

    employeeUser = await prisma.user.create({
      data: {
        email: 'employee@test.com',
        firstName: 'Employee',
        lastName: 'User',
        role: 'EMPLOYEE',
        organizationId: organization.id,
      },
    });

    // Generate tokens
    adminToken = generateToken(adminUser);
    hrToken = generateToken(hrUser);
    managerToken = generateToken(managerUser);
    employeeToken = generateToken(employeeUser);
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.feedback.deleteMany();
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /api/v1/feedback', () => {
    it('should create public feedback', async () => {
      const response = await request(app)
        .post('/api/v1/feedback')
        .set('Authorization', `Bearer ${employeeToken}`)
        .send({
          receiverId: managerUser.id,
          feedbackText: 'Great leadership!',
          visibility: 'public',
          skillTags: ['leadership', 'communication'],
          companyValueTags: ['collaboration'],
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('feedbackText', 'Great leadership!');
      expect(response.body).toHaveProperty('visibility', 'public');
      expect(response.body.skillTags).toContain('leadership');
      expect(response.body.companyValueTags).toContain('collaboration');
    });

    it('should create private feedback', async () => {
      const response = await request(app)
        .post('/api/v1/feedback')
        .set('Authorization', `Bearer ${employeeToken}`)
        .send({
          receiverId: managerUser.id,
          feedbackText: 'Private feedback',
          visibility: 'private',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('visibility', 'private');
    });

    it('should not allow feedback for users outside organization', async () => {
      const otherOrg = await prisma.organization.create({
        data: { name: 'Other Org' },
      });

      const otherUser = await prisma.user.create({
        data: {
          email: 'other@test.com',
          firstName: 'Other',
          lastName: 'User',
          role: 'EMPLOYEE',
          organizationId: otherOrg.id,
        },
      });

      const response = await request(app)
        .post('/api/v1/feedback')
        .set('Authorization', `Bearer ${employeeToken}`)
        .send({
          receiverId: otherUser.id,
          feedbackText: 'Invalid feedback',
        });

      expect(response.status).toBe(403);
    });
  });

  describe('GET /api/v1/feedback', () => {
    let publicFeedback;
    let privateFeedback;

    beforeEach(async () => {
      // Create test feedback
      publicFeedback = await prisma.feedback.create({
        data: {
          giverId: employeeUser.id,
          receiverId: managerUser.id,
          feedbackText: 'Public feedback',
          visibility: 'public',
        },
      });

      privateFeedback = await prisma.feedback.create({
        data: {
          giverId: employeeUser.id,
          receiverId: managerUser.id,
          feedbackText: 'Private feedback',
          visibility: 'private',
        },
      });
    });

    it('should get all feedback as admin', async () => {
      const response = await request(app)
        .get('/api/v1/feedback')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(1);
    });

    it('should get only relevant feedback as employee', async () => {
      const response = await request(app)
        .get('/api/v1/feedback')
        .set('Authorization', `Bearer ${employeeToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      // Should see feedback they've given
      expect(response.body.some(f => f.id === publicFeedback.id)).toBeTruthy();
      expect(response.body.some(f => f.id === privateFeedback.id)).toBeTruthy();
    });

    it('should filter feedback by type', async () => {
      const response = await request(app)
        .get('/api/v1/feedback?type=given')
        .set('Authorization', `Bearer ${employeeToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.every(f => f.giverId === employeeUser.id)).toBeTruthy();
    });
  });

  describe('PATCH /api/v1/feedback/:id', () => {
    let feedback;

    beforeEach(async () => {
      feedback = await prisma.feedback.create({
        data: {
          giverId: employeeUser.id,
          receiverId: managerUser.id,
          feedbackText: 'Original feedback',
          visibility: 'public',
        },
      });
    });

    it('should update own feedback', async () => {
      const response = await request(app)
        .patch(`/api/v1/feedback/${feedback.id}`)
        .set('Authorization', `Bearer ${employeeToken}`)
        .send({
          feedbackText: 'Updated feedback',
          skillTags: ['communication'],
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('feedbackText', 'Updated feedback');
      expect(response.body.skillTags).toContain('communication');
    });

    it('should not allow updating others feedback', async () => {
      const response = await request(app)
        .patch(`/api/v1/feedback/${feedback.id}`)
        .set('Authorization', `Bearer ${managerToken}`)
        .send({
          feedbackText: 'Unauthorized update',
        });

      expect(response.status).toBe(403);
    });
  });

  describe('POST /api/v1/feedback/:id/moderate', () => {
    let feedback;

    beforeEach(async () => {
      feedback = await prisma.feedback.create({
        data: {
          giverId: employeeUser.id,
          receiverId: managerUser.id,
          feedbackText: 'Test feedback',
          visibility: 'public',
        },
      });
    });

    it('should allow admin to moderate feedback', async () => {
      const response = await request(app)
        .post(`/api/v1/feedback/${feedback.id}/moderate`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          reason: 'Inappropriate content',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('deletedAt');
      expect(response.body).toHaveProperty('moderationReason', 'Inappropriate content');
      expect(response.body).toHaveProperty('moderatedBy', adminUser.id);
    });

    it('should allow HR to moderate feedback', async () => {
      const response = await request(app)
        .post(`/api/v1/feedback/${feedback.id}/moderate`)
        .set('Authorization', `Bearer ${hrToken}`)
        .send({
          reason: 'Inappropriate content',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('deletedAt');
    });

    it('should not allow employee to moderate feedback', async () => {
      const response = await request(app)
        .post(`/api/v1/feedback/${feedback.id}/moderate`)
        .set('Authorization', `Bearer ${employeeToken}`)
        .send({
          reason: 'Inappropriate content',
        });

      expect(response.status).toBe(403);
    });
  });
}); 