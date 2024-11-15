import {
  deleteClientS,
  insertClientS,
  listClientS,
  updateClientS,
  findByCpfCnpj,
} from "../database/services/clientService.js";

export const registerClients = (req, res) => {
  const { nome, cpf_cnpj, contato, endereco } = req.body;
  const client = findByCpfCnpj(cpf_cnpj);

  if (client) {
    return res
      .status(400)
      .json({ message: "Já existe um cliente cadastrado com esse CPF/CNPJ." });
  }

  if (insertClientS(nome, cpf_cnpj, contato, endereco)) {
    res.status(201).json({ message: "Cliente cadastrado com sucesso." });
  } else {
    res.status(400).json({ message: "Erro ao cadastrar cliente." });
  }
};

export const listClients = (req, res) => {
  try {
    const clients = listClientS();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    res.status(500).json({ message: "Erro ao listar clientes." });
  }
};

export const updateClients = (req, res) => {
  try {
    const { id } = req.query;
    const { nome, cpf_cnpj, contato, endereco } = req.body;
    const client = findByCpfCnpj(cpf_cnpj);

    if (client) {
      return res.status(400).json({
        message: "Já existe um cliente cadastrado com esse CPF/CNPJ.",
      });
    }

    updateClientS(id, nome, cpf_cnpj, contato, endereco);
    res.status(200).json({ message: "Cliente atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    res.status(500).json({ message: "Erro ao atualizar cliente." });
  }
};

export const deleteClients = (req, res) => {
  try {
    const { id } = req.query;
    if (deleteClientS(id)) {
      res.status(200).json({ message: "Cliente deletado com sucesso." });
    } else {
      res.status(400).json({ message: "Erro ao deletar cliente." });
    }
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    res.status(500).json({ message: "Erro ao deletar cliente." });
  }
};
