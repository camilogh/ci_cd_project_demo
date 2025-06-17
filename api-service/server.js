const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const knexConfig = require('./knexfile'); // Importa la configuración de Knex
const knex = require('knex')(knexConfig.development); // Crea la instancia de Knex (usa 'production' en producción)

const app = express();
const port = 3001; // Puerto para el API service

// Habilitar CORS para todas las rutas
app.use(cors());

// Ruta para obtener todos los datos
app.get('/data', async (req, res) => {
    console.log('Solicitud recibida en /data');
    try {
        const items = await knex('items').select('*'); // Selecciona todos los items de la tabla
        res.json(items);
    } catch (error) {
        console.error('Error al obtener datos de la base de datos:', error);
        res.status(500).send('Error al obtener datos.');
    }
});

// Ruta raíz simple
app.get('/', (req, res) => {
    res.send('API Service is running!');
});

app.listen(port, () => {
    console.log(`API Service escuchando en http://localhost:${port}`);
});