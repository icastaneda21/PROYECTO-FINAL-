// src/pages/SalesSummaryPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SalesSummary.css';

function SalesSummaryPage() {
  const navigate = useNavigate();
  const [sales, setSales] = useState([
    { id: 28860, name: "Constructora Soluciones Globales S.A.", date: "2024-11-10", product: "Moductor", amount: 1000.0 },
    { id: 28859, name: "InnovaTech Industriales", date: "2024-11-09", product: "Minimoductor", amount: 750.0 },
    { id: 28858, name: "Fábricas y Proyectos del Futuro", date: "2024-11-08", product: "Cables planos", amount: 500.0 },
    { id: 28857, name: "Metálica Progreso Industrial", date: "2024-11-07", product: "Imán de izaje", amount: 1050.0 },
    { id: 28856, name: "Estructuras y Equipos Integrados", date: "2024-11-06", product: "Trolley Manual", amount: 250.0 },
    { id: 28855, name: "Materiales de Construcción Altura S.A.", date: "2024-11-05", product: "Diferencial Manual", amount: 290.0 },
    { id: 28854, name: "Construcción y Maquinaria Solidez", date: "2024-11-04", product: "Cadenas", amount: 350.0 },
    { id: 28853, name: "Industrias Urbanas y Construcción", date: "2024-11-03", product: "Cable de elevación", amount: 900.0 },
    { id: 28852, name: "ObraFácil S.A.", date: "2024-11-02", product: "Polipastos a Cadena", amount: 1350.0 },
    { id: 28851, name: "Avance Industrial y de Obras", date: "2024-11-01", product: "Polipastos a Cable", amount: 1500.0 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSales, setFilteredSales] = useState(sales);

  const handleSearch = () => {
    const filtered = sales.filter(
      sale =>
        sale.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSales(filtered);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredSales(sales);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="sales-summary-container">
      <header className="navbar">
        <button className="menu-button">Register Test ▼</button>
        <input
          type="text"
          className="search-bar"
          placeholder="Buscar cliente"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="filter-button" onClick={handleSearch}>Filtrar</button>
        <button className="filter-button" onClick={handleClearSearch}>Limpiar</button>
        <button className="logout-button" onClick={handleLogout}>Salir</button>
      </header>

      {/* Filtros */}
      <div className="filters">
        <select className="filter-select"><option>Nombre</option></select>
        <select className="filter-select"><option>Fecha</option></select>
        <select className="filter-select"><option>Producto</option></select>
        <select className="filter-select"><option>Ordenar por precio</option></select>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className="tab-button">Production</button>
        <button className="tab-button">Development</button>
        <button className="tab-button">Archived</button>
        <button className="tab-button">Inactive</button>
      </div>

      {/* Tabla de Resumen de Ventas */}
      <div className="table-container">
        <table className="sales-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale, index) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.name}</td>
                <td>{sale.date}</td>
                <td>{sale.product}</td>
                <td>${sale.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="pagination">
          <span>Rows per page:</span>
          <select><option>10</option><option>20</option><option>50</option></select>
          <span>1-10 of 32</span>
          <button className="pagination-button">❮</button>
          <button className="pagination-button">❯</button>
        </div>
      </div>
    </div>
  );
}

export default SalesSummaryPage;
