import bcrypt from "bcrypt";
import {
  insertUser,
  updateUser,
  listUser,
  findUserByEmail,
  deleteUser,
} from "../database/services/userService.js";

export const registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    let { isAdmin } = req.body;

    const user = findUserByEmail(email);
    if (user) {
      return res
        .status(400)
        .json({ message: "Já esxiste um usuário cadastrado com esse email." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    isAdmin = isAdmin === "1" ? 1 : 0;

    insertUser(nome, email, hashedPassword, isAdmin);
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    res.status(400).json({ message: "Erro ao cadastrar usuário." });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { id } = req.query;
    const { nome, email, senha } = req.body;
    let { isAdmin } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    isAdmin = isAdmin === "1" ? 1 : 0;

    updateUser(id, nome, email, hashedPassword, isAdmin);
    res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário." });
  }
};

export const listUsers = (req, res) => {
  try {
    const users = listUser();
    if (users) {
      const usersWithoutPassword = users.map((user) => {
        const { senha, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      res.status(200).json(usersWithoutPassword);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar usuários." });
  }
};

export const getUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = findUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.senha))) {
      res.status(200).json({ message: "Login bem-sucedido!", user });
    } else {
      res.status(401).json({ error: "E-mail ou senha incorretos." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao verificar credenciais." });
  }
};

export const deleteUsers = (req, res) => {
  try {
    const { id } = req.query;
    deleteUser(id);
    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar usuário." });
  }
};
