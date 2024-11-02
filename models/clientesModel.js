import { promisePool } from '../config/db.js';

export const getClientes = async () => {
  const [rows] = await promisePool.query(`
      SELECT
        c.id AS idCliente,
        c.nombre,
        c.telefono,
        c.cuit_cuil,
        c.observaciones,
        c.activo,
        d.id AS idDireccion,
        d.calle,
        d.numero,
        d.piso,
        d.departamento,
        d.idBarrio,
        b.nombre AS barrio,
        l.id AS idLocalidad,
        l.nombre AS localidad,
        di.id AS idDiaSemana,
        di.nroOrdenSemana,
        di.nombre AS diaSemana,
        disp.id AS idDisponibilidad,
        disp.horaInicio,
        disp.horaFin
      FROM
        Clientes c
      JOIN
        Direcciones d ON c.idDireccion = d.id
      JOIN
        Barrios b ON d.idBarrio = b.id
      JOIN
        Localidades l ON b.idLocalidad = l.id
      LEFT JOIN
        Disponibilidades disp ON disp.idCliente = c.id
      LEFT JOIN
        DiasSemana di ON disp.idDiaSemana = di.id
      ORDER BY
        c.id, di.nroOrdenSemana;
    `);
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
  const { nombre, telefono, cuit_cuil, observaciones } = clienteData;
  const query = `
    UPDATE Clientes
    SET nombre = ?, telefono = ?, cuit_cuil = ?, observaciones = ?
    WHERE id = ?
  `;

  const [result] = await promisePool.query(query, [
    nombre,
    telefono,
    cuit_cuil,
    observaciones,
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
