import { Router } from 'express';
import { MailSchema, MailTemplateSchema } from '@/dtos/mail.dto';
import { authenticateHandler } from '@/middlewares/auth';
import { validateBody } from '@/middlewares/validate.middleware';
import { sendMail, sendMailTemplate } from '@/controllers/mail.controller';

const router = Router();

router.post('/send-example', authenticateHandler, validateBody(MailSchema), sendMail);
router.post('/send-template', authenticateHandler, validateBody(MailTemplateSchema), sendMailTemplate);

export default router;
