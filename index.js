const express = require('express');
const supabase = require('./db');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/persona', async (req, res) => {
  const { nombre, apellido1, apellido2, dni } = req.body;
  const { data, error } = await supabase
    .from('persona')
    .insert([{ nombre, apellido1, apellido2, dni }]);

  if (error) {
    return res.status(500).json({ message: 'Error al crear esta persona', error });
  }

  res.status(200).json({ data });
});

app.post('/api/coche', async (req, res) => {
  const { matricula, marca, modelo, caballos, persona_id } = req.body;
  const { data, error } = await supabase
    .from('coche')
    .insert([{ matricula, marca, modelo, caballos, persona_id }]);

  if (error) {
    return res.status(500).json({ message: 'Error al crear este coche', error });
  }

  res.status(200).json({ data });
});

app.get('/api/obtener/personas', async (req, res) => {
  const { data, error } = await supabase.from('persona').select('*');

  if (error) {
    return res.status(500).json({ message: 'Error al obtener todas las personas', error });
  }

  res.status(200).json({ data });
});

app.get('/api/obtener/coches', async (req, res) => {
  const { data, error } = await supabase.from('coche').select('*');

  if (error) {
    return res.status(500).json({ message: 'Error al obtener todos los coches', error });
  }

  res.status(200).json({ data });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto ' + PORT);
});
