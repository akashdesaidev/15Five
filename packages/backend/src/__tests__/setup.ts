import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

// Load test environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

// Create a new Prisma Client instance for testing
const prisma = new PrismaClient();

// Clean up database before each test
beforeEach(async () => {
  await prisma.user.deleteMany();
});

// Close Prisma connection after all tests
afterAll(async () => {
  await prisma.$disconnect();
}); 