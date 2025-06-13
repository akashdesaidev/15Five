require('dotenv').config({ path: '.env.test' });

// Set test environment variables
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.JWT_EXPIRES_IN = '1h';
process.env.NODE_ENV = 'test';

// Global test timeout
jest.setTimeout(10000); 