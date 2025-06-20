const express = require('express');
const path = require('path'); // Módulo para trabajar con rutas de archivos
const axios = require('axios'); // Para hacer solicitudes HTTP desde el backend
const app = express();
const port = 3000; // Puerto para el frontend service

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener datos del API y renderizarlos
app.get('/data', async (req, res) => {
    try {
        const apiUrl = process.env.API_URL || 'http://localhost:3001/data'; // URL del API, puede ser configurada por una variable de entorno
        console.log(`Intentando conectar a la API en: ${apiUrl}`);
        const response = await axios.get(apiUrl);
        const apiData = response.data;

        let html = `
          <!DOCTYPE html>
          <html lang="es">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Datos de la API</title>
              <style>
                  body { font-family: Arial, sans-serif; margin: 20px; background-color: #f4f4f4; color: #333; }
                  h1 { color: #0056b3; }
                  ul { list-style: none; padding: 0; }
                  li { background-color: #fff; margin-bottom: 10px; padding: 10px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                  li strong { color: #007bff; }
              </style>
          </head>
          <body>
              <h1>Listado de Datos Obtenidos de la API</h1>
              <ul>`;
        apiData.forEach(item => {
            html += `<li><strong>ID:</strong> ${item.id}, <strong>Nombre:</strong> ${item.name}, <strong>Valor:</strong> ${item.value}</li>`;
        });
        html += `
              </ul>
              <p>Puedes refrescar esta página para ver la solicitud a la API.</p>
              <p>Página demo de proceso CI/CD</p>
          </body>
          </html>
        `;
        res.send(html);

    } catch (error) {
        console.error('Error al obtener datos del API:', error.message);
        // Puedes verificar error.code para 'ECONNREFUSED' si el servicio API no está corriendo
        res.status(500).send(`
          <!DOCTYPE html>
          <html lang="es">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Error</title>
              <style>
                  body { font-family: Arial, sans-serif; margin: 20px; background-color: #f4f4f4; color: #333; }
                  h1 { color: #d9534f; }
                  p { color: #c9302c; }
              </style>
          </head>
          <body>
              <h1>Error al Cargar Datos</h1>
              <p>No se pudieron obtener los datos del servicio API. Asegúrate de que el servicio esté corriendo.</p>
              <p>Detalles: ${error.message}</p>
          </body>
          </html>
        `);
    }
});

// Ruta raíz que redirige a /data
app.get('/', (req, res) => {
    res.redirect('/data');
});

app.listen(port, () => {
    console.log(`Frontend Service escuchando en http://localhost:${port}`);
    console.log(`Visita http://localhost:${port} en tu navegador.`);
});