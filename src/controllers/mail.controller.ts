import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '@/constants/http-status-code';
import { mailService } from '@/services/mail.service';

export const sendMail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { t } = req;

    const result = await mailService.sendMail(req.validatedBody);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result,
      message: t('mail.send_successfully')
    });
  } catch (error) {
    next(error);
  }
};

export const sendMailTemplate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { t } = req;

    const result = await mailService.sendMailTemplate(req.validatedBody);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result,
      message: t('mail.send_successfully')
    });
  } catch (error) {
    next(error);
  }
};
