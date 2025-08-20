import { Request, Response } from 'express';
import { logger } from '@/lib/winston';
import config from '@/config';

import { IUser } from '@/models/users';
import User from '@/models/users';
import { hashPassword } from '@/lib/jwt';
import { log } from 'winston';

type UserType = Pick<IUser, 'username' | 'email' | 'password' | 'role'>;

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, role } = req.body as UserType;
  try {
    const passwordHash = await hashPassword(password);
    const user = await User.create({
      username,
      email,
      password: passwordHash,
      role,
    });

    logger.info('POST /register route accessed', { body: user });
    res.status(200).json({
      message: 'Registration successful',
    });
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    logger.error('Error during registration:', error);
  }
};

export default registerUser;
