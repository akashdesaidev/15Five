const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/v1/review-cycles:
 *   post:
 *     summary: Create a new review cycle
 *     tags: [Review Cycles]
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
 *               - startDate
 *               - endDate
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [quarterly, half_yearly, annual, custom]
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               isEmergencyCycle:
 *                 type: boolean
 *               parentCycleId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review cycle created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', auth, authorize('ADMIN', 'HR'), async (req, res) => {
  const { title, type, startDate, endDate, isEmergencyCycle = false, parentCycleId } = req.body;

  try {
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return res.status(400).json({ error: 'End date must be after start date' });
    }

    // Check for overlapping cycles if not emergency
    if (!isEmergencyCycle) {
      const overlappingCycle = await prisma.reviewCycle.findFirst({
        where: {
          organizationId: req.user.organizationId,
          isEmergencyCycle: false,
          state: 'active',
          startDate: {
            lte: end,
          },
          endDate: {
            gte: start,
          },
        },
      });

      if (overlappingCycle) {
        return res.status(400).json({ error: 'Overlapping active review cycle exists' });
      }
    }

    // If emergency cycle, verify parent cycle exists
    if (isEmergencyCycle && parentCycleId) {
      const parentCycle = await prisma.reviewCycle.findUnique({
        where: { id: parentCycleId },
      });

      if (!parentCycle) {
        return res.status(404).json({ error: 'Parent cycle not found' });
      }

      if (parentCycle.organizationId !== req.user.organizationId) {
        return res.status(403).json({ error: 'Not authorized to reference this parent cycle' });
      }
    }

    const cycle = await prisma.reviewCycle.create({
      data: {
        title,
        type,
        startDate: start,
        endDate: end,
        isEmergencyCycle,
        parentCycleId,
        state: 'active',
        organizationId: req.user.organizationId,
        createdBy: req.user.id,
      },
    });

    res.status(201).json(cycle);
  } catch (error) {
    console.error('Create review cycle error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/review-cycles:
 *   get:
 *     summary: Get review cycles
 *     tags: [Review Cycles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *           enum: [active, grace_period, closed]
 *         description: Filter by cycle state
 *     responses:
 *       200:
 *         description: List of review cycles
 */
router.get('/', auth, async (req, res) => {
  const { state } = req.query;

  try {
    const cycles = await prisma.reviewCycle.findMany({
      where: {
        organizationId: req.user.organizationId,
        state: state || undefined,
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        createdByUser: true,
      },
    });

    res.json(cycles);
  } catch (error) {
    console.error('Get review cycles error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/review-cycles/{id}:
 *   get:
 *     summary: Get review cycle by ID
 *     tags: [Review Cycles]
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
 *         description: Review cycle details
 *       404:
 *         description: Review cycle not found
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const cycle = await prisma.reviewCycle.findUnique({
      where: { id: req.params.id },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        createdByUser: true,
      },
    });

    if (!cycle) {
      return res.status(404).json({ error: 'Review cycle not found' });
    }

    if (cycle.organizationId !== req.user.organizationId) {
      return res.status(403).json({ error: 'Not authorized to access this review cycle' });
    }

    res.json(cycle);
  } catch (error) {
    console.error('Get review cycle error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/review-cycles/{id}:
 *   patch:
 *     summary: Update review cycle
 *     tags: [Review Cycles]
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
 *               state:
 *                 type: string
 *                 enum: [active, grace_period, closed]
 *               gracePeriodStart:
 *                 type: string
 *                 format: date-time
 *               gracePeriodEnd:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Review cycle updated successfully
 *       404:
 *         description: Review cycle not found
 */
router.patch('/:id', auth, authorize('ADMIN', 'HR'), async (req, res) => {
  const { title, state, gracePeriodStart, gracePeriodEnd } = req.body;

  try {
    const cycle = await prisma.reviewCycle.findUnique({
      where: { id: req.params.id },
    });

    if (!cycle) {
      return res.status(404).json({ error: 'Review cycle not found' });
    }

    if (cycle.organizationId !== req.user.organizationId) {
      return res.status(403).json({ error: 'Not authorized to update this review cycle' });
    }

    // Validate grace period dates if provided
    if (gracePeriodStart && gracePeriodEnd) {
      const start = new Date(gracePeriodStart);
      const end = new Date(gracePeriodEnd);

      if (end <= start) {
        return res.status(400).json({ error: 'Grace period end must be after start' });
      }
    }

    const updatedCycle = await prisma.reviewCycle.update({
      where: { id: req.params.id },
      data: {
        title,
        state,
        gracePeriodStart: gracePeriodStart ? new Date(gracePeriodStart) : undefined,
        gracePeriodEnd: gracePeriodEnd ? new Date(gracePeriodEnd) : undefined,
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        createdByUser: true,
      },
    });

    res.json(updatedCycle);
  } catch (error) {
    console.error('Update review cycle error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/review-cycles/{id}/participants:
 *   post:
 *     summary: Add participants to review cycle
 *     tags: [Review Cycles]
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
 *               - userIds
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Participants added successfully
 */
router.post('/:id/participants', auth, authorize('ADMIN', 'HR'), async (req, res) => {
  const { userIds } = req.body;

  try {
    const cycle = await prisma.reviewCycle.findUnique({
      where: { id: req.params.id },
    });

    if (!cycle) {
      return res.status(404).json({ error: 'Review cycle not found' });
    }

    if (cycle.organizationId !== req.user.organizationId) {
      return res.status(403).json({ error: 'Not authorized to modify this review cycle' });
    }

    // Verify all users exist and belong to organization
    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
        organizationId: req.user.organizationId,
      },
    });

    if (users.length !== userIds.length) {
      return res.status(400).json({ error: 'One or more users not found' });
    }

    // Add participants
    const participants = await Promise.all(
      userIds.map(userId =>
        prisma.reviewParticipant.create({
          data: {
            cycleId: cycle.id,
            userId,
            participationStatus: 'active',
          },
          include: {
            user: true,
          },
        })
      )
    );

    res.json(participants);
  } catch (error) {
    console.error('Add participants error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/review-cycles/{id}/participants/{participantId}:
 *   patch:
 *     summary: Update participant status
 *     tags: [Review Cycles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: participantId
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
 *               - participationStatus
 *             properties:
 *               participationStatus:
 *                 type: string
 *                 enum: [active, removed]
 *     responses:
 *       200:
 *         description: Participant status updated successfully
 */
router.patch('/:id/participants/:participantId', auth, authorize('ADMIN', 'HR'), async (req, res) => {
  const { participationStatus } = req.body;

  try {
    const cycle = await prisma.reviewCycle.findUnique({
      where: { id: req.params.id },
    });

    if (!cycle) {
      return res.status(404).json({ error: 'Review cycle not found' });
    }

    if (cycle.organizationId !== req.user.organizationId) {
      return res.status(403).json({ error: 'Not authorized to modify this review cycle' });
    }

    const participant = await prisma.reviewParticipant.findUnique({
      where: { id: req.params.participantId },
      include: {
        user: true,
      },
    });

    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' });
    }

    if (participant.cycleId !== cycle.id) {
      return res.status(400).json({ error: 'Participant not in this review cycle' });
    }

    const updatedParticipant = await prisma.reviewParticipant.update({
      where: { id: req.params.participantId },
      data: {
        participationStatus,
        exitedAt: participationStatus === 'removed' ? new Date() : null,
      },
      include: {
        user: true,
      },
    });

    res.json(updatedParticipant);
  } catch (error) {
    console.error('Update participant error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 