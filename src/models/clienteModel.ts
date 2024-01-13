import { query } from '../database/database';

export const getAllClientes = async () => {
  const res = await query('SELECT * FROM clientes', []);
  return res.rows;
};
