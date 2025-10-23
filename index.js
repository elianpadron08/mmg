const express = require('express');
const cors = require('cors');
const sequelize = require('./db.js');
const Usuario = require('./Backend/models/usuarioModels');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Verificar conexión a PostgreSQL
sequelize.authenticate()
  .then(() => console.log("✅ ¡Conectado a PostgreSQL!"))
  .catch(err => console.error("❌ Error de conexión:", err));

// 🔹 Sincronizar modelos (comentar si la tabla ya existe)
// sequelize.sync()
//   .then(() => console.log("✅ Modelos sincronizados"))
//   .catch(err => console.error("❌ Error al sincronizar modelos:", err));

// 🔹 Rutas
app.get('/', (req, res) => {
  res.send("🚀 Servidor Express.js en funcionamiento. Usa /Usuario para ver los datos.");
});

// 🔹 Obtener todos los usuarios
app.get('/Usuario', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al consultar la base de datos" });
  }
});

// 🔹 Crear un nuevo usuario
app.post('/Usuario', async (req, res) => {
  try {
    const { usuario, password } = req.body;
    if (!usuario || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const nuevoUsuario = await Usuario.create({ usuario, password });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
});

// 🔹 Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`🧾 Ver datos de usuarios:  http://localhost:${PORT}/Usuario\n`);
});
