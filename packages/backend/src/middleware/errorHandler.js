const { AppError } = require('../utils/error');
const { ZodError } = require('zod');

const errorHandler = (err, req, res, next) => {
  // Default error
  let error = {
    statusCode: err.statusCode || 500,
    status: err.status || 'error',
    message: err.message || 'Something went wrong',
    isOperational: err.isOperational || false,
  };

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    error = {
      statusCode: 400,
      status: 'fail',
      message: 'Invalid input data',
      isOperational: true,
      errors: err.errors,
    };
  }

  // Handle Prisma errors
  if (err.code === 'P2002') {
    error = {
      statusCode: 400,
      status: 'fail',
      message: 'Record already exists',
      isOperational: true,
    };
  }

  // Send error response
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      errors: error.errors,
    }),
  });
};

module.exports = { errorHandler }; 