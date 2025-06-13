const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const app = require('../../index');
const { generateToken } = require('../../utils/auth');

const prisma = new PrismaClient();

describe('Team Routes', () => {
  let organization;
  let department;
  let adminUser;
  let employeeUser;
  let adminToken;
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
    employeeToken = generateToken(employeeUser);
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.team.deleteMany();
    await prisma.department.deleteMany();
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /api/v1/teams', () => {
    it('should create a new team when admin user', async () => {
      const response = await request(app)
        .post('/api/v1/teams')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test Team',
          departmentId: department.id,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('name', 'Test Team');
      expect(response.body).toHaveProperty('departmentId', department.id);
    });

    it('should not allow employee to create team', async () => {
      const response = await request(app)
        .post('/api/v1/teams')
        .set('Authorization', `Bearer ${employeeToken}`)
        .send({
          name: 'Test Team',
          departmentId: department.id,
        });

      expect(response.status).toBe(403);
    });
  });

  describe('GET /api/v1/teams', () => {
    let team;

    beforeEach(async () => {
      team = await prisma.team.create({
        data: {
          name: 'Test Team',
          departmentId: department.id,
        },
      });
    });

    it('should get all teams', async () => {
      const response = await request(app)
        .get('/api/v1/teams')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should filter teams by department', async () => {
      const response = await request(app)
        .get(`/api/v1/teams?departmentId=${department.id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body[0].departmentId).toBe(department.id);
    });
  });

  describe('GET /api/v1/teams/:id', () => {
    let team;

    beforeEach(async () => {
      team = await prisma.team.create({
        data: {
          name: 'Test Team',
          departmentId: department.id,
        },
      });
    });

    it('should get team by id', async () => {
      const response = await request(app)
        .get(`/api/v1/teams/${team.id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', team.id);
      expect(response.body).toHaveProperty('name', team.name);
    });

    it('should return 404 for non-existent team', async () => {
      const response = await request(app)
        .get('/api/v1/teams/non-existent-id')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /api/v1/teams/:id', () => {
    let team;

    beforeEach(async () => {
      team = await prisma.team.create({
        data: {
          name: 'Test Team',
          departmentId: department.id,
        },
      });
    });

    it('should update team when admin user', async () => {
      const response = await request(app)
        .patch(`/api/v1/teams/${team.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Updated Team Name',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'Updated Team Name');
    });

    it('should not allow employee to update team', async () => {
      const response = await request(app)
        .patch(`/api/v1/teams/${team.id}`)
        .set('Authorization', `Bearer ${employeeToken}`)
        .send({
          name: 'Updated Team Name',
        });

      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /api/v1/teams/:id', () => {
    let team;

    beforeEach(async () => {
      team = await prisma.team.create({
        data: {
          name: 'Test Team',
          departmentId: department.id,
        },
      });
    });

    it('should soft delete team when admin user', async () => {
      const response = await request(app)
        .delete(`/api/v1/teams/${team.id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('deletedAt');
      expect(response.body.deletedAt).not.toBeNull();
    });

    it('should not allow employee to delete team', async () => {
      const response = await request(app)
        .delete(`/api/v1/teams/${team.id}`)
        .set('Authorization', `Bearer ${employeeToken}`);

      expect(response.status).toBe(403);
    });
  });
}); 