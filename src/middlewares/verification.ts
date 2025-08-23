import refreshTokenDB from '@/models/token';
import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';
import config from '@/config';
import { Types } from 'mongoose';

const verifyAccessTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    if (decoded instanceof Error) {
      res.status(401).json({ message: 'Unauthorized: Invalid token' });
      return;
    }
    // req.userId = (decoded as unknown as { userId: string }).userId;
    next();
  } catch (error) {
    logger.error('Error verifying access token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export default verifyAccessTokenMiddleware;
