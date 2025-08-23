import { IUser } from '@/models/users';
import { Request, Response } from 'express';
import { logger } from '@/lib/winston';
import { findUserByID } from '@/services/v1/usersService';
import User from '@/models/users';
import config from '@/config';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}

const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId as string;

  try {
    const user = await findUserByID(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      logger.warn('User not found', { userId });
      return;
    }

    res.status(200).json({
      message: 'User fetched successfully',
      user,
    });
    logger.info('GET /current-user route accessed', { userId });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    logger.error('Error fetching current user:', error);
  }
};
