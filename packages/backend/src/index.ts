import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import { prisma } from './lib/prisma';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    services: {
      database: true, // We can add actual DB health check later
      prisma: prisma ? true : false,
    }
  });
});

// API routes
app.get('/api/v1/test', (_req, res) => {
  res.json({ message: 'Test route working' });
});

// Error handling
app.use(errorHandler);

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 