import users from '@/models/users';
import { Request, Response } from 'express';
import { logger } from '@/lib/winston';
import config from '@/config';
import { IUser } from '@/models/users';
import RefreshTokenDB from '@/models/token';
import { hashPassword, checkPassword } from '@/lib/jwt';
import { generateAcessToken, generateRefreshToken } from '@/lib/jwt';

const findUserByEmail = async (email: string) => {
  try {
    logger.info(`Finding user by email: ${email}`);
    const user = await users.findOne({ email });
    if (!user) {
      logger.warn('User not found from service', { email });
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    logger.error(`Error finding user by email: ${email} - `, error);
    throw new Error('User not found');
  }
};

const findUserByID = async (userId: string) => {
  try {
    const user = await users.findById({ _id: userId });
    return user;
  } catch (error) {
    logger.error('Error finding user by ID:', error);
    throw new Error('Database error');
  }
};


export { findUserByEmail, findUserByID };
