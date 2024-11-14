// src/pages/LoginPage.jsx

/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Credenciales simuladas para el "Gerente Comercial"
  const managerCredentials = {
    username: 'gerente_comercial',
    password: '12345'  // Para seguridad real, usa algo más seguro y gestiona en el backend.
  };

  const handleLogin = () => {
    if (username === managerCredentials.username && password === managerCredentials.password) {
      localStorage.setItem('auth', 'true'); // Guardamos el estado de autenticación
      navigate('/home'); // Redirige al menú principal o la página de inicio
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="login-form">
        <label>Usuario</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingrese su usuario"
        />
        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
        />
        <button onClick={handleLogin} className="login-button">Iniciar Sesión</button>
      </div>
    </div>
  );
}

export default LoginPage;
*/

// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Credenciales simuladas
  const validCredentials = {
    username: 'user1',
    password: '12345'
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === validCredentials.username && password === validCredentials.password) {
      navigate('/home');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <label>Usuario</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingrese su usuario"
        />
        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
        />
        <button type="submit" className="login-button">Acceder</button>
      </form>
    </div>
  );
}

export default LoginPage;
