import { promisePool } from '../config/db.js';

export const getBarrios = async () => {
  const [rows] = await promisePool.query(`
      SELECT
        b.id,
        b.nombre,
        b.idLocalidad,
        l.nombre AS localidad
      FROM Barrios b
      JOIN Localidades l ON l.id = b.idLocalidad;
    `);
  return rows;
};

export const addBarrio = async (data) => {
  const { nombre, idLocalidad } = data;
  const query = 'INSERT INTO Barrios (nombre, idLocalidad) VALUES (?, ?)';

  const [result] = await promisePool.query(query, [nombre, idLocalidad]);
  return result;
};
