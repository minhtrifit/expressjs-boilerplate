import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/libs/auth';
import { HTTP_STATUS } from '@/constants/http-status-code';

export const authenticateHandler = (req: Request, res: Response, next: NextFunction) => {
  const { t } = req;

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: t('auth.invalid_token') });

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');

  const result = verifyToken(token, secret);

  if (!result.success || !result.data) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json(result);
  }

  req.user = result.data;

  next();
};
