import { Request, Response } from 'express';
import { logger } from '@/lib/winston';
import config from '@/config';

import { IUser } from '@/models/users';
import User from '@/models/users';

type UserType = Pick<IUser, 'username' | 'email' | 'password' | 'role'>;

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, role } = req.body as UserType;
  try {
    logger.info('POST /register route accessed', { body: req.body });
    res.status(200).json({
      message: 'Registration successful',
      data: { username },
    });
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
    });
    logger.error('Error during registration:', error);
  }
};

export default registerUser;
