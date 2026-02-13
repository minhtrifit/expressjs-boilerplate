import { HTTP_STATUS } from '@/constants/http-status-code';
import { Request, Response, NextFunction } from 'express';

export const validateBody = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  const { t } = req;

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false
  });

  if (!value) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      data: null,
      message: t('invalid_payload')
    });
  }

  if (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      data: null,
      message: error.details.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message
      }))
    });
  }

  req.validatedBody = value;
  next();
};
