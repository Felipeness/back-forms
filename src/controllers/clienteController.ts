import express, { Request, Response } from "express";
import { body, validationResult, param } from "express-validator";
import * as ClienteModel from "../models/clienteModel";
import * as ClienteService from "../service/clienteservice";


const router = express.Router();

router.get("/calcularRota", async (req, res) => {
  try {
    const rota = await ClienteService.calculateRouteOptimization();
    res.json(rota);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Erro desconhecido");
    }
  }
});


// Validações para adicionar um cliente
const clienteValidations = [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('telefone').notEmpty().withMessage('Telefone é obrigatório'),
];

// Validações para atualizar um cliente
const updateClienteValidations = [
  param('id').isInt().withMessage('ID inválido'),
  body('nome').optional().isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres'),
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('telefone').optional().notEmpty().withMessage('Telefone não pode ser vazio'),
];

// Controlador para buscar todos os clientes
export const getAllClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await ClienteModel.getAllClientes();
    res.status(200).json(clientes);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Erro desconhecido");
    }
  }
};

// Controlador para adicionar um cliente com validação
export const addCliente = [
  // Array de validações
  ...clienteValidations,

  // Controlador
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const cliente = await ClienteModel.addCliente(req.body);
      res.status(201).json(cliente);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("Erro desconhecido");
      }
    }
  }
];

// Controlador para atualizar um cliente com validação
export const updateCliente = [
  // Array de validações
  ...updateClienteValidations,

  // Controlador
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const id = parseInt(req.params.id);
      const clienteAtualizado = await ClienteModel.updateCliente(id, req.body);
      if (clienteAtualizado) {
        res.status(200).json(clienteAtualizado);
      } else {
        res.status(404).json({ message: "Cliente não encontrado." });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("Erro desconhecido");
      }
    }
  }
];

// Controlador para deletar um cliente
export const deleteCliente = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    // Primeiro, verifica se o cliente com o ID fornecido existe
    const clienteExistente = await ClienteModel.getClientePorId(id);

    if (!clienteExistente) {
      // Se o cliente não existe, retorna um erro 404
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    // Se o cliente existir, procede com a exclusão
    await ClienteModel.deleteCliente(id);
    res.status(200).send("Cliente deletado com sucesso!");
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Erro desconhecido");
    }
  }
};


// Controlador para buscar um cliente por id, nome, email ou telefone
export const getCliente = async (req: Request, res: Response) => {
  try {
    let params: any = {
      nome: req.query.nome as string,
      email: req.query.email as string,
      telefone: req.query.telefone as string,
    };

    if (req.query.id) {
      params.id = parseInt(req.query.id as string);
    }

    // Verifica se pelo menos um parâmetro foi fornecido
    if (Object.keys(params).length === 0) {
      return res.status(400).json({ message: "Nenhum parâmetro de busca fornecido." });
    }

    const cliente = await ClienteModel.getCliente(params);
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ message: "Cliente não encontrado." });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Erro desconhecido");
    }
  }
};
