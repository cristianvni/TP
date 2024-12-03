const express = require("express");
const { Pool } = require("pg");
const mongoose = require("mongoose");
const cors = require("cors");

// Configuración del servidor
const app = express();
app.use(express.json());
app.use(cors());

// Conexión a PostgreSQL
const pgPool = new Pool({
  user: "user",
  host: "localhost",
  database: "database",
  password: "password",
  port: 5432,
});

// Creación de tabla PostgreSQL
pgPool.query(`
  CREATE TABLE IF NOT EXISTS viajes (
    id SERIAL PRIMARY KEY,
    pais VARCHAR(50),
    duracion_dias INTEGER,
    costos NUMERIC,
    km_recorridos INTEGER,
    mes INTEGER,
    año INTEGER
  );
`);

// Conexión a MongoDB
const uri = "mongodb+srv://villanicr:ff3RIJ6WwGK3VeLF@clustetp.19f43.mongodb.net/?retryWrites=true&w=majority&appName=Clustetp";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions)
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch(err => console.error("Error al conectar a MongoDB:", err));

// Definición de modelo de MongoDB
const Comentario = mongoose.model("Comentario", new mongoose.Schema({
  pais: String,
  comentario: String,
}));

// Rutas para viajes (PostgreSQL)
app.post("/viajes", async (req, res) => {
  const { pais, duracion_dias, costos, km_recorridos, mes, año } = req.body;
  try {
    const result = await pgPool.query(
      "INSERT INTO viajes (pais, duracion_dias, costos, km_recorridos, mes, año) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [pais, duracion_dias, costos, km_recorridos, mes, año]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/viajes", async (req, res) => {
  try {
    const result = await pgPool.query("SELECT * FROM viajes");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/viajes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pgPool.query("DELETE FROM viajes WHERE id = $1", [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/viajes/:id", async (req, res) => {
  const { id } = req.params;
  const { pais, duracion_dias, costos, km_recorridos, mes, año } = req.body;
  try {
    const result = await pgPool.query(
      "UPDATE viajes SET pais = $1, duracion_dias = $2, costos = $3, km_recorridos = $4, mes = $5, año = $6 WHERE id = $7 RETURNING *",
      [pais, duracion_dias, costos, km_recorridos, mes, año, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rutas para comentarios (MongoDB)
app.post("/comentarios", async (req, res) => {
  const { pais, comentario } = req.body;
  try {
    const newComment = new Comentario({ pais, comentario });
    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/comentarios", async (req, res) => {
  try {
    const comentarios = await Comentario.find();
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/comentarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Comentario.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/comentarios/:id", async (req, res) => {
  const { id } = req.params;
  const { pais, comentario } = req.body;
  try {
    const updatedComment = await Comentario.findByIdAndUpdate(
      id,
      { pais, comentario },
      { new: true }
    );
    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor
const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
