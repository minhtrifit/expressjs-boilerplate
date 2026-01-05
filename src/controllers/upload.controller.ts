import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '@/constants/http-status-code';

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'File is required'
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
      message: 'Upload file successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const uploadFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        data: null,
        message: 'Files are required'
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
      message: 'Upload files successfully'
    });
  } catch (error) {
    next(error);
  }
};
