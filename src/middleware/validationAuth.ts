import { Request, Response, NextFunction } from 'express';
import { validToken } from '../utils/token';

export const validationToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) return res.status(404).json({ data: 'Information not valid' });

  if (!token.toLowerCase().startsWith('bearer'))
    return res.status(404).json({ data: 'Information not valid' });

  const jwt = token.substring(7);

  const data = await validToken(jwt);
  if (!data) return res.status(404).json({ data: 'Information not valid' });

  req.userid = data;

  return next();
};
