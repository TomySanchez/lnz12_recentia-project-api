import { promisePool } from '../config/db.js';

export const getDirecciones = async () => {
  const query = 'SELECT * FROM Direcciones';

  const [rows] = await promisePool.query(query);
  return rows;
};

export const addDireccion = async (data) => {
  const { calle, numero, piso, departamento, idBarrio } = data;
  const query =
    'INSERT INTO Direcciones (calle, numero, piso, departamento, idBarrio) VALUES (?, ?, ?, ?, ?)';

  const [result] = await promisePool.query(query, [
    calle,
    numero,
    piso,
    departamento,
    idBarrio
  ]);
  return result;
};

export const updateDireccion = async (id, direccionData) => {
  const { calle, numero, piso, departamento, idBarrio } = direccionData;

  const query = `
    UPDATE Direcciones
    SET calle = ?, numero = ?, piso = ?, departamento = ?, idBarrio = ?
    WHERE id = ?
  `;

  const [result] = await promisePool.query(query, [
    calle,
    numero,
    piso,
    departamento,
    idBarrio,
    id
  ]);
  return result;
};
