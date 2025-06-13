import winston from 'winston';
import config from '../config/environment';
import path from 'path';

const logDir = path.resolve(process.cwd(), 'logs');

const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: path.join(logDir, 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({ 
      filename: path.join(logDir, 'combined.log')
    }),
  ],
});

if (!config.isProduction) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export default logger; 