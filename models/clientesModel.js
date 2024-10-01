import { promisePool } from '../config/db.js';

export const getClientes = async () => {
  const [rows] = await promisePool.query('SELECT * FROM Clientes');
  return rows;
};

export const addCliente = async (data) => {
  const { nombre, telefono, cuit_cuil, observaciones, idDireccion } = data;
  const query =
    'INSERT INTO Clientes (nombre, telefono, cuit_cuil, observaciones, idDireccion) VALUES (?, ?, ?, ?, ?)';

  const [result] = await promisePool.query(query, [
    nombre,
    telefono,
    cuit_cuil,
    observaciones,
    idDireccion
  ]);
  return result;
};
