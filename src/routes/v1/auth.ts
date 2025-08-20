import { Router } from 'express';
import { logger } from '@/lib/winston';
// import controllers
import registerUser from '@/controllers/v1/auth/regiester';

const router = Router();
router.get('/', (req, res) => {
  logger.info('GET / route accessed');
  res.status(200).json({ message: 'Auth api is working', version: '1.0.0' });
});

router.post('/register', registerUser);

export default router;
