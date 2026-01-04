import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser } from '@/controllers/user.controler';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUser);

export default router;
