import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser } from '@/controllers/user.controler';
import { authenticateHandler } from '@/middlewares/auth';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', authenticateHandler, createUser);
router.patch('/:id', authenticateHandler, updateUser);

export default router;
