// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from './pages/LoginPage';
import ProductRegistry from '../pages/ProductRegistry';
import ClientRegistry from '../pages/ClientRegistry';
import ClientMapPage from '../pages/ClientMapPage';
import SalesSummaryPage from '../pages/SalesSummaryPage';


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registro-productos" element={<ProductRegistry />} />
        <Route path="/registro-clientes" element={<ClientRegistry />} />
        <Route path="/mapa-clientes" element={<ClientMapPage />} />
        <Route path="/resumen-ventas" element={<SalesSummaryPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
