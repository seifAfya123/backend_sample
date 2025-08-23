import User from '@/models/users';
import { Request, Response } from 'express';
import { logger } from '@/lib/winston';
import config from '@/config';
import RefreshTokenDB from '@/models/token';
import { log } from 'winston';

const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userid } = req.params as { userid: string };
    const user = await User.findById(userid);
    if (!user) {
      res
        .status(404)
        .json({ message: 'User not found', error: 'Invalid user ID' });
      logger.warn('User not found', { userid });
      return;
    }
    RefreshTokenDB.deleteOne({ userId: user._id });

    // Clear the refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      message: 'Logout successful',
    });

    logger.info('User logged out successfully', { userid });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    logger.error('Error during logout:', error);
  }
};

export default logoutUser;
