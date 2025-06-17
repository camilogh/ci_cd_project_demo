#!/bin/sh

echo "Waiting for database to be ready at $DB_HOST:$DB_PORT..."
# Loop hasta que la base de datos esté accesible en el puerto especificado
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1 # Espera 1 segundo antes de reintentar
done

echo "Database is ready. Running migrations..."
# Ejecuta las migraciones de Knex en el entorno de producción
# El entorno 'production' en knexfile.js usará las variables de entorno inyectadas al contenedor.
npx knex migrate:latest --env production --knexfile knexfile.js

# inyecctar valores en la base de datos
echo "Creando data inicial..."
npx knex seed:run --env production --knexfile knexfile.js

echo "Starting API service..."
# Ejecuta el comando principal de la aplicación (que viene del CMD)
exec "$@"