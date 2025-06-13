import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // Default error
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors: unknown[] = [];

  // Handle known error types
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errors = err.errors;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle Prisma errors
    statusCode = 400;
    switch (err.code) {
      case 'P2002':
        message = 'Unique constraint violation';
        break;
      case 'P2025':
        message = 'Record not found';
        statusCode = 404;
        break;
      default:
        message = 'Database error';
    }
  }

  // Log error
  console.error(err);

  // Send error response
  res.status(statusCode).json({
    status: 'error',
    message,
    errors: errors.length > 0 ? errors : undefined,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
    }),
  });
}; 