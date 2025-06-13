# 15Five Clone - AI-Driven Performance Review Platform

An enterprise-grade performance management system with AI-powered features.

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- PostgreSQL >= 16
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment example and configure:
   ```bash
   cp .env.example .env
   ```
4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```
5. Start development server:
   ```bash
   npm run dev
   ```

## 🛠 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run typecheck` - Check TypeScript types

### Project Structure

```
src/
├── config/         # Configuration files
├── middleware/     # Express middleware
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── types/          # TypeScript types
└── utils/          # Utility functions
```

## 📝 API Documentation

- Health Check: `GET /health`
- API Base URL: `/api/v1`

## 🔒 Environment Variables

Required environment variables:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/15five
JWT_SECRET=your-secret-key
```

## 🧪 Testing

```bash
npm test
```

## 📦 Dependencies

- Express.js - Web framework
- Prisma - Database ORM
- TypeScript - Type safety
- Winston - Logging
- Jest - Testing
- ESLint/Prettier - Code quality

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT 