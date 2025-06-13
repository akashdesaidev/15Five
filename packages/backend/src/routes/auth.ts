import express from 'express';
import { z } from 'zod';
import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

const router = express.Router();

// Validation schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const refreshSchema = z.object({
  refreshToken: z.string(),
});

// Helper to generate tokens
const generateTokens = (userId: string) => {
  const secret = Buffer.from(config.jwt.secret, 'utf-8');
  const signOptions: SignOptions = { algorithm: 'HS256' };
  
  const accessToken = jwt.sign({ userId }, secret, {
    ...signOptions,
    expiresIn: config.jwt.expiresIn,
  });

  const refreshToken = jwt.sign({ userId }, secret, {
    ...signOptions,
    expiresIn: config.jwt.refreshExpiresIn,
  });

  return { accessToken, refreshToken };
};

// Login route
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // For MVP, just check if user exists (we'll add proper auth later)
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError(401, 'Invalid credentials');
    }

    // TODO: Add proper password verification
    const tokens = generateTokens(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      ...tokens,
    });
  } catch (error) {
    next(error);
  }
});

// Refresh token route
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = refreshSchema.parse(req.body);
    const secret = Buffer.from(config.jwt.secret, 'utf-8');

    const decoded = jwt.verify(refreshToken, secret) as { userId: string };
    const tokens = generateTokens(decoded.userId);

    res.json(tokens);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(401, 'Invalid refresh token'));
    } else {
      next(error);
    }
  }
});

export default router; 