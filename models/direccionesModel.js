import { promisePool } from '../config/db.js';

export const getDirecciones = async () => {
  const query = 'SELECT * FROM Direcciones';

  const [rows] = await promisePool.query(query);
  return rows;
};
