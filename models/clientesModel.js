import { promisePool } from '../config/db.js';

export const getClientes = async () => {
  const [rows] = await promisePool.query('SELECT * FROM Clientes');
  return rows;
};
