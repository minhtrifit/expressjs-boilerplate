import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser } from '@/controllers/user.controler';
import { GetQuerySchema, GetParamsSchema, CreateSchema, UpdateSchema } from '@/dtos/user.dto';
import { authenticateAdminHandler, authenticateHandler } from '@/middlewares/auth';
import { validateQuery } from '@/middlewares/validate-query.middleware';
import { validateParams } from '@/middlewares/validate-params.middleware';
import { validateBody } from '@/middlewares/validate.middleware';

const router = Router();

router.get('/', authenticateHandler, validateQuery(GetQuerySchema), getUsers);
router.get('/:id', authenticateHandler, validateParams(GetParamsSchema), getUserById);
router.post('/', authenticateAdminHandler, validateBody(CreateSchema), createUser);
router.patch('/:id', authenticateHandler, validateBody(UpdateSchema), updateUser);

export default router;
