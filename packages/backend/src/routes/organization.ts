import express from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

const router = express.Router();

// Validation schemas
const createOrgSchema = z.object({
  name: z.string().min(1).max(100),
});

const updateOrgSchema = z.object({
  name: z.string().min(1).max(100),
});

// Create organization
router.post('/', async (req, res, next) => {
  try {
    const { name } = createOrgSchema.parse(req.body);

    const organization = await prisma.organization.create({
      data: { name },
    });

    res.status(201).json(organization);
  } catch (error) {
    next(error);
  }
});

// Get all organizations
router.get('/', async (_req, res, next) => {
  try {
    const organizations = await prisma.organization.findMany({
      include: {
        _count: {
          select: {
            users: true,
            departments: true,
            teams: true,
          },
        },
      },
    });

    res.json(organizations);
  } catch (error) {
    next(error);
  }
});

// Get organization by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const organization = await prisma.organization.findUnique({
      where: { id },
      include: {
        departments: true,
        teams: true,
        _count: {
          select: {
            users: true,
          },
        },
      },
    });

    if (!organization) {
      throw new AppError(404, 'Organization not found');
    }

    res.json(organization);
  } catch (error) {
    next(error);
  }
});

// Update organization
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = updateOrgSchema.parse(req.body);

    const organization = await prisma.organization.update({
      where: { id },
      data: { name },
    });

    res.json(organization);
  } catch (error) {
    next(error);
  }
});

// Delete organization (soft delete not implemented in schema yet)
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.organization.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router; 