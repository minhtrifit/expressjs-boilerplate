import { Request, Response, NextFunction } from 'express';
import logger from '@/configs/logger';
import { HTTP_STATUS } from '@/constants/http-status-code';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
};
