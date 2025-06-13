const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/error');
const { config } = require('../config');

const prisma = new PrismaClient();

class AuthService {
  static async login({ email, password }) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // TODO: Add password hashing
    if (user.password !== password) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  static async register({ email, password, firstName, lastName }) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }

    const user = await prisma.user.create({
      data: {
        email,
        password, // TODO: Add password hashing
        firstName,
        lastName,
        role: 'EMPLOYEE',
      },
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
}

module.exports = { AuthService }; 