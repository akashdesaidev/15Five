const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const app = require('../../index');
const { generateToken } = require('../../utils/auth');

const prisma = new PrismaClient();

describe('OKR Routes', () => {
  let organization;
  let department;
  let team;
  let adminUser;
  let managerUser;
  let employeeUser;
  let adminToken;
  let managerToken;
  let employeeToken;

  beforeAll(async () => {
    // Create test organization
    organization = await prisma.organization.create({
      data: {
        name: 'Test Organization',
      },
    });

    // Create test department
    department = await prisma.department.create({
      data: {
        name: 'Test Department',
        organizationId: organization.id,
      },
    });

    // Create test team
    team = await prisma.team.create({
      data: {
        name: 'Test Team',
        departmentId: department.id,
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
    managerToken = generateToken(managerUser);
    employeeToken = generateToken(employeeUser);
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.okrProgressSnapshot.deleteMany();
    await prisma.keyResult.deleteMany();
    await prisma.okr.deleteMany();
    await prisma.team.deleteMany();
    await prisma.department.deleteMany();
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /api/v1/okrs', () => {
    it('should create a company OKR when admin user', async () => {
      const response = await request(app)
        .post('/api/v1/okrs')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Test Company OKR',
          description: 'Test Description',
          type: 'company',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'Test Company OKR');
      expect(response.body).toHaveProperty('type', 'company');
    });

    it('should create a team OKR when manager', async () => {
      const response = await request(app)
        .post('/api/v1/okrs')
        .set('Authorization', `Bearer ${managerToken}`)
        .send({
          title: 'Test Team OKR',
          description: 'Test Description',
          type: 'team',
          teamId: team.id,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'Test Team OKR');
      expect(response.body).toHaveProperty('teamId', team.id);
    });

    it('should not allow employee to create OKR', async () => {
      const response = await request(app)
        .post('/api/v1/okrs')
        .set('Authorization', `Bearer ${employeeToken}`)
        .send({
          title: 'Test OKR',
          type: 'individual',
        });

      expect(response.status).toBe(403);
    });
  });

  describe('GET /api/v1/okrs', () => {
    let companyOkr;
    let teamOkr;

    beforeEach(async () => {
      companyOkr = await prisma.okr.create({
        data: {
          title: 'Test Company OKR',
          type: 'company',
          status: 'active',
        },
      });

      teamOkr = await prisma.okr.create({
        data: {
          title: 'Test Team OKR',
          type: 'team',
          teamId: team.id,
          status: 'active',
        },
      });
    });

    it('should get all OKRs', async () => {
      const response = await request(app)
        .get('/api/v1/okrs')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should filter OKRs by type', async () => {
      const response = await request(app)
        .get('/api/v1/okrs?type=team')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body[0].type).toBe('team');
    });
  });

  describe('POST /api/v1/okrs/:id/key-results', () => {
    let okr;

    beforeEach(async () => {
      okr = await prisma.okr.create({
        data: {
          title: 'Test OKR',
          type: 'team',
          teamId: team.id,
          status: 'active',
        },
      });
    });

    it('should add key result to OKR', async () => {
      const response = await request(app)
        .post(`/api/v1/okrs/${okr.id}/key-results`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          description: 'Test Key Result',
          targetScore: 10,
          dueDate: '2024-12-31',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('description', 'Test Key Result');
      expect(response.body).toHaveProperty('targetScore', 10);
      expect(response.body).toHaveProperty('currentScore', 1);
    });
  });

  describe('POST /api/v1/okrs/:okrId/key-results/:keyResultId/progress', () => {
    let okr;
    let keyResult;

    beforeEach(async () => {
      okr = await prisma.okr.create({
        data: {
          title: 'Test OKR',
          type: 'team',
          teamId: team.id,
          status: 'active',
        },
      });

      keyResult = await prisma.keyResult.create({
        data: {
          description: 'Test Key Result',
          targetScore: 10,
          currentScore: 1,
          okrId: okr.id,
        },
      });
    });

    it('should update key result progress', async () => {
      const response = await request(app)
        .post(`/api/v1/okrs/${okr.id}/key-results/${keyResult.id}/progress`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          score: 5,
          notes: 'Progress update',
        });

      expect(response.status).toBe(200);
      expect(response.body.keyResult).toHaveProperty('currentScore', 5);
      expect(response.body.snapshot).toHaveProperty('score', 5);
      expect(response.body.snapshot).toHaveProperty('notes', 'Progress update');
    });

    it('should not allow unauthorized user to update progress', async () => {
      const otherEmployee = await prisma.user.create({
        data: {
          email: 'other@test.com',
          firstName: 'Other',
          lastName: 'Employee',
          role: 'EMPLOYEE',
          organizationId: organization.id,
        },
      });

      const otherToken = generateToken(otherEmployee);

      const response = await request(app)
        .post(`/api/v1/okrs/${okr.id}/key-results/${keyResult.id}/progress`)
        .set('Authorization', `Bearer ${otherToken}`)
        .send({
          score: 5,
          notes: 'Progress update',
        });

      expect(response.status).toBe(403);
    });
  });
}); 