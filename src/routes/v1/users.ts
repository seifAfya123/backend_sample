import { Router } from 'express';
import { logger } from '@/lib/winston';
// import controllers
import registerUser from '@/controllers/v1/auth/regiester';
import Joi from 'joi';
import { validateBody } from '@/middlewares/validation';
import { loginSchema, registerSchema } from '@/schemas/v1/userschema';
import config from '@/config';
import loginUser from '@/controllers/v1/auth/login';
import logoutUser from '@/controllers/v1/auth/logout';
import verifyAccessTokenMiddleware from '@/middlewares/verification';

const router = Router();
router.get('/all', (req, res) => {
  res.status(200).json({
    message: 'Auth api is working',
    version: config.VERSION,
    appName: config.APP_NAME,
  });
  logger.info('GET /auth/ route accessed');
});
