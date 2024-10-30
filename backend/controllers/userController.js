import { insertUser, updateUser, listUser, findUserByEmail, deleteUser } from '../database/services/userService.js';

export const registerUser = (req, res) => {
  const { nome, email, senha } = req.body;
  let { isAdmin } = req.body;

  isAdmin = isAdmin === '1' ? 1 : 0;

  if (isAdmin === '1') {
    isAdmin = 1;
  } else {
    isAdmin = 0;
  }

  if (insertUser(nome, email, senha, isAdmin)) {
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } else {
    res.status(400).json({ message: 'Erro ao cadastrar usuário.' });
  }
}

export const updateUsers = (req, res) => {
  try {
    const { id } = req.query;
    const { nome, email, senha } = req.body;
    let { isAdmin } = req.body;
    
    if (isAdmin === '1') {
      isAdmin = 1;
    } else {
      isAdmin = 0;
    }
    
    updateUser(id, nome, email, senha, isAdmin);
    res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
}

export const listUsers = (req, res) => {
  try {
    const users = listUser();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários.' });
  }
}

export const getUserByEmail = (req, res) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (user && user.senha === password) {
    res.status(200).json({ message: 'Login bem-sucedido!', user });
  } else {
    res.status(401).json({ error: 'E-mail ou senha incorretos.' });
  }
}

export const deleteUsers = (req, res) => {
  try {
    const { id } = req.query;
    deleteUser(id);
    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
}