import { Router } from 'express';
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/user.controller';
import { validationToken } from '../middleware/validationAuth';

const router = Router();

router.get('/:userId', validationToken, getUser);
router.get('/', validationToken, getUsers);
router.post('/', validationToken, createUser);
router.put('/:userId', validationToken, updateUser);

export default router;
