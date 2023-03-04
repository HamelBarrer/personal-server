import { Request, Response } from 'express';
import { getUserUsernameByEmail } from '../services/user.service';
import { validationHash } from '../utils/hash';
import { creationToken } from '../utils/token';

export const login = async (req: Request, res: Response) => {
  const { account, password } = req.body;
  if (!account) return res.status(400).json({ data: 'Account is required' });
  if (!password) return res.status(400).json({ data: 'Password is required' });

  const user = await getUserUsernameByEmail(account);
  if (!user)
    return res.status(400).json({ data: 'Account or Password incorrecta' });

  if (!(await validationHash(password, user.password)))
    return res.status(400).json({ data: 'Account or Password incorrecta' });

  const token = await creationToken(user.userId);

  return res.status(200).json({
    data: {
      userId: user.userId,
      username: user.username,
      email: user.email,
      token,
    },
  });
};
