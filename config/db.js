import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

const pool = mysql.createPool(config);

// Manejo de errores en la conexión:
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Conexión a la base de datos perdida.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('La base de datos tiene demasiadas conexiones.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('La conexión a la base de datos fue rechazada.');
    }
  }

  if (connection) {
    connection.release();
  }
  return;
});

export const promisePool = pool.promise();
