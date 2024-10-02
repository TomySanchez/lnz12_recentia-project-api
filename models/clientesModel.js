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

export const updateCliente = async (id, clienteData) => {
  const { nombre, telefono, cuit_cuil, observaciones, idDireccion } =
    clienteData;
  const query = `
    UPDATE Clientes
    SET nombre = ?, telefono = ?, cuit_cuil = ?, observaciones = ?, idDireccion = ?
    WHERE id = ?
  `;

  const [result] = await promisePool.query(query, [
    nombre,
    telefono,
    cuit_cuil,
    observaciones,
    idDireccion,
    id
  ]);
  return result;
};

export const disableCliente = async (id) => {
  const query = `
    UPDATE Clientes
    SET activo = 0
    WHERE id = ?
  `;

  const [result] = await promisePool.query(query, [id]);
  return result;
};

export const enableCliente = async (id) => {
  const query = `
    UPDATE Clientes
    SET activo = 1
    WHERE id = ?
  `;

  const [result] = await promisePool.query(query, [id]);
  return result;
};
