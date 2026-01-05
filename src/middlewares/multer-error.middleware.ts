import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '@/constants/http-status-code';

export const multerErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    let message = err.message;

    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        message = 'File size exceeds limit';
        break;
      case 'LIMIT_FILE_COUNT':
        message = 'Too many files';
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        message = 'Unexpected field or too many files';
        break;
    }

    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      data: null,
      message
    });
  }

  next(err);
};
