// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import './Home.css'; // Añade estilos personalizados aquí si deseas

function Home() {
  return (
    <div className="home-container">
      <div className="logo-container">

        <img src="/image 1.png" alt="Logo" className="logo" />
      </div>
      <div className="menu-container">
        <Link to="/product-registration" className="menu-">Registro de Productos</Link>
        <Link to="/client-registration" className="menu-">Registro de Clientes</Link>
        <Link to="/client-map" className="menu-buttone">Mapa de Clientes</Link>
        <Link to="/sales-summary" className="menu-buttone">Resumen de Ventas</Link>
      </div>
    </div>
  );
}

export default Home;
