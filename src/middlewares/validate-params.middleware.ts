import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '@/constants/http-status-code';

export const validateParams = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  const { t } = req;

  const { error, value } = schema.validate(req.params, {
    abortEarly: false,
    allowUnknown: false
  });

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

  req.validatedParams = value;
  next();
};
