import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/libs/auth';
import { HTTP_STATUS } from '@/constants/http-status-code';

// Middleware xác thực
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

// Middleware phân quyền (dùng sau xác thực)
export const authorizeHandler =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { t } = req;
    const user = req.user; // req.user phải được set bởi middleware authenticate trước

    if (!user) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({ message: t('auth.no_permission') });
    }

    const hasRole = allowedRoles.includes(user.role);

    if (!hasRole) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({ message: t('auth.no_permission') });
    }

    next();
  };

// Middleware xác thực admin
export const authenticateAdminHandler = (req: Request, res: Response, next: NextFunction) => {
  const adminCode = req.body.adminCode;

  const ADMIN_CODE = process.env.ADMIN_CODE;

  if (!adminCode || adminCode !== ADMIN_CODE) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      data: null,
      message: 'WRONG ADMIN CODE'
    });
  }

  delete req.body.adminCode;

  next();
};
