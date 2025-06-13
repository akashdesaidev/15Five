const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/v1/departments:
 *   post:
 *     summary: Create a new department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - organizationId
 *             properties:
 *               name:
 *                 type: string
 *               organizationId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', auth, authorize('ADMIN', 'HR'), async (req, res) => {
  const { name, organizationId } = req.body;

  try {
    // Verify user belongs to the organization
    if (organizationId !== req.user.organizationId) {
      return res.status(403).json({ error: 'Not authorized to create department in this organization' });
    }

    const department = await prisma.department.create({
      data: {
        name,
        organizationId,
      },
    });

    res.status(201).json(department);
  } catch (error) {
    console.error('Create department error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/departments:
 *   get:
 *     summary: Get all departments for user's organization
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of departments
 */
router.get('/', auth, async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      where: {
        organizationId: req.user.organizationId,
        deletedAt: null,
      },
      include: {
        teams: true,
      },
    });

    res.json(departments);
  } catch (error) {
    console.error('Get departments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/departments/{id}:
 *   get:
 *     summary: Get department by ID
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department details
 *       404:
 *         description: Department not found
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const department = await prisma.department.findUnique({
      where: { id: req.params.id },
      include: {
        teams: true,
      },
    });

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    // Verify user belongs to the organization
    if (department.organizationId !== req.user.organizationId) {
      return res.status(403).json({ error: 'Not authorized to access this department' });
    }

    res.json(department);
  } catch (error) {
    console.error('Get department error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/departments/{id}:
 *   patch:
 *     summary: Update department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       404:
 *         description: Department not found
 */
router.patch('/:id', auth, authorize('ADMIN', 'HR'), async (req, res) => {
  const { name } = req.body;

  try {
    const department = await prisma.department.findUnique({
      where: { id: req.params.id },
    });

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    // Verify user belongs to the organization
    if (department.organizationId !== req.user.organizationId) {
      return res.status(403).json({ error: 'Not authorized to update this department' });
    }

    const updatedDepartment = await prisma.department.update({
      where: { id: req.params.id },
      data: { name },
    });

    res.json(updatedDepartment);
  } catch (error) {
    console.error('Update department error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/departments/{id}:
 *   delete:
 *     summary: Soft delete department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department deleted successfully
 *       404:
 *         description: Department not found
 */
router.delete('/:id', auth, authorize('ADMIN', 'HR'), async (req, res) => {
  try {
    const department = await prisma.department.findUnique({
      where: { id: req.params.id },
    });

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    // Verify user belongs to the organization
    if (department.organizationId !== req.user.organizationId) {
      return res.status(403).json({ error: 'Not authorized to delete this department' });
    }

    const deletedDepartment = await prisma.department.update({
      where: { id: req.params.id },
      data: { deletedAt: new Date() },
    });

    res.json(deletedDepartment);
  } catch (error) {
    console.error('Delete department error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 