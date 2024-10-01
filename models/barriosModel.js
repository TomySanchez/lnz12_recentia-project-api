import { promisePool } from '../config/db.js';

export const getBarrios = async () => {
  const [rows] = await promisePool.query('SELECT * FROM Barrios');
  return rows;
};
