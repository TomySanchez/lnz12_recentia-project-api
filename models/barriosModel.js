import { promisePool } from '../config/db.js';

export const getBarrios = async () => {
  const [rows] = await promisePool.query('SELECT * FROM Barrios');
  return rows;
};

export const addBarrio = async (data) => {
  const { nombre, idLocalidad } = data;
  const query = 'INSERT INTO Barrios (nombre, idLocalidad) VALUES (?, ?)';

  const [result] = await promisePool.query(query, [nombre, idLocalidad]);
  return result;
};
