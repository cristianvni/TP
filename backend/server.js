const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 3003;

// Configuración de CORS
app.use(cors());
app.use(bodyParser.json());

// Conexión con la base de datos PostgreSQL
const pool = new Pool({
  user: 'user',
  host: 'localhost', // nombre del servicio en Docker
  database: 'database',
  password: 'password',
  port: 5432,
});

// Crear la tabla si no existe
pool.query(`
  CREATE TABLE IF NOT EXISTS viajes (
    id SERIAL PRIMARY KEY,
    pais VARCHAR(255),
    ano INT,
    mes INT,
    duracion INT,
    costo DECIMAL,
    kmRecorrido DECIMAL
  );
`, (err) => {
  if (err) {
    console.error('Error creando la tabla', err);
  } else {
    console.log('Tabla viajes creada o ya existe');
  }
});

// Ruta para agregar un viaje
app.post('/api/viajes', async (req, res) => {
  const { pais, ano, mes, duracion, costo, kmRecorrido } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO viajes (pais, ano, mes, duracion, costo, kmRecorrido) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [pais, ano, mes, duracion, costo, kmRecorrido]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar el viaje', details: err });
  }
});

// Ruta para obtener todos los viajes
app.get('/api/viajes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM viajes');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los viajes', details: err });
  }
});

// Ruta para eliminar un viaje
app.delete('/api/viajes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM viajes WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Viaje eliminado' });
    } else {
      res.status(404).json({ message: 'Viaje no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el viaje', details: err });
  }
});

// Ruta para modificar un viaje
app.put('/api/viajes/:id', async (req, res) => {
  const { id } = req.params;
  const { pais, ano, mes, duracion, costo, kmRecorrido } = req.body;
  try {
    const result = await pool.query(
      'UPDATE viajes SET pais = $1, ano = $2, mes = $3, duracion = $4, costo = $5, kmRecorrido = $6 WHERE id = $7 RETURNING *',
      [pais, ano, mes, duracion, costo, kmRecorrido, id]
    );
    if (result.rowCount > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Viaje no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al modificar el viaje', details: err });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
