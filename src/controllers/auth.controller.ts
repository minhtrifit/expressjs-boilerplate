import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '@/constants/http-status-code';
import { AuthError, authService } from '@/services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { t } = req;

    const user = await authService.register(req.validatedBody);

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: user,
      message: t('auth.register_success')
    });
  } catch (error: any) {
    if (error.message === AuthError.EMAIL_EXISTED) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        data: null,
        message: req.t('auth.user_email_existed')
      });
    }

    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { t } = req;

    const result = await authService.login(req.validatedBody);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result,
      message: t('auth.login_success')
    });
  } catch (error: any) {
    if (error.message === AuthError.NOT_FOUND) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        data: null,
        message: req.t('auth.user_not_found')
      });
    }

    if (error.message === AuthError.NO_PERMISSION) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        data: null,
        message: req.t('auth.no_permission')
      });
    }

    if (error.message === AuthError.EMAIL_PASSWORD_NOT_MATCH) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        data: null,
        message: req.t('auth.email_password_not_match')
      });
    }

    if (error.message === AuthError.AUTHORZIED_FAILED) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        data: null,
        message: req.t('auth.authorized_failed')
      });
    }

    next(error);
  }
};
