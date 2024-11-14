// src/auth/authController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Registro de usuario
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).send('Usuario registrado');
  } catch (error) {
    res.status(500).send('Error al registrar usuario');
  }
};

// Login de usuario
export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Credenciales incorrectas');
  }

  // Crear un token JWT
  const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });
  res.json({ token });
};
