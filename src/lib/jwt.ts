import { JsonWebTokenError } from 'jsonwebtoken';
import config from '@/config';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';

const generateAcessToken = (userid: Types.ObjectId): string => {
  if (!config.JWT_SECRET_ACCESS) {
    throw new Error('JWT_SECRET_ACCESS is not defined');
  }
  return jwt.sign({ userid }, config.JWT_SECRET_ACCESS, {
    expiresIn: config.JWT_EXPIRES_IN_ACCESS,
    subject: 'accessApi',
  });
};

const generateRefreshToken = (userid: Types.ObjectId): String => {
  if (!config.JWT_SECRET_REFRESH) {
    throw new Error('JWT_SECRET_REFRESH is not defined');
  }
  return jwt.sign({ userid }, config.JWT_SECRET_REFRESH, {
    expiresIn: config.JWT_EXPIRES_IN_REFRESH,
    subject: 'refreshToken',
  });
};
// ---------------------------- Password Hashing ----------------------------

const hashPassword = async (password: string): Promise<string> => {
  if (!config.PASSWORD_HASH_KEY || !config.PASSWORD_HASH_ALGORITHM) {
    throw new Error('Password hashing configuration is not defined');
  }
  return await bcrypt.hash(password, config.PASSWORD_SALT_ROUNDS);
};

const checkPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export {
  hashPassword,
  checkPassword,
  generateAcessToken,
  generateRefreshToken,
};
