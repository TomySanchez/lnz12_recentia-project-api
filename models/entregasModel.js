import { promisePool } from '../config/db.js';

export const getEntregas = async () => {
  const [rows] = await promisePool.query(`
    SELECT
      *
    FROM
      Entregas
  `);
  return rows;
};
