import { promisePool } from '../config/db.js';

export const getLocalidades = async () => {
  const [rows] = await promisePool.query('SELECT * FROM Localidades');
  return rows;
};
