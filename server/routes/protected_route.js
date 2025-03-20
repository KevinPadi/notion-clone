import express from 'express';
import { protect } from '../middlewares/auth_middleware.js'

const router = express.Router();

router.get('/protected', protect, (req, res) => {
  res.json({ message: 'Ruta protegida', user: req.user });
});

export default router