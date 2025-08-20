import { Router } from 'express';
import authRoutes from './auth';
const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API!', version: '1.0.0' });
});

router.use('/auth', authRoutes);

export default router;
