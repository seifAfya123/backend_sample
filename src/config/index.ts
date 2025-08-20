import dotenv from 'dotenv';
import type ms from 'ms';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET_ACCESS: process.env.JWT_SECRET_ACCESS as string,
  JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH as string,
  JWT_EXPIRES_IN_ACCESS: process.env.JWT_EXPIRES_IN_ACCESS as ms.StringValue,
  JWT_EXPIRES_IN_REFRESH: process.env.JWT_EXPIRES_IN_REFRESH as ms.StringValue,
  PASSWORD_SALT_ROUNDS: parseInt(process.env.PASSWORD_SALT_ROUNDS || '10' ,10),
  PASSWORD_HASH_ALGORITHM: process.env.PASSWORD_HASH_ALGORITHM || 'sha256' as string,
  PASSWORD_HASH_KEY: process.env.PASSWORD_HASH_KEY || 'defaultKey' as string,
  WHITE_LISTED_DOMAINS: process.env.WHITE_LISTED_DOMAINS
    ? process.env.WHITE_LISTED_DOMAINS.split(',')
    : ['https://example.com', 'https://another-example.com'],
};

export default config;
