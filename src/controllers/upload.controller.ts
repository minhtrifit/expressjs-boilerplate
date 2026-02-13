import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '@/constants/http-status-code';
import { UploadError, uploadService } from '@/services/upload.service';

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { t } = req;

    const { id } = req.params;
    const { name } = req.body;
    const file = req.file;

    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;

    const result = uploadService.buildFile(id, name, baseUrl, file);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result,
      message: t('upload.upload_file_successfully')
    });
  } catch (error: any) {
    const { t } = req;

    if (error.message === UploadError.FILE_NOT_FOUND) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: t('upload.file_required')
      });
    }

    next(error);
  }
};

export const uploadFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { t } = req;
    const files = req.files as Express.Multer.File[];

    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;

    const result = uploadService.buildFiles(baseUrl, files);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result,
      message: t('upload.upload_files_successfully')
    });
  } catch (error: any) {
    const { t } = req;

    if (error.message === UploadError.FILES_NOT_FOUND) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        data: null,
        message: t('upload.files_required')
      });
    }

    next(error);
  }
};
