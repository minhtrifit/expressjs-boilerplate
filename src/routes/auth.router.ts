import { Router } from 'express';
import { LoginSchema, RegisterSchema } from '@/dtos/auth.dto';
import { validateBody } from '@/middlewares/validate.middleware';
import { login, register } from '@/controllers/auth.controller';

const router = Router();

router.post('/register', validateBody(RegisterSchema), register);
router.post('/login', validateBody(LoginSchema), login);

export default router;
