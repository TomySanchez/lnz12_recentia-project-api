import { promisePool } from '../config/db.js';

export const getPagos = async () => {
  const [rows] = await promisePool.query(`
    SELECT
      *
    FROM
      Pagos
  `);
  return rows;
};
