require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { config } = require('./config');
const authRoutes = require('./routes/auth');
const organizationRoutes = require('./routes/organization');
const departmentRoutes = require('./routes/department');
const teamRoutes = require('./routes/team');
const okrRoutes = require('./routes/okr');
const reviewCycleRoutes = require('./routes/review-cycle');
const feedbackRoutes = require('./routes/feedback');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '15Five API Documentation',
      version: '1.0.0',
      description: 'API documentation for the 15Five clone',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: true, // We can add actual DB health check later
      ai: {
        openai: process.env.OPENAI_API_KEY ? true : false,
        gemini: process.env.GEMINI_API_KEY ? true : false,
      }
    }
  });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/organizations', organizationRoutes);
app.use('/api/v1/departments', departmentRoutes);
app.use('/api/v1/teams', teamRoutes);
app.use('/api/v1/okrs', okrRoutes);
app.use('/api/v1/review-cycles', reviewCycleRoutes);
app.use('/api/v1/feedback', feedbackRoutes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing HTTP server and database connection...');
  await prisma.$disconnect();
  process.exit(0);
}); 