import { query } from '../database/database';

// Função pra pegar todos os clientes
export const getAllClientes = async () => {
  const res = await query('SELECT * FROM clientes', []);
  return res.rows;
};

// Função pra adicionar um cliente
export const addCliente = async (cliente: { nome: string; email: string; telefone: string; }) => {
  const res = await query('INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *', [cliente.nome, cliente.email, cliente.telefone]);
  return res.rows[0];
};

// Função para atualizar um cliente
export const updateCliente = async (id: number, cliente: { nome?: string; email?: string; telefone?: string; }) => {
  const res = await query(
    'UPDATE clientes SET nome = COALESCE($1, nome), email = COALESCE($2, email), telefone = COALESCE($3, telefone) WHERE id = $4 RETURNING *',
    [cliente.nome, cliente.email, cliente.telefone, id]
  );
  return res.rows[0];
};

// Função para deletar um cliente
export const deleteCliente = async (id: number) => {
  const res = await query('DELETE FROM clientes WHERE id = $1', [id]);
  return res.rows[0];
};

// Função para pegar um cliente por id, nome , email ou telefone
export const getCliente = async (params: { id: number, nome: string, email: string, telefone: string }) => {
  const conditions = [];
  const values = [];

  if (params.id) {
    conditions.push('id = $1');
    values.push(params.id);
  }
  if (params.nome) {
    conditions.push('nome = $2');
    values.push(params.nome);
  }
  if (params.email) {
    conditions.push('email = $3');
    values.push(params.email);
  }
  if (params.telefone) {
    conditions.push('telefone = $4');
    values.push(params.telefone);
  }

  const queryText = `SELECT * FROM clientes WHERE ${conditions.join(' OR ')}`;
  const res = await query(queryText, values);
  return res.rows[0];
};
