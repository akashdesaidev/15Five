const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { auth, authorize } = require('../middleware/auth');
const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/v1/feedback:
 *   post:
 *     summary: Create new feedback
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiverId
 *               - feedbackText
 *             properties:
 *               receiverId:
 *                 type: string
 *               feedbackText:
 *                 type: string
 *               visibility:
 *                 type: string
 *                 enum: [public, private]
 *               skillTags:
 *                 type: array
 *                 items:
 *                   type: string
 *               companyValueTags:
 *                 type: array
 *                 items:
 *                   type: string
 *               initiativeTags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', auth, async (req, res) => {
  const {
    receiverId,
    feedbackText,
    visibility = 'public',
    skillTags = [],
    companyValueTags = [],
    initiativeTags = [],
  } = req.body;

  try {
    // Verify receiver exists and is in same organization
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    });

    if (!receiver) {
      return res.status(404).json({ error: 'Receiver not found' });
    }

    if (receiver.organizationId !== req.user.organizationId) {
      return res.status(403).json({ error: 'Cannot give feedback to users outside your organization' });
    }

    // Create feedback
    const feedback = await prisma.feedback.create({
      data: {
        giverId: req.user.id,
        receiverId,
        visibility,
        feedbackText,
        skillTags,
        companyValueTags,
        initiativeTags,
      },
      include: {
        giver: true,
        receiver: true,
      },
    });

    res.status(201).json(feedback);
  } catch (error) {
    console.error('Create feedback error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/feedback:
 *   get:
 *     summary: Get feedback based on filters
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [given, received]
 *         description: Filter by feedback type
 *       - in: query
 *         name: visibility
 *         schema:
 *           type: string
 *           enum: [public, private]
 *         description: Filter by visibility
 *     responses:
 *       200:
 *         description: List of feedback
 */
router.get('/', auth, async (req, res) => {
  const { type, visibility } = req.query;

  try {
    let where = {
      deletedAt: null,
    };

    // Handle feedback type filter
    if (type === 'given') {
      where.giverId = req.user.id;
    } else if (type === 'received') {
      where.receiverId = req.user.id;
    }

    // Handle visibility filter
    if (visibility) {
      where.visibility = visibility;
    }

    // Admin and HR can see all feedback
    if (!['ADMIN', 'HR'].includes(req.user.role)) {
      // Regular users can only see:
      // 1. Feedback they've given
      // 2. Public feedback they've received
      // 3. Private feedback they've received
      where = {
        OR: [
          { giverId: req.user.id },
          { receiverId: req.user.id },
        ],
        ...where,
      };
    }

    const feedback = await prisma.feedback.findMany({
      where,
      include: {
        giver: true,
        receiver: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(feedback);
  } catch (error) {
    console.error('Get feedback error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/feedback/{id}:
 *   get:
 *     summary: Get feedback by ID
 *     tags: [Feedback]
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
 *         description: Feedback details
 *       404:
 *         description: Feedback not found
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: req.params.id },
      include: {
        giver: true,
        receiver: true,
      },
    });

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    // Check if user has permission to view this feedback
    const canView = 
      ['ADMIN', 'HR'].includes(req.user.role) ||
      feedback.giverId === req.user.id ||
      feedback.receiverId === req.user.id ||
      feedback.visibility === 'public';

    if (!canView) {
      return res.status(403).json({ error: 'Not authorized to view this feedback' });
    }

    res.json(feedback);
  } catch (error) {
    console.error('Get feedback error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/feedback/{id}:
 *   patch:
 *     summary: Update feedback
 *     tags: [Feedback]
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
 *               feedbackText:
 *                 type: string
 *               visibility:
 *                 type: string
 *                 enum: [public, private]
 *               skillTags:
 *                 type: array
 *                 items:
 *                   type: string
 *               companyValueTags:
 *                 type: array
 *                 items:
 *                   type: string
 *               initiativeTags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Feedback updated successfully
 *       404:
 *         description: Feedback not found
 */
router.patch('/:id', auth, async (req, res) => {
  const {
    feedbackText,
    visibility,
    skillTags,
    companyValueTags,
    initiativeTags,
  } = req.body;

  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: req.params.id },
    });

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    // Only allow feedback giver to update their feedback
    if (feedback.giverId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this feedback' });
    }

    const updatedFeedback = await prisma.feedback.update({
      where: { id: req.params.id },
      data: {
        feedbackText,
        visibility,
        skillTags,
        companyValueTags,
        initiativeTags,
      },
      include: {
        giver: true,
        receiver: true,
      },
    });

    res.json(updatedFeedback);
  } catch (error) {
    console.error('Update feedback error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/v1/feedback/{id}/moderate:
 *   post:
 *     summary: Moderate feedback (soft delete)
 *     tags: [Feedback]
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
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Feedback moderated successfully
 */
router.post('/:id/moderate', auth, authorize('ADMIN', 'HR'), async (req, res) => {
  const { reason } = req.body;

  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: req.params.id },
    });

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    const moderatedFeedback = await prisma.feedback.update({
      where: { id: req.params.id },
      data: {
        deletedAt: new Date(),
        moderationReason: reason,
        moderatedBy: req.user.id,
      },
      include: {
        giver: true,
        receiver: true,
      },
    });

    res.json(moderatedFeedback);
  } catch (error) {
    console.error('Moderate feedback error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 