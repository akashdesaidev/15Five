const { z } = require('zod');
require('dotenv').config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('1d'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  OPENAI_API_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
});

const env = envSchema.parse(process.env);

const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  apiPrefix: '/api/v1',
  database: {
    url: env.DATABASE_URL,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },
  cors: {
    origin: env.FRONTEND_URL,
    credentials: true,
  },
  ai: {
    openai: {
      apiKey: env.OPENAI_API_KEY,
    },
    gemini: {
      apiKey: env.GEMINI_API_KEY,
    },
  },
};

module.exports = { config }; 