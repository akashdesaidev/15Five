const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/v1/teams:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
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
 *               - departmentId
 *             properties:
 *               name:
 *                 type: string
 *               departmentId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Team created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', auth, authorize('ADMIN', 'HR'), async (req, res) => {
  const { name, departmentId } = req.body;

  try {
    // Verify department exists and belongs to user's organization
    const department = await prisma.department.findUnique({
      where: { id: departmentId },
    });

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    if (department.organizationId !== req.user.organizationId) {
      return res.status(403).json({ error: 'Not authorized to create team in this department' });
    }

    const team = await prisma.team.create({
      data: {
        name,
        departmentId,
      },
    });

    res.status(201).json(team);
  } catch (error) {
    console.error('Create team error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/teams:
 *   get:
 *     summary: Get all teams for user's organization
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: departmentId
 *         schema:
 *           type: string
 *         description: Filter teams by department ID
 *     responses:
 *       200:
 *         description: List of teams
 */
router.get('/', auth, async (req, res) => {
  const { departmentId } = req.query;

  try {
    // Get all departments in user's organization
    const departments = await prisma.department.findMany({
      where: {
        organizationId: req.user.organizationId,
      },
      select: {
        id: true,
      },
    });

    const departmentIds = departments.map(d => d.id);

    const teams = await prisma.team.findMany({
      where: {
        departmentId: departmentId ? departmentId : { in: departmentIds },
        deletedAt: null,
      },
      include: {
        department: true,
      },
    });

    res.json(teams);
  } catch (error) {
    console.error('Get teams error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/teams/{id}:
 *   get:
 *     summary: Get team by ID
 *     tags: [Teams]
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
 *         description: Team details
 *       404:
 *         description: Team not found
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const team = await prisma.team.findUnique({
      where: { id: req.params.id },
      include: {
        department: true,
      },
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Verify team belongs to user's organization
    const department = await prisma.department.findUnique({
      where: { id: team.departmentId },
    });

    if (department.organizationId !== req.user.organizationId) {
      return res.status(403).json({ error: 'Not authorized to access this team' });
    }

    res.json(team);
  } catch (error) {
    console.error('Get team error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/teams/{id}:
 *   patch:
 *     summary: Update team
 *     tags: [Teams]
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
 *               departmentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Team updated successfully
 *       404:
 *         description: Team not found
 */
router.patch('/:id', auth, authorize('ADMIN', 'HR'), async (req, res) => {
  const { name, departmentId } = req.body;

  try {
    const team = await prisma.team.findUnique({
      where: { id: req.params.id },
      include: {
        department: true,
      },
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Verify team belongs to user's organization
    if (team.department.organizationId !== req.user.organizationId) {
      return res.status(403).json({ error: 'Not authorized to update this team' });
    }

    // If changing department, verify new department belongs to same organization
    if (departmentId && departmentId !== team.departmentId) {
      const newDepartment = await prisma.department.findUnique({
        where: { id: departmentId },
      });

      if (!newDepartment || newDepartment.organizationId !== req.user.organizationId) {
        return res.status(403).json({ error: 'Invalid department' });
      }
    }

    const updatedTeam = await prisma.team.update({
      where: { id: req.params.id },
      data: {
        name,
        departmentId,
      },
      include: {
        department: true,
      },
    });

    res.json(updatedTeam);
  } catch (error) {
    console.error('Update team error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/teams/{id}:
 *   delete:
 *     summary: Soft delete team
 *     tags: [Teams]
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
 *         description: Team deleted successfully
 *       404:
 *         description: Team not found
 */
router.delete('/:id', auth, authorize('ADMIN', 'HR'), async (req, res) => {
  try {
    const team = await prisma.team.findUnique({
      where: { id: req.params.id },
      include: {
        department: true,
      },
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Verify team belongs to user's organization
    if (team.department.organizationId !== req.user.organizationId) {
      return res.status(403).json({ error: 'Not authorized to delete this team' });
    }

    const deletedTeam = await prisma.team.update({
      where: { id: req.params.id },
      data: { deletedAt: new Date() },
    });

    res.json(deletedTeam);
  } catch (error) {
    console.error('Delete team error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 