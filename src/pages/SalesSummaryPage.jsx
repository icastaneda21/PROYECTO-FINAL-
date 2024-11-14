// src/pages/SalesSummaryPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './SalesSummary.css';

function SalesSummaryPage() {
  const navigate = useNavigate();
  const [sales, setSales] = useState([
    {
      id: 28860,
      name: "Constructora Soluciones Globales S.A.",
      date: "2024-11-10",
      product: "Moductor",
      monthlyAmount: 1000.0,
      annualAmount: 12000.0,
    },
    {
      id: 28859,
      name: "InnovaTech Industriales",
      date: "2024-11-09",
      product: "Minimoductor",
      monthlyAmount: 750.0,
      annualAmount: 9000.0,
    },
    // ... otras ventas
  ]);

  const generateIndividualReport = (sale) => {
    const doc = new jsPDF('landscape');
    doc.setFontSize(16);
    doc.text(`Sales Report for ${sale.name}`, 14, 15);
    doc.setFontSize(10);
    doc.text('Detalles de la venta individual', 14, 22);

    // Tabla de resumen de la venta
    doc.setFontSize(12);
    doc.text('Resumen de la Empresa', 14, 35);
    const summaryData = [
      ['Nombre de la Empresa', sale.name],
      ['Producto', sale.product],
      ['Monto Mensual', `$${sale.monthlyAmount.toFixed(2)}`],
      ['Monto Anual', `$${sale.annualAmount.toFixed(2)}`],
      ['Fecha de la Venta', sale.date],
    ];

    doc.autoTable({
      head: [['Clave', 'Valor']],
      body: summaryData,
      startY: 45,
      theme: 'grid',
      headStyles: { fillColor: [255, 102, 0] },
      styles: { fontSize: 10 },
    });

    // Guardar el PDF con el nombre de la empresa
    doc.save(`Informe_Venta_${sale.name.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="sales-summary-container">
      <header className="navbar">
        <button className="menu-button" onClick={() => navigate('/')}>Home</button>
        <input
          type="text"
          className="search-bar"
          placeholder="Buscar cliente"
        />
        <button className="logout-button" onClick={() => navigate('/')}>Salir</button>
      </header>

      {/* Tabla de Resumen de Ventas */}
      <div className="table-container">
        <table className="sales-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Monto Mensual</th>
              <th>Monto Anual</th>
              <th>Informe</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.name}</td>
                <td>{sale.date}</td>
                <td>{sale.product}</td>
                <td>${sale.monthlyAmount.toFixed(2)}</td>
                <td>${sale.annualAmount.toFixed(2)}</td>
                <td>
                  <button onClick={() => generateIndividualReport(sale)} className="report-button">
                    Generar Informe
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesSummaryPage;
