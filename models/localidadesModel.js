import { promisePool } from '../config/db.js';

export const getLocalidades = async () => {
  const [rows] = await promisePool.query('SELECT * FROM Localidades');
  return rows;
};

export const addLocalidad = async (data) => {
  const { nombre } = data;
  const query = 'INSERT INTO Localidades (nombre) VALUES (?)';

  const [result] = await promisePool.query(query, [nombre]);
  return result;
};
