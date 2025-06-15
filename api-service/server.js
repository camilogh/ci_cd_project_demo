const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const app = express();
const port = 3001; // Puerto para el API service

// Habilitar CORS para todas las rutas
app.use(cors());

// Datos de ejemplo
const data = [
    { id: 1, name: 'Item A', value: 100 },
    { id: 2, name: 'Item B', value: 200 },
    { id: 3, name: 'Item C', value: 150 }
];

// Ruta para obtener todos los datos
app.get('/data', (req, res) => {
    console.log('Solicitud recibida en /data');
    res.json(data);
});

// Ruta raíz simple
app.get('/', (req, res) => {
    res.send('API Service is running!');
});

app.listen(port, () => {
    console.log(`API Service escuchando en http://localhost:${port}`);
});