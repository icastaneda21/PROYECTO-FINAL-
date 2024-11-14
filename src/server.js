// src/server.js
import express from 'express';
import { register, login } from './auth/authController.js';
import db from './database.js';

const app = express();
app.use(express.json());

// Rutas de autenticación
app.post('/api/register', register);
app.post('/api/login', login);

app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});
// src/server.js
import { authenticate } from './auth/authMiddleware.js';

// Ejemplo de ruta protegida
app.get('/api/protected', authenticate, (req, res) => {
  res.send('Esta es una ruta protegida');
});
