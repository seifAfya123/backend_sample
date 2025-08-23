import { Request, Response } from 'express';
import { logger } from '@/lib/winston';
import config from '@/config';

import { IUser } from '@/models/users';
import User from '@/models/users';
import RefreshTokenDB from '@/models/token';
import { hashPassword, checkPassword } from '@/lib/jwt';
import { generateAcessToken, generateRefreshToken } from '@/lib/jwt';
import { findUserByEmail } from '@/services/v1/usersService';

type LoginUserType = Pick<IUser, 'email' | 'password'>;

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as LoginUserType;

  try {
    // const user = await findUserByEmail(email) ;
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(404)
        .json({ message: 'Invalid user', error: 'User not found' });
      logger.warn('user not found', { email });
      return;
    }

    const isPasswordValid = await checkPassword(password, user.password);
    if (!isPasswordValid) {
      res
        .status(401)
        .json({ message: 'Invalid input', error: 'Invalid password' });
      logger.warn('Invalid password attempt', { email });
      return;
    }

    const accessToken = generateAcessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const currentRefreshToken = await RefreshTokenDB.findOne({
      userId: user._id,
    });
    if (currentRefreshToken) {
      await RefreshTokenDB.updateOne({ userId: user._id }, { refreshToken });
    } else {
      await RefreshTokenDB.create({
        userId: user._id,
        refreshToken,
      });
    }

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    logger.info('POST /login route accessed', { body: req.body });

    res.status(200).json({
      message: 'Login successful',
      accessToken,
    });
  } catch (error) {
    logger.error('Error during login:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export default loginUser;
