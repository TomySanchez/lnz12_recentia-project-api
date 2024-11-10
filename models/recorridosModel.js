import { promisePool } from '../config/db.js';

export const getRecorridos = async () => {
  const [rows] = await promisePool.query(`
    SELECT
      *
    FROM
      Recorridos
  `);
  return rows;
};
