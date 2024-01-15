import express from 'express';
import * as ClienteController from '../controllers/clienteController';

const router = express.Router();

// Rota para listar todos os clientes
router.get("/clientes", ClienteController.getAllClientes);

// Rota para listar rotas
router.get("/clientes/rotas", ClienteController.getRotas);

// Rota para calcular a rota otimizada
router.get('/clientes/calcular-rota', ClienteController.calculateRouteOptimization);

// Rota para buscar um cliente específico pelo ID
router.get('/clientes/:id', ClienteController.getCliente);

// Rota para atualizar um cliente específico pelo ID
router.put('/clientes/:id', ClienteController.updateCliente);

// Rota para adicionar um novo cliente
router.post('/clientes', ClienteController.addCliente);

// Rota para deletar um cliente
router.delete('/clientes/:id', ClienteController.deleteCliente);


export default router;
