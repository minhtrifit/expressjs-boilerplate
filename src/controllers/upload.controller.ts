import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '@/constants/http-status-code';

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { t } = req;
    const { id } = req.params;
    const { name } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: t('upload.file_required')
      });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/${file.filename}`;

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        id,
        name,
        file: {
          originalName: file.originalname,
          fileName: file.filename,
          size: file.size,
          mimeType: file.mimetype,
          url: fileUrl
        }
      },
      message: t('upload.upload_file_successfully')
    });
  } catch (error) {
    next(error);
  }
};

export const uploadFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { t } = req;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        data: null,
        message: t('upload.files_required')
      });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: files.map((file) => ({
        originalName: file.originalname,
        fileName: file.filename,
        size: file.size,
        mimeType: file.mimetype,
        url: `${baseUrl}/uploads/${file.filename}`
      })),
      message: t('upload.upload_files_successfully')
    });
  } catch (error) {
    next(error);
  }
};
