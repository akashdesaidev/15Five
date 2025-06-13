# 15Five Backend

This is the backend service for the 15Five clone, an AI-driven performance review platform.

## Prerequisites

- Node.js 20.x or later
- PostgreSQL 16 or later
- Yarn package manager

## Setup

1. Install dependencies:
```bash
yarn install
```

2. Create a `.env` file in the root directory with the following variables:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/15five?schema=public"

# JWT Configuration
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=24h

# AI Services
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key

# OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret

# Email Service
SENDGRID_API_KEY=your-sendgrid-api-key
SMTP_FROM=noreply@yourdomain.com

# Security
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100
```

3. Initialize the database:
```bash
# Generate Prisma client
yarn prisma:generate

# Run migrations
yarn prisma:migrate

# Seed the database with test data
yarn db:init
```

## Development

Start the development server:
```bash
yarn dev
```

The server will be running at http://localhost:3000

## API Documentation

Once the server is running, you can access the Swagger documentation at:
http://localhost:3000/api-docs

## Available Scripts

- `yarn start` - Start the production server
- `yarn dev` - Start the development server with hot reload
- `yarn test` - Run tests
- `yarn lint` - Run ESLint
- `yarn db:init` - Initialize database with test data
- `yarn prisma:generate` - Generate Prisma client
- `yarn prisma:migrate` - Run database migrations
- `yarn prisma:deploy` - Deploy migrations to production
- `yarn prisma:studio` - Open Prisma Studio

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route handlers
├── middleware/     # Express middleware
├── models/         # Prisma models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
└── index.js        # Application entry point
```

## API Routes

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration

### Organizations
- `POST /api/v1/organizations` - Create organization
- `GET /api/v1/organizations/:id` - Get organization
- `PATCH /api/v1/organizations/:id` - Update organization
- `DELETE /api/v1/organizations/:id` - Delete organization

### Departments
- `POST /api/v1/departments` - Create department
- `GET /api/v1/departments` - List departments
- `GET /api/v1/departments/:id` - Get department
- `PATCH /api/v1/departments/:id` - Update department
- `DELETE /api/v1/departments/:id` - Delete department

## Testing

Run the test suite:
```bash
yarn test
```

## License

MIT 