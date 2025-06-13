const { Router } = require('express');
const { z } = require('zod');
const { OrganizationService } = require('../services/organizationService');
const { AppError } = require('../utils/error');
const { authenticate } = require('../middleware/authMiddleware');

const router = Router();

// Validation schemas
const createOrganizationSchema = z.object({
  name: z.string().min(1),
  adminEmail: z.string().email(),
  adminPassword: z.string().min(6),
  adminFirstName: z.string(),
  adminLastName: z.string(),
});

const createDepartmentSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  managerId: z.string().optional(),
});

const updateDepartmentSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  managerId: z.string().optional(),
});

const createInvitationSchema = z.object({
  email: z.string().email(),
  role: z.enum(['ADMIN', 'MANAGER', 'EMPLOYEE']),
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
 *       404:
 *         description: Organization not found
 */
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const organization = await OrganizationService.getOrganization(req.params.id);
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
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The organization ID
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
 *               description:
 *                 type: string
 *               managerId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Department created successfully
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
    next(error);
  }
});

/**
 * @swagger
 * /organizations/{organizationId}/departments/{id}:
 *   patch:
 *     summary: Update a department
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The organization ID
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The department ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               managerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       404:
 *         description: Department not found
 */
router.patch('/:organizationId/departments/:id', authenticate, async (req, res, next) => {
  try {
    const data = updateDepartmentSchema.parse(req.body);
    const department = await OrganizationService.updateDepartment(req.params.id, data);
    res.json(department);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /organizations/{organizationId}/invitations:
 *   post:
 *     summary: Create a new invitation
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The organization ID
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
 *       404:
 *         description: Organization not found
 */
router.post('/:organizationId/invitations', authenticate, async (req, res, next) => {
  try {
    const data = createInvitationSchema.parse(req.body);
    const invitation = await OrganizationService.createInvitation({
      ...data,
      organizationId: req.params.organizationId,
    });
    res.status(201).json(invitation);
  } catch (error) {
    next(error);
  }
});

module.exports = router; 