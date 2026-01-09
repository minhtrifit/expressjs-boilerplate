import { createLogger, format, transports } from 'winston';

const isProduction = process.env.NODE_ENV === 'production';

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaString = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';

  return `${timestamp} [${level}]: ${message}${metaString}`;
});

const logger = createLogger({
  level: isProduction ? 'info' : 'debug',
  format: combine(
    errors({ stack: true }), // log cả stack trace
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: combine(colorize(), logFormat)
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new transports.File({
      filename: 'logs/combined.log'
    })
  ]
});

export default logger;
