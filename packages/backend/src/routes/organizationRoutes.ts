import { Router } from 'express';
import { z } from 'zod';
import { OrganizationService } from '../services/organizationService';
import { AppError } from '../utils/error';
import { authenticate } from '../middleware/authMiddleware';

const UserRole = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE',
} as const;
type UserRole = keyof typeof UserRole;

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Organization:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the organization
 *         name:
 *           type: string
 *           description: The name of the organization
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the organization was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the organization was last updated
 */

// Validation schemas
const createOrganizationSchema = z.object({
  name: z.string().min(2),
  adminEmail: z.string().email(),
  adminPassword: z.string().min(6),
  adminFirstName: z.string().min(2),
  adminLastName: z.string().min(2),
});

const createDepartmentSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  managerId: z.string().uuid().optional(),
});

const updateDepartmentSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  managerId: z.string().uuid().optional(),
});

const createInvitationSchema = z.object({
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
});

const acceptInvitationSchema = z.object({
  token: z.string(),
  password: z.string().min(6),
});

/**
 * @swagger
 * /organizations:
 *   post:
 *     summary: Create a new organization
 *     tags: [Organizations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - adminEmail
 *               - adminPassword
 *               - adminFirstName
 *               - adminLastName
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *               adminEmail:
 *                 type: string
 *                 format: email
 *               adminPassword:
 *                 type: string
 *                 minLength: 6
 *               adminFirstName:
 *                 type: string
 *                 minLength: 2
 *               adminLastName:
 *                 type: string
 *                 minLength: 2
 *     responses:
 *       201:
 *         description: Organization created successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/', async (req, res, next) => {
  try {
    const data = createOrganizationSchema.parse(req.body);
    const organization = await OrganizationService.createOrganization(data);
    res.status(201).json(organization);
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError('Invalid input data', 400, false));
    } else {
      next(error);
    }
  }
});

/**
 * @swagger
 * /organizations/{id}:
 *   get:
 *     summary: Get an organization by ID
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The organization ID
 *     responses:
 *       200:
 *         description: The organization was successfully found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       404:
 *         description: Organization not found
 */
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const organization = await OrganizationService.getOrganization(req.params.id);
    if (!organization) {
      throw new AppError('Organization not found', 404);
    }
    res.json(organization);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /organizations/{organizationId}/departments:
 *   post:
 *     summary: Create a new department
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *               description:
 *                 type: string
 *               managerId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Organization not found
 */
router.post('/:organizationId/departments', authenticate, async (req, res, next) => {
  try {
    const data = createDepartmentSchema.parse(req.body);
    const department = await OrganizationService.createDepartment({
      ...data,
      organizationId: req.params.organizationId,
    });
    res.status(201).json(department);
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError('Invalid input data', 400, false));
    } else {
      next(error);
    }
  }
});

/**
 * @swagger
 * /organizations/{organizationId}/departments/{id}:
 *   patch:
 *     summary: Update a department
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *               description:
 *                 type: string
 *               managerId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Department not found
 */
router.patch('/:organizationId/departments/:id', authenticate, async (req, res, next) => {
  try {
    const data = updateDepartmentSchema.parse(req.body);
    const department = await OrganizationService.updateDepartment(req.params.id, data);
    res.json(department);
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError('Invalid input data', 400, false));
    } else {
      next(error);
    }
  }
});

/**
 * @swagger
 * /organizations/{organizationId}/invitations:
 *   post:
 *     summary: Create a new invitation
 *     tags: [Invitations]
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               role:
 *                 type: string
 *                 enum: [ADMIN, MANAGER, EMPLOYEE]
 *     responses:
 *       201:
 *         description: Invitation created successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Organization not found
 */
router.post('/:organizationId/invitations', authenticate, async (req, res, next) => {
  try {
    const data = createInvitationSchema.parse(req.body) as { email: string; role: UserRole };
    const result = await OrganizationService.createInvitation({
      ...data,
      organizationId: req.params.organizationId,
    });
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError('Invalid input data', 400, false));
    } else {
      next(error);
    }
  }
});

/**
 * @swagger
 * /organizations/invitations/accept:
 *   post:
 *     summary: Accept an invitation
 *     tags: [Invitations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Invitation accepted successfully
 *       400:
 *         description: Invalid input data or invitation expired
 *       404:
 *         description: Invitation not found
 */
router.post('/invitations/accept', async (req, res, next) => {
  try {
    const data = acceptInvitationSchema.parse(req.body);
    const user = await OrganizationService.acceptInvitation(data.token, data.password);
    res.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError('Invalid input data', 400, false));
    } else {
      next(error);
    }
  }
});

export default router; 