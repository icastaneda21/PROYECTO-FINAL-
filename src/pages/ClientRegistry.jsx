// src/pages/ClientRegistry.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClientRegistry.css';

function ClientRegistry() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nit, setNit] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const handleAddClient = () => {
    const newClient = { name, phone, nit, address, email };
    setClients([...clients, newClient]);
    setName('');
    setPhone('');
    setNit('');
    setAddress('');
    setEmail('');
  };

  const handleNavigateToHome = () => {
    localStorage.removeItem('auth'); // Eliminar el estado de autenticación
    navigate('/'); // Redirigir a la página de inicio de sesión
  };

  return (
    <div className="client-page">
      {/* Barra de navegación */}
      <header className="navbar">
        <div className="navbar-left">
          <button className="info-button">INFORMACIÓN CLIENTE ▼</button>
        </div>
        <div className="navbar-right">
          <button className="dots-button">⋮</button>
          <button className="close-button" onClick={handleNavigateToHome}>✕</button>
          <button className="logout-button" onClick={handleNavigateToHome}>Salir</button>
        </div>
      </header>

      <div className="client-registration">
        <h2>Información Básica</h2>
        <div className="form">
          <label>Nombre*</label>
          <input
            className="half-width"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Teléfono*</label>
          <input
            className="half-width"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label>NIT*</label>
          <input
            className="half-width"
            value={nit}
            onChange={(e) => setNit(e.target.value)}
          />

          <label>Dirección*</label>
          <input
            className="half-width"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label>Correo Electrónico*</label>
          <input
            className="half-width"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={handleAddClient} className="add-button">
            Guardar
          </button>
        </div>

        <table className="client-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>NIT</th>
              <th>Dirección</th>
              <th>Correo Electrónico</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={index}>
                <td>{client.name}</td>
                <td>{client.phone}</td>
                <td>{client.nit}</td>
                <td>{client.address}</td>
                <td>{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="menu-button" onClick={handleNavigateToHome}>Volver al Menú Principal</button>
      </div>
    </div>
  );
}

export default ClientRegistry;
