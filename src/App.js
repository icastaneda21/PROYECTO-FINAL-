// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Home';  // La página principal de tu menú
import ClientRegistry from './pages/ClientRegistry';
import ClientMapPage from './pages/ClientMapPage';

function PrivateRoute({ children }) {
  const isAuth = localStorage.getItem('auth');
  return isAuth ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/client-registry"
          element={
            <PrivateRoute>
              <ClientRegistry />
            </PrivateRoute>
          }
        />
        <Route
          path="/client-map"
          element={
            <PrivateRoute>
              <ClientMapPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
