import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductRegistry.css';

function ProductRegistry() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    { id: 1, code: '702465', name: 'Moductor', quantity: 100, price: 10.0 },
    { id: 2, code: '482979', name: 'Minimoductor', quantity: 95, price: 7.5 },
    { id: 3, code: '455755', name: 'Cables planos', quantity: 72, price: 5.5 },
    { id: 4, code: '759269', name: 'Iman de izaje', quantity: 70, price: 10.5 },
    { id: 5, code: '886445', name: 'Trolley Manual', quantity: 12, price: 2.5 },
    { id: 6, code: '710832', name: 'Diferencial Manual', quantity: 29, price: 5.0 },
    { id: 7, code: '971921', name: 'Cadenas', quantity: 77, price: 4.5 },
    { id: 8, code: '346133', name: 'Cable de elevacion', quantity: 84, price: 9.0 },
    { id: 9, code: '769013', name: 'Polipastos a Cadena', quantity: 37, price: 13.5 },
    { id: 10, code: '568399', name: 'Polipastos a Cable', quantity: 152, price: 15.0 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showTotal, setShowTotal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSearch = () => {
    const filtered = products.filter(
      product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.includes(searchTerm)
    );
    setFilteredProducts(filtered);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredProducts(products);
  };

  const handleCount = () => {
    const total = filteredProducts.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );
    setTotalPrice(total);
    setShowTotal(true);
  };

  const handleCloseTotal = () => {
    setShowTotal(false);
  };

  const handleAddProduct = () => {
    // Lógica para agregar un nuevo producto (usando un formulario en un modal, por ejemplo)
  };

  const handleEditProduct = (id) => {
    // Lógica para editar un producto existente
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="product-registry-container">
      <header className="navbar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="filter-btn" onClick={handleSearch}>Filtrar</button>
          <button className="filter-btn" onClick={handleClearSearch}>Limpiar</button>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Salir</button>
      </header>
      
      <div className="table-container">
        <div className="table-header">
          <img src="/image 1.png" alt="Logo" className="logo" />
          <button className="count-btn" onClick={handleCount}>Realizar Conteo</button>
          <button className="count-btn" onClick={handleAddProduct}>Agregar Producto</button>
        </div>
        
        <table className="product-table">
          <thead>
            <tr>
              <th>ITEM</th>
              <th>Código</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Valor c/u</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.code}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>
                  <button onClick={() => handleEditProduct(product.id)}>Editar</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showTotal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Total Precio</h2>
              <p>El total del precio es: ${totalPrice.toFixed(2)}</p>
              <button onClick={handleCloseTotal}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductRegistry;
