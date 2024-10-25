import { findUserByEmail } from '../database/services/userService.js';

export const getUserByEmail = (req, res) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (user && user.senha === password) {
    res.status(200).json({ message: 'Login bem-sucedido', user });
  } else {
    res.status(401).json({ error: 'E-mail ou senha incorretos' });
  }
};