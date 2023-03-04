import { Request, Response } from 'express';
import {
  insertUser,
  readUser,
  readUsers,
  updatedUser,
} from '../services/user.service';

export const getUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  const user = await readUser(userId);
  if (!user) return res.status(404).json({ data: 'User not found' });

  return res.status(200).json({ data: user });
};

export const getUsers = async (_: Request, res: Response) => {
  const users = await readUsers();
  if (users.length === 0) return res.status(404).json({ data: 'Not users' });

  return res.status(200).json({ data: users });
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password, passwordConfirm } = req.body;

  if (!email) return res.status(400).json({ data: 'Email is required' });
  if (!password) return res.status(400).json({ data: 'Password is required' });
  if (!passwordConfirm)
    return res.status(400).json({ data: 'Password Confirm is required' });

  if (password !== passwordConfirm)
    return res.status(400).json({ data: 'Password not equals' });

  const user = await insertUser(req.body);

  return res.status(201).json({ data: user });
};

export const updateUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ data: 'Email is required' });

  const userId = parseInt(req.params.userId);

  const user = await updatedUser(userId, req.body);

  return res.status(200).json({ data: user });
};
