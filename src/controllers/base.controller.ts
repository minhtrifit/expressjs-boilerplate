import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '@/constants/http-status-code';

export const controllerHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    return res.status(HTTP_STATUS.OK).json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};
