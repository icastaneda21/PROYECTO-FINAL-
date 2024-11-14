// Menu.jsx
import React from 'react';
import styles from './Menu.module.scss';

function Menu() {
  return (
    <div className={styles.menuContainer}>
      <div className={styles.logo}>
        <h1>Puentes Grúa</h1>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.productButton}>Registro de productos</button>
        <button className={styles.clientButton}>Registro de clientes</button>
        <button className={styles.mapButton}>Mapa de Clientes</button>
        <button className={styles.salesButton}>Resumen de ventas</button>
      </div>
    </div>
  );
}

export default Menu;
