# Recentia Software Project API

API del proyecto Recentia, la aplicación web para gestionar soderías.

## Instalación del proyecto

1. Usar el comando `npm install` para instalar las dependencias.
2. Crear el archivo `.env` en la raíz del proyecto. Debe contener el puerto y los datos de conexión a la base de datos. Por ejemplo:

   ```
   PORT=4000

   DB_HOST=localhost
   DB_DATABASE=NombreBaseDeDatos
   DB_USER=Usuario
   DB_PASSWORD=Contraseña
   ```

3. Usar el comando `npm run dev` para ejecutar el proyecto. La URL es http://localhost:4000 o el puerto ingresado en `.env`.
