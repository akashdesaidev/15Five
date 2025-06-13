const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/v1/okrs:
 *   post:
 *     summary: Create a new OKR
 *     tags: [OKRs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [company, department, team, individual]
 *               parentOkrId:
 *                 type: string
 *               departmentId:
 *                 type: string
 *               teamId:
 *                 type: string
 *               ownerUserId:
 *                 type: string
 *     responses:
 *       201:
 *         description: OKR created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', auth, authorize('ADMIN', 'HR', 'MANAGER'), async (req, res) => {
  const { title, description, type, parentOkrId, departmentId, teamId, ownerUserId } = req.body;

  try {
    // Validate type-specific fields
    if (type === 'department' && !departmentId) {
      return res.status(400).json({ error: 'Department ID required for department OKRs' });
    }
    if (type === 'team' && !teamId) {
      return res.status(400).json({ error: 'Team ID required for team OKRs' });
    }
    if (type === 'individual' && !ownerUserId) {
      return res.status(400).json({ error: 'Owner User ID required for individual OKRs' });
    }

    // Verify parent OKR if provided
    if (parentOkrId) {
      const parentOkr = await prisma.okr.findUnique({
        where: { id: parentOkrId },
      });

      if (!parentOkr) {
        return res.status(404).json({ error: 'Parent OKR not found' });
      }
    }

    // Create OKR
    const okr = await prisma.okr.create({
      data: {
        title,
        description,
        type,
        parentOkrId,
        departmentId,
        teamId,
        ownerUserId,
        status: 'active',
      },
    });

    res.status(201).json(okr);
  } catch (error) {
    console.error('Create OKR error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/okrs:
 *   get:
 *     summary: Get OKRs based on filters
 *     tags: [OKRs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by OKR type
 *       - in: query
 *         name: departmentId
 *         schema:
 *           type: string
 *         description: Filter by department ID
 *       - in: query
 *         name: teamId
 *         schema:
 *           type: string
 *         description: Filter by team ID
 *       - in: query
 *         name: ownerUserId
 *         schema:
 *           type: string
 *         description: Filter by owner user ID
 *     responses:
 *       200:
 *         description: List of OKRs
 */
router.get('/', auth, async (req, res) => {
  const { type, departmentId, teamId, ownerUserId } = req.query;

  try {
    const okrs = await prisma.okr.findMany({
      where: {
        type: type || undefined,
        departmentId: departmentId || undefined,
        teamId: teamId || undefined,
        ownerUserId: ownerUserId || undefined,
        deletedAt: null,
      },
      include: {
        keyResults: {
          where: {
            deletedAt: null,
          },
        },
        parent: true,
        department: true,
        team: true,
        owner: true,
      },
    });

    res.json(okrs);
  } catch (error) {
    console.error('Get OKRs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/okrs/{id}:
 *   get:
 *     summary: Get OKR by ID
 *     tags: [OKRs]
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
 *         description: OKR details
 *       404:
 *         description: OKR not found
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const okr = await prisma.okr.findUnique({
      where: { id: req.params.id },
      include: {
        keyResults: {
          where: {
            deletedAt: null,
          },
        },
        parent: true,
        department: true,
        team: true,
        owner: true,
      },
    });

    if (!okr) {
      return res.status(404).json({ error: 'OKR not found' });
    }

    res.json(okr);
  } catch (error) {
    console.error('Get OKR error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/okrs/{id}:
 *   patch:
 *     summary: Update OKR
 *     tags: [OKRs]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, completed, archived]
 *     responses:
 *       200:
 *         description: OKR updated successfully
 *       404:
 *         description: OKR not found
 */
router.patch('/:id', auth, authorize('ADMIN', 'HR', 'MANAGER'), async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const okr = await prisma.okr.findUnique({
      where: { id: req.params.id },
      include: {
        department: true,
        team: true,
      },
    });

    if (!okr) {
      return res.status(404).json({ error: 'OKR not found' });
    }

    // Verify user has permission to update this OKR
    if (req.user.role === 'MANAGER') {
      const hasAccess = 
        (okr.teamId && okr.team.managerId === req.user.id) ||
        (okr.ownerUserId === req.user.id);

      if (!hasAccess) {
        return res.status(403).json({ error: 'Not authorized to update this OKR' });
      }
    }

    const updatedOkr = await prisma.okr.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        status,
      },
      include: {
        keyResults: {
          where: {
            deletedAt: null,
          },
        },
        parent: true,
        department: true,
        team: true,
        owner: true,
      },
    });

    res.json(updatedOkr);
  } catch (error) {
    console.error('Update OKR error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/okrs/{id}:
 *   delete:
 *     summary: Soft delete OKR
 *     tags: [OKRs]
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
 *         description: OKR deleted successfully
 *       404:
 *         description: OKR not found
 */
router.delete('/:id', auth, authorize('ADMIN', 'HR'), async (req, res) => {
  try {
    const okr = await prisma.okr.findUnique({
      where: { id: req.params.id },
    });

    if (!okr) {
      return res.status(404).json({ error: 'OKR not found' });
    }

    const deletedOkr = await prisma.okr.update({
      where: { id: req.params.id },
      data: { deletedAt: new Date() },
    });

    res.json(deletedOkr);
  } catch (error) {
    console.error('Delete OKR error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/okrs/{id}/key-results:
 *   post:
 *     summary: Add key result to OKR
 *     tags: [OKRs]
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
 *             required:
 *               - description
 *             properties:
 *               description:
 *                 type: string
 *               targetScore:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Key result added successfully
 */
router.post('/:id/key-results', auth, authorize('ADMIN', 'HR', 'MANAGER'), async (req, res) => {
  const { description, targetScore = 10, dueDate } = req.body;

  try {
    const okr = await prisma.okr.findUnique({
      where: { id: req.params.id },
      include: {
        team: true,
      },
    });

    if (!okr) {
      return res.status(404).json({ error: 'OKR not found' });
    }

    // Verify user has permission to add key results
    if (req.user.role === 'MANAGER') {
      const hasAccess = 
        (okr.teamId && okr.team.managerId === req.user.id) ||
        (okr.ownerUserId === req.user.id);

      if (!hasAccess) {
        return res.status(403).json({ error: 'Not authorized to add key results to this OKR' });
      }
    }

    const keyResult = await prisma.keyResult.create({
      data: {
        description,
        targetScore,
        currentScore: 1,
        dueDate,
        okrId: req.params.id,
      },
    });

    res.status(201).json(keyResult);
  } catch (error) {
    console.error('Add key result error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/okrs/{okrId}/key-results/{keyResultId}/progress:
 *   post:
 *     summary: Update key result progress
 *     tags: [OKRs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: okrId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: keyResultId
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
 *               - score
 *             properties:
 *               score:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Progress updated successfully
 */
router.post('/:okrId/key-results/:keyResultId/progress', auth, async (req, res) => {
  const { score, notes } = req.body;

  try {
    const keyResult = await prisma.keyResult.findUnique({
      where: { id: req.params.keyResultId },
      include: {
        okr: {
          include: {
            team: true,
          },
        },
      },
    });

    if (!keyResult) {
      return res.status(404).json({ error: 'Key result not found' });
    }

    // Verify user has permission to update progress
    const hasAccess = 
      req.user.role === 'ADMIN' ||
      req.user.role === 'HR' ||
      (req.user.role === 'MANAGER' && keyResult.okr.team?.managerId === req.user.id) ||
      keyResult.okr.ownerUserId === req.user.id;

    if (!hasAccess) {
      return res.status(403).json({ error: 'Not authorized to update this key result' });
    }

    // Create progress snapshot
    const snapshot = await prisma.okrProgressSnapshot.create({
      data: {
        keyResultId: req.params.keyResultId,
        score,
        notes,
        recordedBy: req.user.id,
      },
    });

    // Update current score
    const updatedKeyResult = await prisma.keyResult.update({
      where: { id: req.params.keyResultId },
      data: {
        currentScore: score,
      },
    });

    res.json({
      keyResult: updatedKeyResult,
      snapshot,
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 