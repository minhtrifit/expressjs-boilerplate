import { Router } from 'express';
import { upload } from '@/middlewares/upload';
import { authenticateHandler } from '@/middlewares/auth';
import { uploadFile, uploadFiles } from '@/controllers/upload.controller';

const router = Router();
const MAX_UPLOAD_FILES = process.env.MAX_UPLOAD_FILES || 5;

router.post('/single', authenticateHandler, upload.single('file'), uploadFile);
router.post('/multiple', authenticateHandler, upload.array('files', Number(MAX_UPLOAD_FILES)), uploadFiles);

export default router;
