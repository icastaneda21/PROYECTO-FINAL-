import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductRegistry.css';

function ProductRegistry() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    { id: 1, code: '702465', name: 'Moductor', quantity: 100, price: 10000 },
    { id: 2, code: '482979', name: 'Minimoductor', quantity: 95, price: 7500 },
    { id: 3, code: '455755', name: 'Cables planos', quantity: 72, price: 5500 },
    { id: 4, code: '759269', name: 'Imán de izaje', quantity: 70, price: 10500 },
    { id: 5, code: '886445', name: 'Trolley Manual', quantity: 12, price: 2500 },
    { id: 6, code: '710832', name: 'Diferencial Manual', quantity: 29, price: 5000 },
    { id: 7, code: '971921', name: 'Cadenas', quantity: 77, price: 4500 },
    { id: 8, code: '346133', name: 'Cable de elevación', quantity: 84, price: 9000 },
    { id: 9, code: '769013', name: 'Polipastos a Cadena', quantity: 37, price: 13500 },
    { id: 10, code: '568399', name: 'Polipastos a Cable', quantity: 152, price: 15000 },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showTotal, setShowTotal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add' o 'edit'
  const [currentProduct, setCurrentProduct] = useState({ id: '', code: '', name: '', quantity: 0, price: 0 });

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
    setModalType('add');
    setCurrentProduct({ id: '', code: '', name: '', quantity: 0, price: 0 });
    setShowModal(true);
  };

  const handleEditProduct = (id) => {
    const productToEdit = products.find(product => product.id === id);
    setModalType('edit');
    setCurrentProduct(productToEdit);
    setShowModal(true);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const handleSaveProduct = () => {
    if (modalType === 'add') {
      const newProduct = { ...currentProduct, id: products.length + 1 };
      setProducts([...products, newProduct]);
      setFilteredProducts([...products, newProduct]);
    } else if (modalType === 'edit') {
      const updatedProducts = products.map(product =>
        product.id === currentProduct.id ? currentProduct : product
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    }
    setShowModal(false);
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
                <td>${product.price.toLocaleString('es-CO')}</td>
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
              <p>El total del precio es: ${totalPrice.toLocaleString('es-CO')}</p>
              <button onClick={handleCloseTotal}>Cerrar</button>
            </div>
          </div>
        )}

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>{modalType === 'add' ? 'Agregar Producto' : 'Editar Producto'}</h2>
              <label>Código:</label>
              <input
                type="text"
                value={currentProduct.code}
                onChange={(e) => setCurrentProduct({ ...currentProduct, code: e.target.value })}
              />
              <label>Producto:</label>
              <input
                type="text"
                value={currentProduct.name}
                onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
              />
              <label>Cantidad:</label>
              <input
                type="number"
                value={currentProduct.quantity}
                onChange={(e) => setCurrentProduct({ ...currentProduct, quantity: parseInt(e.target.value) })}
              />
              <label>Valor c/u:</label>
              <input
                type="number"
                value={currentProduct.price}
                onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
              />
              <button onClick={handleSaveProduct}>Guardar</button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductRegistry;
