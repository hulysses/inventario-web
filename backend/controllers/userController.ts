import { findUserByEmail } from '../database/services/userService.ts';
import { Login } from '../types/login.ts';
import { Response } from 'express';

export const getUserByEmail = (req: Login, res: Response): void => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (user && user.senha === password) {
    res.status(200).json({ message: 'Login bem-sucedido', user });
  } else {
    res.status(401).json({ error: 'E-mail ou senha incorretos' });
  }
};