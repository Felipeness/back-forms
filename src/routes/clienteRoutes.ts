import express, { Router } from 'express';
import * as ClienteController from '../controllers/clienteController';

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Lista de todos os clientes");
});

router.post('/clientes', ClienteController.addCliente);

router.post("/", (req, res) => {
  res.send("Adicionar um novo cliente");
});

router.put('/clientes/:id', ClienteController.updateCliente);

export default router;
