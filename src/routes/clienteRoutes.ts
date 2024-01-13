import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
  res.send("Lista de todos os clientes");
});

router.post("/", (req, res) => {
  res.send("Adicionar um novo cliente");
});

export default router;
