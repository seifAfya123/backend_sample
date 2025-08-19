import dotenv from 'dotenv';

dotenv.config();
const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  WHITE_LISTED_DOMAINS: process.env.WHITE_LISTED_DOMAINS
    ? process.env.WHITE_LISTED_DOMAINS.split(',')
    : ['https://example.com', 'https://another-example.com'],
};
export default config;
