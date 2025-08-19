import winston from 'winston';
import config from '@/config';

// const logger = winston.createLogger({
const { combine, timestamp, json, errors, align, printf, colorize } =
  winston.format;
const transports: winston.transport[] = [];

if (config.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({
          all: true,
        }),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        align(),
        printf(({ level, message, timestamp, ...meta }) => {
          const metassage = Object.keys(meta).length
            ? `\n${JSON.stringify(meta)}`
            : '';
          return `${timestamp} ${level}: ${message} ${metassage}`;
        }),
      ),
    }),
  );
}

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports,
  silent: config.NODE_ENV === 'test',
});

// export default logger;
