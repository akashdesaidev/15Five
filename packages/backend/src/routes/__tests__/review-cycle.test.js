const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const app = require('../../index');
const { generateToken } = require('../../utils/auth');

const prisma = new PrismaClient();

describe('Review Cycle Routes', () => {
  let organization;
  let adminUser;
  let hrUser;
  let employeeUser;
  let adminToken;
  let hrToken;
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
    employeeToken = generateToken(employeeUser);
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.reviewParticipant.deleteMany();
    await prisma.reviewCycle.deleteMany();
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /api/v1/review-cycles', () => {
    it('should create a review cycle when admin user', async () => {
      const response = await request(app)
        .post('/api/v1/review-cycles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Q1 2024 Review',
          type: 'quarterly',
          startDate: '2024-01-01',
          endDate: '2024-03-31',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'Q1 2024 Review');
      expect(response.body).toHaveProperty('type', 'quarterly');
      expect(response.body).toHaveProperty('state', 'active');
    });

    it('should create a review cycle when HR user', async () => {
      const response = await request(app)
        .post('/api/v1/review-cycles')
        .set('Authorization', `Bearer ${hrToken}`)
        .send({
          title: 'Q2 2024 Review',
          type: 'quarterly',
          startDate: '2024-04-01',
          endDate: '2024-06-30',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'Q2 2024 Review');
    });

    it('should not allow employee to create review cycle', async () => {
      const response = await request(app)
        .post('/api/v1/review-cycles')
        .set('Authorization', `Bearer ${employeeToken}`)
        .send({
          title: 'Invalid Review',
          type: 'quarterly',
          startDate: '2024-01-01',
          endDate: '2024-03-31',
        });

      expect(response.status).toBe(403);
    });

    it('should prevent overlapping non-emergency cycles', async () => {
      // Create first cycle
      await request(app)
        .post('/api/v1/review-cycles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'First Cycle',
          type: 'quarterly',
          startDate: '2024-01-01',
          endDate: '2024-03-31',
        });

      // Try to create overlapping cycle
      const response = await request(app)
        .post('/api/v1/review-cycles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Overlapping Cycle',
          type: 'quarterly',
          startDate: '2024-03-15',
          endDate: '2024-06-15',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Overlapping active review cycle exists');
    });

    it('should allow emergency cycle creation', async () => {
      const response = await request(app)
        .post('/api/v1/review-cycles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Emergency Review',
          type: 'custom',
          startDate: '2024-02-01',
          endDate: '2024-02-28',
          isEmergencyCycle: true,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('isEmergencyCycle', true);
    });
  });

  describe('GET /api/v1/review-cycles', () => {
    let cycle;

    beforeEach(async () => {
      cycle = await prisma.reviewCycle.create({
        data: {
          title: 'Test Cycle',
          type: 'quarterly',
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-03-31'),
          state: 'active',
          organizationId: organization.id,
          createdBy: adminUser.id,
        },
      });
    });

    it('should get all review cycles', async () => {
      const response = await request(app)
        .get('/api/v1/review-cycles')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should filter review cycles by state', async () => {
      const response = await request(app)
        .get('/api/v1/review-cycles?state=active')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body[0].state).toBe('active');
    });
  });

  describe('POST /api/v1/review-cycles/:id/participants', () => {
    let cycle;

    beforeEach(async () => {
      cycle = await prisma.reviewCycle.create({
        data: {
          title: 'Test Cycle',
          type: 'quarterly',
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-03-31'),
          state: 'active',
          organizationId: organization.id,
          createdBy: adminUser.id,
        },
      });
    });

    it('should add participants to review cycle', async () => {
      const response = await request(app)
        .post(`/api/v1/review-cycles/${cycle.id}/participants`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          userIds: [employeeUser.id],
        });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body[0]).toHaveProperty('userId', employeeUser.id);
      expect(response.body[0]).toHaveProperty('participationStatus', 'active');
    });

    it('should not add non-existent users', async () => {
      const response = await request(app)
        .post(`/api/v1/review-cycles/${cycle.id}/participants`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          userIds: ['non-existent-id'],
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'One or more users not found');
    });
  });

  describe('PATCH /api/v1/review-cycles/:id/participants/:participantId', () => {
    let cycle;
    let participant;

    beforeEach(async () => {
      cycle = await prisma.reviewCycle.create({
        data: {
          title: 'Test Cycle',
          type: 'quarterly',
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-03-31'),
          state: 'active',
          organizationId: organization.id,
          createdBy: adminUser.id,
        },
      });

      participant = await prisma.reviewParticipant.create({
        data: {
          cycleId: cycle.id,
          userId: employeeUser.id,
          participationStatus: 'active',
        },
      });
    });

    it('should update participant status', async () => {
      const response = await request(app)
        .patch(`/api/v1/review-cycles/${cycle.id}/participants/${participant.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          participationStatus: 'removed',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('participationStatus', 'removed');
      expect(response.body).toHaveProperty('exitedAt');
    });

    it('should not allow employee to update participant status', async () => {
      const response = await request(app)
        .patch(`/api/v1/review-cycles/${cycle.id}/participants/${participant.id}`)
        .set('Authorization', `Bearer ${employeeToken}`)
        .send({
          participationStatus: 'removed',
        });

      expect(response.status).toBe(403);
    });
  });
}); 