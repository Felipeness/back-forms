import { db } from '../database/database';


// Função pra pegar todos os clientes
export const getAllClientes = async () => {
  const res = await db.query('SELECT * FROM clientes', []);
  return res;
};

// Função para adicionar um cliente, incluindo coordenadas X e Y
export const addCliente = async (cliente: { nome: string; email: string; telefone: string; coordenadas_x: number; coordenadas_y: number; }) => {
  const res = await db.query(
    'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5)',
    [cliente.nome, cliente.email, cliente.telefone, cliente.coordenadas_x, cliente.coordenadas_y]
  );
  return res;
};

// Função para atualizar um cliente
export const updateCliente = async (id: number, cliente: { nome?: string; email?: string; telefone?: string; }) => {
  const res = await db.query(
    'UPDATE clientes SET nome = COALESCE($1, nome), email = COALESCE($2, email), telefone = COALESCE($3, telefone) WHERE id = $4 RETURNING *',
    [cliente.nome, cliente.email, cliente.telefone, id]
  );
  return res;
};

// Função para deletar um cliente
export const deleteCliente = async (id: number) => {
  const res = await db.query('DELETE FROM clientes WHERE id = $1', [id]);
  if (res.rowCount > 0) {
    return { success: true, message: 'Cliente deletado com sucesso' };
  } else {
    return { success: false, message: 'Cliente não encontrado' };
  }
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
  const res = await db.query(queryText, values);
  return res.rows[0];
};

// Função para pegar um cliente por id
export const getClientePorId = async (id: number) => {
  const res = await db.query('SELECT * FROM clientes WHERE id = $1', [id]);
  return res.rows[0];
};

// Função para pegar rota de clientes
export const getAllClientesCoordinates = async () => {
  const query = 'SELECT id, coordenada_x, coordenada_y FROM clientes';
  const result = await db.query(query);
  return result.rows;
};
