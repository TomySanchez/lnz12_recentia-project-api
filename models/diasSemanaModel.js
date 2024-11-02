import { promisePool } from '../config/db.js';

export const getDiasSemana = async () => {
  const query = 'SELECT * FROM DiasSemana';

  const [rows] = await promisePool.query(query);
  return rows;
};
